import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import { Box, Paper } from '@mui/material'
import { AppText } from '../../AppText'
import Dropdown1 from '../../Components/Dropdown/Dropdown1'
import Dropdown2 from '../../Components/Dropdown/Dropdown2'
import Dropdown3 from '../../Components/Dropdown/Dropdown3'

function Dropdown() {
  const data1 = ['None', 'Viet Nam', 'England', 'Singapore', 'China', 'Canada', "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla"]
  const data2 = ['Viet Nam', 'England', 'Singapore', 'China', 'Canada', "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla"]

  return (
    <AppBox>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <Box component={Paper} sx={{ padding: '12px', width: 'max-content' }}>
          <span style={{ ...AppText.Sub_Title }}> Dropdown 1: </span>
          <Box sx={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', width: '300px' }}>
            <Dropdown1 label='Country' data={data2}/>
          </Box>
        </Box>
        <Box component={Paper} sx={{ padding: '12px', width: 'max-content' }}>
          <span style={{ ...AppText.Sub_Title }}> Dropdown 2: </span>
          <Box sx={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', width: '300px' }}>
            <Dropdown2 label='Country' data={data1}/>
          </Box>
        </Box>
        <Box component={Paper} sx={{ padding: '12px', width: 'max-content' }}>
          <span style={{ ...AppText.Sub_Title }}> Dropdown 3: </span>
          <Box sx={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', width: '300px' }}>
            <Dropdown3 label='Country' data={data1}/>
          </Box>
        </Box>
      </Box>
    </AppBox>
  )
}

export default Dropdown
