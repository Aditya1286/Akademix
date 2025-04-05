import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  Login,
  Attendance,
  AiPanel
} from './Components/index.js'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import StaticPage from './staticPage/StaticPage.jsx'


const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<StaticPage file="landing" />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<App/>} />
      <Route path='/attendance' element={<Attendance/>} />
      <Route path='/resource' element={<StaticPage file="resource" />} />
      <Route path='/feedback' element={<StaticPage file="feedback" />} />
      <Route path='/fee' element={<StaticPage file="fee" />} />
      <Route path='/counselling' element={<StaticPage file="counselling" />} />
      <Route path='/quiz' element={<StaticPage file="quiz" />} />
      <Route path='/ai' element={<AiPanel />} />

    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route}> 
    </RouterProvider>
  </StrictMode>
)
