'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from './ui/button';
import Image from 'next/image'
import { ImageIcon } from 'lucide-react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useUserStore } from '@/store/store';

const AddPost = () => {

    const { user } = useUserStore();

    const { setIsAlert, setAlertMsg, setAlertType } = useUserStore();

    const [openModal, setOpenModal] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [caption, setCaption] = useState('');
    const [images, setImages] = useState([])
    const [previewSrc, setPreviewSrc] = useState([]);


    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);
    const alertModalRef = useRef(null);

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

    const handleClickOutside = (event) => {
        if (alertModalRef.current && !alertModalRef.current.contains(event.target)) {
            setCaption("")
            setPreviewSrc([])
            setOpenModal(false);
        }
    };

    const handleInputChange = (event) => {
        setCaption(event.target.value);
        resizeTextarea();
    };

    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        setIsLoading(true);
        const files = Array.from(event.target.files);

        const newPreviewSrcsPromises = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            return new Promise(resolve => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });

        if (files.length <= 5 && previewSrc.length + files.length <= 5) {
            setImages(event.target.files)
            Promise.all(newPreviewSrcsPromises).then(newPreviews => {
                setPreviewSrc(prev => [...prev, ...newPreviews]); // Append new images
                console.log('Updated previewSrc:', previewSrc);
            }).finally(() => {
                setIsLoading(false);
            });
        } else {
            setIsAlert(true)
            setAlertType("error")
            setAlertMsg("You cannot upload more than 5 images")
            setPreviewSrc([])
        }
    };
    const handlePost = async () => {
        setIsLoading(true)

        const formData = new FormData();
        formData.append('caption', caption);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i])
        }

        try {
            const data = await fetch('${process.env.NEXT_PUBLIC_API_URL}/post/add-post', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('sycofusion_token')}`
                },
                body: formData
            }).then(res => res.json())

            if (data.success) {
                setIsAlert(true)
                setAlertType("success")
                setAlertMsg(data.message)
            }
            else {
                setIsAlert(true)
                setAlertType("error")
                setAlertMsg(data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div
                className='flex items-center justify-center bg-card text-card-foreground rounded-xl w-64 md:w-[40rem] border-2 border-border p-4'
                onClick={() => setOpenModal(!openModal)}
            >
                <div className='flex items-center justify-center gap-x-4 mx-auto max-w-[80%] lg:w-full'>
                    <Avatar>
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.firstName[0] + " " + user?.lastName[0]}</AvatarFallback>
                    </Avatar>
                    <div className='flex h-10 w-full rounded-md text-muted-foreground border border-input bg-background px-3 py-2 text-sm ring-offset-background overflow-hidden'>
                        What's on your mind
                    </div>
                </div>
                <Button>Post</Button>
            </div>
            {openModal && (
                <div
                    className={`fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div
                        ref={alertModalRef}
                        className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-out ${isAnimating ? 'scale-100' : 'scale-0'}`}
                    >
                        <div className='flex items-start justify-normal gap-x-2 w-[30rem]'>
                            <Avatar>
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback>{user?.firstName[0] + " " + user?.lastName[0]}</AvatarFallback>
                            </Avatar>
                            <div className='w-full'>
                                <h1 className='text-base font-semibold'>{user.username}</h1>
                                <textarea
                                    ref={textareaRef}
                                    value={caption}
                                    onChange={handleInputChange}
                                    style={{ resize: "none" }}
                                    className='appearance-none w-full bg-transparent text-foreground rounded-md focus:outline-none h-full min-h-5 max-h-96'
                                    placeholder="What's on your mind..."
                                />
                            </div>
                        </div>
                        <div>
                            {isLoading ? (
                                <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                    {/* Spinner SVG */}
                                </svg>
                            ) : (
                                previewSrc.length > 0 && (
                                    <Splide className='max-h-96 max-w-96 mx-auto overflow-hidden'>
                                        {previewSrc.map((img, index) => (
                                            <SplideSlide key={index}>
                                                <Image height={512} width={512} src={img} alt={`Image ${index}`} className='object-contain object-center' />
                                            </SplideSlide>
                                        ))}
                                    </Splide>
                                )
                            )}
                        </div>
                        <div className='flex items-center justify-between'>
                            <Button size="icon" variant="ghost" onClick={handleButtonClick} className="custom-button">
                                <ImageIcon />
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                multiple
                                onChange={handleFileChange} // Handle file selection
                            />
                            <Button onClick={handlePost}>Post</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddPost;
