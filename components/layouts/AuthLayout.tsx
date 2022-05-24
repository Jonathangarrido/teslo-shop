import { Box } from '@mui/material'
import Head from 'next/head'
import { FC } from 'react'

interface props {
  title: string
}

export const AuthLayout: FC<props> = ({ children, title }) => {
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
