import React, { useEffect, useState } from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { BsArrowDown, BsArrowUp, BsBagPlus, BsBookmarkCheck, BsFillBookmarkCheckFill, BsPencilSquare } from 'react-icons/bs';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { TbCurrencyTaka } from 'react-icons/tb';
import { GoPrimitiveDot } from 'react-icons/go';
import Chart from './Chart';
import { FaUsers } from 'react-icons/fa';
import { LargeSpinner } from '../Spinner';

const HomePage = () => {
    const [allBookingAndOrder, setAllBookingAndOrder] = useState({
        booking: 0,
        order: 0,
        totalBalance: 0
    })

    const { data, isLoading, isError, error } = { role: "user", keyword: "" }
    const { data: bookingData, isLoading: isLoading1, isError: isError1, error: error1 } = { keyword: "" }
   
    let content;
    if (isLoading || isLoading1) {
        content = <LargeSpinner></LargeSpinner>
    };
    if (isError || isError1) {
        if (error.error) {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    };
    useEffect(() => {
        if (!isLoading1 && bookingData?.success) {
            const allOrder = bookingData.data.filter(item => item.bookingOrOrderPyment.payment)
            for (const i of allOrder) {
                setAllBookingAndOrder((current) => ({ ...current, totalBalance: current.totalBalance + i.bookingOrOrderPyment.payment_details.totalExpenseIncludesTax }))
            }
            for (const i of bookingData.data) {
                if (i.bookingOrOrderPyment.Type === 'booking') {
                    setAllBookingAndOrder((current) => ({ ...current, booking: current.booking + 1 }))
                } else {
                    setAllBookingAndOrder((current) => ({ ...current, order: current.order + 1 }))
                }
            }
        }

    }, [bookingData, isLoading1])

    return (
        content ||
        <div className='w-full max-w-[1500px] mx-auto p-4'>
            <main className='w-full grid mdd:grid-cols-1 lg:grid-cols-7 lgg:grid-cols-3 gap-4'>
                <section className='lg:col-span-4 lgg:col-span-2'>
                    <div className="grid grid-cols-1 smm:grid-cols-2 lg:grid-cols-2 lgg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
                        <div className="border bg-blue-200 w-full p-4 rounded-sm shadow">
                            <p><HiOutlineCurrencyDollar className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >{233345645}</span>
                                <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' />
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Balance</p>
                                <p className=''>+12%<BsArrowUp className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-blue-100 w-full p-4 rounded-sm shadow">
                            <p><BsBagPlus className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >{444644}</span>
                                <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' />
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Sales</p>
                                <p className=''>+12%<BsArrowUp className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-green-200 w-full p-4 rounded-sm shadow">
                            <p><BiBarChartAlt2 className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >0</span>
                                <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' />
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Expenses</p>
                                <p className=''>-12%<BsArrowDown className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-orange-200 w-full p-4 rounded-sm shadow">
                            <p><BsPencilSquare className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >{1446}</span>
                                {/* <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' /> */}
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Bookings</p>
                                <p className=''>-12%<BsArrowDown className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-red-200 w-full p-4 rounded-sm shadow">
                            <p><BsBookmarkCheck className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >{45644}</span>
                                {/* <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' /> */}
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Orders</p>
                                <p className=''>-12%<BsArrowDown className='inline' /></p>
                            </div>
                        </div>
                        <div className="border bg-indigo-200 w-full p-4 rounded-sm shadow">
                            <p><FaUsers className='text-2xl text-orange-500 mb-1' /></p>
                            <hr className='mb-3 h-[2px] bg-white' />
                            <div className='font-bold font-sans text-xl'>
                                <span >{4444} </span>
                                {/* <TbCurrencyTaka className='inline-block mb-[4px] text-2xl' /> */}
                            </div>
                            <div className='flex justify-between'>
                                <p className=''>Total Customer</p>
                                <p className=''>-12%<BsArrowUp className='inline' /></p>
                            </div>
                        </div>
                    </div>
                    <Chart></Chart>
                   
                </section>
                <section className='lg:col-span-3 lgg:col-span-1'>
                    <div className='bg-gray-800 p-4 text-white'>
                        <h3 className='text-2xl md:text-xl xl:text-4xl'>Monthly Profits</h3>
                        <p className='text-gray-300 mb-2 text-lg md:text-sm xl:text-lg'>Total Profit Groth of 26%</p>
                        <div className='flex justify-between'>
                            <div>
                                <h5 className='text-lg md:text-sm xl:text-lg text-gray-300'><GoPrimitiveDot className='inline' />Maintenance</h5>
                                <h3 className='text-2xl md:text-lg xl:text-2xl font-semibold ml-4'>16%</h3>
                                <h5 className='text-lg md:text-sm xl:text-lg text-gray-300'><GoPrimitiveDot className='inline' />Giveaway</h5>
                                <h3 className='text-2xl md:text-lg xl:text-2xl font-semibold ml-4'>16%</h3>
                                <h5 className='text-lg md:text-sm xl:text-lg text-gray-300'><GoPrimitiveDot className='inline' />Online Sales</h5>
                                <h3 className='text-2xl md:text-lg xl:text-2xl font-semibold ml-4'>16%</h3>
                                <h5 className='text-lg md:text-sm xl:text-lg text-gray-300'><GoPrimitiveDot className='inline' />Offline Sales</h5>
                                <h3 className='text-2xl md:text-lg xl:text-2xl font-semibold ml-4'>16%</h3>
                            </div>
                            <div className='grow flex justify-center items-center'>
                                <div className='bg-white rounded-full p-1 w-[80%] h-[80%]'>
                                    <div className=' bg-gray-700 rounded-full w-full h-full p-1'>
                                        <div className='bg-red-400 rounded-full w-full h-full flex justify-center items-center'>
                                            <h1 className='text-3xl font-bold font-serif'>Good</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default HomePage;