
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'

import Dashboard from './Pages/Dashboard'
import Auth from './Pages/Auth'
import Projects from './Pages/Projects'
import { useContext } from 'react'
import { TokenAuthContext } from './ContextAPI/TokenAuth'

function App() {

    const {isAuthorised,setIsAuthorised}=useContext(TokenAuthContext)
  

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Auth/>} />
      <Route path='/register' element={<Auth register/>} />
      <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Home/>}/>
      <Route path='/projects' element={isAuthorised?<Projects/>:<Home/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
     </Routes>
    </>
  )
}

export default App
