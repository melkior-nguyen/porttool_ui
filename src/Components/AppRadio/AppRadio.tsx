import { Box, Radio } from '@mui/material'
import React from 'react'

function AppRadio() {
  const [selectedValue, setSelectedValue] = React.useState('a');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'size-radio-button-demo',
    inputProps: { 'aria-label': item },
  });
  return (
    <>
      <Box>
        <Radio {...controlProps('a')} sx={{
          color: 'red',
          '& .MuiSvgIcon-root': {
            fontSize: 12,
          },
          '&.Mui-checked': {
            color: 'red',
          },
        }} />
        <Radio {...controlProps('b')} sx={{
          color: 'red',
          '& .MuiSvgIcon-root': {
            fontSize: 20,
          },
          '&.Mui-checked': {
            color: 'red',
          },
        }} />
        <Radio {...controlProps('c')} sx={{
          color: 'red',
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
          '&.Mui-checked': {
            color: 'red',
          },
        }}
        />
      </Box>

      <Box>
        <Radio {...controlProps('d')} sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
        }} />
        <Radio {...controlProps('e')} sx={{
          color: '#ce93d8',
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
          '&.Mui-checked': {
            color: '#ce93d8',
          },
        }} />
        <Radio {...controlProps('f')} sx={{
          color: '#66bb6a',
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
          '&.Mui-checked': {
            color: '#66bb6a',
          },
        }} />
        <Radio {...controlProps('g')} sx={{
          color: '#b8b9ba',
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
          '&.Mui-checked': {
            color: '#b8b9ba',
          },
        }} />
        <Radio {...controlProps('h')} sx={{
          color: 'pink',
          '& .MuiSvgIcon-root': {
            fontSize: 28,
          },
          '&.Mui-checked': {
            color: 'pink',
          },
        }}
        />
      </Box>
    </>
  )
}

export default AppRadio
