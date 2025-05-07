const AsideCategory = () => {
  return (
    <div className="p-5 flex flex-col drop-shadow-inherit shadow">
      <h3 className="text-2xl font-semibold border-b border-gray-400 pb-2">Categorys</h3>
      <ul className="flex flex-col gap-2 pt-4 text-lg font-normal">
        <li>Clothes</li>
        <li>Bags</li>
        <li>Glasses</li>
        <li>Sports</li>
        <li>Watches</li>
        <li>Perfume</li>
      </ul>
    </div>
  )
}

export default AsideCategory