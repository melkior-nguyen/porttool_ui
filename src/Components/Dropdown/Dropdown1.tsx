import { Box } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { AiFillCaretDown, AiOutlineDelete } from 'react-icons/ai'
import { AppShadow, appColor } from '../../AppColor'
import './dropdown.css'

function Dropdown1({ label, data }: any) {
    const [count, setCount] = useState<number>(0)
    const [activeDropdown, setActiveDropdown] = useState<boolean>(false)
    const [optionList, setOptionList] = useState<string[]>([])

    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setActiveDropdown(!activeDropdown)
    }

    const handleCheckbox = ({ item }: { item: string }) => {
        if (!optionList.includes(item)) {
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

    const handleDelete = (index: number) => {
        setOptionList(prev => {
            const newList = [...prev]
            newList.splice(index, 1)
            return newList
        })
        const isChecked = false
    }

    const handleDeleteAll = () => {
        setOptionList([])
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
            display: 'flex',
            alignItems: 'center',
            backgroundColor: appColor.input.bg,
            border: `1px solid ${appColor.text.main}`,
            borderRadius: '6px',
            p: '10px',
            position: 'relative',
            boxShadow: AppShadow.boxShadow
        }} >

            <Box sx={{
                flex: '1', fontSize: '14px', userSelect: 'none', flexWrap: 'wrap',
                color: appColor.text.main, display: 'flex', gap: '5px'
            }}>
                {/* {count !== 0 ? `${count} Selected` : label} */}
                {optionList.length === 0 ? label :
                    optionList.map((option: any, index: any) => {
                        return (<Box key={index} sx={{
                            width: '65px', fontSize: '10px', display: 'flex', gap: '4px', alignItems: 'center',
                            border: `1px solid ${appColor.button.outline}`, color: appColor.text.main,
                            padding: '2px', borderRadius: '12px'
                        }}>
                            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '45px', textAlign: 'center' }}>
                                {option}
                            </span>
                            <Box sx={{
                                cursor: 'pointer', borderRadius: '50%',
                                backgroundColor: appColor.button.primary, color: appColor.text.white,
                                width: '16px', height: '16px',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }} onClick={() => handleDelete(index)}>&times;</Box>
                        </Box>)
                    })}
            </Box>

            {optionList.length > 1 &&
                <Box onClick={handleDeleteAll} sx={{
                    cursor: 'pointer', mr: '5px'
                }}>
                    <AiOutlineDelete style={{ color: appColor.text.main, fontSize: '20px' }} />
                </Box>
            }

            <Box onClick={handleClick} sx={{
                cursor: 'pointer',
            }}>
                <AiFillCaretDown style={{ color: appColor.text.main, fontSize: '20px' }} />
            </Box>

            {/* option */}
            <Box className={activeDropdown ? 'dropdown_options active' : 'dropdown_options'}>
                {data.map((item: any, index: any) => {
                    return (
                        <li key={index} className='dropdown_item'>
                            <input style={{ cursor: 'pointer' }} type="checkbox"
                                onChange={() => handleCheckbox({ item })} checked={optionList.includes(item)} />
                            <span style={{ cursor: 'pointer' }} onClick={() => handleCheckbox({ item })}>{item}</span>
                        </li>
                    )
                })}
            </Box>
        </Box>
    )
}

export default Dropdown1
