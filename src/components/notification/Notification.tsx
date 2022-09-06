import { NotificationProps } from './types'
import { StyledSnackbar } from './styled'

export const Notification = ({
  vertical,
  horizontal,
  isOpened,
  onNotificationClose,
  message,
  TransitionProps,
}: NotificationProps) => {
  return (
    <StyledSnackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpened}
      onClose={onNotificationClose}
      message={message}
      autoHideDuration={3000}
      TransitionProps={TransitionProps}
    />
  )
}
