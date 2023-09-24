import React, { useState } from 'react';
import MainContent from './Components/MainContent/MainContent';
import Sidebar from './Components/SideBar/SideBar';

function App() {
  const [currContent, setCurrContent] = useState<string>('')
  return (
    <div className="App" style={{ display: 'flex', gap: 0 }}>
      <Sidebar setCurrContent={setCurrContent} />
      <MainContent currContent={currContent} />
    </div>
  );
}

export default App;
