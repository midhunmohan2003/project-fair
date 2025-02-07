import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../Components/ProjectCard'
import { getAllProjectAPI } from '../Service/allAPI'



function Projects() {

    const[allProjects,setAllProjects]=useState([])
    const[searchKey,setSearchKey]=useState("")

    const getAllProjects=async()=>{
        const token = sessionStorage.getItem("token")

        if(token){
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "authorization": `Bearer ${token}`
              }
              try{
                const result = await getAllProjectAPI(searchKey,reqHeader)
                console.log(result);

                if(result.status==200){
                    setAllProjects(result.data)
                }else{
                    console.log(result);
                    
                }
                
              }catch(err){
                console.log(err)
              }
        }
    }

    // console.log(allProjects);
    // console.log(searchKey);
    

    useEffect(()=>{
        getAllProjects()
    },[searchKey])
    

  return (
    <>
    <Header/>
    <div className="projects mt-5 ">
        <h1 className='text-center mb-5'>All Projects</h1>
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex border w-50 rounded mb-3">
            <input onChange={e=>setSearchKey(e.target.value)} type="text" className='form-control' placeholder='search by technologies' />
            <i class="fa-solid fa-magnifying-glass" style={{marginLeft:'-50px', paddingTop:'15px'}}></i>
          </div>
        </div>
      </div>

      <Row className='container-fluid mt-5'>

       { allProjects?.length>0?allProjects.map(project=>(
          <Col sm={12} md={6} lg={4}>
          <ProjectCard project={project}/>
      </Col>
       )): <p className='text-danger fw-bolder ms-2'>Nothing to display</p>
      }
       

      </Row>
      
    </>
  )
}

export default Projects
