import { TableCell, tableCellClasses, TableRow } from '@mui/material'
import styled from 'styled-components'

export const StyledTableCell = styled(TableCell)`
  &.${tableCellClasses.head} {
    background-color: black,
    color: white,
  }

  &.${tableCellClasses.body},  &.${tableCellClasses.footer} {
    font-size: 14,
  }`

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: grey;
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
