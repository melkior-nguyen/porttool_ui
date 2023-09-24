import appColors from '@/styles/appColor'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import React, { useState } from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { data } from './dashboardData';
import { WidthFull } from '@mui/icons-material';

function dashboardChart() {
    const [age, setAge] = useState<string>('Month');
    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const statusData: any = [
        {
            name: 'pass',
            value: 219,
            color: '#69c98a'
        },
        {
            name: 'fail',
            value: 50,
            color: '#dd7b91'
        }
    ]
    return (
        <>
            <Box sx={{
                backgroundColor: '#fff',
                margin: '24px 0',
                padding: '12px',
                width: '100%',
                borderRadius: '12px',
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(0, 0, 0, 0.1)',

            }}>

                {/* Chart header */}
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}>
                    {/* Chart header title */}
                    <Box>
                        <h4 className='uppercase font-bold text-sm mb-2' style={{ color: appColors.text.primary }}>
                            Requests
                        </h4>
                    </Box>

                    {/* Chart header select */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '12px'
                    }}>
                        <span className="text-red-500 text-sm">Select By: </span>
                        <FormControl sx={{
                            minWidth: 100,
                            borderRadius: '8px',
                            "& .MuiFormLabel-root": {
                                display: 'block',
                                backgroundColor: '#fff',
                                color: appColors.text.primary
                            },
                            "& .MuiInputBase-root": {
                                "&:hover, &:focus": {
                                    "& .MuiOutlinedInput-notchedOutline": {
                                        border: `1px solid transparent`,
                                    }
                                }
                            },
                            "& .MuiSelect-select": {
                                p: ' 8px',
                                border: `1px solid ${appColors.button.primary}`,
                            }
                        }}>
                            <InputLabel id="demo-simple-select-autowidth-label">Option</InputLabel>
                            <Select
                                labelId="demo-simple-select-autowidth-label"
                                id="demo-simple-select-autowidth"
                                value={age}
                                onChange={handleChange}
                                autoWidth
                                label="Option"
                            >
                                <MenuItem value={'Week'}>Week</MenuItem>
                                <MenuItem value={'Month'}>Month</MenuItem>
                                <MenuItem value={'Year'}>Year</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {/* Chart Line */}
                <Box sx={{ width: '100%', height: '250px', display: 'flex' }}>
                    <ResponsiveContainer width="70%" height='100%' >
                        <BarChart
                            data={data}
                        >
                            <CartesianGrid
                                strokeDasharray="3 1"
                                horizontal={true}
                                vertical={false}
                            />
                            <XAxis dataKey="month" tick={{ stroke: 'black', strokeWidth: 0.2 }} />
                            <YAxis tick={{ stroke: "red", strokeWidth: 0.2 }} />
                            <Tooltip labelStyle={{ color: "black" }} />
                            <Bar dataKey="fail" fill="#dd7b91" barSize={20} />
                            <Bar dataKey="pass" fill="#69c98a" barSize={20} />
                            <Legend />
                        </BarChart>
                    </ResponsiveContainer>
                    <ResponsiveContainer width='30%' height='100%'>
                        <PieChart >
                            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} >
                                {statusData.map((item: any, index: any) => {
                                    return <Cell key={index} fill={item.color} />
                                })}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </>
    )
}

export default dashboardChart
