import React from 'react'
import './maincontent.css'
import General from '../../Pages/General/General'
import Layout from '../../Pages/Layout/Layout'
import Color from '../../Pages/Color/Color'
import Typography from '../../Pages/Typography/Typography'

function MainContent({ currContent }: any) {
    return (
        <>
            {currContent === 'color' &&
                <Color />
            }
            {currContent === 'typography' &&
                <Typography />
            }
            {currContent === 'general' &&
                <General />
            }
            {currContent === 'layout' &&
                <Layout />
            }
        </>
    )
}

export default MainContent
