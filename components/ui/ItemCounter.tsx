import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useState } from 'react'

interface props {
  currentValue: number
  updatedQuantity: (value: number) => void
  maxValue?: number
}

export const ItemCounter = ({ currentValue, updatedQuantity, maxValue }: props) => {
  const [value, setValue] = useState(currentValue)
  let max = 5
  if (maxValue && maxValue < max) {
    max = maxValue
  }

  const handleValue = (add: number) => {
    const newValue = value + add
    setValue(newValue)
    updatedQuantity(newValue)
  }

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => handleValue(-1)} disabled={value === 1}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ w: 40, textAlign: 'center' }}> {value} </Typography>
      <IconButton onClick={() => handleValue(1)} disabled={value >= max}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
