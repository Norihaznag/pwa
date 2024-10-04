import React from 'react'
import Card from './Card'

const Recommendations = () => {
  return (
    <div className='grid grid-cols-3 justify-center mt-10 gap-4 p-3  '>
        <Card name="cheap"/>
        <Card name="fries"/>
        <Card name="healthy"/>
    </div>
  )
}

export default Recommendations