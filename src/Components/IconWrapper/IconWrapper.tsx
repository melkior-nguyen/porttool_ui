import React from 'react'
import { Box } from '@mui/material'


function IconWrapper({ widthicon, colorIcon, children }: any) {
    return (
        <Box sx={{
            width: widthicon, aspectRatio: '1', "& svg": {
                width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', color: colorIcon
            }
        }}>
            {children}
        </Box>
    )
}

export default IconWrapper
