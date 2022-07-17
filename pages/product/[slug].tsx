import { Box, Button, Grid, Typography } from '@mui/material'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { ShopLayout } from '../../components/layouts/ShopLayout'
import { SizeSelector } from '../../components/products'
import ProductSlideshow from '../../components/products/ProductSlideshow'
import { ItemCounter } from '../../components/ui'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Typography variant="h1" component="h1">
            {product.title}
          </Typography>
          <Typography variant="subtitle1" component="h2">
            ${product.price}
          </Typography>

          <Box sx={{ my: 2 }}>
            <Typography variant="subtitle2">Cantidad</Typography>
            <ItemCounter />
            <SizeSelector selectedSize={product.sizes[0]} sizes={product.sizes} />
          </Box>

          <Button color="secondary" className="circular-btn">
            Agregar al carrito
          </Button>

          {/* <Chip label="No hay disponibles" color="error" variant="outlined" /> */}

          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2">Descripción</Typography>
            <Typography variant="body2">{product.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string }

//   const product = await dbProducts.getProductBySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {
//       product,
//     },
//   }
// }

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const products = await dbProducts.getAllProductsSlugs()

  return {
    paths: products.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const product = await dbProducts.getProductBySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 86400, // 24hrs
  }
}

export default ProductPage
