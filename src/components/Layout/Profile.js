import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

const Profile = () => {
    const router = useRouter();
    
    const dispatch = useDispatch();

    const signOut = () => {
        dispatch(userLogoutSet());
        localStorage.removeItem("tech_token");
        setTimeout(() => router.replace('/'), 100);
    }
    return (
        <Menu as="div" className="relative">
            {!user.userId ?
                <Link href={`/authentication/login`}>
                    <button className='text-md text-green-500 hover:text-white border border-green-400 hover:border-white hover:bg-green-400 px-2 py-[2px] rounded-md duration-75'>login</button>
                </Link>
                :
                // <div onClick={() => setDropdown(!dropdown)} onMouseLeave={() => setDropdown(false)} className='border border-indigo-300 rounded-full p-[1px]'>
                //     {!user.userImage ?
                //         <button className='text-5xl mt-1 -mb-0.5 text-blue-500 cursor-pointer '><RiAccountCircleFill /></button>
                //         : <img title={user.email} className='h-10 md:h-12 w-10 md:w-12 rounded-full cursor-pointer' src={user?.userImage} alt='' />}
                //     {dropdown && <div className="absolute right-8 bg-pink-300 top-[54px] rounded-md px-3 py-3 w-28 text-center">
                //         <ul>
                //             <Link href={`/authentication/user_profile/${user._id}`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Account</li></Link>
                //             {user.role !== ADMIN && <Link href={`/dashboard/tasks_list`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Tasks-List</li></Link>}
                //             {user.role === ADMIN && <Link href={`/dashboard/show_assign_task_list`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Assign Tasks</li></Link>}
                //             <Link href={`/dashboard/all_tasks_submission`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b whitespace-pre">My Submission</li></Link>
                //             <li  className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75 border-b">Logout</li>
                //         </ul>
                //     </div>}
                // </div>
                <Menu.Button className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                        <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                            Tom Cook
                        </span>
                        <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                </Menu.Button>
            }

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <Menu.Item >
                        {({ active }) => (
                            <p
                                className={classNames(
                                    active ? 'bg-gray-200 font-medium' : '',
                                    'block px-3 py-1 text-md leading-6 text-gray-900'
                                )}
                            >Your Profile</p>
                        )}
                    </Menu.Item>
                    <Menu.Item >
                        {({ active }) => (
                            <p
                                className={classNames(
                                    active ? 'bg-gray-200 font-medium' : '',
                                    'block px-3 py-1 text-md leading-6 text-gray-900'
                                )}
                            >Sign out</p>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default Profile;