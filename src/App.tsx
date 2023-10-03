import React, { useState } from 'react';
import Sidebar from './Components/SideBar/SideBar';
import AppHeader from './Components/AppHeader/AppHeader';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Color from './Pages/Color';
import Button from './Pages/Button';
import Typography from './Pages/Typography';
import Badge from './Pages/Badge';
import Search from './Pages/Search';
import Dropdown from './Pages/Dropdown';
import Input from './Pages/Input';
import Layout from './Pages/Layout';
import UserProfile from './Pages/Form/UserProfile';
import AppLoader from './Components/AppLoader';
import { Suspense, lazy } from 'react'
import { AppRoutes } from './Components/Router/Routes';


function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ display: 'flex', gap: 0, position: 'relative' }}>
        <AppHeader />
        <Sidebar />
        <Suspense fallback={<AppLoader />}>
          <AppRoutes />
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
