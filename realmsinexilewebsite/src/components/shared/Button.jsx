import { forwardRef } from 'react'
import PropTypes from 'prop-types'
import './Button.css'

/**
 * Reusable button component with variants
 * Supports different visual styles and states
 * 
 * @component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.variant='primary'] - Visual style variant
 * @param {string} [props.size='medium'] - Button size
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {string} [props.type='button'] - HTML button type
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.ariaLabel] - Accessibility label
 * 
 * @example
 * <Button variant="secondary" size="small" onClick={handleClick}>
 *   Save
 * </Button>
 */
const Button = forwardRef(function Button(
  {
    children,
    onClick,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    type = 'button',
    className = '',
    ariaLabel,
    ...rest
  },
  ref
) {
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled && 'btn--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  )
})

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
}

export default Button