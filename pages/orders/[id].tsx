import NextLink from 'next/link'
import { Box, Chip, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'

import { ShopLayout } from '../../components/layouts'
import { CartList, OrdenSummary } from '../../components/cart'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
  return (
    <ShopLayout title={'Resumen de orden 4324234234'} pageDescription={'Resumen de la orden'}>
      <Typography variant="h1" component="h1">
        Orden: ABD234234
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pendiente de pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label="Orden ya fue pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Resumen (3 productos)</Typography>
              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Dirección de entrega</Typography>
                <NextLink href="/checkout/address" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>Jonathan Garrido</Typography>
              <Typography>234 Un lugar</Typography>
              <Typography>Selton, RTY 122</Typography>
              <Typography>EEUU</Typography>
              <Typography>+1 2343 2342</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <NextLink href="/cart" passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <OrdenSummary />

              <Box sx={{ mt: 3 }}>
                <h1>Pagar</h1>
                <Chip
                  sx={{ my: 2 }}
                  label="Orden ya fue pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default OrderPage
