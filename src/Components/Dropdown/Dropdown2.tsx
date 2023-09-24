import { Box } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { appColor } from '../../AppColor'
import './dropdown.css'

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
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: appColor.input.bg,
            border: `1px solid ${appColor.text.main}`,
            borderRadius: '6px',
            px: '10px',
            cursor: 'pointer',
            position: 'relative',
        }} >

            <Box sx={{ flex: '1', fontSize: '14px', userSelect: 'none', color: appColor.text.main }} onClick={handleClick}>
                {select === 'None' ? label : select}
            </Box>

            <Box onClick={handleClick} >
                <AiFillCaretDown style={{ color: appColor.text.main, fontSize: '20px' }} />
            </Box>

            {/* option */}
            <Box className={activeDropdown ? 'dropdown_options active' : 'dropdown_options'}>
                {data.map((item: any, index: any) => {
                    return (
                        <li key={index} className='dropdown_item'>
                            <span style={{ cursor: 'default' }} onClick={() => handleSelect(item)}>{item}</span>
                        </li>
                    )
                })}
            </Box>
        </Box >
    )
}

export default Dropdown2