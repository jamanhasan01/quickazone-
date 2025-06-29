
import { useEffect, useState } from "react"
import { FiShoppingCart } from "react-icons/fi"

const NavCart = ({setshowCard,showCard}) => {
    const [cartLength, setcartLength] = useState([])
   useEffect(() => {
    const cartDataFunc=async()=>{
        let res=await fetch('/api/cart')
        let data=await res.json()
       setcartLength(data.products.items)
        
    }
    cartDataFunc()
   }, [showCard])

   
   
  return (
    <div>
      <button
        type='button'
        onClick={() => setshowCard(!showCard)}
        className=' rounded-full relative mt-2 cursor-pointer bg-white p-1 text-gray-400 hover:text-gray-500'
      >
        <span className='sr-only r'>View cart</span>
        <FiShoppingCart className='h-6 w-6 text-main' />
        <span className='absolute -top-1 right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-main rounded-full'>
        {cartLength?.length || 0}
        </span>
      </button>
    </div>
  )
}

export default NavCart
