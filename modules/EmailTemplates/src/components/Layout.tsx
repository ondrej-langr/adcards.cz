import { FC, PropsWithChildren } from 'react'
import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Img,
  Row,
  Section,
  Tailwind,
  Text,
  Link,
  Font,
} from '@react-email/components'


export type LayoutProps = {
  baseUrl: string
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, baseUrl }) => {
  return <Tailwind>
    <Html>
      <Head>
        {/* Ext */}
        <Font
          fontFamily='Oswald'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/oswald/v53/TK3iWkUHHAIjg752Fz8Gl-1PK62t.woff2',
            format: 'woff2',
          }}
          fontWeight={300}
          fontStyle='normal'
        />
        <Font
          fontFamily='Oswald'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/oswald/v53/TK3iWkUHHAIjg752GT8Gl-1PKw.woff2',
            format: 'woff2',
          }}
          fontWeight={300}
          fontStyle='normal'
        />
        {/* Ext */}
        <Font
          fontFamily='Oswald'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/oswald/v53/TK3iWkUHHAIjg752Fz8Gl-1PK62t.woff2',
            format: 'woff2',
          }}
          fontWeight={700}
          fontStyle='normal'
        />
        <Font
          fontFamily='Oswald'
          fallbackFontFamily='Verdana'
          webFont={{
            url: 'https://fonts.gstatic.com/s/oswald/v53/TK3IWkUHHAIjg75cFRf3bXL8LICs1_Fv40pKlN4NNSeSASz7FmlWHYjMdZwl.woff2',
            format: 'woff2',
          }}
          fontWeight={700}
          fontStyle='normal'
        />
      </Head>
      <Body className='bg-white font-[HelveticaNeue,Helvetica,Arial,sans-serif]' style={{
        background: `url(${baseUrl}/images/bg_texture2.png) center / 350px 350px repeat #000000`,
      }}>
        <Container className='my-8 mx-auto'>
          <Section className='mb-7'>
            <Img className='mx-auto' width={80} height={92} src={`${baseUrl}/images/logo_AD.png`} />
          </Section>
          {children}
        </Container>
        <Section>
          <Row>
            <Column align='right' style={{ width: '50%', paddingRight: '8px' }}>
              <Link href='https://www.facebook.com/adcardscz'>
                <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='27' height='27' viewBox='0 0 24 24'
                     style={{ fill: 'rgb(247, 11, 53)' }}>
                  <path
                    d='M12,0C5.373,0,0,5.373,0,12c0,6.016,4.432,10.984,10.206,11.852V15.18H7.237v-3.154h2.969V9.927c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L16.73,15.18h-3.106v8.697 C19.481,23.083,24,18.075,24,12C24,5.373,18.627,0,12,0z'>
                  </path>
                </svg>
              </Link>
            </Column>
            <Column align='left' style={{ width: '50%', paddingLeft: '8px' }}>
              <Link href='https://www.instagram.com/adcards.cz/'>
                <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='32' height='32' viewBox='0 0 32 32'
                     style={{ fill: 'rgb(247, 11, 53)' }}>
                  <path
                    d='M 11.46875 5 C 7.917969 5 5 7.914063 5 11.46875 L 5 20.53125 C 5 24.082031 7.914063 27 11.46875 27 L 20.53125 27 C 24.082031 27 27 24.085938 27 20.53125 L 27 11.46875 C 27 7.917969 24.085938 5 20.53125 5 Z M 11.46875 7 L 20.53125 7 C 23.003906 7 25 8.996094 25 11.46875 L 25 20.53125 C 25 23.003906 23.003906 25 20.53125 25 L 11.46875 25 C 8.996094 25 7 23.003906 7 20.53125 L 7 11.46875 C 7 8.996094 8.996094 7 11.46875 7 Z M 21.90625 9.1875 C 21.402344 9.1875 21 9.589844 21 10.09375 C 21 10.597656 21.402344 11 21.90625 11 C 22.410156 11 22.8125 10.597656 22.8125 10.09375 C 22.8125 9.589844 22.410156 9.1875 21.90625 9.1875 Z M 16 10 C 12.699219 10 10 12.699219 10 16 C 10 19.300781 12.699219 22 16 22 C 19.300781 22 22 19.300781 22 16 C 22 12.699219 19.300781 10 16 10 Z M 16 12 C 18.222656 12 20 13.777344 20 16 C 20 18.222656 18.222656 20 16 20 C 13.777344 20 12 18.222656 12 16 C 12 13.777344 13.777344 12 16 12 Z'>
                  </path>
                </svg>
              </Link>
            </Column>
          </Row>
          <Text style={{ textAlign: 'center', color: '#706a7b', fontSize: '1rem' }}>
            © {new Date().getFullYear()} <Link href={baseUrl}>adcards.cz</Link> <br />
            Raducan, spol. s r.o.
          </Text>
        </Section>
      </Body>
    </Html>
  </Tailwind>
}