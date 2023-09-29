import React, { useState } from 'react'
import './sidebar.css'
import { Box } from '@mui/material'
import logo from '../../Assets/images/port_tool_dark.png'
import { LuLayoutDashboard } from 'react-icons/lu'
import { BiSolidColor } from 'react-icons/bi'
import { IoTextOutline } from 'react-icons/io5'
import { BsInputCursor } from 'react-icons/bs'
import { AiOutlineForm, AiOutlineLayout, AiOutlineTable } from 'react-icons/ai'
import { HiOutlineBadgeCheck } from 'react-icons/hi'
import { TfiLayoutAccordionList } from 'react-icons/tfi'

function Sidebar({ setCurrContent }: any) {
    const [itemSelect, setItemSelect] = useState<string>('color')

    const handleClick = (text: any) => {
        setItemSelect(text)
        setCurrContent(text)
    }

    return (
        <Box className='sidebar' >
            <Box sx={{
                height: '60px',
                width: '100%', paddingX: '24px', display: 'flex',
                justifyContent: 'center', alignItems: 'center'
            }}>
                <img src={logo} alt="logo" />
            </Box>
            <Box sx={{
                width: '100%', mt: '60px'
            }}>
                <Box className={itemSelect === 'color' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('color')}>
                    <Box sx={{ width: '20px', aspectRatio: '1' }}>
                        <BiSolidColor style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    Color
                </Box>
                <Box className={itemSelect === 'typography' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('typography')}>
                    <Box sx={{ width: '20px', aspectRatio: '1' }}>
                        <IoTextOutline style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    Typography
                </Box>
                <Box className={itemSelect === 'input' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('input')}>
                    <Box sx={{ width: '20px', aspectRatio: '1' }}>
                        <BsInputCursor style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    Input
                </Box>
                <Box className={itemSelect === 'form' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('form')}>
                    <Box sx={{ width: '20px', aspectRatio: '1' }}>
                        <AiOutlineForm style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    Form
                </Box>
                <Box className={itemSelect === 'badge' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('badge')}>
                    <Box sx={{ width: '20px', aspectRatio: '1' }}>
                        <HiOutlineBadgeCheck style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    Badge
                </Box>
                <Box className={itemSelect === 'table' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('table')}>
                    <Box sx={{ width: '20px', aspectRatio: '1' }}>
                        <AiOutlineTable style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    Table
                </Box>
                <Box className={itemSelect === 'accordion' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('accordion')}>
                    <Box sx={{ width: '20px', aspectRatio: '1' }}>
                        <TfiLayoutAccordionList style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    Accordion
                </Box>
                <Box className={itemSelect === 'general' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('general')}>
                    <Box sx={{ width: '20px', aspectRatio: '1' }}>
                        <LuLayoutDashboard style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    General
                </Box>
                <Box className={itemSelect === 'layout' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('layout')}>
                    <Box sx={{ width: '20px', aspectRatio: '1' }}>
                        <AiOutlineLayout style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }} />
                    </Box>
                    Layout
                </Box>
            </Box>
        </ Box>
    )
}

export default Sidebar
