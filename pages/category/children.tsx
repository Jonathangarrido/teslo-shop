import { Typography } from '@mui/material'
import type { NextPage } from 'next'

import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products/ProductList'
import { useProducts } from '../../hooks'
import { FullScreenLoading } from '../../components/ui'

const ChildrenPage: NextPage = () => {
  const { products, isLoading } = useProducts('/products?gender=kid')

  return (
    <ShopLayout
      title="Teslo-Shop - Kids"
      pageDescription="Encuentra los mejores productos de Teslo para niños">
      <Typography variant="h1" component="h1">
        Niños
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Productos de Niños
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  )
}

export default ChildrenPage
