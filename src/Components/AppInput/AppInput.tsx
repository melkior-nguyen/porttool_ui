import React, { useState } from 'react'
import { AppColors, appColor } from '../../AppColor'
import { AppText } from '../../AppText'
import IconWrapper from '../IconWrapper/IconWrapper'

function AppInput({ label, placeholder, type, icon }: any) {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    return (
        <>
            <label htmlFor="first_name" className="flex item-center gap-x-2 m-0" style={{ ...AppText.Input_Label }}>
                {label}
                <IconWrapper iconColor={AppColors.main.primary}>
                    {icon}
                </IconWrapper>
                :
            </label>
            <input type={type} id="first_name" className=" text-gray-900 text-xl  block w-full p-4 d outline-none"
                placeholder={placeholder} required style={{
                    border: isFocused ? `1px solid ${AppColors.main.primary}` : `1px solid ${AppText.Body_Text.color}`,
                    borderRadius: '4px',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
                    color: AppText.Body_Text.color
                }}
                onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
            />
        </>
    )
}

export default AppInput
