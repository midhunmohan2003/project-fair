import { Collapse } from 'react-bootstrap';
import React, { useState } from 'react'


function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>

<div style={{marginTop:'98px'}}>
      <div className="card shadow mt-5 p-5 me-2">
        <div className="d-flex justify-content-between">
          <h1 className=' text-dark'>Profile</h1>
          <button onClick={() => setOpen(!open)} className='btn btn-outline-dark'><i className="fa-solid fa-angle-down fa-fade"></i></button>
        </div>
        <Collapse in={open}>
     <div className="container mt-5 row justify-content-center p-5">
        <label className='d-flex justify-content-center'>
          <input type="file" style={{display:'none'}} />
          <img src="https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-1024.png" alt="profile" height={"170px"} width={"170px"} />
        </label>.
        <div className="mt-5">
          <input type="text" placeholder='Github Link' className='form-control' />
          <br />
          <input type="text" placeholder='LinkedIn Link' className='form-control' />
          <div className="d-grid mt-5">
            <button className='btn btn-outline-danger' style={{borderRadius:'30px', width:'265px'}}>Update</button>
          </div>
        </div>
      </div>
     </Collapse>
      </div>
    </div>


    </>
  )
}

export default Profile
