import React from 'react'
import { Grid, Paper, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import { appColor } from '../../AppColor';
import AppInput from '../AppInput/AppInput';
import { AiOutlineUser } from 'react-icons/ai';
import { PiPasswordLight } from 'react-icons/pi';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
}));
function AppTextField() {
    const userNameMess = 'A username is the name you want to display to others. It can include letters, numbers, and underscores.'
    const passwordMess = 'The password should be at least 8 characters long, including both uppercase and lowercase letters, and at least one number or special character.'
    const emailMess = 'Your email address will be used for login and notifications. Make sure the email address you enter is valid'


    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={8}>
                <Item>
                    <AppInput label={'Username'} placeholder={'Melkior'} type={'text'} iconType='tooltip' position='left' message={userNameMess} />
                </Item>
            </Grid>
            <Grid item xs={6} md={4}>
                <Item>
                    <AppInput label={'Password'} placeholder={'*****'} type={'password'} iconType='tooltip' position='right' message={passwordMess} />
                </Item>
            </Grid>
            <Grid item xs={6} md={4}>
                <Item>
                    <AppInput label={'Telephone'} placeholder={'0989...'} type={'number'} icon={<BsTelephone />} />
                </Item>
            </Grid>
            <Grid item xs={6} md={8}>
                <Item>
                    <AppInput label={'Email'} placeholder={'abc@gmail.com'} type={'email'} iconType='tooltip' position='center' message={emailMess} />
                </Item>
            </Grid>
        </Grid>
    )
}

export default AppTextField