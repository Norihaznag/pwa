"use client" ;
import React from 'react'
import { usePathname }  from 'next/navigation'
import Nav from './Nav';
const Navigation = () => {
    const path = usePathname();

  
    {

        if(path.includes('admin')){
            return ("")
        }
        else{
            return <Nav/>
        }

    }
    
  
}

export default Navigation