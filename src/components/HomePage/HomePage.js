import React, { useEffect, useState } from 'react';
import { BsBagPlus, BsBookmarkCheck, BsJournalBookmarkFill, BsPencilSquare } from 'react-icons/bs';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { TbCurrencyTaka } from 'react-icons/tb';
import { GoPrimitiveDot } from 'react-icons/go';
import Chart from './Chart';
import { FaUsers } from 'react-icons/fa';
import { LargeSpinner } from '../Spinner';
import { MdGroupOff } from 'react-icons/md';
import { Private } from '@/utils/ProtectRoute';
import { useSelector } from 'react-redux';
import { useGetDeshbordDataQuery } from '@/app/features/others/othersApi';

const HomePage = () => {

    const { user, isLoading } = useSelector((state) => state.auth);

    const { data, isLoading: isLoading2, isError, error } = useGetDeshbordDataQuery(`/dashbord`);
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
                <section className="grid grid-cols-1 smm:grid-cols-2 mdd:grid-cols-3 lg:grid-cols-4  gap-4 xl:gap-6 text-[30px]">
                    <div className="border text-white bg-[#4e36e2] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1'><BsPencilSquare className='text-2xl text-white' /></p>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-base'>
                                <p className=''>Total Business Data</p>
                            </div>
                            <div className='font-bold font-sans text-end text-2xl'>
                                <span >{data?.data?.totalDataEntry}</span>
                            </div>

                        </div >
                    </div>
                    <div className="border text-white bg-[#48a9f8] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1'><BsPencilSquare className='text-2xl text-white' /></p>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-base'>
                                <p className=''>Total staff</p>
                            </div>
                            <div className='font-bold font-sans text-end text-2xl'>
                                <span >{data?.data?.totalUser}</span>
                            </div>

                        </div >
                    </div>
                    <div className="border text-white bg-[#1ad588] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1'><BsPencilSquare className='text-2xl text-white' /></p>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-base'>
                                <p className=''>Total Active Campaing</p>
                            </div>
                            <div className='font-bold font-sans text-end text-2xl'>
                                <span >{data?.data?.totalActiveCampaing}</span>
                            </div>

                        </div >
                    </div>
                    <div className="border text-white bg-[#60803b] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1'><BsPencilSquare className='text-2xl text-white' /></p>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-sm font-bold lgg:text-base'>
                                <p className=''>Total Interested customer</p>
                            </div>
                            <div className='font-bold font-sans text-end text-xl lgg:text-2xl'>
                                <span >{data?.data?.totalInterested}</span>
                            </div>

                        </div >
                    </div>
                    <div className="border text-white bg-[#508baa] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1'><BsPencilSquare className='text-2xl text-white' /></p>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-sm font-bold lgg:text-base'>
                                <p className=''>Not Interested customer</p>
                            </div>
                            <div className='font-bold font-sans text-end text-xl lgg:text-2xl'>
                                <span >{data?.data?.totalNot_interested}</span>
                            </div>

                        </div >
                    </div>
                    <div className="border text-white bg-[#1d7ca5] w-full p-4 shadow rounded-xl flex justify-between items-center h-28">
                        <p className='border-2 border-white rounded-md p-1'><BsPencilSquare className='text-2xl text-white' /></p>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-sm font-bold lgg:text-base'>
                                <p className=''>Not sure customer</p>
                            </div>
                            <div className='font-bold font-sans text-end text-xl lgg:text-2xl'>
                                <span >{data?.data?.totalNot_sure}</span>
                            </div>

                        </div >
                    </div>



                </section>
                <section className='flex gap-5 py-3'>
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
                </section>

            </section>
            <div className='col-span-4'>

            </div>
        </div>
    );
};

export default Private(HomePage);