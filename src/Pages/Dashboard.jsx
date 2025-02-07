import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Profile from '../Components/Profile'
import { Col, Row } from 'react-bootstrap'
import MyProjects from '../Components/MyProjects'

function Dashboard() {

  const [username,setUsername] = useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("username")){
      setUsername(sessionStorage.getItem("username"))
    }else{
      setUsername("")
    }
  },[])

  return (
    <>
      <Header insideDashboard/>
    
      <Row>
        {/* my projects */}
        <Col sm={12} md={8} className='mb-5'>
          <h2 className='mt-3'>Welcome <span className='text-warning fw-bolder'>{username}</span> </h2>
          <MyProjects/>
        </Col>

        {/* profile */}
        <Col sm={12} md={4}>
    
         {/* <Profile/> */}
        </Col>
      </Row>

      <Footer/>
    </>
  )
}

export default Dashboard
