import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import MainContentHeader from '../../Components/MainContentHeader/MainContentHeader'
import { Box, Paper } from '@mui/material'
import { AppText } from '../../AppText'
import OutlineBtn from '../../Components/Button/OutlineBtn'
import FillBtn from '../../Components/Button/FillBtn'
import { IoMdAdd } from 'react-icons/io'
import { AiFillSetting, AiOutlineDelete } from 'react-icons/ai'
import TextBtn from '../../Components/Button/TextBtn'
import { MdOutlineCreate, MdOutlineNotificationsActive } from 'react-icons/md'
import { AppColors } from '../../AppColor'

function Button() {
    return (
        <AppBox>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <Box component={Paper} sx={{ padding: '12px', width: '50%' }}>
                    <span style={{ ...AppText.Sub_Title }}> Text Button: </span>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <TextBtn size='small' label='Add' />
                        <TextBtn size='medium' label='Add Farm' icon={<IoMdAdd />} />
                        <TextBtn size='medium' label='Active' icon={<MdOutlineNotificationsActive color='#66bb6a' />} />
                        <TextBtn size='large' label='Create Monitor' icon={<MdOutlineCreate color='#29b6f6' />} />
                        <TextBtn size='large' label='Remove Farm' icon={<AiOutlineDelete color='#f44336' />} />
                    </Box>
                </Box>
                <Box component={Paper} sx={{ padding: '12px', width: '50%' }}>
                    <span style={{ ...AppText.Sub_Title }}> Outline Button: </span>
                    <Box sx={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
                        <OutlineBtn label='Small' size='small' />
                        <OutlineBtn label='Medium' size='medium' />
                        <OutlineBtn label='create' size='medium' icon={<AiFillSetting />} />
                        <OutlineBtn label='Large' size='large' />
                        <OutlineBtn label='setting' size='large' icon={<AiFillSetting />} />
                    </Box>
                </Box>
                <Box component={Paper} sx={{ padding: '12px', width: '50%' }}>
                    <span style={{ ...AppText.Sub_Title }}> Fill Button: </span>
                    <Box sx={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
                        <FillBtn label='Small' size='small' />
                        <FillBtn label='Medium' size='medium' />
                        <FillBtn label='Medium' size='medium' icon={<AiFillSetting />} />
                        <FillBtn label='Large' size='large' />
                        <FillBtn label='Large' size='large' icon={<AiFillSetting />} />
                    </Box>
                </Box>
            </Box>
        </AppBox>
    )
}

export default Button
