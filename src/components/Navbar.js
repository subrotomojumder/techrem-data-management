import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState, Fragment } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import tech_rem_logo from '../assets/images/tech-logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutSet } from '@/app/features/users/userSlice';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { ADMIN } from '@/utils/constant';

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const [sideNave, setSideNave] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    // console.log({ user, isLoading, isError, error });
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
    const signOut = () => {
        dispatch(userLogoutSet());
        localStorage.removeItem("tech_token");
        setTimeout(() => router.replace('/'), 100);
    }
    return (
        <div className='w-full bg-indigo-100 shadow-md sticky top-0 left-0 z-20'>
            <div className='max-w-[1800px] mx-auto flex justify-between item-center px-1 lg:px-8 relative'>
                <div className="flex flex-row justify-start items-center flex-auto my-1 md:my-2">
                    <button onClick={() => setSideNave(!sideNave)} className='text-lg mdd:hidden hover:bg-gray-300 active:bg-gray-400 active:text-white flex justify-center items-center rounded-full w-8 h-8'>
                        <RxHamburgerMenu />
                    </button>
                    <div className="logo min-h-[40px]">
                        <Link href={`/`}>
                            <Image width={120} height={40} src={tech_rem_logo} alt='log png' ></Image>
                        </Link>
                    </div>
                    <div className={`${sideNave ? "block mdd:block" : "hidden mdd:block"}`}>
                        <ul className={`bg-white mdd:bg-indigo-100 border mdd:border-0 absolute top-14 left-0 mdd:static flex flex-col mdd:flex-row items-center space-x-0 md:space-x-1 font-semibold`}>
                            <Link href={`/`}><li className='hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Home</li></Link>
                            {/* .................for account inquary................ */}


                            <Link href={`/dashboard/assign_task`}><li className='hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Assign-Work</li></Link>
                        </ul>
                    </div>
                </div>
                <div className='cart min-h-full flex items-center  mr-1 lg:mr-2'>
                    {!user.userId ?
                        <Link href={`/authentication/login`}>
                            <button className='text-md text-green-500 hover:text-white border border-green-400 hover:border-white hover:bg-green-400 px-2 py-[2px] rounded-md duration-75'>login</button>
                        </Link>
                        : <div onClick={() => setDropdown(!dropdown)} onMouseLeave={() => setDropdown(false)} className='border border-indigo-300 rounded-full p-[1px]'>
                            {!user.userImage ?
                                <button className='text-5xl mt-1 -mb-0.5 text-blue-500 cursor-pointer '><RiAccountCircleFill /></button>
                                : <img title={user.email} className='h-10 md:h-12 w-10 md:w-12 rounded-full cursor-pointer' src={user?.userImage} alt='' />}
                            {dropdown && <div className="absolute right-8 bg-pink-300 top-[54px] rounded-md px-3 py-3 w-28 text-center">
                                <ul>
                                    <Link href={`/authentication/user_profile/${user._id}`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Account</li></Link>
                                    {user.role !== ADMIN && <Link href={`/dashboard/tasks_list`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Tasks-List</li></Link>}
                                    {user.role === ADMIN && <Link href={`/dashboard/show_assign_task_list`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Assign Tasks</li></Link>}
                                    <Link href={`/dashboard/all_tasks_submission`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b whitespace-pre">My Submission</li></Link>
                                    <li onClick={signOut} className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Logout</li>
                                </ul>
                            </div>}
                        </div>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;