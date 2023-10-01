import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import MainContentHeader from '../../Components/MainContentHeader/MainContentHeader'
import { Box, Grid, Paper } from '@mui/material'
import styled from '@emotion/styled';
import { AppColors } from '../../AppColor';
import { AppText } from '../../AppText';
import AppInput from '../../Components/AppInput/AppInput';
import { AiOutlineUser } from 'react-icons/ai';

const Item = styled(Paper)(() => ({
    backgroundColor: '#fff',
    padding: '0 12px',
    minHeight: '80px',
    width: '100%',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
}));


function Typography() {
    return (
        <AppBox>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Box sx={{ ...AppText.Sub_Title }}>Example</Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ ...AppText.Sub_Title }}>Type:</Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box sx={{ ...AppText.Sub_Title }}>Style:</Box>
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ ...AppText.Sub_Title }}>Color:</Box>
                    </Grid>
                </Grid>
                {/* Heading Title */}
                {/* <Grid container spacing={2} >
                    <Grid item xs={5}>
                        <Item >
                            <span style={{ ...AppText.Heading_Title }}>
                                Dashboard
                            </span>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>Heading Title</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Size
                                <p style={{ width: '55%', marginLeft: 'auto' }}>24px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Line Height
                                <p style={{ width: '55%', marginLeft: 'auto' }}>36px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Weight
                                <p style={{ width: '55%', marginLeft: 'auto' }}>700</p>
                            </p>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <Box sx={{ backgroundColor: AppColors.main.primary, width: '40px', aspectRatio: '1', marginRight: '12px' }}></Box>
                            Primary
                        </Item>
                    </Grid>
                </Grid> */}

                {/* main Title */}
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Item >
                            <span style={{ ...AppText.Main_Title }}>
                                Two Factor Authentication
                            </span>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>Main Title</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Size
                                <p style={{ width: '55%', marginLeft: 'auto' }}>20px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Line Height
                                <p style={{ width: '55%', marginLeft: 'auto' }}>30px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Weight
                                <p style={{ width: '55%', marginLeft: 'auto' }}>600</p>
                            </p>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <Box sx={{ backgroundColor: AppColors.main.secondary, width: '40px', aspectRatio: '1', marginRight: '12px' }}></Box>
                            Secondary
                        </Item>
                    </Grid>
                </Grid>

                {/* sub Title */}
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Item >
                            <span style={{ ...AppText.Sub_Title }}>
                                Two Factor Authentication
                            </span>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>Sub Title</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Size
                                <p style={{ width: '55%', marginLeft: 'auto' }}>16px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Line Height
                                <p style={{ width: '55%', marginLeft: 'auto' }}>24px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Weight
                                <p style={{ width: '55%', marginLeft: 'auto' }}>600</p>
                            </p>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <Box sx={{ backgroundColor: AppColors.main.secondary, width: '40px', aspectRatio: '1', marginRight: '12px' }}></Box>
                            Secondary
                        </Item>
                    </Grid>
                </Grid>

                {/* Body Text/ Caption/ Sidebar */}
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Item >
                            <span style={{ ...AppText.Body_Text }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ratione sit nam ipsa vitae accusamus...
                            </span>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>Body Text/ Caption</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Size
                                <p style={{ width: '55%', marginLeft: 'auto' }}>14px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Line Height
                                <p style={{ width: '55%', marginLeft: 'auto' }}>24px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Weight
                                <p style={{ width: '55%', marginLeft: 'auto' }}>400</p>
                            </p>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <Box sx={{ backgroundColor: AppColors.sidebar.text, width: '40px', aspectRatio: '1', marginRight: '12px' }}></Box>
                            Text2
                        </Item>
                    </Grid>
                </Grid>

                {/* List */}
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Item >
                            <Box>
                                <p style={{ ...AppText.List_Title }}>
                                    Project Proposal:
                                </p>
                                <li style={{ ...AppText.Body_Text }}>
                                    Outline the key components of the project.
                                </li>
                                <li style={{ ...AppText.Body_Text }}>
                                    Outline the key components of the project.
                                </li>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>List Title</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Size
                                <p style={{ width: '55%', marginLeft: 'auto' }}>14px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Line Height
                                <p style={{ width: '55%', marginLeft: 'auto' }}>24px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Weight
                                <p style={{ width: '55%', marginLeft: 'auto' }}>600</p>
                            </p>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <Box sx={{ backgroundColor: AppColors.text.black, width: '40px', aspectRatio: '1', marginRight: '12px' }}></Box>
                            Text1
                        </Item>
                    </Grid>
                </Grid>

                {/* Input Label */}
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Item >
                            <Box sx={{ flexDirection: 'column', width: '55%' }}>
                                <AppInput label='Username' placeholder='' type='text' icon={<AiOutlineUser />} />
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>Input Label</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Size
                                <p style={{ width: '55%', marginLeft: 'auto' }}>16px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Line Height
                                <p style={{ width: '55%', marginLeft: 'auto' }}>24px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Weight
                                <p style={{ width: '55%', marginLeft: 'auto' }}>300</p>
                            </p>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <Box sx={{ backgroundColor: AppColors.main.primary, width: '40px', aspectRatio: '1', marginRight: '12px' }}></Box>
                            Primary
                        </Item>
                    </Grid>
                </Grid>

                {/* Caption */}
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <Item >
                            <span style={{ ...AppText.Caption }}>
                                Forgot your password?
                            </span>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>Caption</Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item sx={{ flexDirection: 'column', justifyContent: 'center' }}>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Size
                                <p style={{ width: '55%', marginLeft: 'auto' }}>14px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Line Height
                                <p style={{ width: '55%', marginLeft: 'auto' }}>24px</p>
                            </p>
                            <p style={{ display: 'flex', width: '100%' }}>
                                Font Weight
                                <p style={{ width: '55%', marginLeft: 'auto' }}>200</p>
                            </p>
                        </Item>
                    </Grid>
                    <Grid item xs={2}>
                        <Item>
                            <Box sx={{ backgroundColor: AppColors.main.primary, width: '40px', aspectRatio: '1', marginRight: '12px' }}></Box>
                            Primary
                        </Item>
                    </Grid>
                </Grid>

            </Box>

        </AppBox >
    )
}

export default Typography
