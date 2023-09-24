import React from 'react'
import { Box, Button } from '@mui/material'
import AppBox from '../../Components/AppBox/AppBox'
import OutlineBtn from '../../Components/Button/OutlineBtn'
import FillBtn from '../../Components/Button/FillBtn'
import AppTextInput from '../../Components/AppTextField/AppTextField'
import AppTextField from '../../Components/AppTextField/AppTextField'
import AppTextField2 from '../../Components/AppTextField/AppTextField2'
import Search1 from '../../Components/Search/Search1'
import { AiFillSetting } from 'react-icons/ai'
import Search2 from '../../Components/Search/Search2'
import Dropdown1 from '../../Components/Dropdown/Dropdown1'
import Dropdown2 from '../../Components/Dropdown/Dropdown2'
import Dropdown3 from '../../Components/Dropdown/Dropdown3'


function General() {
    const data1 = ['None', 'Viet Nam', 'England', 'Singapore', 'China', 'Canada', "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla"]
    const data2 = ['Viet Nam', 'England', 'Singapore', 'China', 'Canada', "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla"]

    return (
        <AppBox >
            {/* Button */}
            <h1 style={{ color: 'green', fontSize: '16px' }}>Button</h1>
            <Box sx={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-end' }}>
                <OutlineBtn size='small' label='click' icon={<AiFillSetting />} />
                <OutlineBtn size='medium' label='create' icon={<AiFillSetting />} />
                <OutlineBtn size='large' label='setting' icon={<AiFillSetting />} />
                <FillBtn size='small' label='click' icon={<AiFillSetting />} />
                <FillBtn size='medium' label='create' icon={<AiFillSetting />} />
                <FillBtn size='large' label='setting' icon={<AiFillSetting />} />
            </Box>

            {/* Input Field */}
            <h1 style={{ color: 'green', fontSize: '16px' }}>Input Field</h1>
            <Box sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
            }}>
                <Box sx={{
                    width: '50%',
                    display: 'flex',
                    padding: '24px',
                    border: '1px solid #acacac40',
                    borderRadius: '8px'
                }}>
                    <AppTextField />
                </Box>
                <Box sx={{
                    width: '50%',
                    display: 'flex',
                    padding: '24px',
                    border: '1px solid #acacac40',
                    borderRadius: '8px'
                }}>
                    <AppTextField2 />
                </Box>
            </Box>

            {/* Search & dropdown */}
            <h1 style={{ color: 'green', fontSize: '16px' }}>Search & Dropdown</h1>
            <Box sx={{
                display: 'flex',
                gap: '12px'
            }}>
                {/* search */}
                <Box sx={{
                    backgroundColor: '#fff',
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    padding: '24px',
                    border: '1px solid #acacac40',
                    borderRadius: '8px'
                }}>
                    <Search1 />
                    <Search2 />
                </Box>

                {/* dropdown */}
                <Box sx={{
                    backgroundColor: '#fff',
                    width: '50%',
                    display: 'flex',
                    gap: '12px',
                    padding: '24px',
                    border: '1px solid #acacac40',
                    borderRadius: '8px'
                }}>
                    <Dropdown2 label='Country' data={data1} />
                    <Dropdown1 label='Select Country' data={data2} />
                    <Dropdown3 label='Select Country' data={data1} />
                </Box>
            </Box>
        </AppBox>
    )
}

export default General