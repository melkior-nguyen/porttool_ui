import React from 'react'
import AppBox from '../../Components/AppBox/AppBox'
import AppContent from '../../Components/AppContent/AppContent'

function Layout() {
    return (
        <AppBox>
            <h1 style={{ color: 'green', fontSize: '16px' }}>App Content</h1>
            <AppContent />
        </AppBox>
    )
}

export default Layout
