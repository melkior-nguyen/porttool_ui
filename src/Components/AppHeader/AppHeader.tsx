import React from 'react'
import { Box } from '@mui/material'
import { AiOutlineBell } from 'react-icons/ai'
import IconWrapper from '../IconWrapper/IconWrapper'
import { AppColors } from '../../AppColor'
import { Typography } from '@mui/material'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { AppText } from '../../AppText'
import Search1 from '../Search/Search1'


function AppHeader() {
    return (
        <Box sx={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            width: '100%',
            height: '60px',
            pl: 'calc(256px + 36px)',
            backgroundColor: '#fff',
            zIndex: '1',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,0.05)',
            borderBottom: '1px solid #d5d5d5',
            paddingRight: '3.6rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Box sx={{width: '300px'}}>
                <Search1 />
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '6px'
            }}>
                <IconWrapper widthIcon='20px' iconColor={AppColors.main.primary}>
                    <AiOutlineBell />
                </IconWrapper>
                <span style={{ ...AppText.Body_Text, fontSize: '12px' }}>
                    Nguyễn Minh Hiếu
                </span>
                <Box sx={{
                    width: '40px',
                    aspectRatio: '1',
                    borderRadius: '50%',
                    overflow: 'hidden'
                }}>
                    <img src="https://cdn.xxl.thumbs.canstockphoto.com/male-profile-picture-stock-illustration_csp14948665.jpg" alt="" />
                </Box>
                <IconWrapper widthIcon='20px' iconColor={AppColors.main.primary}>
                    <BiDotsVerticalRounded />
                </IconWrapper>
            </Box>
        </Box>
    )
}

export default AppHeader
