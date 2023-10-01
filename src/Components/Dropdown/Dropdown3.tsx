import { Box } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { AppColors, AppShadow, appColor } from '../../AppColor'
import './dropdown.css'
import { AppText } from '../../AppText'

function Dropdown3({ label, data }: any) {
    const [activeDropdown, setActiveDropdown] = useState<boolean>(false)
    const [select, setSelect] = useState<string>(label)

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setActiveDropdown(!activeDropdown)
    }

    const handleSelect = (item: string) => {
        setActiveDropdown(false)
        if (item !== 'None') {
            setSelect(item)
        } else {
            setSelect(item)
        }

    }


    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setActiveDropdown(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <Box ref={dropdownRef} sx={{
            width: '100%',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            background: `linear-gradient(135deg, ${AppColors.main.primary_gradient} 0%, ${AppColors.main.primary} 100%)`,
            border: `1px solid ${AppColors.main.primary}`,
            borderRadius: '4px',
            px: '10px',
            cursor: 'pointer',
            position: 'relative',
        }} >

            <Box sx={{ flex: '1', mr: '10px', fontSize: '14px', userSelect: 'none', color: AppColors.text.white }} onClick={handleClick}>
                {select === 'None' ? label : select}
            </Box>

            <Box onClick={handleClick} >
                <AiFillCaretDown style={{ color: AppColors.text.white, fontSize: '20px' }} />
            </Box>

            {/* option */}
            <Box className={activeDropdown ? 'dropdown_options active' : 'dropdown_options'} sx={{
                borderRadius: '4px',
                overflow: 'auto', padding: '6px 0',
                boxShadow: '1px 1px 1px 0 #acacac40',
            }}>
                {data.map((item: any, index: any) => {
                    return (
                        <li key={index} className='dropdown_item'>
                            <span style={{ cursor: 'default', color: AppColors.main.primary }} onClick={() => handleSelect(item)}>{item}</span>
                        </li>
                    )
                })}
            </Box>
        </Box >
    )
}

export default Dropdown3
