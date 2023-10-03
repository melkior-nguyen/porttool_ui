import React from 'react'
import './apploader.css'
import AppBox from '../AppBox/AppBox'
import { Box } from '@mui/material'

function AppLoader() {
    return (
        <AppBox>
            <Box sx={{
                width: '100%', height: '100%',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </Box>
        </AppBox>
    )
}

export default AppLoader
