import React from 'react'
import './maincontent.css'
import Layout from '../../Pages/Layout'
import Color from '../../Pages/Color'
import Typography from '../../Pages/Typography'
import Button from '../../Pages/Button'
import Search from '../../Pages/Search'
import Dropdown from '../../Pages/Dropdown'
import Badge from '../../Pages/Badge'
import Input from '../../Pages/Input'

function MainContent({ currContent }: any) {
    return (
        <>
            {currContent === 'color' &&
                <Color />
            }
            {currContent === 'typography' &&
                <Typography />
            }
            {currContent === 'button' &&
                <Button />
            }
            {currContent === 'search' &&
                <Search />
            }
            {currContent === 'dropdown' &&
                <Dropdown />
            }
            {currContent === 'badge' &&
                <Badge />
            }
            {currContent === 'input' &&
                <Input />
            }
            {currContent === 'layout' &&
                <Layout />
            }
        </>
    )
}

export default MainContent
