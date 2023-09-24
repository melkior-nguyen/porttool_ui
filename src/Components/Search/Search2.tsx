import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { appColor } from '../../AppColor'
import { Box } from '@mui/material'
import FillBtn from '../Button/FillBtn'
import Dropdown3 from '../Dropdown/Dropdown3'

function Search2() {
    const data = ['None', 'Typescript', 'NextJs', 'Javascript']
    return (
        <Box sx={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: appColor.input.bg,
            border: `1px solid ${appColor.sidebar.border}`,
            borderRadius: '6px',
            pr: '10px'
        }}>
            <Box sx={{ minWidth: '120px' }}>
                <Dropdown3 label='Language' data={data} style={{ backgroundColor: 'red' }} />
            </Box>
            <input type="text" className='block w-full p-4 text-xl text-gray-900 outline-none' />
            <FillBtn size='small' label='search' />
        </Box>
    )
}

export default Search2
