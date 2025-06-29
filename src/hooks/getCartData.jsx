

const getCartData =async () => {
  const res = await fetch('http://localhost:3000/api/cart', {
    cache: 'no-store', // for SSR
  })
    let data=await res.json()
   
    
  return data
}
export default getCartData