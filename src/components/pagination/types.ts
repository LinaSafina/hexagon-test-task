export type PaginationProps = {
  isLastPage: boolean
  page: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void
}
