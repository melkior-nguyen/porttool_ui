import { Box, IconButton, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import React from 'react'
import appColors from '@/styles/appColor';

function AppSearch() {
    return (
        <Box component='div' sx={{
            p: '3px 10px',
            boxShadow: 'inset 2px 1px 2px 0 #acacac ',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '8px',
            backgroundColor: appColors.bg.main
        }}>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by name"
                inputProps={{ 'aria-label': 'search by name' }}
            />
            <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
                <SearchIcon sx={{ color: appColors.button.primary}} />
            </IconButton>
        </Box>
    )
}

export default AppSearch
