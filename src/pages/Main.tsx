import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { LinksStatisticsTable } from '../components/links-statistics-table/LinkStatisticsTable'
import { selectIsLoggedIn } from '../store/authSlice'
import { MAIN_URL, URLS } from './constants'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LinkGenerator } from '../components/link-generator/LinkGenerator'
import { setLinks } from '../store/linksSlice'

export const Main: React.FC = () => {
  return (
    <>
      <LinkGenerator />
      <LinksStatisticsTable />
    </>
  )
}
