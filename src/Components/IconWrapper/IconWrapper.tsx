import React from 'react'
import { Box } from '@mui/material'


function IconWrapper({ widthIcon, iconColor, children }: any) {
    return (
        <Box sx={{
            width: widthIcon, aspectRatio: '1', position: 'relative',
            "& svg": {
                width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', color: iconColor,
                cursor: 'pointer',
            }
        }}>
            {children}
        </Box>
    )
}

export default IconWrapper
