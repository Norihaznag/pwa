import React from 'react'

const layout = ({children}:any) => {
  return (
    <div  className="flex p-[5%] justify-center items-center w-full ">
        {children}
    </div>
  )
}

export default layout