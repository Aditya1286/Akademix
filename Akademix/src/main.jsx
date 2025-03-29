import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { store } from './Store/store.js'
import {
  Home,
  Login,
  Attendance
} from './Components/index.js'
import { Provider } from 'react-redux'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter, Router } from 'react-router-dom'
import App from './App.jsx'
const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<App/>} />
      <Route path='/attendance' element={<Attendance/>} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}> 
    </RouterProvider>
  </StrictMode>
)
