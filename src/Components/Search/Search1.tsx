import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { appColor } from '../../AppColor'
import { Box } from '@mui/material'
import FillBtn from '../Button/FillBtn'

function Search1() {
    return (
        <Box sx={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: appColor.input.bg,
            border: `1px solid ${appColor.sidebar.border}`,
            borderRadius: '6px',
            px: '10px'
        }}>
            <Box>
                <FiSearch style={{ color: appColor.text.main, fontSize: '14px' }} />
            </Box>
            <input type="text" className='block w-full p-4 text-xl text-gray-900 outline-none' />
            <FillBtn size='small' label='search' />
        </Box>
    )
}

export default Search1