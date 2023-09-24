import { Box } from '@mui/material'
import React from 'react'
import { appColor } from '../../AppColor'
import { AiOutlinePlusCircle } from 'react-icons/ai'

function AppContentHeader() {
    return (
        <Box sx={{
            backgroundColor: appColor.sidebar.bg,
            padding: '12px',
            display: 'flex',
            mb: '12px'
        }}>
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
                fontWeight: '800',
                textTransform: 'uppercase',
                color: appColor.text.main
            }}>
                Log & Alerts
            </Box>
            <Box sx={{
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
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
                    color: appColor.text.main,
                    fontSize: '12px'
                }}>
                    <AiOutlinePlusCircle style={{ fontSize: '20px' }} />
                    <span>Create Monitor</span>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: appColor.text.main,
                    fontSize: '12px'
                }}>
                    <AiOutlinePlusCircle style={{ fontSize: '20px' }} />
                    <span>Create Monitor</span>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: appColor.text.main,
                    fontSize: '12px'
                }}>
                    <AiOutlinePlusCircle style={{ fontSize: '20px' }} />
                    <span>Create Monitor</span>
                </Box>
            </Box>
        </Box>
    )
}

export default AppContentHeader
