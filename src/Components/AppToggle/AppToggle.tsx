import { Box } from '@mui/material'
import React, { useState } from 'react'

function AppToggle({ label, labelColor, toggleColor }: any) {
    const [isChecked, setIsChecked] = useState<boolean>(true)
    const handleToggle = () => {
        setIsChecked(!isChecked)
    }
    return (
        <>
            <label className="relative inline-flex items-center mr-5 cursor-pointer select-none">
                <input type="checkbox" value="" className="sr-only peer" checked={isChecked} onChange={handleToggle}
                />
                <div className={`w-14 h-8 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-1 after:left-1
                after:bg-white after:border-gray-300 after:border after:rounded-full 
                after:h-6 after:w-6 after:transition-all peer peer-checked:after:translate-x-full 
                peer-checked:after:border-white `} style={{ backgroundColor: isChecked ? `${toggleColor}` : '' }} >
                </div>
                <span className={`ml-3 text-xl font-medium ${labelColor}`}>{label}</span>
            </label>
        </>
    )
}

export default AppToggle
