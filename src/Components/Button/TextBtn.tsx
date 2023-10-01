import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AppColors, appColor } from '../../AppColor'
import { AiFillSetting } from 'react-icons/ai'
import IconWrapper from '../IconWrapper/IconWrapper'

function TextBtn({ size, label, icon, iconColor }: any) {
    const [sizeBtn, setSizeBtn] = useState<string[]>([])
    const [sizeText, setSizeText] = useState<string>('')
    const [sizeIcon, setSizeIcon] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [sizeRadius, setSizeRadius] = useState<string>('')
    useEffect(() => {
        if (size === 'small') {
            // width height padding gap
            setSizeBtn(['60px', '25px', '5px 10px', '5px'])
            // size weight
            setSizeText('12px')
            //radius
            setSizeRadius('20px')
            //set text
            setText(label)
        }
        if (size === 'medium') {
            setSizeBtn(['100px', '30px', '5px', '5px'])
            setSizeText('12px')
            setSizeIcon('16px')
            setSizeRadius('3px')
            setText(label)
        }
        if (size === 'large') {
            setSizeBtn(['120px', '35px', '5px', '5px'])
            setSizeText('12px')
            setSizeIcon('20px')
            setSizeRadius('3px')
            setText(label)

        }
    }, [size])
    return (
        <Button variant='text' sx={{
            display: 'flex',
            alignItems: 'center',
            gap: size !== 'small' ? sizeBtn[3] : '0',
            minWidth: sizeBtn[0],
            height: sizeBtn[1],
            padding: sizeBtn[3],
            textTransform: 'none',
            "&.MuiButtonBase-root": {
                color: AppColors.main.primary,
                fontSize: sizeText,
            },
            "&:hover": {
                "&.MuiButtonBase-root": {
                }
            },
            '&:active': {
                transform: 'scale(0.98)'
            }
        }}>
            {size !== 'small' && icon !== undefined &&
                <IconWrapper widthIcon='16px' >
                    {icon}
                </IconWrapper>
            }
            {text}
        </Button>
    )
}

export default TextBtn
