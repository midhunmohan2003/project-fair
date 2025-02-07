import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthContext } from '../ContextAPI/TokenAuth'

function Header({insideDashboard}) {

  const {isAuthorised,setIsAuthorised}=useContext(TokenAuthContext)

  const navigate = useNavigate()
  const handleLogout=()=>{
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("token")
    setIsAuthorised(false)
    navigate('/')
  }

  return (
    <>
       <Navbar className="bg-primary">
        <Container>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Navbar.Brand>
              <i className="fa-solid fa-list-check me-2"></i>
              Project-Fair
            
            </Navbar.Brand>
            
          </Link>
         {insideDashboard&&
          <button onClick={handleLogout} className='btn btn-danger'>Logout</button>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header
