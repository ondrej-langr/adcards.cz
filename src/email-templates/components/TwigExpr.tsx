import { FC, PropsWithChildren } from 'react'

const isDev = process.env.NODE_ENV !== 'production'

export const TwigExpr: FC<{ val: string }> = ({ val }) => {
    let value = `{% ${val} %}`

    return <div style={isDev ? { display: 'none' } : {}} dangerouslySetInnerHTML={{ __html: value }}></div>
}

export const TwigFor: FC<PropsWithChildren<{ iteratorName: string, iterateeName: string }>> = ({ iterateeName, iteratorName, children }) => {
    return <>
        {`{% for ${iterateeName} in ${iteratorName} %}`}
        {children}
        {`{% endfor %}`}
    </>
}

export const TwigIf: FC<PropsWithChildren<{ condition: string }>> = ({ condition, children }) => {
    return <>
        {`{% if ${condition} %}`}
        {children}
        {`{% endif %}`}
    </>
}