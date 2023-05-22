import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import {
    ChartPieIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'
import { BsPencilSquare } from 'react-icons/bs';
import { FaUsersCog } from 'react-icons/fa';
import { FcVoicePresentation } from 'react-icons/fc';
import { TbListDetails } from 'react-icons/tb';
import { MdFormatListBulletedAdd, MdOutlineAddLocationAlt, MdOutlineCampaign, MdOutlineCategory } from 'react-icons/md';
import { VscCompassActive, VscHistory } from 'react-icons/vsc';
import { FiUserPlus } from 'react-icons/fi';
import { BiLineChartDown, BiNetworkChart } from 'react-icons/bi';
import { useSelector } from 'react-redux';
// const GetUserId = () => {
//     const { user } = useSelector((state) => state.auth)
//     return user?._id;
// }
export const adminDashboardItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },
    {
        name: 'Staff Management',
        current: false,
        children: [
            { name: 'Create New User', icon: FiUserPlus, href: '/authentication/ac_register' },
            { name: 'Employee List', icon: FaUsersCog, href: '/authentication/employee_list' },
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
            { name: 'Create Campaign', icon: MdOutlineCampaign, href: '/dashboard/campaign/create_campaign' },
            { name: 'Active Campaign', icon: VscCompassActive, href: '/dashboard/campaign/active_campaign' },
            { name: 'Campaign History', icon: VscHistory, href: '/dashboard/campaign/campaign_history' },
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
    { name: 'Address', href: '/all_list_enquiry/address_enquiry', icon: MdOutlineAddLocationAlt, current: false },
    // {
    //     name: 'Facebook Group',
    //     current: false,
    //     children: [
    //         { name: 'Entire Group', icon: UsersIcon, href: '/dashboard/group_entire' },
    //         { name: 'Group Data List', icon: FaUsersCog, href: '/dashboard/group_data_list' },
    //     ],
    // },
    // { name: 'Send Email', icon: FcVoicePresentation, href: '', current: false },
    // { name: 'Reports', icon: ChartPieIcon, href: '', current: false },
];
export const marketerDashboardItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },
    {
        name: 'Staff Management',
        current: false,
        children: [
            { name: 'Employee List', icon: FaUsersCog, href: '/authentication/employee_list' },
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
            { name: 'Create Campaign', icon: MdOutlineCampaign, href: '/dashboard/campaign/create_campaign' },
            { name: 'Active Campaign', icon: VscCompassActive, href: '/dashboard/campaign/active_campaign' },
            { name: 'Campaign History', icon: VscHistory, href: '/dashboard/campaign/campaign_history' },
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
    { name: 'Address', href: '/all_list_enquiry/address_enquiry', icon: MdOutlineAddLocationAlt, current: false },
];

export const teleMarketerDashboardItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },
    { name: 'My Work List', href: `/dashboard/employee_task/my_current_task`, icon: BiNetworkChart, current: false },
    // { name: 'My Submission', href: '/dashboard/employee_task/my_submission_task', icon: ChartPieIcon, current: false },
    // { name: 'Add new Form', icon: BsPencilSquare, href: '/dashboard/new_form' },
    { name: 'Entry Data List', icon: TbListDetails, href: '/dashboard/employee_task/my_entry_data_list' },
    { name: 'Enumeration', href: '/all_list_enquiry/address_enquiry', icon: BiLineChartDown, current: false },
]