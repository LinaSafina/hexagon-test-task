import {
  // FirstPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  // LastPage,
} from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

import { TablePaginationActionsProps } from './types'

export const TablePaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) => {
  // const handleFirstPageButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   onPageChange(event, 0)
  // }

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1)
  }

  // const handleLastPageButtonClick = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  // }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPage />
      </IconButton> */}
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      {/* <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPage />
      </IconButton> */}
    </Box>
  )
}
