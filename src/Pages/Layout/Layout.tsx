import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import AppTable from '../../Components/AppTable/AppTable'

function Layout() {
    return (
        <AppBox>
            {/* Table */}
            <h1 style={{ color: 'green', fontSize: '16px' }}>App Table</h1>
            <AppTable />
            {/* App content */}
            <h1 style={{ color: 'green', fontSize: '16px' }}>App main content</h1>
            
            {/* App Submit Form */}
            <h1 style={{ color: 'green', fontSize: '16px' }}>App Submit Form</h1>

        </AppBox>
    )
}

export default Layout
