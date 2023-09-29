import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { appColor } from '../../AppColor'

function FillBtn({ size, label, icon }: any) {
    const [sizeBtn, setSizeBtn] = useState<string[]>([])
    const [sizeText, setSizeText] = useState<string>('')
    const [sizeIcon, setSizeIcon] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [sizeRadius, setSizeRadius] = useState<string>('')
    useEffect(() => {
        if (size === 'small') {
            // width height padding gap
            setSizeBtn(['50px', '25px', '5px 10px', '5px'])
            // size weight
            setSizeText('10px')
            //radius
            setSizeRadius('6px')
            //set text
            setText(label)
        }
        if (size === 'medium') {
            setSizeBtn(['80px', '30px', '5px', '5px'])
            setSizeText('10px')
            // size icon
            setSizeIcon('16px')
            setSizeRadius('4px')
            setText(label)
        }
        if (size === 'large') {
            setSizeBtn(['100px', '35px', '5px', '5px'])
            setSizeText('12px')
            // size icon
            setSizeIcon('20px')
            setSizeRadius('4px')
            setText(label)

        }
    }, [size])

    return (
        <Button variant='outlined' sx={{
            display: 'flex',
            alignItems: 'center',
            gap: sizeBtn[3],
            minWidth: sizeBtn[0],
            height: sizeBtn[1],
            backgroundColor: appColor.primary,
            padding: sizeBtn[3],
            "&.MuiButtonBase-root": {
                borderRadius: sizeRadius,
                border: `1px solid ${appColor.primary}`,
                color: `${appColor.text.white}`,
                fontSize: sizeText
            },
            "&:hover": {
                "&.MuiButtonBase-root": {
                    backgroundColor: `${appColor.primary}`,
                    color: `${appColor.text.white}`
                }
            },
            '&:active': {
                transform: 'scale(0.98)'
            }
        }}>
            {size !== 'small' &&
                <div style={{ fontSize: sizeIcon }}>
                    {icon}

                </div>
            }
            {text}
        </Button>
    )
}

export default FillBtn
