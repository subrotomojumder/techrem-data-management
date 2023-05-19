import { DateRangeInput } from '@/components/Forms/Inputs';
import UserInput from '../../../components/Forms/UserInput';
import { MarketerProtect } from '@/utils/ProtectRoute';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React, { useState } from 'react';
import { TbFilter, TbFilterOff } from 'react-icons/tb';
import AddressInput from '@/components/Forms/AddressInput';

const Active_campaign = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [queryData, setQueryData] = useState({});
    const [selectedAddress, setSelectedAddress] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    return (
        <div className='w-full max-w-[1400px] mx-auto mdd:px-8'>
            <div className="px-2 smm:px-6 mdd:px-6 xl:px-8 py-4 sm:py-6 xl:py-6 my-2 smm:my-6 bg-white shadow-sm rounded-lg min-h-screen">
                <div className='flex justify-between items-center px-2 md:px-4 mb-1'>
                    <h2 className="text-xl md:text-2xl  font-medium smm:font-semibold leading-5 lg:leading-10 text-gray-900">Active Campaign</h2>
                    <div className='flex-1 flex justify-end items-center gap-3'>
                        <button
                            onClick={() => setOpenFilter(c => (!c))} type="button"
                            className="rounded-md bg-white pl-4 pr-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        >
                            Filters {openFilter ? <TbFilterOff className={`inline-block ml-4`} /> : <TbFilter className={`inline ml-4`} />}
                        </button>
                        <Link href={`/dashboard/campaign/create_campaign`}>
                            <button
                                type="button"
                                className="rounded-md bg-indigo-600 whitespace-pre px-2.5 py-1.5 text-md md:text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                + Create Campaign
                            </button>
                        </Link>
                    </div>
                </div>
                <div className={`w-full flex justify-between items-center gap-2 ${openFilter ? "block" : "hidden"} duration-300 bg-slate-100 shadow-sm px-3 py-2 `}>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[6px] pr-1 border-r ">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            // onChange={(e) => setQueryData(c => ({ ...c, keyword: e.target.value }))}
                            className="block w-full min-w-[200px] max-w-sm rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                            type="search" id="search" placeholder="Search"
                        />
                    </div>
                    <div className='flex-1 flex justify-end items-center gap-2'>
                        <AddressInput selectedValue={selectedAddress} setSelectedValue={setSelectedAddress}></AddressInput>
                        <UserInput selectedUser={selectedUser} setSelectedUser={setSelectedUser} placeHolder={"Operator"} wornClass={{ input: "placeholder:text-gray-600 rounded-md bg-white pl-4 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" }}></UserInput>
                        <input
                            // onChange={(e) => setQueryData(c => ({ ...c, createDate: format(new Date(e.target.value), 'yyyy-MM-dd') }))}
                            type="date" value={queryData.createDate || ''}
                            className="rounded-md bg-white pl-2 pr-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        />
                        <DateRangeInput dateRange={dateRange} setDateRange={setDateRange}></DateRangeInput>
                    </div>
                </div>
                <hr className='mb-6 bg-gray-300 h-[2px]  mt-2' />
                <div className='grid sm:grid-cols-1 smm:grid-cols-2 mdd:grid-cols-3 xl:grid-cols-4 gap-6'>
                    {[{ _id: 2 }, { _id: 1 }, { _id: 1 }, { _id: 1 }, { _id: 1 }].map((camp) => <div key={camp._id} className='rounded-lg p-2 relative border drop-shadow-sm hover:outline outline-2 outline-indigo-500 sm:mx-4 smm:mx-0'>
                        <div className='flex sm:flex-row sm:justify-start smm:flex-col smm:gap-2 smm:pb-2'>
                            <img className='min-h-[10%] max-h-[120px] smm:max-h-full smm:w-full md:max-h-[150px]' src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfD9Nty-7-7Cg5zAe67qSrGk8HkTKbmbqZdg&usqp=CAU'} alt={"name"} />
                            <div className='ml-2 sm:ml-4 smm:ml-0 flex flex-col justify-center items-center gap-2'>
                                <div className='smm:text-center smm:mt-2'>
                                    <h5 className='text-md font-semibold text-gray-800'><span>{"Noakhali Robin Campaign"}</span></h5>
                                    <p className='text-md font-semibold text-green-600'>{"New Campaign"}</p>
                                    <p className='text-sm font-semibold my-2'>{"Noakhali, Bangladesh, Sonapur"}</p>
                                </div>
                            </div>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default MarketerProtect(Active_campaign);