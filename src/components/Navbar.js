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

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const [sideNave, setSideNave] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const { user, isLoading, isError, error } = useSelector((state) => state.auth);
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
        setTimeout(() => router.replace('/'), 1000);
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
                            <Link href={`/dashboard/new_form`}><li className='hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>New-Form</li></Link>
                            <Link href={`/dashboard/entires_data_list`}><li className='hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Data-List</li></Link>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre">
                                        Group
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href={`/dashboard/group_entire`}
                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        Create group data
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href={`/dashboard/group_data_list`}
                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        Group data list
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>

                            {/* .................for account inquary................ */}

                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre">
                                       AC-Register
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="px-1 py-1 ">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href={`/authentication/ac_register`}
                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        Create Account
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link href={`/dashboard/employee_list`}
                                                        className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                                    >
                                                        Employee-List
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                            <Link href={`/dashboard/assign_task`}><li className='hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Assign-Work</li></Link>
                        </ul>
                    </div>
                </div>
                <div className='cart min-h-full flex items-center  mr-1 lg:mr-2'>
                    {!user.userId ?
                        <Link href={`/authentication/login`}>
                            <button className='text-md text-green-500 hover:text-white border border-green-400 hover:border-white hover:bg-green-400 px-2 py-[2px] rounded-md duration-75'>login</button>
                        </Link>
                        : <div onClick={() => setDropdown(!dropdown)} onMouseLeave={() => setDropdown(false)}>
                            {!user.userImage ?
                                <button className='text-5xl mt-1 -mb-0.5 text-blue-500 cursor-pointer '><RiAccountCircleFill /></button>
                                : <img className='h-10 md:h-12 w-10 md:w-12 rounded-full cursor-pointer' src={user?.userImage} alt='' />}
                            {dropdown && <div className="absolute right-8 bg-pink-300 top-[54px] rounded-md px-3 py-3 w-28 text-center">
                                <ul>
                                    <Link href={`/authentication/account`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Account</li></Link>
                                    <Link href={`/dashboard/tasks_list`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Tasks-List</li></Link>
                                    <Link href={`/dashboard/tasks_submission`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Submission</li></Link>
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