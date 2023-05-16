import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    ChartPieIcon,
    HomeIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, ChevronRightIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import Footer from '../Footer';
import { BsPencilSquare } from 'react-icons/bs';
import { FaUsersCog } from 'react-icons/fa';
import { FcVoicePresentation } from 'react-icons/fc';
import { TbActivity, TbListDetails } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { userLogoutSet } from '@/app/features/users/userSlice';
import { ADMIN } from '@/utils/constant';
import { MdFormatListBulletedAdd, MdOutlineAddLocationAlt, MdOutlineCampaign, MdOutlineCategory } from 'react-icons/md';
import { VscCompassActive, VscHistory } from 'react-icons/vsc';
import { FiUserPlus } from 'react-icons/fi';
import { BiListCheck } from 'react-icons/bi';
import techLogo from '../../assets/images/tech-logo.png';
import Image from 'next/image';

export default function LayoutComponent({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigation = [
        { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },
        {
            name: 'Staff Management',
            current: false,
            children: [
                { name: 'Create New User', icon: FiUserPlus, href: '/authentication/ac_register' },
                { name: 'Employee List', icon: ChartPieIcon, href: '/authentication/employee_list' },
            ],
        },
        {
            name: 'Data Management',
            current: false,
            children: [
                { name: 'Add new Form', icon: BsPencilSquare, href: '/dashboard/new_form' },
                { name: 'Business Data List', icon: TbListDetails, href: '/dashboard/entires_data_list' },
                { name: 'Category Enquiry', icon: MdOutlineCategory, href: '/all_list_enquiry/category_enquiry' },
            ],
        },
        {
            name: 'Campaign Manage',
            current: false,
            children: [
                { name: 'Create Campaign', icon: MdOutlineCampaign, href: '/dashboard/assign_task' },
                { name: 'Active Campaign', icon: VscCompassActive, href: '' },
                { name: 'Campaign History', icon: VscHistory, href: '' },
            ],
        },
        {
            name: 'Our Services',
            current: false,
            children: [
                { name: 'Services list', icon: MdFormatListBulletedAdd, href: '/all_list_enquiry/our_service/service-list' },
                { name: 'Service Create', icon: VscCompassActive, href: '/all_list_enquiry/our_service/create-service' },
            ],
        },
        // {
        //     name: 'Facebook Group',
        //     current: false,
        //     children: [
        //         { name: 'Entire Group', icon: UsersIcon, href: '/dashboard/group_entire' },
        //         { name: 'Group Data List', icon: FaUsersCog, href: '/dashboard/group_data_list' },
        //     ],
        // },
        { name: 'Send Email', icon: FcVoicePresentation, href: '', current: false },
        { name: 'Address', href: '/all_list_enquiry/address_enquiry', icon: MdOutlineAddLocationAlt, current: false },
        // { name: 'Staff Activity log', icon: TbActivity, href: '/', current: false },

        { name: 'Reports', icon: ChartPieIcon, href: '', current: false },
    ]

    const teams = [
        { id: 1, name: 'Heroicons', href: '', initial: 'H', current: false },
        { id: 2, name: 'Tailwind Labs', href: '', initial: 'T', current: false },
        { id: 3, name: 'Workcation', href: '', initial: 'W', current: false },
    ]

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
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 pt-2 pb-4">
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
                                                <li>
                                                    <div className="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
                                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                                        {teams.map((team) => (
                                                            <li key={team.name}>
                                                                <a
                                                                    href={team.href}
                                                                    className={classNames(
                                                                        team.current
                                                                            ? 'bg-indigo-700 text-white'
                                                                            : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                                    )}
                                                                >
                                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                                                        {team.initial}
                                                                    </span>
                                                                    <span className="truncate">{team.name}</span>
                                                                </a>
                                                            </li>
                                                        ))}
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
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 py-4">
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
                                <li>
                                    <div className="text-xs font-semibold leading-6 text-indigo-200">Your teams</div>
                                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                                        {teams.map((team) => (
                                            <li key={team.name}>
                                                <a
                                                    href={team.href}
                                                    className={classNames(
                                                        team.current
                                                            ? 'bg-indigo-700 text-white'
                                                            : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                                    )}
                                                >
                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-indigo-400 bg-indigo-500 text-[0.625rem] font-medium text-white">
                                                        {team.initial}
                                                    </span>
                                                    <span className="truncate">{team.name}</span>
                                                </a>
                                            </li>
                                        ))}
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
                                <label htmlFor="search-field" className="sr-only">
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
                                />
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
                                                src={"https://cdn-icons-png.flaticon.com/512/5231/5231019.png"}
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
                                            {user.role !== ADMIN && <Menu.Item >
                                                <Link href={`/dashboard/tasks_list`}>
                                                    <button
                                                        className={`w-full px-3 py-1 text-md leading-6 text-gray-700 hover:bg-gray-200 font-medium`}
                                                    >Task-List</button>
                                                </Link>
                                            </Menu.Item>}
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
