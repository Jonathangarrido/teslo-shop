import NextLink from 'next/link'
import { Grid, Link, Typography, CardActionArea, CardMedia, Box, Button } from '@mui/material'

import { useContext } from 'react'

import { ItemCounter } from '../ui'
import { CartContext } from '../../context'
import { ICartProduct, IOrderItem } from '../../interfaces'
interface props {
  editable?: boolean
  products?: IOrderItem[]
}

export const CartList = ({ editable = false, products }: props) => {
  const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)

  const handleQuantotyValue = (product: ICartProduct, newQuantity: number) => {
    product.quantity = newQuantity
    updateCartQuantity(product)
  }

  const productsToShow = products ?? cart

  return (
    <>
      {productsToShow.map((product) => (
        <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
          <Grid item xs={3}>
            <NextLink href={`/product/${product.slug}`} passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component="img"
                    sx={{ borderRadius: '5px' }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
              <Typography variant="body1">{product.title}</Typography>
              <Typography variant="body1">
                Talla: <strong>{product.size}</strong>
              </Typography>

              {editable ? (
                <ItemCounter
                  currentValue={product.quantity}
                  updatedQuantity={(newQuantity) =>
                    handleQuantotyValue(product as ICartProduct, newQuantity)
                  }
                />
              ) : (
                <Typography variant="h5">
                  {product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}
                </Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={2} display="flex" alignItems="center" flexDirection="column">
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>

            {editable && (
              <Button
                variant="text"
                color="secondary"
                onClick={() => removeCartProduct(product as ICartProduct)}>
                Remover
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  )
}
