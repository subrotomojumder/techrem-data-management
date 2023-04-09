import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import tech_rem_logo from '../assets/images/tech-logo.png';

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const cartRef = useRef();
    // const toggleCart = () => {
    //     if (cartRef.current.classList.contains('translate-x-full')) {
    //         cartRef.current.classList.remove('translate-x-full');
    //         cartRef.current.classList.add('translate-x-0');
    //     } else if (cartRef.current.classList.contains('translate-x-0')) {
    //         cartRef.current.classList.remove('translate-x-0');
    //         cartRef.current.classList.add('translate-x-full');
    //     }
    // };

    return (
        <div className='w-full bg-indigo-100 shadow-md sticky top-0 left-0 z-20'>
            <div className='max-w-[1800px] mx-auto flex justify-between item-center px-1 lg:px-8 py-1 md:py-2 relative'>
                <div className="flex flex-col md:flex-row justify-start items-center flex-auto">
                    <div className="logo">
                        <Link href={`/`}>
                            <Image width={120} height={40} src={tech_rem_logo} alt='log png' ></Image>
                        </Link>
                    </div>
                    <ul className='flex justify-end items-center space-x-0 md:space-x-1 font-semibold'>
                        <Link href={`/`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Home</li></Link>
                        <Link href={`/dashboard/new_form`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>New-Form</li></Link>
                        <Link href={`/dashboard/entires_data`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Entire-Data</li></Link>
                        <Link href={`/about`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>About</li></Link>
                        <Link href={`/authentication/ac_register`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>AC-Register</li></Link>
                        <Link href={`/dashboard/assign_task`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Assign-Work</li></Link>
                    </ul>
                </div>
                <div className='cart flex justify-end item-center gap-2 mt-2 mx-2 mr-4 md:mr-5 font-semibold absolute to-10 right-2 md:right-8'>
                    {<Link href={`/authentication/login`}>
                        <button className='text-md text-green-500 hover:text-white border border-green-400 hover:border-white hover:bg-green-400 px-2 py-[2px] rounded-md duration-75'>login</button>
                    </Link>}
                    <div onClick={() => setDropdown(!dropdown)} onMouseLeave={() => setDropdown(false)}>
                        {<button className='text-3xl text-blue-500'><RiAccountCircleFill /></button>}
                        {dropdown && <div className="absolute right-8 bg-pink-300 top-8 rounded-md px-3 py-3 w-28 text-center">
                            <ul>
                                <Link href={`/myaccount`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75">Account</li></Link>
                                <Link href={`/my-orders`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75">Orders</li></Link>
                                <li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75">Logout</li>
                            </ul>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;