
import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  mainImage: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images = [], mainImage }) => {
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);
  const allImages = mainImage ? [mainImage, ...(images || [])] : images || [];

  return (
    <div className="flex flex-col space-y-4">
      <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
        <img
          src={selectedImage}
          alt="Product"
          className="w-full h-[400px] object-cover object-center rounded-lg"
        />
      </div>
      
      {allImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {allImages.map((image, index) => (
            <button
              key={index}
              className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                selectedImage === image ? 'border-primary' : 'border-transparent'
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
