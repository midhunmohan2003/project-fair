import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Service/allAPI';
import { addProjectResponseContext } from '../ContextAPI/ContextShare';


function Addproject() {

  const [show, setShow] = useState(false);
  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)

  const handleClose = () => {setShow(false);
    setProjectData({
       title:"",languages:"",github:"",overview:"",website:"",projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);


  const[projectData,setProjectData]=useState({
    title:"",languages:"",github:"",overview:"",website:"",projectImage:""
  })

  // console.log(projectData.projectImage.type);
  const[fileStatus,setFileStatus]=useState(false)
  const[preview,setPreview]=useState("")

  useEffect(()=>{
    if(projectData.projectImage.type=='image/png' || projectData.projectImage.type=='image/jpeg' || projectData.projectImage.type=='image/jpg'){
      console.log("generate url");
      setFileStatus(false)
      setPreview(URL.createObjectURL(projectData.projectImage));

    }else{
      console.log("please upload following formats");
      setFileStatus(true)
      setProjectData({...projectData,projectImage:""})

    }
  },[projectData.projectImage])

  // console.log(projectData);

  const handleAddProject=async()=>{
    const{title,languages,github,overview,website,projectImage}=projectData
    if(!title || !languages || !github || !overview || !website || !projectImage){
      toast.warning("please fill the missing fields")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("overview",overview)
      reqBody.append("website",website)
      reqBody.append("projectImage",projectImage)

      //reqheader - content type - multipart/form-data
      const token = sessionStorage.getItem("token")
      console.log(token);
      
      if(token){
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "authorization": `Bearer ${token}`
        }
        // api call
        try{
          const result = await addProjectAPI(reqBody,reqHeader)
          console.log(result);
          if(result.status==200){
            handleClose()
            setAddProjectResponse(result.data)
          }else{
            toast.warning(result.response.data)
          }
        }catch(err){
          console.log(err);
          
        }
      }
    }
  }
  

  return (
    <>
        <Button className='me-3' variant="primary" onClick={handleShow}>
        Add Project
      </Button>

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
                  <img src={preview?preview: "https://static.thenounproject.com/png/187803-200.png"} alt="" height={"400px"} width={"350px"} />
                </label>
                 {fileStatus&& <div className="mt-3 text-danger">please upload following file extensions (jpg/jpeg/png)</div>}
            </div>
            <div className="col-6">
            <Form>
            <FloatingLabel
        controlId="floatingInput1"
        label="Project Title"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Project Title" onChange={e=>setProjectData({...projectData,title:e.target.value})} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput2"
        label="Languages Used"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Languages Used" onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput3"
        label="Overview"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="Overview" onChange={e=>setProjectData({...projectData,overview:e.target.value})}/>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput4"
        label="Github"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="Github" onChange={e=>setProjectData({...projectData,github:e.target.value})} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput5"
        label="Website"
        className="mb-3"
      >
        <Form.Control type="email" placeholder="Website" onChange={e=>setProjectData({...projectData,website:e.target.value})}/>
      </FloatingLabel>
            </Form>
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>Add</Button>
        </Modal.Footer>
      </Modal>
       <ToastContainer autoClose={2000} position="top-center" theme="colored" /> 
    </>
  )
}
  

export default Addproject
