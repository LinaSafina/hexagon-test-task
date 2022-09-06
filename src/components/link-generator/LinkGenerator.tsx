import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchData } from '../../helpers/fetchData'

import { URLS } from '../../pages/constants'
import { useAppDispatch } from '../../store/hooks'
import { addLink } from '../../store/linksSlice'
import { LINK_GENERATOR } from './constants'
import { StyledForm } from './styled'
import { Props } from './types'

export const LinkGenerator: React.FC<Props> = ({ setErrorMsg }) => {
  const [targetLink, setTargetLink] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const changeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTargetLink(event.target.value)
  }

  const submitFormHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const token = localStorage.getItem('token')

      if (!token) {
        navigate('/login')
      } else {
        const { data, error } = await fetchData({
          url: `${URLS.SQUEEZE}?link=${targetLink}`,
          token,
          method: 'POST',
        })

        if (error) {
          setErrorMsg(error)
        } else {
          dispatch(addLink(data))
          setTargetLink('')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <StyledForm onSubmit={submitFormHandler}>
        <TextField
          autoFocus
          id={LINK_GENERATOR.INPUT_ID}
          label={LINK_GENERATOR.LABEL}
          type="text"
          variant="outlined"
          margin="normal"
          value={targetLink}
          onChange={changeInputHandler}
        />
        <Button type="submit" variant="contained">
          {LINK_GENERATOR.SUBMIT_BUTTON}
        </Button>
      </StyledForm>
    </>
  )
}
