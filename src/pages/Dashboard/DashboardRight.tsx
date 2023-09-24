import appColors from '@/styles/appColor'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { AiOutlineMenuFold } from 'react-icons/ai';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'


function DashboardRight() {
    function createData(
        name: string,
        calories: string,
        fat: string,
    ) {
        return { name, calories, fat };
    }

    const rows = [
        createData('Monitor AP-01', '12/09/2023', '06:21'),
        createData('Watch W12', '20/09/2023', '21:01'),
    ];

    const chatData: any = [
        {
            name: "Email",
            value: 400,
            color: '#c7ff66'
        },
        {
            name: "Sms",
            value: 300,
            color: '#96ff66'
        },
        {
            name: "Zalo",
            value: 200,
            color: '#66ffc0'
        },
        {
            name: "Telegram",
            value: 278,
            color: '#66f3ff'
        },
        {
            name: "Message",
            value: 189,
            color: '#66a1ff'
        }
    ]
    return (
        <Box sx={{
            width: '20%',
            flex: '1',
            borderRadius: '12px',
            backgroundColor: '#fff',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        }}>
            {/* general */}
            <Box sx={{ width: '100%', height: '20%', mb: '36px' }}>
                <h4 className='uppercase font-bold text-sm mb-2' style={{ color: appColors.text.primary }}>
                    General
                </h4>
                <ResponsiveContainer width='100%' height='100%'>
                    <PieChart >
                        <Pie data={chatData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={40} innerRadius={20} paddingAngle={5}>
                            {chatData.map((item: any, index: any) => {
                                return <Cell key={index} fill={item.color} />
                            })}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Box>

            <Box sx={{
                marginTop: '0px',
                backgroundColor: appColors.bg,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '8px',
                width: '100%'
            }}>
                <Box sx={{ display: 'flex' }}>
                    <p style={{ flex: '1', color: appColors.text.black, fontSize: '14px' }}>Status : </p>
                    <p style={{ width: '30%', textAlign: 'start', color: appColors.text.primary }}>Good</p>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <p style={{ flex: '1', color: appColors.text.black, fontSize: '14px' }}>Total Response Time : </p>
                    <p style={{ width: '30%', textAlign: 'start', }}>21:12</p>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <p style={{ flex: '1', color: appColors.text.black, fontSize: '14px' }}>Total Request Time : </p>
                    <p style={{ width: '30%', textAlign: 'start', }}>09:12</p>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <p style={{ flex: '1', color: appColors.text.black, fontSize: '14px' }}>Total message : </p>
                    <p style={{ width: '30%', textAlign: 'start' }}>56</p>
                </Box>
            </Box>

            <Box sx={{ width: '100%', height: '25%', marginTop: '24px' }}>
                <h4 className='uppercase font-bold text-sm mb-2' style={{ color: appColors.text.primary, marginBottom: '12px' }}>
                    Top sold out product
                </h4>
                <TableContainer component={Paper}>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '12px' }}>Product</TableCell>
                                <TableCell align="right" sx={{ fontSize: '12px' }}>Date</TableCell>
                                <TableCell align="right" sx={{ fontSize: '12px' }}>Time </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{
                    marginTop: '12px',
                    backgroundColor: appColors.bg.box,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '12px',
                    borderRadius: '8px'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: appColors.text.black }}>
                        Notification
                        <AiOutlineMenuFold style={{ marginLeft: 'auto' }} />
                    </Box>
                    <TextField sx={{ backgroundColor: '#fff', border: 'none' }}>
                    </TextField>
                </Box>

            </Box>
        </Box>
    )
}

export default DashboardRight

{/* <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DateCalendar sx={{
                    flex: '1',
                    width: '100%',
                    backgroundColor: appColors.bg.box,
                    borderRadius: '12px'
                }} />
            </LocalizationProvider>
            <Box sx={{
                marginTop: '12px',
                backgroundColor: appColors.bg.box,
                display: 'flex',
                flexDirection: 'column',
                padding: '12px',
                borderRadius: '8px'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: appColors.button.primary }}>
                    Notification
                    <AiOutlineMenuFold style={{ marginLeft: 'auto' }} />
                </Box>
                <TextField sx={{ backgroundColor: '#fff', border: 'none' }}>
                </TextField>
            </Box>
            <Box sx={{
                marginTop: '12px',
                backgroundColor: appColors.bg.box,
                display: 'flex',
                flexDirection: 'column',
                padding: '12px',
                borderRadius: '8px'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: appColors.button.primary }}>
                    Notification
                    <AiOutlineMenuFold style={{ marginLeft: 'auto' }} />
                </Box>
                <TextField sx={{ backgroundColor: '#fff', border: 'none' }}>
                </TextField>
            </Box> */}