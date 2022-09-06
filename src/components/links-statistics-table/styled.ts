import { TableCell, tableCellClasses, TableRow } from '@mui/material'
import styled from 'styled-components'

export const StyledTableCell = styled(TableCell)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.${tableCellClasses.head} {
    background-color: #03045e;
    color: white;
    cursor: pointer;
  }

  &.${tableCellClasses.body}, &.${tableCellClasses.footer} {
    font-size: 14;
  }
`

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #d9d9d9;
  }

  &:last-child td,
  &:last-child th {
    border: 0;
  }
`

export const StyledTitle = styled.h2`
  font-size: 1.5rem;
  cursor: pointer;
`

export const CopyIcon = styled.img`
  padding-left: 12px;
  vertical-align: middle;
  cursor: pointer;
`
