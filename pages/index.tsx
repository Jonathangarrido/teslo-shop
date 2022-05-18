import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'

import { ShopLayout } from '../components/layouts'
import { initialData } from '../database/products'
import { ProductList } from '../components/products/ProductList'
import { IProduct } from '../interfaces/products'

const Home: NextPage = () => {
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

      <ProductList products={initialData.products as any} />
    </ShopLayout>
  )
}

export default Home
