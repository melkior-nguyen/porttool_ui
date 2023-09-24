import React, { useState } from 'react'
import AppGridContainer from "@/components/AppGridContainer";
import GeneralStats from "./GeneralStats";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { academyData, data } from "./dashboardData";
import DashboardChart from './DashboardChart';
import { Box, } from '@mui/material';
import appColors from '@/styles/appColor';

function DashboardLeft() {
    const timeData = [
        {
            "name": 'Mon',
            "Request time": 4000,
            "Response time": 2400,
        },
        {
            "name": 'Tue',
            "Request time": 3000,
            "Response time": 1398,
        },
        {
            "name": 'Wed',
            "Request time": 2000,
            "Response time": 9800,
        },
        {
            "name": 'Thu',
            "Request time": 2780,
            "Response time": 3908,
        },
        {
            "name": 'Fri',
            "Request time": 1890,
            "Response time": 4800,
        },
        {
            "name": 'Sat',
            "Request time": 2390,
            "Response time": 3800,
        },
        {
            "name": 'Sun',
            "Request time": 3490,
            "Response time": 4300,
        }
    ]
    return (
        <Box sx={{
            flex: '3',
            width: '75%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* dashboard Panel */}
            <Box
                sx={{
                    marginBottom: 'auto'
                }}
            >
                <Box sx={{ display: 'flex', gap: '12px' }}>
                    {academyData.academicStats.map((item: any, index: number) => (
                        <Box key={index} sx={{
                            flex: '1',
                            padding: '0px !important',
                            aspectRatio: '1.8',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            boxShadow: `1px 1px 4px 0 #fff`
                        }}>
                            <GeneralStats stats={item} />
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Chart */}
            <DashboardChart />

            {/* other */}
            <Box sx={{
                width: '100%',
                height: '200px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                p: '12px'
            }}>
                {/* <ResponsiveContainer width='100%%' height='100%' >
                    <LineChart data={timeData} style={{ border: '1px solid #333' }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Response time" stroke="#8884d8" />
                        <Line type="monotone" dataKey="Request time" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer> */}
                <Box>
                    <h4 className='uppercase font-bold text-sm mb-2' style={{ color: appColors.text.primary }}>
                        Time per week
                    </h4>
                </Box>
                <ResponsiveContainer width="100%" height='90%' >
                    <LineChart data={timeData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Response time" stroke="#8884d8" />
                        <Line type="monotone" dataKey="Request time" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    )
}

export default DashboardLeft
