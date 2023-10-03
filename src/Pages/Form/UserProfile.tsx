import React from 'react'
import { Box, Typography, Grid, Paper } from '@mui/material'
import AppBox from '../../Components/AppBox/AppBox'
import { AppColors } from '../../AppColor'
import MainContentHeader from '../../Components/MainContentHeader/MainContentHeader'
import { AppText } from '../../AppText'
import styled from '@emotion/styled'
import AppInput from '../../Components/AppInput/AppInput'
import { BsGenderAmbiguous, BsTelephone } from 'react-icons/bs'
import FillBtn from '../../Components/Button/FillBtn'
import { AiOutlineUser } from 'react-icons/ai';
import { PiPasswordLight } from 'react-icons/pi';
import { LiaAddressBook } from 'react-icons/lia';
import { MdOutlineMail } from 'react-icons/md';
import AppTooltip from '../../Components/AppTooltip/AppTooltip'
import IconWrapper from '../../Components/IconWrapper/IconWrapper'
import Dropdown1 from '../../Components/Dropdown/Dropdown1'
import Dropdown2 from '../../Components/Dropdown/Dropdown2'


const Item = styled(Box)(({ theme }) => ({
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
}));

function UserProfile() {
    const userNameMess = 'A username is the name you want to display to others. It can include letters, numbers, and underscores.'
    const passwordMess = 'The password should be at least 8 characters long, including both uppercase and lowercase letters, and at least one number or special character.'
    const emailMess = 'Your email address will be used for login and notifications. Make sure the email address you enter is valid'

    const handleSubmit = () => {
        alert('Update successfully!')
    }
    return (
        <AppBox>
            <Box sx={{
                width: '100%', height: '100%',
                backgroundColor: '#fff',
                borderRadius: '16px', padding: '24px', display: 'flex',
                flexDirection: 'column', border: '1px solid #fff'
            }}>
                <MainContentHeader>
                    User Profile
                </MainContentHeader>
                {/* form */}
                <Box sx={{
                    flex: '2', backgroundColor: '#fff',
                    height: '100%', borderRadius: '16px',
                    overflow: 'hidden', display: 'flex',
                    flexDirection: 'column', alignItems: 'center'
                }}>
                    <Box sx={{
                        padding: '24px', display: 'flex', gap: '12px', width: '100%'
                    }}>
                        <Typography sx={{ ...AppText.Sub_Title, borderBottom: `2px solid ${AppColors.main.primary}`, cursor: 'pointer' }}>Profile</Typography>
                        <Typography sx={{ ...AppText.Sub_Title, cursor: 'pointer' }}>Avatar</Typography>
                    </Box>
                    <Box sx={{
                        flex: '1', padding: '24px', display: 'flex',
                        flexDirection: 'column',
                        border: `1px solid ${AppText.Body_Text.color}`,
                        borderRadius: '16px', width: '70%'
                    }}>
                        <Typography sx={{ ...AppText.Sub_Title }}>Your Profile</Typography>
                        <Box sx={{ marginTop: '24px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6}>
                                    <Item>
                                        <AppInput label={'Full Name'} placeholder={'Your name'} type={'text'} icon={<AiOutlineUser />} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Item>
                                        <AppInput label={'Username'} placeholder={'Melkior'} type={'text'} iconType='tooltip' position='right' message={userNameMess} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Item>
                                        <AppInput label={'Password'} placeholder={'*****'} type={'password'} icon={<PiPasswordLight />} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Item>
                                        <AppInput label={'Confirm Password'} placeholder={'*****'} type={'password'} iconType='tooltip' position='center' message={passwordMess} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Item>
                                        <AppInput label={'Email'} placeholder={'abc@gmail.com'} type={'email'} icon={<MdOutlineMail />} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Item>
                                        <label htmlFor="first_names" className="flex item-center gap-x-2 m-0" style={{ ...AppText.Input_Label }}>
                                            Gender
                                            <IconWrapper widthIcon='16px' iconColor={AppColors.main.primary}>
                                                <BsGenderAmbiguous />
                                            </IconWrapper>
                                            :
                                        </label>
                                        <Dropdown2 label='Male' data={['Male', 'Female', 'Other']} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Item>
                                        <AppInput label={'Zip Code'} placeholder={'12345'} type={'email'} iconType='tooltip' position='center' message={emailMess} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Item>
                                        <AppInput label={'Address'} placeholder={'District...'} type={'text'} icon={<LiaAddressBook />} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Item>
                                        <AppInput label={'Telephone'} placeholder={'0989...'} type={'number'} icon={<BsTelephone />} />
                                    </Item>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Item>
                                        <AppInput label={'Country'} placeholder={'VietName'} type={'text'} iconType='tooltip' position='right' message={'Test message'} />
                                    </Item>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{
                            width: '100%', display: 'flex',
                            justifyContent: 'end', alignItems: 'center',
                            marginTop: 'auto', gap: '6px'
                        }}>
                            <IconWrapper widthIcon='16px' iconColor={AppColors.main.primary}>
                                <AppTooltip message='Password retrieval' position='right' />
                            </IconWrapper>
                            <Typography sx={{ ...AppText.Caption }}>Forgot your password?</Typography>
                        </Box>

                        <Box sx={{
                            width: '100%', display: 'flex',
                            justifyContent: 'center', alignItems: 'center',
                            marginTop: 'auto'
                        }}>
                            <FillBtn size='medium' label='Update' onClick={handleSubmit} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </AppBox>
    )
}

export default UserProfile
