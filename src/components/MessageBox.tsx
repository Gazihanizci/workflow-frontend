import { createPortal } from 'react-dom'
import './MessageBox.css'

export type MessageBoxVariant = 'info' | 'success' | 'warning' | 'error'
export type MessageBoxLayout = 'inline' | 'modal'

type MessageBoxAction = {
  label: string
  onClick: () => void
  variant?: 'primary' | 'ghost'
}

type MessageBoxProps = {
  title: string
  message: string
  variant?: MessageBoxVariant
  layout?: MessageBoxLayout
  onClose?: () => void
  primaryAction?: MessageBoxAction
  secondaryAction?: MessageBoxAction
}

function MessageBox({
  title,
  message,
  variant = 'info',
  layout = 'inline',
  onClose,
  primaryAction,
  secondaryAction,
}: MessageBoxProps) {
  const content = (
    <div className={`message-box ${variant} ${layout}`} role="alert">
      <div className="message-box-header">
        <div>
          <p className="message-box-title">{title}</p>
          <p className="message-box-message">{message}</p>
        </div>
        {onClose ? (
          <button className="message-box-close" type="button" onClick={onClose}>
            Kapat
          </button>
        ) : null}
      </div>
      {primaryAction || secondaryAction ? (
        <div className="message-box-actions">
          {secondaryAction ? (
            <button
              className={`message-box-button ${
                secondaryAction.variant || 'ghost'
              }`}
              type="button"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          ) : null}
          {primaryAction ? (
            <button
              className={`message-box-button ${primaryAction.variant || 'primary'}`}
              type="button"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )

  if (layout === 'modal') {
    const modal = (
      <div className="message-box-backdrop" role="dialog" aria-modal="true">
        {content}
      </div>
    )

    return createPortal(modal, document.body)
  }

  return content
}

export default MessageBox
