import { Box, Checkbox } from '@mui/material'
import React from 'react'

function AppCheckBox({ color, width, isDisabled = false }: any) {
  return (
    <>
      {/* custom */}
      <Checkbox
        disabled={isDisabled}
        aria-label='checkbox'
        defaultChecked
        sx={{
          width: 'max-content',
          aspectRatio: '1',
          color: isDisabled === true ? 'gray': color,
          "&:hover": {
            // border: '1px solid #94d154',
          },
          "& .MuiSvgIcon-root": {
            fontSize: width,
            color: isDisabled === true ? 'gray': color,
          },
          // checked
          '&.Mui-checked': {
            color: isDisabled === true ? 'gray': color,
          },
        }}
      />
    </>
  )
}

export default AppCheckBox
