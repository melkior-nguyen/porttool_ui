import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import MainContentHeader from '../../Components/MainContentHeader/MainContentHeader'
import { Box, Grid, Paper, styled } from '@mui/material'
import { AppText } from '../../AppText'
import { AppColors } from '../../AppColor'

const Item = styled(Paper)(() => ({
    padding: '0 12px',
    minHeight: '100px',
    width: '100%',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
}));

function Color() {
    return (
        <AppBox>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                {/* ----- */}
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Primary: {AppColors.main.primary}</Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Primary:hover {AppColors.main.primary_hover}</Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Secondary: {AppColors.main.secondary}</Box>
                    </Grid>

                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppColors.main.primary }}></Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppColors.main.primary_hover }}></Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppColors.main.secondary }}></Item>
                    </Grid>
                </Grid>

                {/* ----- */}
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Text1: {AppText.List_Title.color}</Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Text2/Border: {AppText.Body_Text.color}</Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Main Background: {AppColors.text.white}</Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Sidebar Background: {AppColors.sidebar.background}</Box>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppText.List_Title.color }}></Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppText.Body_Text.color }}></Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppColors.text.white }}></Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppColors.sidebar.background }}></Item>
                    </Grid>
                </Grid>
                <br /><br /><br /><br /><br />

                {/* ----- */}
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Info: {AppColors.main.info}</Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Success: {AppColors.main.success}</Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Warning: {AppColors.main.warning}</Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Error: {AppColors.main.error}</Box>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppColors.main.info }}></Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppColors.main.success }}></Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppColors.main.warning }}></Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ backgroundColor: AppColors.main.error }}></Item>
                    </Grid>
                </Grid>
            </Box>
        </AppBox>
    )
}

export default Color
