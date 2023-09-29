import { Box, Typography } from '@mui/material'
import React from 'react'
import { appColor } from '../../AppColor'
import { GoDotFill } from 'react-icons/go'

function AppList({ title, list }: any) {

    return (
        <Box sx={{
            width: '100%', height: '100%', p: '12px', backgroundColor: appColor.button.bg,
            display: 'flex', flexDirection: 'column', gap: '12px', borderRadius: '12px'
        }}>
            {/* header*/}
            <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                <Typography variant='h4'>Notification</Typography>
                <Typography variant='h5' sx={{ color: appColor.primary, cursor: 'pointer' }}>View all</Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                height: '100%',
                '&:hover': {
                    '&::-webkit-scrollbar': {
                        display: 'block'
                    },
                },
                '&::-webkit-scrollbar': {
                    width: "4px",
                    backgroundColor: '#fff',
                    display: 'none'
                },
                '&::-webkit-scrollbar-track': {
                    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                    backgroundColor: '#fff',
                    borderRadius: '10px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: appColor.primary,
                    borderRadius: '10px'
                },
            }}>
                {notifications.map((item: any, index: any) => {
                    let color
                    if (item.status === 'info') color = 'green'
                    if (item.status === 'warning') color = 'yellow'
                    if (item.status === 'error') color = 'red'
                    return (
                        <Typography variant='h6' sx={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', mb: '10px' }}>
                            <Box sx={{ color: color }}>
                                <GoDotFill />
                            </Box>
                            {item.message}
                        </Typography>
                    )
                })}
            </Box>
        </Box >
    )
}

export default AppList


const notifications = [
    {
        id: 1,
        message: "Error: Unable to connect to database server.",
        timestamp: "2023-09-20 09:15:00",
        status: "error",
    },
    {
        id: 2,
        message: "Warning: CPU usage is high (above 90%).",
        timestamp: "2023-09-20 10:30:12",
        status: "warning",
    },
    {
        id: 3,
        message: "Notification: Data synchronization completed successfully.",
        timestamp: "2023-09-21 14:02:45",
        status: "info",
    },
    {
        id: 4,
        message: "Notification: New user registration received.",
        timestamp: "2023-09-21 15:45:30",
        status: "info",
    },
    {
        id: 5,
        message: "Warning: Disk space is running low on server.",
        timestamp: "2023-09-22 08:55:22",
        status: "warning",
    },
    {
        id: 6,
        message: "Error: Critical system error detected.",
        timestamp: "2023-09-22 11:20:18",
        status: "error",
    },
    {
        id: 7,
        message: "Notification: Scheduled backup completed successfully.",
        timestamp: "2023-09-23 09:10:05",
        status: "info",
    },
    {
        id: 8,
        message: "Warning: Network latency is increasing.",
        timestamp: "2023-09-24 13:45:30",
        status: "warning",
    },
    {
        id: 9,
        message: "Error: Database query failed due to syntax error.",
        timestamp: "2023-09-24 15:30:42",
        status: "error",
    },
    {
        id: 10,
        message: "Notification: System update is available. Please schedule maintenance.",
        timestamp: "2023-09-25 10:05:17",
        status: "info",
    },
];