import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { server_url } from '../Service/server_url';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { editUserProjectAPI } from '../Service/allAPI';
import { editProjectResponseContext } from '../ContextAPI/ContextShare';


function EditProject({project}) {

    const {editProjectResponse,seteditProjectResponse}=useContext(editProjectResponseContext)
    

    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);
      setProjectData({
        title:project?.title,
        languages:project?.languages,
        github:project?.github,
        overview:project?.overview,
        website:project?.website,
        projectImage:""
      })
      setPreview("")
    }
    const handleShow = () => setShow(true);

        const[projectData,setProjectData]=useState({
        id:project._id,
        title:project?.title,
        languages:project?.languages,
        github:project?.github,
        overview:project?.overview,
        website:project?.website,
        projectImage:""
      })

        const[preview,setPreview]=useState("")
      useEffect(()=>{
        if(projectData.projectImage){
            setPreview(URL.createObjectURL(projectData.projectImage));
        }else{
            setPreview("");
        }
      },[projectData.projectImage])

      const handleUpdate=async()=>{
        const{id,title,languages,github,overview,website,projectImage}=projectData

        if(!title || !languages || !github || !overview || !website){
            toast.warning("please fill all the fields")
        }else{
            const reqBody = new FormData()
            reqBody.append("title",title)
            reqBody.append("languages",languages)
            reqBody.append("github",github)
            reqBody.append("overview",overview)
            reqBody.append("website",website)
            preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

             //reqheader - content type - multipart/form-data
             const token = sessionStorage.getItem("token")
            console.log(token);

            if(token){
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "authorization": `Bearer ${token}`
                  }
                  //api call
                  try{
                    const result = await editUserProjectAPI(id,reqBody,reqHeader)
                    console.log(result);
                    
                    if(result.status==200){
                        handleClose()
                        seteditProjectResponse(result.data)
                    }else{
                        toast.error(result.response.data)
                    }
                  }catch(err){
                    console.log(err);
                  }
            }
        }
        
      }

  return (
    <>
       <button className='btn' onClick={handleShow}> <a className='me-3 btn text-dark'> <i class="fa-solid fa-pen-to-square"></i> </a> </button>
        

       <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
                <label >
                  <input style={{display:'none'}} type="file" onChange={e=>setProjectData({...projectData,projectImage:e.target.files[0]})} />
                  <img src={preview?preview:`${server_url}/uploads/${project?.projectImage}`}  alt="" height={"400px"} width={"350px"} />
                </label>
            </div>
            <div className="col-6">
            <Form>
            <FloatingLabel
        controlId="floatingInput1"
        label="Project Title"
        className="mb-3" 
        >
        <Form.Control type="text" placeholder="Project Title" value={projectData?.title} onChange={e=>setProjectData({...projectData,title:e.target.value})} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Languages Used"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Languages Used" value={projectData?.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput3"
        label="Overview"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Overview" value={projectData?.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput4"
        label="Github"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="Github" value={projectData?.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput5"
        label="Website"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="Website" value={projectData?.website} onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
      </FloatingLabel>
            </Form>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate} >Update</Button>
        </Modal.Footer>
      </Modal>

       <ToastContainer autoClose={2000} position="top-center" theme="colored" /> 

    </>
  )
}

export default EditProject
