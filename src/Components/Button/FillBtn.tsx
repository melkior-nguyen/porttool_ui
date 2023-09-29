import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AppColors, appColor } from '../../AppColor'

function FillBtn({ size, label, icon }: any) {
    const [sizeBtn, setSizeBtn] = useState<string[]>([])
    const [sizeText, setSizeText] = useState<string>('')
    const [sizeIcon, setSizeIcon] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [sizeRadius, setSizeRadius] = useState<string>('')
    useEffect(() => {
        if (size === 'small') {
            // width height padding gap
            setSizeBtn(['60px', '25px', '5px 10px', '5px'])
            // size 
            setSizeText('8px')
            //radius
            setSizeRadius('20px')
            //set text
            setText(label)
        }
        if (size === 'medium') {
            setSizeBtn(['80px', '30px', '5px', '5px'])
            setSizeText('10px')
            // size icon
            setSizeIcon('16px')
            setSizeRadius('3px')
            setText(label)
        }
        if (size === 'large') {
            setSizeBtn(['100px', '35px', '5px', '5px'])
            setSizeText('12px')
            // size icon
            setSizeIcon('20px')
            setSizeRadius('3px')
            setText(label)

        }
    }, [size])

    return (
        <Button variant='outlined' sx={{
            display: 'flex',
            alignItems: 'center',
            gap: size !== 'small' ? sizeBtn[3] : '0',
            minWidth: sizeBtn[0],
            height: sizeBtn[1],
            background: `linear-gradient(135deg, ${AppColors.main.primary_gradient} 0%, ${AppColors.main.primary} 100%)`,
            padding: sizeBtn[3],
            "&.MuiButtonBase-root": {
                borderRadius: sizeRadius,
                border: `1px solid ${AppColors.main.primary}`,
                color: `${appColor.text.white}`,
                fontSize: sizeText
            },
            "&:hover": {
                "&.MuiButtonBase-root": {
                    background: `linear-gradient(135deg, ${AppColors.main.primary_hover} 0%, ${AppColors.main.primary_hover} 100%)`,
                    color: `${appColor.text.white}`,
                }
            },
            '&:active': {
                transform: 'scale(0.98)'
            }
        }}>
            {size !== 'small' && icon !== undefined &&
                <div style={{ fontSize: sizeIcon }}>
                    {icon}

                </div>
            }
            {text}
        </Button>
    )
}

export default FillBtn
