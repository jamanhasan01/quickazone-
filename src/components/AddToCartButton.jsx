'use client'
import { FiShoppingCart } from 'react-icons/fi'

const AddToCartButton = ({ id }) => {
  const handleAddToCart = async () => {
    console.log('Add to cart clicked for ID:', id)
    try {
      let res = await fetch(`/api/products/${id}`)
      let {data}=await res.json()
     
      let sendDataToCardDB=await fetch('/api/cart',{
        method:"POST",
        headers:{
            'Content-Type':'app;ication/json'
        },
        body:JSON.stringify({productId:data?._id,quantity:1})
      })
      console.log(sendDataToCardDB);
      
      
    } catch (error) {}
  }

  return (
    <button onClick={handleAddToCart}>
      <FiShoppingCart className='text-main cursor-pointer hover:text-red-500 transition-colors text-xl' />
    </button>
  )
}

export default AddToCartButton
