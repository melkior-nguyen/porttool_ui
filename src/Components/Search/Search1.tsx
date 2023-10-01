import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { AppColors, appColor } from '../../AppColor'
import { Box } from '@mui/material'
import FillBtn from '../Button/FillBtn'
import IconWrapper from '../IconWrapper/IconWrapper'
import { AppText } from '../../AppText'

function Search1() {
    return (
        <Box sx={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            border: `1px solid ${AppColors.sidebar.text}`,
            borderRadius: '20px',
            p: '5px 10px',
            gap: '10px'
        }}>
            <Box sx={{ width: '20px' }}>
                <IconWrapper widthIcon='20px' iconColor={AppColors.main.primary}>
                    <FiSearch />
                </IconWrapper>
            </Box>
            <input type="text" className='block w-full text-xl text-gray-900 outline-none'
                placeholder='Search...' style={{ color: AppText.Body_Text.color }} />
        </Box>
    )
}

export default Search1