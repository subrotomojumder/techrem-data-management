import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React, { useState, Fragment } from 'react';
import { FiEdit, FiFilter } from 'react-icons/fi';
import { GoPrimitiveDot } from 'react-icons/go';
import { TbArrowsDownUp } from 'react-icons/tb';
import { useGetEmployeeByQueQuery } from '@/app/features/users/userApi';
import { LargeSpinner } from '../Spinner';
import AddressInput from '../Forms/AddressInput';
import { ADMIN, BILLING_TEAM, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import PaginationBar from '../PaginationBar';
import { IoMdCheckmark } from 'react-icons/io';
import { BsArrowLeftShort } from 'react-icons/bs';
import Swal from 'sweetalert2';

const AllUserForCampaign = ({ setTogglePage, campaignData, createCampaignFunc }) => {
    const [openFilter, setOpenFilter] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [queryData, setQueryData] = useState({});
    const [stockLimit, setStockLimit] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError, error } = useGetEmployeeByQueQuery(`skip=${(currentPage - 1) * stockLimit}&limit=${stockLimit}&role=${queryData.role || ''}&keyword=${queryData.keyword || ''}&country=${selectedAddress.country || ""}&state=${selectedAddress.state || ""}&city=${selectedAddress.city || ""}&sort=${queryData?.sort || ''}&active=true`);
    const handleSelectUser = (user) => {
        Swal.fire({
            title: user.fast_name + ' ' + user.last_name,
            text: "Do you want to select the Staff?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm Assign!'
        }).then((result) => {
            if (result.isConfirmed) {
                const newData = {
                    campaign_name: campaignData?.campaign_name,
                    campaign_objective: campaignData?.objective,
                    staff_info: {
                        fast_name: user.fast_name,
                        last_name: user.last_name,
                        role: user.role,
                        account_id: user._id
                    },
                    dataIds: campaignData?.dataIds || [],
                    assign_date: campaignData?.duration,
                    area: campaignData?.selectedAddress,
                }
                // return console.log(newData);
                createCampaignFunc(newData);
            }
        })
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    let content;
    if (isLoading) {
        content = <LargeSpinner></LargeSpinner>
    };
    if (isError) {
        if (error.error) {
            content = <div className='text-center w-full  min-h-[50vh] flex justify-center items-center'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            content = <div className='text-center w-full  min-h-[50vh] flex justify-center items-center'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    };
    if (!isLoading && data?.data?.length === 0) {
        content = <div className='text-center w-full  min-h-[50vh] flex justify-center items-center'>
            <p className="text-2xl text-red-500">Employee empty!</p>
        </div>
    };
    if (!isLoading && data?.success) {
        content = <div className="flow-root">
            <div className="inline-block min-w-full py-2 align-middle">
                <table className="min-w-full rounded-md border-separate border-spacing-0">
                    <thead>
                        <tr className=''>
                            <th
                                scope="col"
                                className="md:sticky md:top-16 z-10 border-b border-gray-300 bg-white rounded-tl-md bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm md:text-md font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-8 lg:pl-12"
                            >
                                Staff Name <button onClick={() => setQueryData(c => ({ ...c, sort: c.sort !== "name1" ? "name1" : "name-1" }))} className='hover:bg-slate-100 rounded-md px-2 ml-1  text-sm pb-1 -mb-1 text-gray-600'><TbArrowsDownUp className='inline' /></button>
                            </th>
                            <th
                                scope="col"
                                className="md:sticky text-center md:top-16 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-sm md:text-md font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                            >
                                Position
                            </th>
                            <th
                                scope="col"
                                className="md:sticky md:top-16 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm md:text-md font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="md:sticky md:top-16 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm md:text-md font-semibold text-gray-900 backdrop-blur backdrop-filter"
                            >
                                Address
                            </th>
                            <th
                                scope="col"
                                className="md:sticky md:top-16 z-10 border-b text-sm md:text-md border-gray-300 bg-white rounded-tr-md bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                            >
                                <span className="sr-only">Option</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className='bg-white'>
                        {data.data.map((user, personIdx) => (
                            <tr key={user.email} className='hover:bg-green-100'>
                                {/* {console.log(user.active)} */}
                                <td
                                    className={classNames(
                                        personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                        'whitespace-nowrap py-2 md:py-2 lg:py-4 pl-4 pr-3 text-xs md:text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8:'
                                    )}
                                >
                                    <div className="flex items-center gap-x-4 group">
                                        <img src={user.userImage} alt="Image" className="h-9 w-9 rounded-full bg-gray-800" />
                                        <div className="truncate font-medium leading-6 text-gray-600 group-hover:text-gray-900 capitalize duration-200">{user.fast_name + " " + user.last_name}</div>
                                    </div>
                                </td>
                                <td
                                    className={classNames(
                                        personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                        'whitespace-nowrap hidden px-3 py-2 md:py-2 lg:py-4 text-center text-xs md:text-sm font-medium text-gray-700 sm:table-cell'
                                    )}
                                >
                                    <span className='capitalize'>{user.role}</span>
                                </td>
                                <td
                                    className={classNames(
                                        personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                        'whitespace-nowrap hidden px-3 py-2 md:py-2 lg:py-4 text-xs md:text-sm text-center text-gray-500 lg:table-cell'
                                    )}
                                >
                                    {user.status?.active ? <button
                                        type="button"
                                        className="rounded-full bg-indigo-50 px-2.5 py-1.5 text-xs md:text-sm font-semibold text-indigo-600 shadow-sm"
                                    >
                                        Active  <GoPrimitiveDot className='inline text-green-500' />
                                    </button>
                                        : <button
                                            type="button"
                                            className="rounded-full bg-indigo-50 px-2.5 py-1.5 text-xs md:text-sm font-semibold text-red-500 shadow-sm"
                                        >
                                            Inactive <GoPrimitiveDot className='inline text-red-500' />
                                        </button>}


                                </td>
                                <td
                                    className={classNames(
                                        personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                        'whitespace-nowrap capitalize px-3 py-2 md:py-2 lg:py-4 text-xs md:text-sm text-center font-medium text-gray-600'
                                    )}
                                >
                                    <span>{user.address.country},</span> <br />
                                    <span>{user.address.city}, {user.address.state}</span>
                                </td>
                                <td
                                    className={classNames(
                                        personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                        'relative whitespace-nowrap py-2 md:py-2 lg:py-4 pr-4 pl-3 text-center text-xs md:text-sm font-medium sm:pr-8 lg:pr-8'
                                    )}
                                >
                                    <button
                                        onClick={() => handleSelectUser(user)}
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1 text-xs md:text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-green-300 hover:drop-shadow-sm shadow-white active:bg-gray-200"
                                    >
                                        <IoMdCheckmark className='inline' />  Select
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='w-full md:px-2 mdd:px-4'>
                <PaginationBar totalDataLength={data.totalData} stockLimit={stockLimit} setStockLimit={setStockLimit} currentPage={currentPage} setCurrentPage={setCurrentPage}></PaginationBar>
            </div>
        </div>
    };
    return (
        <div className=" w-full min-h-[50vh] overflow-x-auto">
            <div className="w-full flex justify-between items-center gap-2 my-4 md:px-2 mdd:px-4">
                <div className="sm:flex-auto">
                    <button
                        onClick={() => setTogglePage(campaignData?.objective === 'data_entry' ? 1 : 2)}
                        className="rounded-md bg-blue-500 pl-4 pr-3 py-1.5 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    >
                        <BsArrowLeftShort size={18} className='inline-block mb-1' /> Previews
                    </button>
                </div>
                <h1 className="text-base font-semibold leading-6 text-gray-900 whitespace-pre  w-fit px-1">Total Staff: <span className='bg-green-200 px-1 rounded-sm'>{data?.data?.length || 0}</span></h1>
                <button
                    onClick={() => setOpenFilter(c => (!c))} type="button"
                    className="rounded-md bg-white pl-4 pr-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                >
                    Filters  <FiFilter className={`inline-block -mt-1 ml-4`} />
                </button>
            </div>
            <div className={`w-full md:px-2 mdd:px-4 ${openFilter ? "flex" : "hidden"} justify-between items-center gap-2`}>
                <div className="w-full max-w-lg lg:max-w-xs">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                            onChange={(e) => setQueryData(c => ({ ...c, keyword: e.target.value }))}
                            id="search" name="search"
                            className="block w-full min-w-[200px] rounded-md bg-white py-1 lg:py-1.5 pl-10 pr-3 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none placeholder:text-gray-400  sm:text-sm sm:leading-6 leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="Email or name..."
                            type="search"
                        />
                    </div>
                </div>
                <div className='flex justify-end gap-2'>
                    <AddressInput selectedValue={selectedAddress} setSelectedValue={setSelectedAddress}></AddressInput>
                    <select
                        onChange={(e) => setQueryData(c => ({ ...c, role: e.target.value }))}
                        className="text-sm bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 py-1 lg:py-1.5 leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' selected >Select Role</option>
                        <option value={MARKETER}>Marketer</option>
                        <option value={DATA_ENTRY_OPERATOR}>Data Entire</option>
                        <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                        <option value={TELE_MARKETER}>Telemarketer</option>
                        <option value={BILLING_TEAM}>Billing Team</option>
                    </select>
                    <button
                        onClick={() => {
                            setQueryData({});
                            setSelectedAddress({});
                        }}
                        className="rounded-md bg-white pl-3 pr-3 py-1 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    >
                        Reset
                    </button>
                </div>
            </div>
            {content}
        </div >
    )
};

export default AllUserForCampaign;
