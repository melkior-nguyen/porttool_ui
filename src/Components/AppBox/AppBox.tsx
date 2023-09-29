import { Box } from '@mui/material'
import React from 'react'

function AppBox({ children }: any) {
    return (
        <Box sx={{
            width: '100%',
            border: '1px solid #acacac40',
            padding: '6rem 2.4rem 2.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            marginLeft: '256px',
            marginTop: '60px',
        }}>
            {children}
        </Box >
    )
}

export default AppBox

