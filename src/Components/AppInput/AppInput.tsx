import React from 'react'
import { appColor } from '../../AppColor'
import { AppText } from '../../AppText'

function AppInput({ label, placeholder, type, icon }: any) {
    return (
        <>
            <label htmlFor="first_name" className="flex item-center gap-x-2 m-0" style={{ ...AppText.Input_Label }}>{label}{icon} :</label>
            <input type={type} id="first_name" className="
            bg-gray-50 border border-gray-300 text-gray-900 text-xl 
            rounded-lg focus:ring-blue-500 focus:border-cyan-900 focus:outline-none
            block w-full p-4 d" placeholder={placeholder} required
            />
        </>
    )
}

export default AppInput
