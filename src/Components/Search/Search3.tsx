import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { AppColors, AppShadow, appColor } from '../../AppColor'
import { Box } from '@mui/material'
import FillBtn from '../Button/FillBtn'
import Dropdown2 from '../Dropdown/Dropdown2'
import { AppText } from '../../AppText'
import IconWrapper from '../IconWrapper/IconWrapper'
import Dropdown4 from '../Dropdown/Dropdown4'

function Search3() {
    const data = ['None', 'Typescript', 'NextJs', 'Javascript']
    return (
        <Box sx={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: AppColors.text.white,
            border: `1px solid ${AppColors.sidebar.text}`,
            borderRadius: '20px',
            padding: '10px 20px 10px 10px',
            gap: '10px'
        }}>
            <Box sx={{ width: '150px' }}>
                <Dropdown4 label='Language' data={data} sx={{ border: 'none' }} />
            </Box>
            <input type="text" className='block w-full text-xl text-gray-900 outline-none'
                placeholder='Search...' style={{ color: AppText.Body_Text.color }} />
            <Box sx={{ width: '20px' }}>
                <IconWrapper widthIcon='20px' iconColor={AppColors.main.primary}>
                    <FiSearch />
                </IconWrapper>
            </Box>
        </Box>
    )
}

export default Search3
