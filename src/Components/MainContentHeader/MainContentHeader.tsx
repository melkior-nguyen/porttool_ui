import React from 'react'
import { Typography } from '@mui/material'
import { AppColors } from '../../AppColor'

function MainContentHeader({ children }: any) {
    return (
        <Typography sx={{
            fontSize: '24px',
            lineHeight: '36px',
            fontWeight: '700',
            color: AppColors.main.primary,
            marginBottom: '16px'
        }}>
            {children}
        </Typography>
    )
}

export default MainContentHeader
