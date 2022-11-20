import { FC, useContext } from 'react'
import { Grid, Typography } from '@mui/material'

import { CartContext } from '../../context'
import { currency } from '../../utils'
import { IOrder } from '../../interfaces'

interface IOrdenSummary {
  orderValues?: {
    numberOfItems: number
    subTotal: number
    tax: number
    total: number
  }
}

export const OrdenSummary: FC<IOrdenSummary> = ({ orderValues }) => {
  const valuesContext = useContext(CartContext)
  const { numberOfItems, subTotal, tax, total } = orderValues ?? valuesContext

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          {numberOfItems} {numberOfItems > 1 ? 'productos' : 'producto'}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE || 0) * 100}%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  )
}
