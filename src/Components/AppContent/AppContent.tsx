import { Box } from '@mui/material'
import React from 'react'
import { appColor } from '../../AppColor'
import AppContentHeader from './AppContentHeader'
import AppContentBody from './AppContentBody'

function AppContent() {
    return (
        <Box sx={{
            width: '100%',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            border: `1px solid ${appColor.sidebar.border}`,
            overflow: 'hidden'
        }}>
            {/* header */}
            <AppContentHeader />
            <AppContentBody />

        </Box>
    )
}

export default AppContent
