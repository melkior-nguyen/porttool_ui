import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import { Box, Paper } from '@mui/material'
import { AppText } from '../../AppText'
import AppCheckBox from '../../Components/AppCheckBox/AppCheckBox'
import { AppColors } from '../../AppColor'
import AppRadio from '../../Components/AppRadio/AppRadio'
import { Radio } from '@mui/material'
import AppToggle from '../../Components/AppToggle/AppToggle'

function index() {
    return (
        <AppBox>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: '20px'
            }}>
                <Box component={Paper} sx={{ padding: '12px', width: 'max-content' }}>
                    <span style={{ ...AppText.Sub_Title }}> Checkbox: </span>
                    <Box sx={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', width: '500px' }}>
                        <span style={{ ...AppText.List_Title }}> Actived: </span>
                        <AppCheckBox color={AppColors.main.primary} width='30px' />
                        <AppCheckBox color={AppColors.main.info} width='30px' />
                        <AppCheckBox color={AppColors.main.success} width='30px' />
                        <AppCheckBox color={AppColors.main.warning} width='30px' />
                        <AppCheckBox color={AppColors.main.error} width='30px' />
                    </Box>
                    <Box sx={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px', width: '500px' }}>
                        <span style={{ ...AppText.List_Title }}> Disabled: </span>
                        <AppCheckBox color={AppColors.main.error} width='30px' isDisabled={true} />
                    </Box>
                </Box>
                <Box component={Paper} sx={{ padding: '12px', width: 'max-content' }}>
                    <span style={{ ...AppText.Sub_Title }}> Toggle: </span>
                    <Box sx={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', rowGap: '10px', width: '500px' }}>
                        <AppToggle label='label' labelColor={AppColors.main.primary} toggleColor={AppColors.main.primary} />
                        <AppToggle label='label' labelColor={AppColors.main.info} toggleColor={AppColors.main.info} />
                        <AppToggle label='label' labelColor={AppColors.main.success} toggleColor={AppColors.main.success} />
                        <AppToggle label='label' labelColor={AppColors.main.warning} toggleColor={AppColors.main.warning} />
                        <AppToggle label='label' labelColor={AppColors.main.error} toggleColor={AppColors.main.error} />
                    </Box>
                </Box>
                <Box component={Paper} sx={{ padding: '12px', width: 'max-content' }}>
                    <span style={{ ...AppText.Sub_Title }}> Radio: </span>
                    <Box sx={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', width: '500px' }}>
                        <span style={{ ...AppText.List_Title }}> Actived: </span>
                        <AppRadio />
                    </Box>
                    <Box sx={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', width: '500px' }}>
                        <span style={{ ...AppText.List_Title }}> Disabled: </span>
                        <Radio disabled sx={{
                            color: 'gray',
                            '& .MuiSvgIcon-root': {
                                fontSize: 28,
                            },
                            '&.Mui-checked': {
                                color: 'gray',
                            },
                        }} />
                    </Box>
                </Box>
            </Box>
        </AppBox>
    )
}

export default index
