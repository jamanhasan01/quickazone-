import Image from "next/image";

const NewArribals = ({ product }) => {
  const { title, image, price } = product;
  
  return (
    <div className="flex p-3 items-center gap-3 border border-gray-100">
     <Image className="w-10 h-10 object-cover" src={image} width={500} height={500} alt={title}  />
      <div className="truncate flex-1">
        {title.length > 20 ? `${title.slice(0, 20)}...` : title}
        <div className="text-sm font-semibold">${price}</div>
      </div>
    </div>
  );
};

export default NewArribals;