"use client";
import React from 'react'
import Icon from '../icon/Icon'

const Icono = ({name , className , onClick , noword = false }:any) => {
  return (
    <Icon className={`min-w-11 min-max-h-11  p-2    rounded-full md:rounded-lg max-[600px]:border capitalize  ${className}`} name={name} onClick={onClick}>
      {
        noword ? '' :   <p className="px-4 min-[320px]:text-center max-[600px]:hidden ">{name}</p>
      }
     
    </Icon>
  )
}

export default Icono