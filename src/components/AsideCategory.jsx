'use client'

const AsideCategory = () => {
  // --- CHANGE 1: Updated the data to include an emoji for each category ---
  const categoryOptions = [
    { name: 'Electronics', emoji: '💻' },
    { name: 'Fashion & Apparel', emoji: '👕' },
    { name: 'Home & Kitchen', emoji: '🏠' },
    { name: 'Health & Beauty', emoji: '💄' },
    { name: 'Books & Media', emoji: '📚' },
    { name: 'Sports & Outdoors', emoji: '⚽' },
    { name: 'Toys & Games', emoji: '🧸' },
    { name: 'Automotive', emoji: '🚗' },
    { name: 'Groceries', emoji: '🛒' },
    { name: 'Pet Supplies', emoji: '🐾' },
  ]

  return (
    <div className='p-5 flex flex-col drop-shadow-lg shadow-md rounded-lg bg-white'>
      <h3 className='text-xl font-medium text-black/95 border-b border-gray-300 pb-3'>
        Categories
      </h3>
      <ul className='flex flex-col gap-1 pt-4 text-lg'>
        {/* --- CHANGE 2: Updated the mapping to display the emoji and name --- */}
        {categoryOptions.map((category) => (
          <li
            key={category.name} // The key is now category.name
            className='flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-black cursor-pointer transition-colors duration-150'
          >
            <span className='mr-3 text-xl'>{category.emoji}</span>
            <span>{category.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AsideCategory
