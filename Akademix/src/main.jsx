import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  Login,
  Attendance,
  Ai
} from './Components/index.js'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter, Router } from 'react-router-dom'
import App from './App.jsx'
import StaticPage from './staticPage/StaticPage.jsx'


const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Login/>}/>
      <Route path='/home' element={<App/>} />
      <Route path='/attendance' element={<Attendance/>} />
      <Route path='/resource' element={<StaticPage file="resource" />} />

    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}> 
    </RouterProvider>
  </StrictMode>
)
