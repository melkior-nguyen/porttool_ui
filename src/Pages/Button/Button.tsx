import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import MainContentHeader from '../../Components/MainContentHeader/MainContentHeader'
import { Box, Paper } from '@mui/material'
import { AppText } from '../../AppText'
import OutlineBtn from '../../Components/Button/OutlineBtn'
import FillBtn from '../../Components/Button/FillBtn'
import { GrAddCircle } from 'react-icons/gr'
import { AiFillSetting } from 'react-icons/ai'

function Button() {
    return (
        <AppBox>
            <MainContentHeader>
                Buttons
            </MainContentHeader>
            <Box sx={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <Box component={Paper} sx={{padding: '12px', width: '50%'}}>
                    <span style={{ ...AppText.Sub_Title }}> Outline Button: </span>
                    <Box sx={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
                        <OutlineBtn label='Small' size='small' />
                        <OutlineBtn label='Medium' size='medium' />
                        <OutlineBtn label='Large' size='large' />
                        <OutlineBtn label='create' size='medium' icon={<AiFillSetting />} />
                        <OutlineBtn label='setting' size='large' icon={<AiFillSetting />} />
                    </Box>
                </Box>
                <Box component={Paper} sx={{padding: '12px', width: '50%'}}>
                    <span style={{ ...AppText.Sub_Title }}> Fill Button: </span>
                    <Box sx={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
                        <FillBtn label='Small' size='small' />
                        <FillBtn label='Medium' size='medium' />
                        <FillBtn label='Large' size='large' />
                        <FillBtn label='Medium' size='medium' icon={<AiFillSetting />} />
                        <FillBtn label='Large' size='large' icon={<AiFillSetting />} />
                    </Box>
                </Box>
                <Box component={Paper} sx={{padding: '12px', width: '50%'}}>
                    <span style={{ ...AppText.Sub_Title }}> Text: </span>
                    <Box sx={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
                        <FillBtn label='Small' size='small' />
                    </Box>
                </Box>
            </Box>
        </AppBox>
    )
}

export default Button
