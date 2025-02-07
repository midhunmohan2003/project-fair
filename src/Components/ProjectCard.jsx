import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import projectPic from '../assets/images/th.jpeg'
import { server_url } from '../Service/server_url';




function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: '18rem' }} className='mt-5'>
      <Card.Img variant="top" src={`${server_url}/uploads/${project?.projectImage}`} onClick={handleShow} width={"100%"} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal size='xl' show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal heading</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
         
          <Row>
            <Col md={6}> 
            <img src={`${server_url}/uploads/${project?.projectImage}`} width={"100%"} height={"250px"} alt="" /> 
            </Col>
           
            <Col md={6}> 
              <h1 className='fw-bolder'>{project?.title}</h1>
              <h4 className='text-warning fw-medium'>Languages:{project?.languages} </h4> 
              <p className='fw-bolder'> <span>Overview:</span> {project?.overview} </p>
            </Col>
            
          </Row>
          <div className="mt-2">
            <a href={project?.github} target="_blank" className='me-3 btn text-dark'> <i class="fa-brands fa-github fa-2x"></i> </a>
            <a href={project?.website} target="_blank" className='me-3 btn text-dark'> <i class="fa-solid fa-link fa-2x"></i> </a>

          </div>

        </Modal.Body>
      
      </Modal>
    </>
  )
}

export default ProjectCard
