import React from 'react'
import { AppColors } from '../../AppColor'
import { AppText } from '../../AppText'
import IconWrapper from '../IconWrapper/IconWrapper'

function AppInputError({ label, placeholder, type, icon }: any) {
    return (
        <>
            <input type={type} id="first_name" className=" text-gray-900 text-xl  block w-full p-4 d outline-none"
                placeholder={placeholder} required style={{
                    border: `1px solid ${AppColors.main.error}`,
                    borderRadius: '4px',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,.1)',
                    color: AppText.Body_Text.color
                }}
            />
            <p className="mt-2 text-2xl" style={{ color: AppColors.main.error }}><span className="font-medium">Oh, snapp!</span>Some error password.</p>
        </>
    )
}

export default AppInputError
