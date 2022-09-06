import React from 'react'

import { logoutUser, selectIsLoggedIn } from '../../store/authSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { NAV } from './constants'
import { StyledButton, StyledLogo, StyledNav, StyledNavLink } from './styled'

export const Navbar: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(logoutUser())
  }

  return (
    <StyledNav>
      <StyledLogo to="/main">{NAV.LOGO}</StyledLogo>
      <ul>
        {isLoggedIn && (
          <li>
            <StyledButton
              variant="text"
              type="button"
              color="inherit"
              onClick={logoutHandler}
            >
              {NAV.LOGOUT}
            </StyledButton>
          </li>
        )}
        {!isLoggedIn && (
          <>
            <li>
              <StyledNavLink
                to="/signup"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              >
                {NAV.SIGN_UP}
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink
                to="/login"
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              >
                {NAV.LOGIN}
              </StyledNavLink>
            </li>
          </>
        )}
      </ul>
    </StyledNav>
  )
}
