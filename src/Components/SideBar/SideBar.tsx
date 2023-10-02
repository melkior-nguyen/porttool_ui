import React, { useState, useEffect } from 'react'
import './sidebar.css'
import { Box } from '@mui/material'
import logo from '../../Assets/images/port_tool_dark.png'
import { BiSolidColor } from 'react-icons/bi'
import { IoTextOutline } from 'react-icons/io5'
import { BsChevronDown, BsChevronRight, BsInputCursor } from 'react-icons/bs'
import { AiOutlineAntDesign, AiOutlineForm, AiOutlineLayout, AiOutlineSecurityScan, AiOutlineTable, AiOutlineUser } from 'react-icons/ai'
import { HiOutlineBadgeCheck, HiOutlineSearchCircle } from 'react-icons/hi'
import { TfiLayoutAccordionList } from 'react-icons/tfi'
import { CgPlayButtonR } from 'react-icons/cg'
import { RxDropdownMenu } from 'react-icons/rx'
import IconWrapper from '../IconWrapper/IconWrapper'
import { AppColors } from '../../AppColor'

function Sidebar({ setCurrContent }: any) {
    const [itemSelect, setItemSelect] = useState<string>('Color')
    const [activeMultiSelect, setActiveMultiSelect] = useState<string>('')
    const [currArrow, setCurrArrow] = useState<number>(0)
    const [multiItemBoxStyle, setMultiItemBoxStyle] = useState<{}>({})

    const handleSelect = (text: any) => {
        setItemSelect(text)
        setCurrContent(text)
        setActiveMultiSelect('')
    }

    const handleMultiSelect = (text: any, index: any) => {
        if (activeMultiSelect !== text) {
            setActiveMultiSelect(text)
            setCurrArrow(index)
        } else {
            setActiveMultiSelect('')
        }

    }

    const handleSelect2 = (text: any) => {
        setItemSelect(text)
        setCurrContent(text)
    }

    useEffect(() => {
        setMultiItemBoxStyle({
            opacity: activeMultiSelect ? '1' : '0',
            transition: 'all 0.5s linear'
        })

    }, [activeMultiSelect])

    return (
        <Box className='sidebar' >
            {/* Logo */}
            <Box sx={{
                height: '60px',
                width: '100%', paddingX: '24px', display: 'flex',
                justifyContent: 'center', alignItems: 'center'
            }}>
                <img src={logo} alt="logo" />
            </Box>
            {/* Item */}
            <Box sx={{
                width: '100%', mt: '48px'
            }}>
                {sidebar_data.map((group_item, index) => {
                    if (group_item.type === 'group') {
                        return (
                            <Box key={index} >
                                <Box className={itemSelect === group_item.name ? 'sidebar_item select multi' : 'sidebar_item multi'} onClick={() => handleMultiSelect(group_item.name, index)}>
                                    <Box sx={{ display: 'flex', gap: '1.2rem', }}>
                                        <IconWrapper widthIcon='20px' iconColor={AppColors.main.secondary}>
                                            {group_item.icon}
                                        </IconWrapper>
                                        {group_item.name}
                                    </Box>
                                    <Box sx={{
                                        width: '16px', aspectRatio: '1',
                                        transform: activeMultiSelect && currArrow === index ? 'rotate(0deg)' : 'rotate(90deg)',
                                        // transform: 'rotate(90deg)',
                                        transition: 'all 0.2s linear'
                                    }}>
                                        <BsChevronRight style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                                    </Box>
                                </Box>
                                {activeMultiSelect === group_item.name &&
                                    <Box sx={{ ...multiItemBoxStyle }}>
                                        {group_item.children?.map((item, index) => {
                                            return (
                                                <Box key={index} className={itemSelect === item.name ? 'sidebar_item-second select' : 'sidebar_item-second'} onClick={() => handleSelect2(item.name)}>
                                                    <IconWrapper widthIcon='20px' iconColor={AppColors.main.secondary}>
                                                        {item.icon}
                                                    </IconWrapper>
                                                    {item.name}
                                                </Box>
                                            )
                                        })}
                                    </Box>
                                }
                            </Box>
                        )
                    } else {
                        return (
                            <Box key={index} className={itemSelect === group_item.name ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleSelect(group_item.name)}>
                                <IconWrapper widthIcon='20px' iconColor={AppColors.main.secondary}>
                                    {group_item.icon}
                                </IconWrapper>
                                {group_item.name}
                            </Box>
                        )
                    }
                })}
            </Box>
        </ Box>
    )
}

export default Sidebar

const sidebar_data = [
    {
        type: 'group',
        name: 'Design',
        icon: <AiOutlineAntDesign />,
        children: [
            {
                type: 'group_item',
                name: 'Color',
                icon: <BiSolidColor />,
            },
            {
                type: 'group_item',
                name: 'Typography',
                icon: <IoTextOutline />,
            },
            {
                type: 'group_item',
                name: 'Button',
                icon: <CgPlayButtonR />,
            },
            {
                type: 'group_item',
                name: 'Badge',
                icon: <HiOutlineBadgeCheck />,
            }
        ]
    },
    {
        type: 'item',
        name: 'Search',
        icon: <HiOutlineSearchCircle />,

    },
    {
        type: 'item',
        name: 'Dropdown',
        icon: <RxDropdownMenu />,

    },
    {
        type: 'item',
        name: 'Input',
        icon: <BsInputCursor />,

    },
    {
        type: 'item',
        name: 'Table',
        icon: <AiOutlineTable />,

    },
    {
        type: 'item',
        name: 'Accordion',
        icon: <TfiLayoutAccordionList />,

    },
    {
        type: 'group',
        name: 'Form',
        icon: <AiOutlineForm />,
        children: [
            {
                type: 'group_item',
                name: 'UserProfile',
                icon: <AiOutlineUser />
            },
            {
                type: 'group_item',
                name: 'Security',
                icon: <AiOutlineSecurityScan />
            }
        ]
    },

    {
        type: 'item',
        name: 'Layout',
        icon: <AiOutlineLayout />,

    },
]