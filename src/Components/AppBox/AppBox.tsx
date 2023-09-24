import { Box } from '@mui/material'
import React from 'react'

function AppBox({ children }: any) {
    return (
        <Box sx={{
            border: '1px solid #acacac40',
            padding: '2.4rem',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem'
        }}>
            {children}
        </Box >
    )
}

export default AppBox

