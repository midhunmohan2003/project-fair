import React, { createContext, useEffect, useState } from 'react'
export const TokenAuthContext = createContext()

function TokenAuth({children}) {

    const[isAuthorised,setIsAuthorised]=useState(false)

    useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAuthorised(true)
        }else{
            setIsAuthorised(false)
        }
    },[isAuthorised])

  return (
    <>
    <TokenAuthContext.Provider value={{isAuthorised,setIsAuthorised}}>
    {children}
    </TokenAuthContext.Provider>
      
    </>
  )
}

export default TokenAuth
