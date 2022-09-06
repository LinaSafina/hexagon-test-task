import {
  FirstPageIcon,
  NextPageIcon,
  PreviousPageIcon,
} from '../../assets/pagination'
import { ButtonStyled, StyledPagination } from './styled'
import { PaginationProps } from './types'

export const Pagination = ({
  page,
  onPageChange,
  isLastPage,
}: PaginationProps) => {
  const isFirstPage = page === 1

  const previousPagesColor = isFirstPage ? 'grey' : 'black'

  const nextPagesColor = isLastPage ? 'grey' : 'black'

  const goToFirstPage = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onPageChange(event, 1)
  }
  const goToPreviousPage = (
    event: React.MouseEvent<HTMLButtonElement> | null
  ) => {
    onPageChange(event, page - 1)
  }
  const goToNextPage = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    onPageChange(event, page + 1)
  }

  return (
    <StyledPagination>
      <li>
        <ButtonStyled onClick={goToFirstPage} disabled={isFirstPage}>
          <FirstPageIcon color={previousPagesColor} />
        </ButtonStyled>
      </li>
      <li>
        <ButtonStyled onClick={goToPreviousPage} disabled={isFirstPage}>
          <PreviousPageIcon color={previousPagesColor} />
        </ButtonStyled>
      </li>
      <li>
        <span>{page}</span>
      </li>
      <li>
        <ButtonStyled onClick={goToNextPage} disabled={isLastPage}>
          <NextPageIcon color={nextPagesColor} />
        </ButtonStyled>
      </li>
    </StyledPagination>
  )
}
