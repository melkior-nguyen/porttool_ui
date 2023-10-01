import React from 'react'
import { Grid, Paper, TextField } from '@mui/material'
import { styled } from '@mui/material/styles';
import { appColor } from '../../AppColor';
import AppInput from '../AppInput/AppInput';
import { AiOutlineUser } from 'react-icons/ai';
import { PiPasswordLight } from 'react-icons/pi';
import { BsTelephone } from 'react-icons/bs';
import { MdOutlineMail } from 'react-icons/md';
import AppInputError from '../AppInput/AppInputError';
import AppInputSuccess from '../AppInput/AppInputSuccess';
import AppInputWarning from '../AppInput/AppInputWarning';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '12px',
}));
function AppTextField2() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6} md={12}>
                <Item>
                    <AppInputSuccess label={''} placeholder={''} type={'password'} />
                </Item>
            </Grid>
            <Grid item xs={6} md={12}>
                <Item>
                    <AppInputWarning label={''} placeholder={''} type={'text'}  />
                </Item>
            </Grid>
            <Grid item xs={6} md={12}>
                <Item>
                    <AppInputError label={''} placeholder={''} type={'text'}  />
                </Item>
            </Grid>
        </Grid>
    )
}

export default AppTextField2