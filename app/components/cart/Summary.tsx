"use client" ;
import { useSelector } from 'react-redux'

const Summary = () => {
    const {items, total , totalOrders} = useSelector((state:any)=> state.cart)
  return (
    <div className="max-h-[70vh] w-full sm:w-96 text-white bg-[#272822]   flex flex-col rounded-lg p-10 gap-3 capitalize">
        <h1 className='text-[1.5rem]'>Order Summary</h1>
        <ul className='grid gap-3'>
            <li className='flex justify-between text-gray-400 items-center'> subTotal <span className='text-sm  '>{total}</span></li>

            <li className='flex justify-between text-gray-400 items-center'> shipping <span className='text-sm '>12</span></li>

            <li className='flex justify-between  pt-3 text-gray-400 items-center text-[1.3rem]'> Total <span className=' text-[#c60053] text-[2rem]'>{total + 12}<span className='text-xs'>dh</span></span></li>


        </ul>
    </div>
  )
}

export default Summary