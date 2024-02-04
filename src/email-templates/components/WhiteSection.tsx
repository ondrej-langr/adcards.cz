import { FC } from 'react'
import { Section, SectionProps } from '@react-email/components'

export const WhiteSection: FC<SectionProps> = ({ children, className, ...props }) => {
  return <Section
    className={['bg-white w-[580px] border-2 border-gray-100 border-solid', className].join(' ')} {...props}>{children}</Section>
}