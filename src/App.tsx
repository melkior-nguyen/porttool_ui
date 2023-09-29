import React, { useState } from 'react';
import MainContent from './Components/MainContent/MainContent';
import Sidebar from './Components/SideBar/SideBar';
import AppHeader from './Components/AppHeader/AppHeader';


function App() {
  const [currContent, setCurrContent] = useState<string>('color')
  return (
    <div className="App" style={{ display: 'flex', gap: 0, position: 'relative' }}>
      <AppHeader />
      <Sidebar setCurrContent={setCurrContent} />
      <MainContent currContent={currContent} />
    </div>
  );
}

export default App;
