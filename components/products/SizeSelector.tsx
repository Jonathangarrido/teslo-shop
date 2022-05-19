import { Box, Button } from '@mui/material'
import { ISizes } from '../../interfaces'

interface props {
  selectedSize?: ISizes
  sizes: ISizes[]
}

export const SizeSelector = ({ selectedSize, sizes }: props) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size="small" color={selectedSize === size ? 'primary' : 'info'}>
          {size}
        </Button>
      ))}
    </Box>
  )
}
