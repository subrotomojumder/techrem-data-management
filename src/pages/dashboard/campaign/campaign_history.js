import { DateRangeInput } from '@/components/Forms/Inputs';
import UserInput from '../../../components/Forms/UserInput';
import { MarketerProtect } from '@/utils/ProtectRoute';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React, { useState } from 'react';
import { TbFilter, TbFilterOff } from 'react-icons/tb';
import AddressInput from '@/components/Forms/AddressInput';
import { LargeSpinner } from '@/components/Spinner';
import PaginationBar from '@/components/PaginationBar';
import { useGetCampaignQuery } from '@/app/features/campaignManage/campaignManageApi';
import { useSelector } from 'react-redux';
import { MARKETER } from '@/utils/constant';

const Campaign_history = () => {
    const { user, isLoading: userLoading } = useSelector((state) => state.auth);
    const [openFilter, setOpenFilter] = useState(false);
    const [queryData, setQueryData] = useState({});
    const [selectedAddress, setSelectedAddress] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [stockLimit, setStockLimit] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const { data, isLoading, isError, error } = useGetCampaignQuery(`?skip=${(currentPage - 1) * stockLimit}&limit=${stockLimit}&active=${queryData?.status || ''}&country=${selectedAddress?.country || ''}&state=${selectedAddress?.state || ""}&city=${selectedAddress?.city || ""}&campaign_objective=${queryData?.campaign_objective || ''}&create_date=${!endDate && startDate ? startDate : ''}&startDate=${startDate && endDate ? startDate : ""}&endDate=${startDate && endDate ? endDate : ""}&keyword=${queryData?.keyword || ''}${user.role === MARKETER && `&executor_id=${user._id}`}`, { skip: !user });
    if (isLoading || userLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.error) {
            return <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            return <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    }
    return (
        <div className='w-full max-w-[1400px] mx-auto mdd:px-8'>
            <div className="px-2 smm:px-6 mdd:px-6 xl:px-8 py-4 sm:py-4 my-2 smm:my-6 bg-white shadow-sm rounded-lg min-h-screen">
                <div className='flex justify-between items-center px-2 md:px-4 mb-1'>
                    <h2 className="text-xl md:text-2xl  font-medium smm:font-semibold leading-5 lg:leading-10 text-gray-900">Campaign History</h2>
                    <div className='flex-1 flex justify-end items-center gap-3'>
                        <button
                            onClick={() => setOpenFilter(c => (!c))} type="button"
                            className="rounded-md bg-white pl-4 pr-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        >
                            Filters {openFilter ? <TbFilterOff className={`inline-block ml-4`} /> : <TbFilter className={`inline ml-4`} />}
                        </button>
                        {/* <Link href={`/dashboard/campaign/create_campaign`}>
                            <button
                                type="button"
                                className="rounded-md bg-indigo-600 whitespace-pre px-2.5 py-1.5 text-md md:text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                + Create Campaign
                            </button>
                        </Link> */}
                    </div>
                </div>
                <div className={`w-full flex justify-between items-center gap-2 ${openFilter ? "block" : "hidden"} duration-300 bg-slate-100 shadow-sm px-3 py-2 `}>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[6px] pr-1 border-r ">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            onChange={(e) => setQueryData(c => ({ ...c, keyword: e.target.value }))}
                            className="block w-full min-w-[200px] max-w-sm rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                            type="search" id="search" placeholder="Staff Campaign name"
                        />
                    </div>
                    <div className='flex-1 flex justify-end items-center gap-2'>
                        <AddressInput selectedValue={selectedAddress} setSelectedValue={setSelectedAddress}></AddressInput>
                        {/* <UserInput selectedUser={selectedUser} setSelectedUser={setSelectedUser} placeHolder={"Operator"} wornClass={{ input: "placeholder:text-gray-600 rounded-md bg-white pl-4 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" }}></UserInput> */}
                        {/*  <input
                            // onChange={(e) => setQueryData(c => ({ ...c, createDate: format(new Date(e.target.value), 'yyyy-MM-dd') }))}
                            type="date" value={queryData.createDate || ''}
                            className="rounded-md bg-white pl-2 pr-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        /> */}
                        <DateRangeInput dateRange={dateRange} setDateRange={setDateRange}></DateRangeInput>
                        <select
                            onChange={(e) => setQueryData(c => ({ ...c, campaign_objective: e.target.value }))}
                            className="text-sm bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 py-1 lg:py-1.5 leading-8 transition-colors duration-200 ease-in-out"
                        >
                            <option value='' selected >Objective</option>
                            <option value={'data_entry'}>Data Entry</option>
                            <option value={'marketing'}>Marketing</option>
                        </select>
                        <select
                            onChange={(e) => setQueryData(c => ({ ...c, status: e.target.value }))}
                            className="text-sm bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 py-1 lg:py-1.5 leading-8 transition-colors duration-200 ease-in-out"
                        >
                            <option value='' selected >Status</option>
                            <option value={true}>Active</option>
                            <option value={false}>Not Yet</option>
                        </select>
                        <button
                            onClick={() => {
                                setQueryData({});
                                setSelectedAddress({});
                            }}
                            className="rounded-md bg-white pl-3 pr-3 py-1 lg:py-1.5 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        >
                            Reset
                        </button>
                    </div>
                </div>
                <hr className='mb-6 bg-gray-300 h-[2px]  mt-2' />
                {data?.data?.length ? <div className='flex flex-wrap gap-4 xl:gap-8'>
                    {data?.data?.map((camp) => <Link className='w-full smm:w-fit' key={camp._id} href={`/dashboard/campaign/campaign_view/${camp.campaign_objective}/${camp._id}`}>
                        <div className='smm:min-h-[17.5rem]  min-w-[280px] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-50 duration-300 rounded-lg p-2 relative border drop-shadow-sm hover:outline outline-1 outline-indigo-500 sm:mx-4 smm:mx-0'>
                            <div className='w-full h-full flex sm:flex-row sm:justify-start smm:flex-col smm:justify-between smm:items-center smm:gap-2 smm:pb-2'>
                                <div className="h-[90px] w-[90px]">
                                    <img
                                        className="h-full w-full rounded-full"
                                        src={camp.staff_info?.account_id?.userImage} alt={"user image"}
                                    />
                                </div>
                                <div className='h-full flex flex-col justify-center items-center smm:items-start gap-2'>
                                    <ul className=' ml-5 smm:ml-0 smm:mt-2 list-disc space-y-1'>
                                        <li className='text-sm font-semibold text-green-600 capitalize'>{camp?.campaign_objective}</li>
                                        <li className='text-sm font-semibold text-gray-900 mb-1'><span>{camp?.campaign_name}</span></li>
                                        {camp.campaign_objective === "marketing" &&
                                            <li className='text-sm capitalize'>Business Data - {camp.dataIds.length}</li>
                                        }
                                        <li className='text-sm '>Staff {camp.staff_info?.name}</li>
                                        <li className='text-sm '>{new Date(camp.assign_date?.start).toLocaleDateString()} To {new Date(camp.assign_date?.end).toLocaleDateString()}</li>
                                        <li className='text-sm  capitalize'>{camp?.area?.city && camp?.area?.city + ','} {camp?.area?.state && camp?.area?.state + ','} {camp?.area?.country}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Link>)}
                </div>
                    :
                    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                      
                      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">No Campaign found</h1>
                      <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the Campaign looking for.</p>
                      
                    </div>
                  </main>
                }
            </div>
            <div className='w-full px-4 lg:px-6 py-2'>
                <PaginationBar totalDataLength={data.totalData} stockLimit={stockLimit} setStockLimit={setStockLimit} currentPage={currentPage} setCurrentPage={setCurrentPage}></PaginationBar>
            </div>
        </div>
    );
};

export default MarketerProtect(Campaign_history);