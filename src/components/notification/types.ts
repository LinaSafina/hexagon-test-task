import { TransitionProps } from '@mui/material/transitions'

export type NotificationProps = {
  message: string
  vertical: 'top' | 'bottom'
  horizontal: 'left' | 'center' | 'right'
  isOpened: boolean
  onNotificationClose: () => void
  TransitionProps?: TransitionProps
}
