import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import { Box, Paper } from '@mui/material'
import { AppText } from '../../AppText'
import Search1 from '../../Components/Search/Search1'
import Search2 from '../../Components/Search/Search2'
import Search3 from '../../Components/Search/Search3'

function Search() {
    return (
        <AppBox>
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <Box component={Paper} sx={{ padding: '12px', width: 'max-content' }}>
                    <span style={{ ...AppText.Sub_Title }}> Search 1: </span>
                    <Box sx={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', width: '500px' }}>
                        <Search1 />
                    </Box>
                </Box>
                <Box component={Paper} sx={{ padding: '12px', width: 'max-content' }}>
                    <span style={{ ...AppText.Sub_Title }}> Search 2: </span>
                    <Box sx={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', width: '500px' }}>
                        <Search2 />
                    </Box>
                </Box>
                <Box component={Paper} sx={{ padding: '12px', width: 'max-content' }}>
                    <span style={{ ...AppText.Sub_Title }}> Search 3: </span>
                    <Box sx={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', width: '500px' }}>
                        <Search3 />
                    </Box>
                </Box>
            </Box>
        </AppBox>
    )
}

export default Search
