import React from 'react'
import { appColor } from '../../AppColor'

function AppInputError({ label, placeholder, type }: any) {
    return (
        <>
            <label htmlFor="first_name" className="block mb-1 text-2xl font-md text-red-700" >{label}</label>
            <input type={type} id="first_name" className="
            bg-gray-50 border border-red-500 text-gray-900 text-xl 
            rounded-lg block w-full p-4 d placeholder-red-700 
            focus:ring-red-500 focus:border-red-500 focus:outline-none
            " placeholder={placeholder} required
            />
            <p className="mt-2 text-2xl text-red-600"><span className="font-medium">Oh, snapp!</span>Some error password.</p>
        </>
    )
}

export default AppInputError
