import { Box } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import { appColor } from '../../AppColor'
import './dropdown.css'

function Dropdown1({ label, data }: any) {
    const [count, setCount] = useState<number>(0)
    const [activeDropdown, setActiveDropdown] = useState<boolean>(false)
    const [optionList, setOptionList] = useState<string[]>([])

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setActiveDropdown(!activeDropdown)
    }

    const handleCheckbox = ({ e, item }: { e: React.ChangeEvent<HTMLInputElement>, item: string }) => {
        if (e.target.checked === true) {
            setCount(prev => prev + 1)
            setOptionList(prev => {
                const newList = [...prev]
                newList.push(item)
                return newList
            })
        } else {
            setCount(prev => prev - 1)
            setOptionList(prev => {
                const newList = [...prev]
                const index = newList.indexOf(item)
                if (index !== -1) newList.splice(index, 1)
                return newList
            })
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
            position: 'relative'
        }} >

            <Box sx={{ flex: '1', fontSize: '14px', userSelect: 'none', color: appColor.text.main }} onClick={handleClick}>
                {count !== 0 ? `${count} Selected` : label}
            </Box>

            <Box onClick={handleClick} >
                <AiFillCaretDown style={{ color: appColor.text.main, fontSize: '20px' }} />
            </Box>

            {/* option */}
            <Box className={activeDropdown ? 'dropdown_options active' : 'dropdown_options'}>
                {data.map((item: any, index: any) => {
                    return (
                        <li key={index} className='dropdown_item'>
                            <input style={{ cursor: 'pointer' }} type="checkbox" onChange={(e) => handleCheckbox({ e, item })} />
                            <span style={{ cursor: 'default' }}>{item}</span>
                        </li>
                    )
                })}
            </Box>
        </Box>
    )
}

export default Dropdown1
