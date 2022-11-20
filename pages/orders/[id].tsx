import { GetServerSideProps, NextPage } from 'next'
import { Box, Chip, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import { getSession } from 'next-auth/react'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

import { ShopLayout } from '../../components/layouts'
import { CartList, OrdenSummary } from '../../components/cart'
import { dbOrders } from '../../database'
import { IOrder } from '../../interfaces'
import { countries } from '../../utils'

interface IOrderPage {
  order: IOrder
}

const OrderPage: NextPage<IOrderPage> = ({ order }) => {
  return (
    <ShopLayout title={'Resumen de orden'} pageDescription={'Resumen de la orden'}>
      <Typography variant="h1" component="h1">
        Orden: {order._id}
      </Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Orden ya fue pagada"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pendiente de pago"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container className="fadeIn">
        <Grid item xs={12} sm={7}>
          <CartList products={order.orderItems} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                Resumen ({order.numberOfItems}{' '}
                {order.numberOfItems === 1 ? 'Producto' : 'Productos'})
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Dirección de entrega</Typography>
              </Box>

              <Typography>
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
              </Typography>
              <Typography>
                {order.shippingAddress.address}
                {order.shippingAddress.address2 && `, ${order.shippingAddress.address2}`}
              </Typography>
              <Typography>
                {order.shippingAddress.city}, {order.shippingAddress.zip}
              </Typography>
              <Typography>
                {countries.find((c) => c.code === order.shippingAddress.country)?.name}
              </Typography>
              <Typography>{order.shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrdenSummary
                orderValues={{
                  numberOfItems: order.numberOfItems,
                  subTotal: order.subTotal,
                  tax: order.tax,
                  total: order.total,
                }}
              />

              <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                {order.isPaid ? (
                  <Chip
                    sx={{ my: 2 }}
                    label="Orden ya fue pagada"
                    variant="outlined"
                    color="success"
                    icon={<CreditScoreOutlined />}
                  />
                ) : (
                  <h1>Pagar</h1>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { id = '' } = query

  // validar session
  const session: any = await getSession({ req })
  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?p=/orders/${id}`,
        permanent: true,
      },
    }
  }

  const order = await dbOrders.getOrderById(id.toString())

  // Orden no existe
  if (!order) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: true,
      },
    }
  }

  // Ver orden de otro usuario
  if (order.user !== session.user._id) {
    return {
      redirect: {
        destination: `/orders/history`,
        permanent: true,
      },
    }
  }

  return {
    props: {
      order,
    },
  }
}

export default OrderPage
