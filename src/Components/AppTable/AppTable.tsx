import { Box } from '@mui/material'
import React from 'react'
import { appColor } from '../../AppColor'
import AppTableHeader from './AppTableHeader'
import AppTableBody from './AppTableBody'

function AppTable() {
    return (
        <Box sx={{
            width: '100%',
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            border: `1px solid ${appColor.sidebar.border}`,
            overflow: 'hidden'
        }}>
            {/* header */}
            <AppTableHeader />
            <AppTableBody tableTitle={tableTitle} tableData={tableData} />

        </Box>
    )
}

export default AppTable

const tableTitle: string[] = ['Name', 'Type', 'Host', 'Status', 'Last time', 'Action']
const tableData: any = [
    {
        name: 'Product',
        type: 'IP:01',
        host: 'w:110',
        status: 'Active',
        last_time: '12:25 23/09/2023',
        action: 'Edit',
    },
    {
        name: 'Product',
        type: 'IP:01',
        host: 'w:110',
        status: 'Active',
        last_time: '12:25 23/09/2023',
        action: 'Edit',
    },
    {
        name: 'Product',
        type: 'IP:01',
        host: 'w:110',
        status: 'Active',
        last_time: '12:25 23/09/2023',
        action: 'Edit',
    },
    {
        name: 'Product',
        type: 'IP:01',
        host: 'w:110',
        status: 'Active',
        last_time: '12:25 23/09/2023',
        action: 'Edit',
    },
    {
        name: 'Product',
        type: 'IP:01',
        host: 'w:110',
        status: 'Active',
        last_time: '12:25 23/09/2023',
        action: 'Edit',
    },
    {
        name: 'Product',
        type: 'IP:01',
        host: 'w:110',
        status: 'Active',
        last_time: '12:25 23/09/2023',
        action: 'Edit',
    },
]