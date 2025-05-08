import React from "react";
import Typography from "./Typography";

const ProductCard = ({ src, title, brandName, price,}) => {
  return (
    <div  className="border border-gray-400 rounded-lg overflow-hidden">
      <div className="w-full h-[200px]">
        <img src={src} alt="Image" className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-1 p-4 mt-2">
        <Typography variant="h3" className="text-base font-semibold">
          {title}
        </Typography>
        <Typography variant="p" className="text-[15px] opacity-60">
          {brandName}
        </Typography>
        <Typography variant="p" className="text-sm text-blue-500 font-bold">
        $ {price} 
        </Typography>
      </div>
    </div>
  );
};

export default ProductCard;