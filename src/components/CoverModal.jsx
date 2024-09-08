import React, { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Camera, Settings2 } from 'lucide-react';
import { useUserStore } from '@/store/store';
import Loader from '@/components/Loader';
import OverlayLoading from './OverlayLoading';
import Image from 'next/image';

const CoverModal = () => {

    const { setIsAlert, setAlertMsg, setAlertType, user, setUser } = useUserStore();

    const [openModal, setOpenModal] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cover, setCover] = useState("");
    const [coverPreview, setCoverPreview] = useState(user?.cover || "/no-img.png");
    const fileInputRef = useRef();

    const alertModalRef = useRef(null);

    useEffect(() => {
        if (openModal) {
            setIsAnimating(true);
            document.body.style.overflow = 'hidden'; // Disable scrolling
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            setIsAnimating(false);
            document.body.style.overflow = 'auto'; // Enable scrolling
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.body.style.overflow = 'auto'; // Ensure scrolling is enabled when component unmounts
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openModal]);

    const handleClickOutside = (event) => {
        if (alertModalRef.current && !alertModalRef.current.contains(event.target)) {
            setOpenModal(false);
        }
    };

    const handleSelectImage = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setCover(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setCoverPreview(reader.result);
        };
    };

    const handleUpload = async () => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('cover', cover);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/set-cover`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('sycofusion_token')}`
                },
                mode: 'no-cors',
                method: "POST",
                body: formData
            }).then(res => res.json());


            if (response.success) {
                setIsAlert(true);
                setAlertType("success");
                setAlertMsg(response.message);
                setOpenModal(false);
                setUser({ ...user, cover: response.cover });
                localStorage.setItem('sycofusion_user', JSON.stringify({ ...user, cover: response?.cover }));

            } else {
                setIsAlert(true);
                setAlertType("error");
                setAlertMsg(response.message);
            }

        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-4 bottom-4"
                onClick={() => setOpenModal(!openModal)}
            >
                <Settings2 />
            </Button>

            {openModal && (
                <div
                    className={`fixed z-[1000] inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-out ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                >
                    <div
                        ref={alertModalRef}
                        className={`bg-white z-[1001] p-6 rounded-lg shadow-lg transform transition-transform duration-500 ease-out md:max-w-[80vh] ${isAnimating ? 'scale-100' : 'scale-0'}`}
                    >
                        <h1 className='text-center text-xl font-semibold'>Upload Cover Picture</h1>
                        {user?.cover && (
                            <>
                                <Image src={user?.cover} alt={`${user?.username}'s Cover Picture`} height={200} width={792} className='w-96 h-40 object-contain' />
                                {isLoading && <OverlayLoading />}
                            </>
                        )}
                        <div className='flex items-center justify-between'>
                            <Button variant="ghost" onClick={handleSelectImage} className="custom-button">
                                Select Image
                            </Button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <Button onClick={handleUpload} disabled={cover === ""}>Upload</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CoverModal;
