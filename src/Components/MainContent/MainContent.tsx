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
import Form from '../../Pages/Form'
import UserProfile from '../../Pages/Form/UserProfile'

function MainContent({ currContent }: any) {
    return (
        <>
            {currContent === 'Color' &&
                <Color />
            }
            {currContent === 'Typography' &&
                <Typography />
            }
            {currContent === 'Button' &&
                <Button />
            }
            {currContent === 'Badge' &&
                <Badge />
            }
            {currContent === 'Search' &&
                <Search />
            }
            {currContent === 'Dropdown' &&
                <Dropdown />
            }
            {currContent === 'Input' &&
                <Input />
            }
            {currContent === 'Form' &&
                <Form />
            }
            {currContent === 'UserProfile' &&
                <UserProfile />
            }
            {currContent === 'Layout' &&
                <Layout />
            }
        </>
    )
}

export default MainContent
