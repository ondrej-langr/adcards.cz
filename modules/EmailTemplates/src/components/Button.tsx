import { Button as EmailButton } from '@react-email/components'
import { FC } from 'react'

export const Button: FC<React.ComponentPropsWithoutRef<'a'>> = ({ children, className, ...props }) => {
  return <EmailButton
    className={['bg-[#f70b35] py-3 px-5 text-white', className].join(' ')} {...props}>{children}</EmailButton>
}