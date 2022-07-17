import { Box } from '@mui/material'
import Head from 'next/head'

interface props {
  title: string
  children: React.ReactNode
}

export const AuthLayout = ({ children, title }: props) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)">
          {children}
        </Box>
      </main>
    </>
  )
}
