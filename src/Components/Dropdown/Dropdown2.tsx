import { Box } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { AppColors, AppShadow } from '../../AppColor'
import './dropdown.css'
import { AppText } from '../../AppText'

function Dropdown2({ label, data }: any) {
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
            minWidth: '100px',
            width: '100%',
            minHeight: '30px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: AppColors.text.white,
            border: `1px solid ${AppText.Body_Text.color}`,
            borderRadius: '4px',
            p: '10px',
            cursor: 'pointer',
            position: 'relative',
            // boxShadow: AppShadow.boxShadow
        }} >

            <Box sx={{ flex: '1', fontSize: '14px', userSelect: 'none', color: AppColors.main.primary }} onClick={handleClick}>
                {select === 'None' ? label : select}
            </Box>

            <Box onClick={handleClick} >
                <AiFillCaretDown style={{ color: AppColors.main.primary, fontSize: '20px' }} />
            </Box>

            {/* option */}
            <Box className={activeDropdown ? 'dropdown_options active' : 'dropdown_options'} sx={{
                borderRadius: '4px',
                overflow: 'auto', padding: '6px 0',
                boxShadow: '1px 1px 1px 0 #acacac40',
            }}>
                {data.map((item: any, index: any) => {
                    return (
                        <li key={index} className='dropdown_item' >
                            <span style={{ color: AppColors.main.primary }} onClick={() => handleSelect(item)}>{item}</span>
                        </li>
                    )
                })}
            </Box>
        </Box >
    )
}

export default Dropdown2
