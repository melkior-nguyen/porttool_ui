import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import { Box } from '@mui/material'
import AppTextField from '../../Components/AppTextField/AppTextField'
import AppTextField2 from '../../Components/AppTextField/AppTextField2'
import { AppColors } from '../../AppColor'

function index() {
    return (
        <AppBox>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }}>
                <Box sx={{
                    width: '60%',
                    display: 'flex',
                    padding: '24px',
                    border: '1px solid #acacac40',
                    borderRadius: '8px',
                }}>
                    <AppTextField />
                </Box>
                <Box sx={{
                    width: '60%',
                    display: 'flex',
                    padding: '24px',
                    border: '1px solid #acacac40',
                    borderRadius: '8px',
                }}>
                    <AppTextField2 />
                </Box>
            </Box>
        </AppBox>
    )
}

export default index
