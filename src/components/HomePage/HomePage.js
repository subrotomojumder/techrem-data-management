import React, { useEffect, useState } from 'react';
import { BsBagPlus, BsBookmarkCheck, BsJournalBookmarkFill, BsPencilSquare } from 'react-icons/bs';
import { BiBarChartAlt2, BiListPlus } from 'react-icons/bi';
import { TbCurrencyTaka, TbNotesOff } from 'react-icons/tb';
import { GoPrimitiveDot } from 'react-icons/go';
import Chart from './Chart';
import { FaUsers } from 'react-icons/fa';
import { LargeSpinner } from '../Spinner';
import { MdGroupOff, MdOutlineDoNotDisturbOff, MdWorkOutline } from 'react-icons/md';
import { Private } from '@/utils/ProtectRoute';
import { useSelector } from 'react-redux';
import { useGetDeshbordDataQuery } from '@/app/features/others/othersApi';
import { useRouter } from 'next/router';
import { ADMIN } from '@/utils/constant';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { VscSymbolInterface } from 'react-icons/vsc';

const HomePage = () => {
    const router = useRouter()
    const { user, isLoading } = useSelector((state) => state.auth);

    const { data, isLoading: isLoading2, isError, error } = useGetDeshbordDataQuery(`/dashboard`, { skip: !user, refetchOnMountOrArgChange: true });
    console.log(data?.data)
    /*  const { data, isLoading, isError, error } = { role: "user", keyword: "" }
     const { data: bookingData, isLoading: isLoading1, isError: isError1, error: error1 } = { keyword: "" } */
    if (isLoading2 || isLoading) {
        return <LargeSpinner></LargeSpinner>
    };

    if (isError) {
        if (error.error) {
            return <div className='text-center my-10 md:my-52'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            return <div className='text-center my-10 md:my-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    };
    const userBio = `Efficiently visualize world-class internal or "organic" sources for accurate synergy`

    return (
        <div className='w-full mx-auto p-4 grid grid-cols-12 gap-2 min-h-screen'>
            <section className='col-span-12'>
                {/* <Chart></Chart> */}
                <section className="grid grid-cols-1 smm:grid-cols-2 mdd:grid-cols-3   gap-4 xl:gap-6 text-[30px]">
                    <div className="border text-white bg-[#4e36e2] w-full p-4 shadow rounded-xl flex justify-between items-center h-28 ">
                        <p className='border-2 border-white rounded-md p-1 w-9 h-9'><BiListPlus className='text-2xl text-white' /></p>
                        <div className='space-y-2'>

                            <p className='text-end font-normal text-base lggg:text-lg'>Total Business Data</p>

                            <div className='font-bold font-sans text-end text-2xl'>
                                <span >{data?.data?.totalDataEntry}</span>
                            </div>

                        </div >
                    </div>
                    {user.role === ADMIN && <div className="border text-white bg-[#48a9f8] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1 w-9 h-9'><AiOutlineUsergroupAdd className='text-2xl text-white' /></p>
                        <div className='space-y-2'>

                            <p className='text-end font-normal text-base lggg:text-lg'>Total staff</p>

                            <div className='font-bold font-sans text-end text-2xl'>
                                <span >{data?.data?.totalUser}</span>
                            </div>

                        </div >
                    </div>}
                    <div className="border text-white bg-[#1ad588] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1 w-9 h-9'><MdWorkOutline className='text-2xl text-white' /></p>
                        <div className='space-y-2'>

                            <p className='text-end font-normal text-base lggg:text-lg'>{user.role === ADMIN ? 'Total Active Campaign' : "Accepted Campaign"}</p>

                            <div className='font-bold font-sans text-end text-2xl'>
                                <span >{user.role === ADMIN ? data?.data?.totalActiveCampaing : data.data.totalAcceptingCampaing}</span>
                            </div>
                        </div >
                    </div>
                    <div className="border text-white bg-[#60803b] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1 w-9 h-9'><VscSymbolInterface className='text-2xl text-white' /></p>
                        <div className='space-y-2'>

                            <p className='text-end font-normal text-base lggg:text-lg'>Total Interested customer</p>

                            <div className='font-bold font-sans text-end text-xl lgg:text-2xl'>
                                <span >{user.role === ADMIN ? data?.data?.totalInterested : data?.data?.myProcessDataCount?.totalInterestedData}</span>
                            </div>

                        </div >
                    </div>
                    <div className="border text-white bg-[#508baa] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1 w-9 h-9'><MdOutlineDoNotDisturbOff className='text-2xl text-white' /></p>
                        <div className='space-y-2'>

                            <p className='text-end font-normal text-base lggg:text-lg'>Not Interested customer</p>

                            <div className='font-bold font-sans text-end text-xl lgg:text-2xl'>
                                <span >{user.role === ADMIN ? data?.data?.totalNot_interested : data?.data?.myProcessDataCount?.totalNot_interestedData}</span>
                            </div>

                        </div >
                    </div>
                    <div className="border text-white bg-[#1d7ca5] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1 w-9 h-9'><TbNotesOff className='text-2xl text-white' /></p>
                        <div className='space-y-2'>

                            <p className='text-end font-normal text-base lggg:text-lg'>Not sure customer</p>

                            <div className='font-bold font-sans text-end text-xl lgg:text-2xl'>
                                <span >{user.role === ADMIN ? data?.data?.totalNot_sure : data?.data?.myProcessDataCount?.totalNot_sureData}</span>
                            </div>

                        </div >
                    </div>
                </section>
                {/* <section className='flex gap-5 py-3'>
                    <div className='max-w-sm min-w-min h-fit  pt-8 pb-4 mdd:pb-10 bg-white border rounded-md px-0 xl:px-10'>
                        <div className='text-center relative'>
                            <figure className='relative'>
                                <img className='rounded-full w-28 h-28 mx-auto p-[2px]' src={`https://images.unsplash.com/photo-1591084728795-1149f32d9866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=80&q=80`} alt="" />
                            </figure>
                            <h5 className='font-medium text-lg md:text-md lg:text-lg my-1 capitalize'>{`sampod chandra `}</h5>
                            <h6 className='capitalize text-base text-zinc-500 font-medium mb-1'>{"admin"}</h6>
                            <p className='capitalize '>{"noakhali,Bangladesh"}</p>

                            {userBio && <div className='p-4 text-left'>
                                <h5 className='underline underline-offset-2'>Bio:</h5>
                                <p className='text-justify'>{userBio}</p>
                            </div>}
                        </div>
                    </div>
                </section> */}
                <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="overflow-x-hidden overflow-y-auto rounded-lg bg-white md:min-h-[40vh] lgg:min-h-[60vh] px-4 py-5 shadow">
                        <div className="inline-block min-w-full py-2 align-middle px-4">
                            <h3 className='text-base font-medium underline underline-offset-2'>Recent Interested</h3>
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr className=''>
                                        <th scope="col" className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Business
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Address
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data?.data?.recentData?.recentInterestedData?.length ?
                                        data?.data?.recentData?.recentInterestedData?.map(({ businessDetails, address, _id, create_date }, i) => (
                                            <tr key={_id} className='hover:bg-slate-50 w-full'>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    <div className="flex items-center gap-x-4 group" onClick={() => router.push(`/dashboard/campaign/contact_manage/${_id}`)}>
                                                        <img src={businessDetails?.businessLogo} alt="Image" className="h-9 w-9 rounded-full bg-gray-800" />
                                                        <div className="truncate font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200 ">
                                                            <p>
                                                                {businessDetails?.businessName}
                                                            </p>
                                                            <p>{new Date(create_date).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                 </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize truncate hover:text-clip">
                                                    <span>{address.country},</span> <br />
                                                    <span>{address.city}, {address.state}</span>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr><td className='py-20 w-full text-center text-red-400'>Empty !</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="overflow-x-hidden overflow-y-auto rounded-lg bg-white md:min-h-[40vh] lgg:min-h-[60vh] px-4 py-5 shadow">
                        <div className="inline-block min-w-full py-2 align-middle px-4">
                            <h3 className='text-base font-medium underline underline-offset-2'>Recent Not Interested</h3>
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr className=''>
                                        <th scope="col" className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Business
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Address
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data?.data?.recentData?.recentNot_interestedData?.length ?
                                        data?.data?.recentData?.recentNot_interestedData?.map(({ businessDetails, address, _id, create_date }, i) => (
                                            <tr key={_id} className='hover:bg-slate-50 w-full'>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    <div className="flex items-center gap-x-4 group" onClick={() => router.push(`/dashboard/campaign/contact_manage/${_id}`)}>
                                                        <img src={businessDetails?.businessLogo} alt="Image" className="h-9 w-9 rounded-full bg-gray-800" />
                                                        <div className="truncate font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200">
                                                            <p> {businessDetails?.businessName}</p>
                                                            <p>{new Date(create_date).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  capitalize truncate hover:text-clip">
                                                    <span>{address.country},</span> <br />
                                                    <span>{address.city}, {address.state}</span>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr><td className='py-20 w-full text-center text-red-400'>Empty !</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="overflow-x-hidden overflow-y-auto rounded-lg bg-white md:min-h-[40vh] lgg:min-h-[60vh] px-4 py-5 shadow">
                        <div className="inline-block min-w-full py-2 align-middle px-4">
                            <h3 className='text-base font-medium underline underline-offset-2'>Recent Not Sure</h3>
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead>
                                    <tr className=''>
                                        <th scope="col" className="py-3.5 pl-3 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                            Business
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Address
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data?.data?.recentData?.recentNot_sureData?.length ?
                                        data?.data?.recentData?.recentNot_sureData?.map(({ businessDetails, address, _id, create_date }, i) => (
                                            <tr key={_id} className='hover:bg-slate-50 w-full'>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    <div className="flex items-center gap-x-4 group" onClick={() => router.push(`/dashboard/campaign/contact_manage/${_id}`)}>
                                                        <img src={businessDetails?.businessLogo} alt="Image" className="h-9 w-9 rounded-full bg-gray-800" />
                                                        <div className="truncate font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200">
                                                            <p>{businessDetails?.businessName}</p>
                                                            <p>{new Date(create_date).toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500  capitalize truncate hover:text-clip">
                                                    <span>{address.country},</span> <br />
                                                    <span>{address.city}, {address.state}</span>
                                                </td>
                                            </tr>
                                        ))
                                        : <tr><td className='py-20 w-full text-center text-red-400'>Empty !</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Private(HomePage);