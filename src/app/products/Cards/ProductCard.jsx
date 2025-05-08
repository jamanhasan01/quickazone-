import Image from "next/image";

const ProductCard = ({ product }) => {
  const { title, image, price, description, rating } = product;
  const roundedRating = Math.round(rating?.rate || 0);

  return (
    <div className="p-2 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
      {/* Product Image */}
      <figure className="w-[150px] h-[150px]">
        <Image
          src={image}
          alt={title}
          width={200}
          height={200}
          className="rounded-xl object-contain w-full h-full"
        />
      </figure>

      {/* Product Body */}
      <div className="mt-4 space-y-2">
        <h6 className="text-sm font-bold">{title.slice(0,20)+"..."}</h6>
  
        <div className="flex items-center gap-2">
          <div className="rating rating-sm">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                name={`rating-${product.id}`}
                className="mask mask-star-2 bg-yellow-400"
                checked={i + 1 === roundedRating}
                readOnly
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({rating?.rate})</span>
        </div>

        <div className="flex justify-between items-center w-full">
          <span className="text-lg font-bold ">${price}</span>
        </div>

          <button className="button !bg-main">Buy Now</button>
    
      </div>
    </div>
  );
};

export default ProductCard;
