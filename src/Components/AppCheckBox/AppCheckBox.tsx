import { Box, Checkbox } from '@mui/material'
import React from 'react'

function AppCheckBox() {
  return (
    <>
      {/* custom */}
      <Checkbox
        aria-label='checkbox'
        defaultChecked
        sx={{
          width: '40px',
          aspectRatio: '1',
          color: '#94d154',
          "&:hover": {
            // border: '1px solid #94d154',
          },
          "& .MuiSvgIcon-root": {
            fontSize: '20px',
            color: '#94d154',
          },
          // checked
          '&.Mui-checked': {
            color: '#94d154',
          },
        }}
      />

      <Checkbox
        aria-label='checkbox'
        defaultChecked
        sx={{
          width: '40px',
          aspectRatio: '1',
          color: '#ffc102',
          "&:hover": {
            // border: '1px solid #ffc102',
          },
          "& .MuiSvgIcon-root": {
            fontSize: '20px',
            color: '#ffc102'
          },
          // checked
          '&.Mui-checked': {
            color: '#ffc102',
          },
        }}
      />

      <Checkbox
        aria-label='checkbox'
        defaultChecked
        sx={{
          width: '40px',
          aspectRatio: '1',
          color: '#04b0ee',
          "&:hover": {
            // border: '1px solid #04b0ee',
          },
          "& .MuiSvgIcon-root": {
            fontSize: '20px',
            color: '#04b0ee'
          },
          // checked
          '&.Mui-checked': {
            color: '#04b0ee',
          },
        }}
      />

      <Checkbox
        aria-label='checkbox'
        defaultChecked
        sx={{
          width: '40px',
          aspectRatio: '1',
          color: 'red',
          "&:hover": {
            // border: '1px solid red',
          },
          "& .MuiSvgIcon-root": {
            fontSize: '20px',
            color: 'red'
          },
          // checked
          '&.Mui-checked': {
            color: 'red',
          },
        }}
      />

      <Checkbox
        aria-label='checkbox'
        defaultChecked
        sx={{
          width: '40px',
          aspectRatio: '1',
          color: 'blue',
          "&:hover": {
            // border: '1px solid blue',
          },
          "& .MuiSvgIcon-root": {
            fontSize: '20px',
            color: 'blue'
          },
          // checked
          '&.Mui-checked': {
            color: 'blue ',
          },
        }}
      />

      <Checkbox
        aria-label='checkbox'
        defaultChecked
        sx={{
          width: '40px',
          aspectRatio: '1',
          color: 'purple',
          "&:hover": {
            // border: '1px solid purple',
          },
          "& .MuiSvgIcon-root": {
            fontSize: '20px',
            color: 'purple'
          },
          // checked
          '&.Mui-checked': {
            color: 'purple ',
          },
        }}
      />
      <Checkbox
        aria-label='checkbox'
        defaultChecked
        sx={{
          width: '40px',
          aspectRatio: '1',
          color: 'black',
          "&:hover": {
            // border: '1px solid black',
          },
          "& .MuiSvgIcon-root": {
            fontSize: '20px',
            color: 'black'
          },
          // checked
          '&.Mui-checked': {
            color: 'black ',
          },
        }}
      />

    </>
  )
}

export default AppCheckBox
