import React from 'react'
import './maincontent.css'
import General from '../../Pages/General/General'
import Layout from '../../Pages/Layout/Layout'

function MainContent({ currContent }: any) {
    return (
        <div className='maincontent'>
            {currContent === 'general' &&
                <General />
            }
            {currContent === 'layout' &&
                <Layout />
            }
        </div>
    )
}

export default MainContent
