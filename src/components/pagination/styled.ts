import styled from 'styled-components'

export const StyledPagination = styled.ul`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  list-style: none;
  padding: 0;
  margin: 0;

  & > li {
    button {
      border: none;
      background-color: transparent;
    }

    span {
      padding: 0 1.5em;
    }
  }
`

export const ButtonStyled = styled.button`
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
`
