import { Box, Typography } from '@mui/material'
import React from 'react'
import AppLineChart from './AppLineChart'
import AppBarChart from './AppBarChart'
import Dropdown2 from '../Dropdown/Dropdown2'
import AppStackedBarChart from './AppStackedBarChart'
import AppDoughnutChart from './AppDoughnutChart'
import AppPieChart from './AppPieChart'

function AppCharts() {
    return (
        <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '24px',
        }}>
            <Box sx={{
                border: '1px solid #acacac40',
                width: 'calc(50% - 12px)',
                aspectRatio: '2',
                borderRadius: '8px',
                padding: '12px',
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className='text-2xl font-extrabold uppercase text-cyan-900'>Line Chart Demo</span>
                    <Box sx={{ width: '100px' }}>
                        <Dropdown2 label={'Week'} data={['Date', 'Week', 'Month']} />
                    </Box>
                </Box>
                <AppLineChart />
            </Box>
            <Box sx={{
                border: '1px solid #acacac40',
                width: 'calc(50% - 12px)',
                aspectRatio: '2',
                borderRadius: '8px',
                padding: '12px'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className='text-2xl font-extrabold uppercase text-cyan-900'>Total Request</span>
                    <Box sx={{ width: '100px' }}>
                        <Dropdown2 label={'Week'} data={['Date', 'Week', 'Month']} />
                    </Box>
                </Box>
                <AppBarChart />
            </Box>
            <Box sx={{
                border: '1px solid #acacac40',
                width: 'calc(50% - 12px)',
                aspectRatio: '2',
                borderRadius: '8px',
                padding: '12px'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className='text-2xl font-extrabold uppercase text-cyan-900'>Staced Bar Chart</span>
                    <Box sx={{ width: '100px' }}>
                        <Dropdown2 label={'Week'} data={['Date', 'Week', 'Month']} />
                    </Box>
                </Box>
                <AppStackedBarChart />
            </Box>
            <Box sx={{
                border: '1px solid #acacac40',
                width: 'calc(50% - 12px)',
                aspectRatio: '2',
                borderRadius: '8px',
                padding: '12px'
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className='text-2xl font-extrabold uppercase text-cyan-900'>Pie & Doughnut Chart</span>
                    <Box sx={{ width: '100px' }}>
                        <Dropdown2 label={'Week'} data={['Date', 'Week', 'Month']} />
                    </Box>
                </Box>
                <Box sx={{ width: '100%', display: 'flex' }}>
                    <Box sx={{ width: '50%' }}>
                        <AppDoughnutChart />
                    </Box>
                    <Box sx={{ width: '50%' }}>
                        <AppPieChart />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default AppCharts
