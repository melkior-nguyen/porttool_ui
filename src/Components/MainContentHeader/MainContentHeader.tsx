import React from 'react'
import { Typography } from '@mui/material'
import { AppColors } from '../../AppColor'
import { AppText } from '../../AppText'

function MainContentHeader({ children }: any) {
    return (
        <Typography sx={{ ...AppText.Main_Title}}>
            {children}
        </Typography>
    )
}

export default MainContentHeader
