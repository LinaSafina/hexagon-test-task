import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ORDER, SHORT_LINKS_URL, URLS } from '../../pages/constants'
import { selectIsLoggedIn } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectLinks, setLinks } from '../../store/linksSlice'
import { Pagination } from '../pagination/Pagination'
import { fetchData } from '../../helpers/fetchData'
import {
  ALTS,
  IDS,
  NOTIFICATION_MESSAGE,
  NO_LINKS_MESSAGE,
  STATISTICS,
  TABLE_HEADINGS,
  TYPES,
} from './constants'
import {
  CopyIcon,
  StyledTableCell,
  StyledTableRow,
  StyledTitle,
} from './styled'
import copy from '../../assets/copy-icon.svg'
import { Notification } from '../notification/Notification'

const rowsPerPage = 10

export const LinksStatisticsTable: React.FC = () => {
  const [isTableShown, setIsTableShown] = useState(true)
  const links = useAppSelector(selectLinks)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParam, setSearchParam] = useSearchParams({ page: '1' })
  const [order, setOrder] = useState('asc_short')
  const [isLastPage, setIsLastPage] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const page = searchParam.get('page') || '1'

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
          headers: {
            'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: `Bearer ${token}`,
          },
        })

        if (error) {
          setErrorMsg(data.detail)
        } else {
          setIsLastPage(data.length <= rowsPerPage)

          if (data.length <= rowsPerPage) {
            dispatch(setLinks(data))
          } else {
            dispatch(setLinks(data.slice(0, -1)))
          }
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

  const sortTableHandler = (event: React.MouseEvent<HTMLElement>) => {
    let target = ''
    if ((event.target as HTMLElement).id === IDS.SHORT_LINK) {
      target = TYPES.SHORT
    }
    if ((event.target as HTMLElement).id === IDS.LONG_LINK) {
      target = TYPES.TARGET
    }
    if ((event.target as HTMLElement).id === IDS.CLICKS_COUNT) {
      target = TYPES.COUNT
    }

    setOrder((prevState) =>
      prevState === ORDER.ASC[target] ? ORDER.DESC[target] : ORDER.ASC[target]
    )
  }

  const copyShortLinkHandler = () => {
    setIsCopied(true)
  }

  const notificationCloseHandler = () => {
    setIsCopied(false)
  }

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
      <Notification
        isOpened={isCopied}
        onNotificationClose={notificationCloseHandler}
        message={NOTIFICATION_MESSAGE}
        vertical="bottom"
        horizontal="left"
      />
      <StyledTitle onClick={toggleTableHandler}>
        {isTableShown ? STATISTICS.HIDE : STATISTICS.SHOW}
      </StyledTitle>
      {isTableShown && (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 700, tableLayout: 'fixed' }}
            stickyHeader
            aria-label="statistics table"
          >
            <colgroup>
              <col style={{ width: '27%' }} />
              <col style={{ width: '60%' }} />
              <col style={{ width: '13%' }} />
            </colgroup>
            <TableHead>
              <TableRow onClick={sortTableHandler}>
                <StyledTableCell id={IDS.SHORT_LINK}>
                  {TABLE_HEADINGS.SHORT_LINK}
                </StyledTableCell>
                <StyledTableCell id={IDS.LONG_LINK}>
                  {TABLE_HEADINGS.LONG_LINK}
                </StyledTableCell>
                <StyledTableCell id={IDS.CLICKS_COUNT}>
                  {TABLE_HEADINGS.CLICKS_COUNT}
                </StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {links.length === 0 && (
                <StyledTableRow>
                  <StyledTableCell colSpan={3} align="center">
                    {NO_LINKS_MESSAGE}
                  </StyledTableCell>
                </StyledTableRow>
              )}
              {links.map((link) => (
                <StyledTableRow key={link.id}>
                  <StyledTableCell component="th" scope="row">
                    {`${SHORT_LINKS_URL}/${link.short}`}
                    <CopyToClipboard
                      text={`${SHORT_LINKS_URL}/${link.short}`}
                      onCopy={copyShortLinkHandler}
                    >
                      <CopyIcon src={copy} alt={ALTS.COPY} />
                    </CopyToClipboard>
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
