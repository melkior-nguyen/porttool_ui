import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import AppTable from '../../Components/AppTable/AppTable'

function Layout() {
    return (
        <AppBox>
            <h1 style={{ color: 'green', fontSize: '16px' }}>App Table</h1>
            <AppTable />
        </AppBox>
    )
}

export default Layout
