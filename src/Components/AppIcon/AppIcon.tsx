import React from 'react'

function AppIcon({ icon, color, border }: any) {
    return (
        <div style={{ fontSize: '24px', color: color, border: `1px solid ${border}` }}>
            {icon}
        </div>
    )
}

export default AppIcon
