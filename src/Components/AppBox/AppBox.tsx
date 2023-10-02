import { Box } from '@mui/material'
import React from 'react'
import { AppColors } from '../../AppColor'

function AppBox({ children }: any) {
    return (
        <Box sx={{
            width: '100%',
            padding: '2.4rem 2.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.2rem',
            marginLeft: '256px',
            marginTop: '60px',
            background: AppColors.main.background
        }}>
            {children}
        </Box >
    )
}

export default AppBox

