import Image from "next/image";
import Link from "next/link";

const DishCard = ({ dish }:any) => {
    const { attributes } = dish;
  
    return (
      <div className="bg-white rounded-lg overflow-hidden border hover:shadow-lg transition-all duration-300">
        {/* Image container */}
        <div className="w-full h-48 bg-gray-200">
          <Image
            src="/images/placeholder.svg"
            alt={attributes.name}
            width={190}
            height={190}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content container */}
        <div className="p-4">
            
          <Link href={`/category/${attributes.category}/${dish.id}`} className="text-xl font-bold mb-2">{attributes.name}</Link>
          <p className="text-gray-500 text-sm mb-2 line-clamp-2">
            {attributes.description}
          </p>
          <div className="mb-4">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
              {attributes.category}
            </span>
          </div>
          
          {/* Footer */}
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold">${attributes.price}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    );
  };
  
  export default DishCard;