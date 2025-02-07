import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import titleImage from '../assets/images/cliq-projects-integration-blog.gif'
import ProjectCard from '../Components/ProjectCard'
import Footer from '../Components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectAPI } from '../Service/allAPI'


function Home() {

  const [isLoggedIn,setIsLoggedIn] = useState(false)

  const[allProjects,setAllProjects]=useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  },[])

  const getHomeProjects=async()=>{
    const result = await getHomeProjectAPI()
    if(result.status == 200){
      setAllProjects(result.data)
    }else{
      console.log(result);
      
    }
  }

  const handleProjectsPage = ()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')
    }else{
      toast.warning('please login to explore our projects')
    }
  }

  return (
    <>
       <div style={{width:"100%", height:"70vh"}} className="container-fluid rounded bg-primary mt-5">
        <Row className="d-flex align-items-center p-5">
          <Col sm={12} md={6}>
              <h1 style={{fontSize:'80px'}} className='fw-bolder text-light mt-2'>  <i className="fa-solid fa-list-check me-2"></i> Project Fair </h1>
              <p className='text-dark' style={{textAlign:'justify'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta reiciendis ad in quam fugit nihil, consequatur libero. Commodi ipsam, necessitatibus, deleniti, incidunt porro ullam maxime neque quisquam rerum eos ea.
              Perferendis accusamus consequatur asperiores necessitatibus vero, iusto temporibus consectetur debitis dicta, ut quia nihil blanditiis omnis repellendus, reiciendis laboriosam. Ducimus natus id provident facilis rerum minus, quia eaque in saepe?</p>
                         
             
             { isLoggedIn?
              <Link to={'/dashboard'} className='btn btn-outline-dark'>Manage Your Projects</Link>:
              <Link to={'/login'} className='btn btn-outline-dark'>Start to Explore</Link>}
          </Col>
        
          <Col sm={12} md={6} className='mt-4'>
             <img src={titleImage} alt="" width={"500px"} height={"350px"} />
          </Col>

        </Row> 
      </div>

          {/* project cards */}
          <div className="all-projects" style={{marginTop:'100px'}}>
      <h1 className='text-info text-center fs-1'>Explore Your Projects</h1>
      <marquee scrollAmount={25}>
        <Row>
        {  allProjects.length>0?allProjects.map(project=>(
           <Col sm={12} md={6} lg={4}>
           <ProjectCard project={project}/>
           </Col>
        )):null
      }
         
        </Row>
      </marquee>

      <div className="d-flex justify-content-center text-dark mt-5 btn" onClick={handleProjectsPage} ><p className='fs-3'>View More Projects</p></div>
      
    </div>

    <Footer/>
    <ToastContainer autoClose={2000} position="top-center" theme="colored" />
    
    </>
  )
}

export default Home
