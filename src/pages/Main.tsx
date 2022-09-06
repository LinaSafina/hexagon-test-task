import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { LinksStatisticsTable } from '../components/links-statistics-table/LinkStatisticsTable'
import { LinkGenerator } from '../components/link-generator/LinkGenerator'
import { selectIsLoggedIn } from '../store/authSlice'
import { fetchData } from '../helpers/fetchData'
import { Notification } from '../components/notification/Notification'
import { selectLinks, setLinks } from '../store/linksSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { ORDER, URLS } from './constants'

const rowsPerPage = 10

export const Main: React.FC = () => {
  const [errorMsg, setErrorMsg] = useState('')
  const [isLastPage, setIsLastPage] = useState(false)
  const [order, setOrder] = useState(ORDER.ASC.SHORT)

  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const links = useAppSelector(selectLinks)
  const dispatch = useAppDispatch()
  const [searchParam, setSearchParam] = useSearchParams({ page: '1' })

  const page = searchParam.get('page') || '1'

  useEffect(() => {
    if (links.length > rowsPerPage) {
      setSearchParam({ page: (+page + 1).toString() })
    }
  }, [links, rowsPerPage, setSearchParam])

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      const offset = (+page - 1) * rowsPerPage

      const fetchStatistics = async (token: string) => {
        const { data, error } = await fetchData({
          url: `${URLS.STATISTICS}?order=${order}&offset=${offset}&limit=${
            rowsPerPage + 1
          }`,
          token,
        })

        if (error) {
          setErrorMsg(error)
        } else {
          setIsLastPage(data.length <= rowsPerPage)
          dispatch(setLinks(data.slice(0, rowsPerPage)))
        }
      }

      try {
        const token = localStorage.getItem('token')

        if (!token) {
          navigate('/login')
        } else {
          fetchStatistics(token)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [isLoggedIn, setLinks, order, rowsPerPage, page])

  const errorNotificationCloseHandler = () => {
    setErrorMsg('')
  }

  return (
    <>
      <Notification
        isOpened={!!errorMsg}
        onNotificationClose={errorNotificationCloseHandler}
        message={errorMsg}
        vertical="top"
        horizontal="center"
      />
      <LinkGenerator errorMsg={errorMsg} setErrorMsg={setErrorMsg} />
      <LinksStatisticsTable
        setOrder={setOrder}
        isLastPage={isLastPage}
        page={page}
      />
    </>
  )
}
