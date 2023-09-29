import { Box } from '@mui/material'
import React from 'react'
import { appColor } from '../../AppColor'
import { AiOutlineDelete, AiOutlineEdit, AiOutlinePlusCircle } from 'react-icons/ai'
import Search1 from '../Search/Search1'
import AppIcon from '../AppIcon/AppIcon'
import { BsFilterLeft } from 'react-icons/bs'

function AppTableHeader() {
    return (
        <Box sx={{
            backgroundColor: appColor.sidebar.bg,
            padding: '12px',
            display: 'flex',
        }}>
            {/* table name */}
            <Box sx={{
                width: '160px',
                backgroundColor: appColor.main.bg,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px 10px',
                borderRadius: '8px',
                border: `1px solid ${appColor.sidebar.border}`,
                fontSize: '16px',
                fontWeight: '600',
                textTransform: 'uppercase',
                color: appColor.primary
            }}>
                project 01
            </Box>
            {/* table engine */}
            <Box sx={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{ width: '300px' }}>
                    <Search1 />
                </Box>
                <AppIcon icon={<BsFilterLeft />} color={appColor.button.primary} border='transparent' />
            </Box>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '12px'
            }}>
                {/* icon description */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: appColor.text.black,
                    fontSize: '12px'
                }}>
                    <AiOutlinePlusCircle style={{ fontSize: '20px', color: 'green' }} />
                    <span>Create Monitor</span>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: appColor.text.black,
                    fontSize: '12px'
                }}>
                    <AiOutlineEdit style={{ fontSize: '20px', color: 'blue' }} />
                    <span>Edit farm</span>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: appColor.text.black,
                    fontSize: '12px'
                }}>
                    <AiOutlineDelete style={{ fontSize: '20px', color: 'red' }} />
                    <span>Delete farm</span>
                </Box>
            </Box>
        </Box>
    )
}

export default AppTableHeader
