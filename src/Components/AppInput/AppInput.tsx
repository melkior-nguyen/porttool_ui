import React from 'react'
import { appColor } from '../../AppColor'

function AppInput({ label, placeholder, type, icon }: any) {
    return (
        <>
            <label htmlFor="first_name" className="flex item-center gap-x-2 mb-1 text-2xl font-md" style={{ color: appColor.text.main }}>{label}{icon} :</label>
            <input type={type} id="first_name" className="
            bg-gray-50 border border-gray-300 text-gray-900 text-xl 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none
            block w-full p-4 d" placeholder={placeholder} required
            />
        </>
    )
}

export default AppInput
