import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import AppTable from '../../Components/AppTable/AppTable'
import AppCharts from '../../Components/AppCharts/AppCharts'
import { Box } from '@mui/material'
import AppAccordion from '../../Components/AppAccordion/AppAccordion'

function Layout() {
    return (
        <AppBox>
            {/* Table */}
            <h1 style={{ color: 'green', fontSize: '16px' }}>App Table</h1>
            <AppTable />
            <br />
            {/* App Accordion */}
            <h1 style={{ color: 'green', fontSize: '16px' }}>App Accordion</h1>
            <AppAccordion />
            <br />
            {/* App Chart */}
            <h1 style={{ color: 'green', fontSize: '16px' }}>App Dashboard Chart</h1>
            <AppCharts />
            <br />
        </AppBox>
    )
}

export default Layout
