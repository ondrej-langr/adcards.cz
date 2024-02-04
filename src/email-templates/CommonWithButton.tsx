import { Preview, Text } from '@react-email/components'
import * as React from 'react'
import { Layout } from './components/Layout'
import { WhiteSection } from './components/WhiteSection'
import { Button } from './components/Button'

const defaultProps = {
  baseUrl: '{{ baseUrl }}',
  buttonUrl: '{{ buttonUrl }}',
  texts: {
    preview: '{{texts.preview}}',
    content: '{{texts.content}}',
    button: '{{texts.button}}',
  },
}

const developmentProps: Partial<typeof defaultProps> = {
  baseUrl: 'https://adcards.prom-cms.cz',
}

export default function CommonWithButton() {
  const {
    baseUrl,
    texts,
    buttonUrl,
  } = { ...defaultProps, ...(process.env.NODE_ENV !== 'production' ? developmentProps : {}) }

  return (
    <Layout baseUrl={baseUrl}>
      <Preview>
        {texts.preview}
      </Preview>
      <WhiteSection className='p-5'>
        <Text className='text-lg'>
          {texts.content}
        </Text>
        <Button
          href={buttonUrl}
        >
          {texts.button}
        </Button>
      </WhiteSection>
    </Layout>
  )
}