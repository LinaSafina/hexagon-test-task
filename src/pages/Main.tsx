import { LinksStatisticsTable } from '../components/links-statistics-table/LinkStatisticsTable'
import { LinkGenerator } from '../components/link-generator/LinkGenerator'

export const Main: React.FC = () => {
  return (
    <>
      <LinkGenerator />
      <LinksStatisticsTable />
    </>
  )
}
