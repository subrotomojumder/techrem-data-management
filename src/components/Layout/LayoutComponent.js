import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import Footer from '../Footer';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutSet } from '@/app/features/users/userSlice';
import { ADMIN, MARKETER } from '@/utils/constant';
import techLogo from '../../assets/images/tech-logo.png';
import Image from 'next/image';
import { adminDashboardItems, marketerDashboardItems, teleMarketerDashboardItems } from '@/utils/dashboardItems';

export default function LayoutComponent({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let navigation = user?.role === ADMIN ? adminDashboardItems : user?.role === MARKETER ? marketerDashboardItems : teleMarketerDashboardItems;
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const allItems = navigation.map((item) => (
        <li key={item.name}>
            {!item.children ? (
                <Link
                    href={item.href}
                    className={classNames(
                        router.pathname == item.href
                            ? 'bg-indigo-500 text-white'
                            : 'hover:text-white hover:bg-indigo-500 drop-shadow-lg',
                        'group flex gap-x-3 rounded-md p-2 text-md leading-6 font-semibold'
                    )}
                >
                    <item.icon
                        className={classNames(
                            router.pathname == item.href ? 'text-white' : 'text-gray-500 group-hover:text-white',
                            'h-6 w-6 shrink-0'
                        )}
                        aria-hidden="true"
                    />
                    {item.name}
                </Link>
            ) : (
                <Disclosure as="div">
                    {({ open }) => (
                        <>
                            <Disclosure.Button
                                className={classNames(
                                    router.pathname == item.href ? 'bg-indigo-500 text-white' : 'hover:text-white hover:bg-indigo-400 ',
                                    'flex items-center justify-between w-full text-left rounded-md text-md p-2 gap-x-3 leading-6 font-semibold text-gray-600'
                                )}
                            >
                                <span className='text-lg font-bold'>{item.name}</span>
                                <ChevronRightIcon
                                    className={classNames(
                                        open ? 'rotate-90 text-gray-400' : 'text-gray-400',
                                        'h-5 w-5 shrink-0 text-sm'
                                    )}
                                    aria-hidden="true"
                                />
                            </Disclosure.Button>
                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                                {item.children.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            href={subItem.href}
                                            className={classNames(
                                                router.pathname == subItem.href ? 'bg-indigo-500 text-white' : 'hover:text-white hover:bg-indigo-500 ',
                                                'flex items-center w-full text-left rounded-md my-1 p-2 gap-x-3 text-md leading-6 font-semibold text-gray-700 group'
                                            )}
                                        >
                                            <subItem.icon
                                                className={classNames(
                                                    router.pathname == subItem.href ? 'text-white' : 'text-indigo-400 group-hover:text-white',
                                                    'h-6 w-6 shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {subItem.name}
                                        </Link>
                                    </li>
                                ))}
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            )}
        </li>
    ));

    const signOut = () => {
        dispatch(userLogoutSet());
        localStorage.removeItem("tech_token");
        setTimeout(() => router.replace('/'), 100);
    }
    if (!user.role) {
        return children
    }
    return (
        <section className='max-w-[1700px] mx-auto'>
            <div className='bg-gray-100'>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 bg-gray-50 px-6 pt-2 pb-4">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <Image
                                                // className="h-8 w-auto"
                                                height={100} width={150}
                                                src={techLogo}
                                                alt="Your Company"
                                            />
                                        </div>
                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {allItems}
                                                    </ul>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 bg-gray-50 px-6 py-4">
                        <div className="flex h-16 shrink-0 items-center">
                            <Image
                                // className="h-8 w-auto"
                                height={100} width={150}
                                src={techLogo}
                                alt="Your Company"
                            />
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {allItems}
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                {/* below code for the search bar */}
                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-gray-50 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Separator */}
                        <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form className="relative flex flex-1" action="#" method="GET">
                                {/* <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <input
                                    id="search-field"
                                    className="block h-full w-full bg-gray-50 outline-none border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                    placeholder="Search..."
                                    type="search"
                                    name="search"
                                /> */}
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
                                <Menu as="div" className="relative">
                                    {!user.userId ?
                                        <Link href={`/authentication/login`}>
                                            <button className='text-md text-green-500 hover:text-white border border-green-400 hover:border-white hover:bg-green-400 px-2 py-[2px] rounded-md duration-75'>login</button>
                                        </Link>
                                        :
                                        <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-11 w-11 rounded-full bg-gray-50 border border-blue-300"
                                                src={user?.userImage}
                                                alt=""
                                            />
                                            <span className="hidden lg:flex lg:items-center">
                                                <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                                                    {user.fast_name}
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
                                                <Link href={`/authentication/view_profile/${user._id}`}>
                                                    <button
                                                        className={`w-full px-3 py-1 text-md leading-6 text-gray-700 hover:bg-gray-200 font-medium`}
                                                    >Profile</button>
                                                </Link>
                                            </Menu.Item>
                                            <Menu.Item >
                                                <button
                                                    onClick={signOut}
                                                    className={`w-full px-3 py-1 text-md leading-6 text-gray-700 hover:bg-gray-200 font-medium`}
                                                >Sign out</button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <main className="bg-gray-100">
                        {children}
                        <Footer></Footer>
                    </main>
                </div>
            </div>
        </section>
    )
}
