import { Button } from '@mui/material'
import { Link, NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

export const navLinks = css`
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }
`

export const StyledNav = styled.nav`
  background-color: #023e8a;
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & {
    ul {
      display: flex;
      column-gap: 1rem;
  }
`

export const StyledLogo = styled(Link)`
  font-size: 2rem;
`

export const StyledNavLink = styled(NavLink)`
  ${navLinks}
`

export const StyledButton = styled(Button)`
  ${navLinks}
`
