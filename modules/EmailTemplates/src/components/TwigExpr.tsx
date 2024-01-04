import { FC, PropsWithChildren } from 'react'

const isDev = process.env.NODE_ENV !== 'production'

export const TwigExpr: FC<{ val: string }> = ({ val }) => {
  let value = `{% ${val} %}`

  return <div style={isDev ? { display: 'none' } : {}} dangerouslySetInnerHTML={{ __html: value }}></div>
}