import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { MAIN_URL, SHORT_LINKS_URL, URLS } from '../../pages/constants'
import { selectIsLoggedIn } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectLinks, setLinks } from '../../store/linksSlice'
import { Pagination } from '../pagination/Pagination'
import { STATISTICS, TABLE_HEADINGS } from './constants'
import { StyledTableCell, StyledTableRow, StyledTitle } from './styled'

const rowsPerPage = 10

export const LinksStatisticsTable: React.FC = () => {
  const [isTableShown, setIsTableShown] = useState(false)
  const links = useAppSelector(selectLinks)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParam, setSearchParam] = useSearchParams({ page: '1' })
  const [order, setOrder] = useState('asc_short')
  const [isLastPage, setIsLastPage] = useState(false)

  const page = searchParam.get('page') || '1'

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      const offset = +page * rowsPerPage

      const fetchStatistics = async (token: string) => {
        const response = await fetch(
          `${MAIN_URL}/${
            URLS.STATISTICS
          }?order=${order}&offset=${offset}&limit=${rowsPerPage + 1}`,
          {
            method: 'GET',
            headers: {
              'Content-type':
                'application/x-www-form-urlencoded; charset=UTF-8',
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = await response.json()

        if (!response.ok) {
          alert(data.detail.msg)
          return
        }

        setIsLastPage(data.length <= rowsPerPage)

        if (data.length <= rowsPerPage) {
          dispatch(setLinks(data))
        } else {
          dispatch(setLinks(data.slice(0, -1)))
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

  const toggleTableHandler = () => {
    setIsTableShown((prevState) => !prevState)
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setSearchParam({ page: newPage.toString() })
  }

  return (
    <>
      <StyledTitle onClick={toggleTableHandler}>
        {isTableShown ? STATISTICS.HIDE : STATISTICS.SHOW}
      </StyledTitle>
      {isTableShown && (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700 }}
            stickyHeader
            aria-label="statistics table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>{TABLE_HEADINGS.SHORT_LINK}</StyledTableCell>
                <StyledTableCell>{TABLE_HEADINGS.LONG_LINK}</StyledTableCell>
                <StyledTableCell>{TABLE_HEADINGS.CLICKS_COUNT}</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {links.map((link) => (
                <StyledTableRow key={link.id}>
                  <StyledTableCell component="th" scope="row">
                    {`${SHORT_LINKS_URL}/${link.short}`}
                  </StyledTableCell>
                  <StyledTableCell>{link.target}</StyledTableCell>
                  <StyledTableCell>{link.counter}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <StyledTableCell colSpan={3}>
                  <Pagination
                    page={+page}
                    onPageChange={handleChangePage}
                    isLastPage={isLastPage}
                  />
                </StyledTableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
