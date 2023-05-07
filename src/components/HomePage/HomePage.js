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

const HomePage = () => {
    const [allBookingAndOrder, setAllBookingAndOrder] = useState({
        booking: 0,
        order: 0,
        totalBalance: 0
    })
    useEffect(() => {
       
    }, []);

    const { data, isLoading, isError, error } = { role: "user", keyword: "" }
    const { data: bookingData, isLoading: isLoading1, isError: isError1, error: error1 } = { keyword: "" }
    
    
    // if (isLoading || isLoading1) {
    //     return <LargeSpinner></LargeSpinner>
    // };
    // if (isError || isError1) {
    //     if (error.error) {
    //       return <div className='text-center my-10 md:my-52'>
    //             <p className="text-2xl text-red-500">{error.error}</p>
    //         </div>
    //     } else {
    //         return <div className='text-center my-10 md:my-52'>
    //             <p className="text-2xl text-red-500">{error.data.message}</p>
    //         </div>
    //     }
    // };

    return (
        <div className='w-full mx-auto p-4 grid grid-cols-12 gap-2'>
            <section className='col-span-8'>
                <Chart></Chart>
                <div className="grid grid-cols-1 smm:grid-cols-2 lg:grid-cols-2 lgg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
                    <div className="border bg-blue-200 w-full p-4 rounded-sm shadow">
                        <p><BsPencilSquare className='text-2xl text-orange-500 mb-1' /></p>
                        <hr className='mb-3 h-[2px] bg-white' />
                        <div className='font-bold font-sans text-xl'>
                            <span >{5656}</span>
                        </div>
                        <div className='flex justify-between'>
                            <p className=''>Total Data Entry</p>
                        </div>
                    </div>
                    <div className="border bg-blue-100 w-full p-4 rounded-sm shadow">
                        <p><BsBagPlus className='text-2xl text-orange-500 mb-1' /></p>
                        <hr className='mb-3 h-[2px] bg-white' />
                        <div className='font-bold font-sans text-xl'>
                            <span >{644}</span>
                        </div>
                        <div className='flex justify-between'>
                            <p className=''>Complete Data</p>
                        </div>
                    </div>
                    <div className="border bg-green-200 w-full p-4 rounded-sm shadow">
                        <p><FaUsers className='text-2xl text-orange-500 mb-1' /></p>
                        <hr className='mb-3 h-[2px] bg-white' />
                        <div className='font-bold font-sans text-xl'>
                            <span >{445}</span>
                        </div>
                        <div className='flex justify-between'>
                            <p className=''>Total Employee</p>
                        </div>
                    </div>
                    <div className="border bg-orange-200 w-full p-4 rounded-sm shadow">
                        <p><BsJournalBookmarkFill className='text-2xl text-orange-500 mb-1' /></p>
                        <hr className='mb-3 h-[2px] bg-white' />
                        <div className='font-bold font-sans text-xl'>
                            <span >{46}</span>
                        </div>
                        <div className='flex justify-between'>
                            <p className=''>Total Group Entry</p>
                        </div>
                    </div>
                    <div className="border bg-red-200 w-full p-4 rounded-sm shadow">
                        <p><BsBookmarkCheck className='text-2xl text-orange-500 mb-1' /></p>
                        <hr className='mb-3 h-[2px] bg-white' />
                        <div className='font-bold font-sans text-xl'>
                            <span >{456}</span>
                            {/* <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' /> */}
                        </div>
                        <div className='flex justify-between'>
                            <p className=''>Total Pending</p>
                        </div>
                    </div>
                    <div className="border bg-indigo-200 w-full p-4 rounded-sm shadow">
                        <p><MdGroupOff className='text-2xl text-orange-500 mb-1' /></p>
                        <hr className='mb-3 h-[2px] bg-white' />
                        <div className='font-bold font-sans text-xl'>
                            <span >{4444} </span>
                        </div>
                        <div className='flex justify-between'>
                            <p className=''>Total Reject Entry</p>
                        </div>
                    </div>
                </div>
            </section>
            <div className='col-span-4'>

            </div>
        </div>
    );
};

export default Private(HomePage);