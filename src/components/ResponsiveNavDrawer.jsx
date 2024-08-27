import React, { useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { Button, buttonVariants } from './ui/button'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Input } from './ui/input'
import { IoMdSearch } from 'react-icons/io'
import Link from 'next/link'
import { Menu } from 'lucide-react'

const ResponsiveNavDrawer = ({ isOpen, setIsOpen }) => {
    const drawerRef = useRef();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <div ref={drawerRef}
            className={`absolute z-50 top-0 left-0 h-screen border-red-300 bg-background w-[70vw] ${!isOpen ? "-translate-x-[71vw]" : "translate-x-0"}
         transform  transition-transform duration-300 ease-in-out`}
        >
            <Button asChild variant="ghost" size="icon" className='m-4 block lg:hidden' onClick={() => setIsOpen(!isOpen)}>
                <Menu />
            </Button>
            {true &&
                (<div className='flex flex-col items-center justify-center mt-8 gap-y-4'>
                    <Avatar>
                        <AvatarImage src="https://github.com/zohaibsaeed117.png" alt="@zohaibsaeed117" />
                        <AvatarFallback>ZS</AvatarFallback>
                    </Avatar>
                    <div>
                        Zohaib Saeed
                    </div>
                    <Separator className="my-4" />
                </div>)
            }

            {/* <div className='relative h-10 w-60 mx-auto'>
                <Input placeholder="Search" className="pl-10" />
                <IoMdSearch color='grey' fontSize={25} className='absolute left-2 top-1/2 transform -translate-y-1/2' />
            </div> */}

            <div className='min-w-full mt-8'>
                <h1 className='text-xl font-bold ml-4'>Navigation</h1>
                <div className='flex flex-col items-start justify-center w-full'>
                    <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>Home</Link>
                    <Link href="/posts" className={buttonVariants({ variant: "ghost", size: "sm" })}>Feed</Link>
                    <Link href="/about" className={buttonVariants({ variant: "ghost", size: "sm" })}>About Us</Link>
                    <Link href="/contact" className={buttonVariants({ variant: "ghost", size: "sm" })}>Contact Us</Link>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveNavDrawer
