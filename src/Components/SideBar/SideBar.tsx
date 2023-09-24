import React, { useState } from 'react'
import './sidebar.css'

function Sidebar({ setCurrContent }: any) {
    const [itemSelect, setItemSelect] = useState<string>('')

    const handleClick = (text: any) => {
        setItemSelect(text)
        setCurrContent(text)
    }

    return (
        <div className='sidebar' >
            <p className={itemSelect === 'general' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('general')}>General</p>
            <p className={itemSelect === 'layout' ? 'sidebar_item select' : 'sidebar_item'} onClick={() => handleClick('layout')}>Layout</p>
        </ div>
    )
}

export default Sidebar
