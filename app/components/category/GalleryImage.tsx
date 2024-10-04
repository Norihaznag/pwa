import React from 'react'

const GalleryImage = ({className, name = "lunch"}:any) => {
  return (
    <div className={`bg-${name} ${className} p-10 border flex flex-col items-start justify-end  bg-cover bg-no-repeat `}>
      <div className="div text-white w-full  ">
      <h1 className='text-[1.8rem] '>{name}</h1>
      <button className='  border-2 p-3  px-7 hover:scale-105 transition bg-black mt-3 '>discover</button>
      </div>
       
    </div>
  )
}

export default GalleryImage