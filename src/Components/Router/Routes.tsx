import { Suspense, lazy } from 'react'
import AppLoader from '../AppLoader';
import { createBrowserRouter } from 'react-router-dom'
import { paths } from './constant';
import { BrowserRouter, Routes, Route } from 'react-router-dom';




const Color = lazy(() => import('../../Pages/Color'))
const Typography = lazy(() => import('../../Pages/Typography'))
const Button = lazy(() => import('../../Pages/Button'))
const Badge = lazy(() => import('../../Pages/Badge'))
const Search = lazy(() => import('../../Pages/Search'))
const Dropdown = lazy(() => import('../../Pages/Dropdown'))
const Input = lazy(() => import('../../Pages/Input'))
const UserProfile = lazy(() => import('../../Pages/Form/UserProfile'))
const Layout = lazy(() => import('../../Pages/Layout'))


// Create router
export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/design/color' element={<Color />}></Route>
            <Route path='/design/typography' element={<Typography />}></Route>
            <Route path='/design/button' element={<Button />}></Route>
            <Route path='/design/badge' element={<Badge />}></Route>
            <Route path='/search' element={<Search />}></Route>
            <Route path='/dropdown' element={<Dropdown />}></Route>
            <Route path='/input' element={<Input />}></Route>
            <Route path='/form/userprofile' element={<UserProfile />}></Route>
            <Route path='/layout' element={<Layout />}></Route>
        </Routes>
    )
}