import React, { useContext, useEffect, useState } from 'react'
import Addproject from "../Components/Addproject";
import { deleteUserProjectAPI, getUserProjectAPI } from '../Service/allAPI';
import { addProjectResponseContext, editProjectResponseContext } from '../ContextAPI/ContextShare';
import EditProject from './EditProject';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyProjects() {

  const[allProjects,setAllProjects]=useState([])

    const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
    const {editProjectResponse,seteditProjectResponse}=useContext(editProjectResponseContext)
  
  const getUserProjects=async()=>{
    const token = sessionStorage.getItem("token")

    if(token){
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "authorization": `Bearer ${token}`
      }
      try{
        const result =await getUserProjectAPI(reqHeader)
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


  const handleDelete = async(pid)=>{
    const token = sessionStorage.getItem("token")
    console.log(token);

    if(token){
      const reqHeader = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
      }

      // api call
      try{
        const result = await deleteUserProjectAPI(pid,reqHeader)
        if(result.status==200){
          getUserProjects()
        }else{
          toast.warning(result.response.data)
        }
      }catch(err){
        console.log(err)
      }

    }
    
  }


  useEffect(()=>{
    getUserProjects()
  },[addProjectResponse,editProjectResponse])
  // console.log(allProjects);
  

  return (
    <>
     <div className="card shadow mt-5">
      <div className="d-flex">
        <h2 className="text-dark m-3">My Projects</h2>
      </div>
      <div className="ms-auto">
        <Addproject />
      </div>
     { allProjects.length>0?allProjects.map((project,index)=>(
       <div key={index} className="mt-4 container-fluid">
       <h2>{project?.title}</h2>
       <div className="d-flex ms-auto align-items-center">
          <EditProject project={project}/>
           <a className='me-3 btn text-dark' href={project?.github} target='_blank'> <i class="fa-brands fa-github"></i> </a>
           <button className="btn text-dark" onClick={()=>handleDelete(project?._id)}><i class="fa-solid fa-trash"></i></button>
       </div>
     </div>
     )):
     
      <p className="text-danger fw-bolder">No projects added yet...</p>
      }
    </div>

      <ToastContainer autoClose={2000} position="top-center" theme="colored" /> 
      
    </>
  )
}

export default MyProjects
