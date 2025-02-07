  import React, { useContext, useState } from 'react'
  import { Link, useNavigate } from 'react-router-dom'
  import { Form } from 'react-bootstrap'
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { loginAPI, registerAPI } from '../Service/allAPI';
import { TokenAuthContext } from '../ContextAPI/TokenAuth';


  function Auth({register}) {

    const navigate = useNavigate()
      const isRegisterForm=register?true:false

      const {isAuthorised,setIsAuthorised}=useContext(TokenAuthContext)

    const [userData,setUserData]=useState({
      username:"",email:"",password:""
    })
    // console.log(userData);

    const handleRegister=async(e)=>{
      e.preventDefault()
      const {username,email,password}=userData
      if(!username || !email || !password){
        toast.error("Please fill all the fields")
      }else{
        // toast.success("proceed")
        // api call
        try{
          const result = await registerAPI(userData)
          
          if(result.status==200){
            toast.success(`${result.data.username} has succesfully registered`)
            navigate('/login')
            setUserData({username:"",email:"",password:""})
          }else{
            toast.warning(result.response.data)
          }
        }catch(err){
          console.log(err);
          
        }
      }
      
      
    }

    const handleLogin = async(e)=>{
      e.preventDefault()
      const {email,password}=userData
      if(!email || !password){
        toast.error("Please fill all the fields")
      }else{
        try{
        // proceed to api call
        const result = await loginAPI({email,password})
        if(result.status==200){
          sessionStorage.setItem("username",result.data.existingUser.username)
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)
          navigate('/')
          setUserData({email:"",password:""})
        }else{
          toast.warning(result.response.data)
        }
        }catch(err){
          console.log(err);
          
        }
      }
    }
    

    return (
      <>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="container w-75">
              <Link to={'/'} style={{textDecoration:'none', color:'blue', fontWeight:'bold'}}><i className="fa-solid fa-arrow-left"></i> Back to Home </Link>
          <div className="card shadow p-3 bg-primary">
              <div className="row align-items-center">
                  <div className="col-lg-6">
                      <img src="https://image.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" width={"100%"} alt="" />
                  </div>

                  <div className="col-lg-6">
          <div className="d-flex align-items-center flex-column">
              <h1 className='fw-bolder text-light mt-2'> <i className="fa-solid fa-list-check me-2"></i> Project Fair</h1>
              <h6 className='fw-bolder text-warning pt-2'>
                  {
                      isRegisterForm?'Sign up to your account':'Sign in to your account'
                  }
                  <Form className='mt-2 text-dark'>
                      {
                          isRegisterForm&& <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          
                          <Form.Control type="text" placeholder="Enter your username" onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username}/>
                        </Form.Group>
                      }
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          
          <Form.Control type="email" placeholder="Enter your email"  onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
        
          <Form.Control type="password" placeholder="Enter your password" onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
        </Form.Group>
        {
          isRegisterForm?
          <div>
              <button className='btn btn-outline-dark' onClick={handleRegister}>Register</button>
              <p className='pt-2 text-light'>Already have an account?Click here to <Link to={'/login'} style={{textDecoration:"none", color:"darkgreen"}}>Login</Link> </p>
          </div>:
          <div className="mt-3">
              <button className='btn btn-outline-dark' onClick={handleLogin}>Login</button>
              <p className='text-light fw-bolder mt-2'>New User?Click here to <Link to={'/register'} style={{textDecoration:"none", color:"red"}}>Register</Link> </p>
          </div>
        }
                  </Form>
              </h6>
          </div>
                  </div>

              </div>
          </div>
          </div>
        </div>
        <ToastContainer autoClose={2000} position="top-center" theme="colored" />

      </>
    )
  }

  export default Auth
