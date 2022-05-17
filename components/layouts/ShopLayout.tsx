import { FC } from 'react'
import Head from 'next/head'

import { Navbar } from '../ui'

interface Props {
  title: string
  pageDescription: string
  imageFullUrl?: string
}

export const ShopLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <Navbar />

      <main
        style={{
          margin: '5rem auto',
          maxWidth: '90rem',
          padding: '0 1.875em',
        }}>
        {children}
      </main>

      <footer></footer>
    </>
  )
}
