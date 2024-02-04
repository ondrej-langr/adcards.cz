import { Preview, Text, Heading, Container, Row, Column, Img } from '@react-email/components'
import * as React from 'react'
import { Layout } from './components/Layout'
import { Button } from './components/Button'
import { WhiteSection } from './components/WhiteSection'
import { TwigExpr, TwigFor, TwigIf } from './components/TwigExpr'
import { FC, PropsWithChildren, ReactNode } from 'react'

const defaultProps = {
    baseUrl: '{{ baseUrl }}',
    orderUrl: '{{ orderUrl }}',
    texts: {
        preview: '{{ texts.preview }}',
        summary: '{{ texts.summary }}',
        showOrder: '{{ texts.showOrder }}',
        orderSummary: '{{ texts.orderSummary }}',
    },

    products: {
        title: '{{ product.title }}',
        price: '{{ product.price|raw }}',
        imgSrc: '{{ product.img.src }}',
    },
    cards: {
        title: '{{ card.title }}',
        subtitle: '{{ card.subtitle|raw }}',
        price: '{{ card.price|raw }}',
        imgSrc: '{{ card.img.src }}',
    },
    shipping: {
        label: '{{ shipping.label }}',
        value: '{{ shipping.value }}',
        price: {
            label: '{{ shipping.price.label }}',
            value: '{{ shipping.price.value }}',
        },
    },
    payment: {
        label: '{{ payment.label }}',
        value: '{{ payment.value }}',
    },
    subtotal: {
        label: '{{ subtotal.label }}',
        value: '{{ subtotal.value|raw }}',
    },
    price: {
        label: '{{ price.label }}',
        value: '{{ price.value }}',
    },
}

const developmentProps: Partial<typeof defaultProps> = {
    baseUrl: 'https://adcards.prom-cms.cz',
}

const Product: FC<PropsWithChildren<{
    imgSrc: string,
    titleOutlet: ReactNode,
    subtitleOutlet?: ReactNode,
    priceOutlet: ReactNode,
}>> = ({ priceOutlet, imgSrc, titleOutlet, subtitleOutlet, children }) => <Row className={'mb-6'}>
    <Column className={'w-[90px] align-top'}>
        <div className={'relative w-[90px] h-[90px]'}>
            <Img src={imgSrc} width={90}
                 height={90} className={'absolute top-0 left-0 w-100 h-100 object-contain'} />
        </div>
    </Column>
    <Column className={'pl-5 align-top'}>
        <Row>
            <Column>
                <Heading as={'h3'} className={'m-0 text-xl mb-2'}>{titleOutlet}</Heading>
                {subtitleOutlet ? <Text className={'m-0 text-[1.1rem]'}>{subtitleOutlet}</Text> : null}
                <Text className={'m-0 text-[1.1rem]'}>{priceOutlet}</Text>
                {children}
            </Column>
        </Row>
    </Column>
</Row>

export default function OrderCreated() {
    const {
        baseUrl,
        orderUrl,
        products,
        cards,
        payment,
        price,
        shipping,
        subtotal,
        texts,
    } = { ...defaultProps, ...(process.env.NODE_ENV !== 'production' ? developmentProps : {}) }
    const spacerRow = <Row className='h-2'>
        <Column></Column>
        <Column></Column>
    </Row>

    return (
        <Layout baseUrl={baseUrl}>
            <Preview>
                {texts.preview}
            </Preview>
            <WhiteSection className='px-5 pb-5'>
                <Text className='text-lg'>
                    {texts.summary}
                </Text>
                <Button
                    href={orderUrl}
                >
                    {texts.showOrder}
                </Button>
            </WhiteSection>
            <WhiteSection className='mt-5 px-5 text-[rgba(105,105,105,0.95)]'>
                <Heading as='h2'>
                    {texts.orderSummary}
                </Heading>

                <TwigExpr val={'if products'} />
                <Container className='border-b border-gray-200 border-solid text-lg uppercase'>
                    <TwigExpr val={'for product in products'} />
                    <Product
                        imgSrc={products.imgSrc}
                        priceOutlet={products.price}
                        titleOutlet={products.title}
                    />
                    <TwigExpr val={'endfor'} />
                </Container>
                <TwigExpr val={'endif'} />

                <TwigExpr val={'if cards'} />
                <Container className='border-b border-gray-200 border-solid text-lg uppercase pt-5'>
                    <TwigExpr val={'for card in cards'} />
                    <Product
                        imgSrc={cards.imgSrc}
                        priceOutlet={cards.price}
                        subtitleOutlet={cards.subtitle}
                        titleOutlet={cards.title}
                    >
                        <TwigIf condition={'card.bonuses'}>
                            <Text className={'m-0 text-[1.1rem]'}>
                                Včetně:{' '}
                                <TwigFor iterateeName={'bonus'} iteratorName={'card.bonuses'}>
                                    <span>
                                        <span className='cursor-help underline'
                                              title='{{ bonus.value }}'>{`{{ bonus.name }}`}</span> ({`{{ bonus.price }}`}Kč)
                                    </span>
                                    <TwigIf condition={'loop.last == false'}>, </TwigIf>
                                </TwigFor>
                            </Text>
                        </TwigIf>
                    </Product>
                    <TwigExpr val={'endfor'} />
                </Container>
                <TwigExpr val={'endif'} />

                <Container className='border-b border-gray-200 border-solid text-lg uppercase py-5'>
                    <Row>
                        <Column>
                            {shipping.label}:
                        </Column>
                        <Column className='text-right'>
                            {shipping.value}
                        </Column>
                    </Row>
                    {spacerRow}
                    <Row>
                        <Column>
                            {payment.label}:
                        </Column>
                        <Column className='text-right'>
                            {payment.value}
                        </Column>
                    </Row>
                </Container>

                <Container
                    className='text-lg uppercase py-5'>
                    <Row>
                        <Column>
                            {subtotal.label}:
                        </Column>
                        <Column className='text-right'>
                            {subtotal.value}
                        </Column>
                    </Row>
                    {spacerRow}
                    <Row>
                        <Column>
                            {shipping.price.label}:
                        </Column>
                        <Column className='text-right'>
                            {shipping.price.value}
                        </Column>
                    </Row>
                    {spacerRow}
                    <Row className='text-xl font-bold mt-2'>
                        <Column>
                            {price.label}:
                        </Column>
                        <Column className='text-right'>
                            {price.value}
                        </Column>
                    </Row>
                </Container>
            </WhiteSection>
        </Layout>
    )
}