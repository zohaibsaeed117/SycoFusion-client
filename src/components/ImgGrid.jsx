import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';



const ImageGrid = ({ images }) => {
    const imageCount = images?.length || 1;


    const [openModal, setOpenModal] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const alertModalRef = useRef(null);

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
    const handleClickOutside = (event) => {
        if (alertModalRef.current && !alertModalRef.current.contains(event.target)) {
            setOpenModal(false);
        }
    };

    useEffect(() => {
        if (openModal) {
            setIsAnimating(true);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            setIsAnimating(false);
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openModal]);
    return (
        <>
            <div className={`grid gap-2 ${getGridClass()} overflow-hidden`} onClick={() => setOpenModal(!openModal)}>
                {images.slice(0, 4).map((image, index) => (
                    <div key={index} className={`${imageCount === 3 && index === 0 ? 'row-span-2 col-span-2' : ''} relative`}>
                        <Image width={800} height={800} src={image} alt={`Image ${index + 1}`} className="w-full h-96 object-contain object-center border-2 border-border" fallback='/bg.jpg' priority="true" />
                        {imageCount > 4 && index === 3 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-2xl">
                                +{imageCount - 5}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {openModal &&
                <div
                    className={`fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div
                        ref={alertModalRef}
                        className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-out ${isAnimating ? 'scale-100' : 'scale-0'}`}
                    >
                        <Splide className='max-h-96 max-w-96 mx-auto overflow-hidden'>
                            {
                                images.map((image, index) => <SplideSlide key={index}>
                                    <Image height={1080} width={1080} src={image} alt={`Image ${index}`} className='object-contain object-center' />
                                </SplideSlide>)
                            }
                        </Splide>
                    </div>
                </div>}
        </>
    );
};

export default ImageGrid;
