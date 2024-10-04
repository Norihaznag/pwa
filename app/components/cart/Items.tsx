"use client";
import { removeItem } from '@/app/redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';

const Items = () => {
  const { cart } = useSelector((state: any) => state.ui);
  const { total = 0, items = [] } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

 

  return (
    <div className="max-h-[70vh] w-full sm:w-96 bg-[#272822]  text-white  flex flex-col rounded-lg p-10">
      <div className="flex justify-between items-center  ">
        <h1 className='text-[1.5rem]'>Your Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-500 p-4">
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="flex-grow ">
            <ul className="">
              {items.map((item: any, index: number) => (
                <CartItem
                  key={index}
                  item={item}
                  onRemoveItem={() => dispatch(removeItem(item))}
                  index={index}
                />
              ))}
            </ul>
          </div>
          <div className="p-4 ">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg">Total:</span>
              <span className="text-xl font-semibold ">
                {total.toFixed(2)}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Items;