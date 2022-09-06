import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material'
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ORDER, SHORT_LINKS_URL } from '../../pages/constants'
import { useAppSelector } from '../../store/hooks'
import { selectLinks } from '../../store/linksSlice'
import { Pagination } from '../pagination/Pagination'
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
import { TableProps } from './types'

export const LinksStatisticsTable: React.FC<TableProps> = ({
  setOrder,
  isLastPage,
  page,
}) => {
  const [isTableShown, setIsTableShown] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const links = useAppSelector(selectLinks)
  const [, setSearchParam] = useSearchParams()

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

    setOrder((prevState: string) =>
      prevState === ORDER.ASC[target] ? ORDER.DESC[target] : ORDER.ASC[target]
    )
  }

  const copyShortLinkHandler = () => {
    setIsCopied(true)
  }

  const notificationCloseHandler = () => {
    setIsCopied(false)
  }

  return (
    <>
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
