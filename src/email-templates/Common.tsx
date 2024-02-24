import { Preview } from '@react-email/components'
import * as React from 'react'
import { Layout } from './_components/Layout'
import { WhiteSection } from './_components/WhiteSection'

const defaultProps = {
  baseUrl: '{{ baseUrl }}',
  texts: {
    preview: '{{texts.preview|raw}}',
    content: '{{texts.content|raw}}',
  },
}

const developmentProps: Partial<typeof defaultProps> = {
  baseUrl: 'https://adcards.prom-cms.cz',
}

export default function Common() {
  const {
    baseUrl,
    texts,
  } = { ...defaultProps, ...(process.env.NODE_ENV !== 'production' ? developmentProps : {}) }

  return (
    <Layout baseUrl={baseUrl}>
      <Preview>
        {texts.preview}
      </Preview>
      <WhiteSection className='p-5'>
        {texts.content}
      </WhiteSection>
    </Layout>
  )
}