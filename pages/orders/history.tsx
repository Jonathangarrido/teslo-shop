import NextLink from 'next/link'
import { Chip, Grid, Link, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid'

import { ShopLayout } from '../../components/layouts'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
  {
    field: 'paid',
    headerName: 'Pagada',
    description: 'Muestra información si está pagada la orden o no',
    width: 200,
    renderCell: (params: GridValueGetterParams) => {
      return params.row.paid ? (
        <Chip color="success" label="Pagada" variant="outlined" />
      ) : (
        <Chip color="error" label="No pagada" variant="outlined" />
      )
    },
  },
  {
    field: 'order',
    headerName: 'Ver orden',
    width: 200,
    sortable: false,
    renderCell: (params: GridValueGetterParams) => (
      <NextLink href={`/orders/${params.row.id}`} passHref>
        <Link underline="always">Ver orden</Link>
      </NextLink>
    ),
  },
]
const row = [
  { id: 1, paid: true, fullname: 'Jonathan Garrido' },
  { id: 2, paid: true, fullname: 'Bruno Garrido' },
  { id: 3, paid: false, fullname: 'Barbara Martinez' },
  { id: 4, paid: true, fullname: 'Hajime no ippo' },
  { id: 5, paid: false, fullname: 'HunterXHunter' },
  { id: 6, paid: true, fullname: 'One Puch Man' },
]

const history = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
      <Typography variant="h1" component="h1">
        Historial de ordenes
      </Typography>

      <Grid container>
        <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
          <DataGrid rows={row} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default history
