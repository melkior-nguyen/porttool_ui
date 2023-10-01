import { Box, Radio } from '@mui/material'
import React from 'react'
import { AppColors } from '../../AppColor';

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
      <Radio {...controlProps('e')} sx={{
        color: AppColors.main.info,
        '& .MuiSvgIcon-root': {
          fontSize: 28,
        },
        '&.Mui-checked': {
          color: AppColors.main.info,
        },
      }} />
      <Radio {...controlProps('f')} sx={{
        color: AppColors.main.info,
        '& .MuiSvgIcon-root': {
          fontSize: 28,
        },
        '&.Mui-checked': {
          color: AppColors.main.info,
        },
      }} />
      <Radio {...controlProps('g')} sx={{
        color: AppColors.main.info,
        '& .MuiSvgIcon-root': {
          fontSize: 28,
        },
        '&.Mui-checked': {
          color: AppColors.main.info,
        },
      }} />
      <Radio {...controlProps('h')} sx={{
        color: AppColors.main.info,
        '& .MuiSvgIcon-root': {
          fontSize: 28,
        },
        '&.Mui-checked': {
          color: AppColors.main.info,
        },
      }}
      />
    </>
  )
}

export default AppRadio
