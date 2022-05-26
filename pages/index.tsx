import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import useSWR from 'swr'

import { ShopLayout } from '../components/layouts'
import { initialData } from '../database/products'
import { ProductList } from '../components/products/ProductList'

const HomePage: NextPage = () => {
  const fetcher = (...args: [key: string]) => fetch(...args).then((res) => res.json())

  const { data, error } = useSWR('/api/products', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <ShopLayout
      title="Teslo-Shop - Home"
      pageDescription="Encuentra los mejores productos de Teslo aquí">
      <Typography variant="h1" component="h1">
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los productos
      </Typography>

      <ProductList products={data} />
    </ShopLayout>
  )
}

export default HomePage
