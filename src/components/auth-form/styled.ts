import styled, { css } from 'styled-components'

export const centeredColumnFlex = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledForm = styled.form`
  ${centeredColumnFlex}
  row-gap: 2rem;
  padding: 2rem 1rem;
  border: 1px solid rgb(145, 143, 143);
  border-radius: 5%;
  max-width: 450px;
`
export const AuthFormActions = styled.div`
  ${centeredColumnFlex}
  row-gap:1rem;
`

export const AuthFormHeading = styled.h1`
  font-size: 2rem;
`
