import { Box, Button } from '@mui/material'
import { ISizes } from '../../interfaces'

interface props {
  selectedSize?: ISizes
  sizes: ISizes[]
  onClick: (size: ISizes) => void
}

export const SizeSelector = ({ selectedSize, sizes, onClick }: props) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => onClick(size)}>
          {size}
        </Button>
      ))}
    </Box>
  )
}
