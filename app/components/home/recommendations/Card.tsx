import Image from 'next/image'
import React from 'react'
import Icon from '../../icon/Icon'

const Card = ({ name = "cheap" }: any) => {
    return (
        <div className=' bg-white flex flex-col justify-center items-center  p-3 hover:scale-95 border-2 border-black '>
                    <Icon name={name} width={60}/>
            <h1>{name}</h1>
        </div>
    )
}

export default Card