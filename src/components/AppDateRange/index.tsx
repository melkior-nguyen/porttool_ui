import { Box } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function AppDateRange() {
    return (
        <Box sx={{ width: '300px', display: 'flex', alignItems: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{
                    "& fieldset": {
                        border: '2px solid #8100ff',
                        borderRadius: '8px',
                        "&:hover fieldset": {
                            border: '2px solid #8100ff',
                        }
                    },
                    "& .MuiInputBase-root": {
                        height: '41px',
                    }
                }} />
                <Box sx={{ color: '#8100ff' }}>-</Box>
                <DatePicker sx={{
                    "& fieldset": {
                        border: '2px solid #8100ff',
                        borderRadius: '8px',
                        "&:hover fieldset": {
                            border: '2px solid #8100ff',
                        }
                    },
                    "& .MuiInputBase-root": {
                        height: '41px',
                    }
                }} />
            </LocalizationProvider>
        </Box >
    )
}

export default AppDateRange
