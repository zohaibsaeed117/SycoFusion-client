import Image from 'next/image';
import React from 'react';

const ImageGrid = ({ images }) => {
    const imageCount = images.length;

    const getGridClass = () => {
        switch (imageCount) {
            case 1:
                return 'grid-cols-1';
            case 2:
                return 'grid-cols-2';
            case 3:
                return 'grid-cols-3 grid-rows-2 grid-flow-col';
            default:
                return 'grid-cols-2 grid-rows-2'; // Default for 5 or more images
        }
    };

    return (
        <div className={`grid gap-2 ${getGridClass()}`}>
            {images.slice(0, 4).map((image, index) => (
                <div key={index} className={`${imageCount === 3 && index === 0 ? 'row-span-2 col-span-2' : ''} relative`}>
                    <Image width={1080} height={1080} src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    {imageCount > 4 && index === 3 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                            +{imageCount - 5}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ImageGrid;
