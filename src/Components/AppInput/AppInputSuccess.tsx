import React from 'react'
import { appColor } from '../../AppColor'

function AppInputSuccess({ label, placeholder, type }: any) {
  return (
    <>
      <label htmlFor="first_name" className="block mb-1 text-2xl font-md text-green-700">{label}</label>
      <input type={type} id="first_name" className="
            bg-gray-50 border border-green-500 text-gray-900 text-xl 
            rounded-lg block w-full p-4 d placeholder-green-700 
            focus:ring-green-500 focus:border-green-500 focus:outline-none
            " placeholder={placeholder} required
      />
      <p className="mt-2 text-2xl text-green-600"><span className="font-medium">Well done!</span> Some success name.</p>
    </>
  )
}

export default AppInputSuccess
