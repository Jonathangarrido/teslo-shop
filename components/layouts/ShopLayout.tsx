import Head from 'next/head'

import { Navbar, SideMenu } from '../ui'

interface Props {
  title: string
  pageDescription: string
  imageFullUrl?: string
  children: React.ReactNode
}

export const ShopLayout = ({ children, title, pageDescription, imageFullUrl }: Props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />

        {imageFullUrl && <meta name="og:image" content={imageFullUrl} />}
      </Head>

      <nav>
        <Navbar />
      </nav>

      <SideMenu />

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
