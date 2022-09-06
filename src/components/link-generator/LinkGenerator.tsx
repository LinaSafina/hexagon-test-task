import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MAIN_URL, URLS } from '../../pages/constants'
import { useAppDispatch } from '../../store/hooks'
import { addLink } from '../../store/linksSlice'
import { LINK_GENERATOR } from './constants'
import { StyledForm } from './styled'

export const LinkGenerator: React.FC = () => {
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
        const response = await fetch(
          `${MAIN_URL}/${URLS.SQUEEZE}?link=${targetLink}`,
          {
            method: 'POST',
            headers: {
              'Content-type':
                'application/x-www-form-urlencoded; charset=UTF-8',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await response.json()

        if (!response.ok) {
          alert(data.detail.msg)
          return
        }

        dispatch(addLink(data))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
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
  )
}
