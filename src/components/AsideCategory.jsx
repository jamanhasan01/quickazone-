"use client"
import { useState } from "react"

const CategoryItem = ({ name, subcategories }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <li className="flex flex-col">
      <div className="flex justify-between items-center cursor-pointer">
        <h3 className="h6 text-semibold">{name}</h3>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xl cursor-pointer p-1 rounded hover:bg-gray-100"
        >
          {isExpanded ? '−' : '+'}
        </button>
      </div>
      
      {isExpanded && (
        <ul className="pl-5 my-3 text-base text-gray-600 space-y-2 ">
          {subcategories.map((sub, i) => (
            <li key={i} className="hover:text-black cursor-pointer border-b border-gray-100 pb-2">
              {sub}
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

const AsideCategory = () => {
  const categories = [
    { name: '🧥 Clothing', subcategories: ['T-Shirts', 'Jeans', 'Dresses', 'Jackets'] },
    { name: '👜 Bags', subcategories: ['Backpacks', 'Handbags', 'Wallets', 'Luggage'] },
    { name: '👓 Glasses', subcategories: ['Sunglasses', 'Eyeglasses', 'Reading Glasses'] },
    { name: '📱 Gadgets', subcategories: ['Smartphones', 'Tablets', 'Smartwatches', 'Headphones'] },
    { name: '⌚ Watches', subcategories: ['Digital', 'Analog', 'Smart', 'Luxury'] },
    { name: '👟 Shoes', subcategories: ['Sneakers', 'Boots', 'Sandals', 'Formal'] },
    { name: '💄 Beauty', subcategories: ['Skincare', 'Makeup', 'Fragrances', 'Haircare'] },
    { name: '🏠 Home', subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bedding'] },
    { name: '🎮 Gaming', subcategories: ['Consoles', 'Games', 'Accessories', 'VR'] },
    { name: '🏋️ Fitness', subcategories: ['Equipment', 'Clothing', 'Supplements', 'Yoga'] },
  ]

  return (
    <div className='p-5 flex flex-col drop-shadow-inherit shadow rounded-lg bg-white'>
      <h3 className='h4 font-medium text-black/95  border-b border-gray-400 pb-2'>Categories</h3>
      <ul className='flex flex-col gap-3 pt-4 text-lg font-normal'>
        {categories.map((category, i) => (
          <CategoryItem key={i} name={category.name} subcategories={category.subcategories} />
        ))}
      </ul>
    </div>
  )
}

export default AsideCategory