import React, { useEffect, useState } from 'react';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';
import { AdminProtect } from '@/utils/ProtectRoute';
import { FaEdit } from 'react-icons/fa';
import { CgArrowsExchangeV } from 'react-icons/cg';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
// import DataEntryFilters from '@/components/Forms/dataEntryFilters';
import { DateRangeInput } from '@/components/Forms/Inputs';
import CategoryInput from '@/components/Forms/CategoryInput';
import UserInput from '@/components/Forms/UserInput';
import { format } from 'date-fns';
import Update_entry_data from '@/components/Update_entry_data';
import { updateConfirm } from '@/utils/neededFun';

const Entires_data = () => {
    const [updateEntry, setUpdateEntry] = useState(null)
    const [openFilter, setOpenFilter] = useState(false);
    const [queryData, setQueryData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const searchQuery = `country=${""}&state=${""}&city=${""}&keyword=${queryData.keyword || ''}&create_date=${queryData.create_date || ''}&sort=${queryData.sort || ''}`;
    const { data, isLoading, isError, error } = useGetAllDataQuery(searchQuery);
    const { data: allData, isLoading: allDataLoading, isError: allIsError, error: AllError } = useGetAllDataQuery("sort=last");
    // console.log(allData, allDataLoading, allIsError, AllError);
    // console.log(data?.data, isLoading, isError, error);
    console.log(queryData)
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    if (isLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.error) {
            return <div className='text-center w-full h-screen flex justify-center items-center'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            return <div className='text-center w-full h-screen flex justify-center items-center'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    } else if (!isLoading && data.success) {
        if (!updateEntry) {
            return <div className='w-full max-w-[1940px] mx-auto'>
                <div className="px-4 sm:px-4 xl:px-8 py-4 sm:py-6 xl:py-6">
                    <h1 className='text-lg md:text-xl font-semibold shadow-xs text-center -mt-3 pl-4 sm:pl-6 lg:pl-8 font-serif'>All Entire data list</h1>
                    <div className='overflow-x-scroll p-4 bg-white rounded-lg drop-shadow-sm shadow-gray-100'>
                        <div className="min-w-fit min-h-[80vh]  ring-1 ring-black ring-opacity-20 sm:mx-0 sm:rounded-lg">
                            <div className='bg-indigo-100 shadow-md w-full py-2 px-4 ml-auto flex justify-between items-center gap-2'>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        onChange={(e) => setQueryData(c => ({ ...c, keyword: e.target.value }))}
                                        className="block w-full max-w-sm rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                                        type="search" id="search" placeholder="Search"
                                    />
                                </div>
                                <div className='flex justify-end gap-2'>
                                    <button
                                        type="button"
                                        className="rounded-md bg-white px-5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 hover:bg-gray-50"
                                    >
                                        All
                                    </button>
                                    <UserInput selectedUser={selectedUser} setSelectedUser={setSelectedUser} placeHolder={"Entry By"} wornClass={{ input: "placeholder:text-gray-600 rounded-md bg-white pl-4 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" }}></UserInput>
                                    <CategoryInput selectedValue={selectedCategory} setSelectedValue={setSelectedCategory} ownClass={{ position: " absolute z-40 top-[34px] left-0 ", input: "bg-white rounded-md border border-gray-300 pl-3 py-1 min-w-[200px] flex justify-between items-center text-base outline-none text-gray-700 px-3 transition-colors duration-200 ease-in-out", focus: "border-indigo-500 ring-2 text-gray-500" }}></CategoryInput>
                                    <DateRangeInput dateRange={dateRange} setDateRange={setDateRange}></DateRangeInput>

                                    <button
                                        onClick={() => setOpenFilter(c => (!c))} type="button"
                                        className="rounded-md bg-white pl-4 pr-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                    >
                                        Filters {openFilter ? <AiOutlineUp className={`inline-block -mt-1 ml-4`} /> : <AiOutlineDown className={`inline ml-4`} />}
                                    </button>
                                </div>
                            </div>
                            <div className={` w-full flex justify-end items-center gap-2 ${openFilter ? "h-12" : "h-0"} duration-300 overflow-hidden bg-green-100 drop-shadow-md px-3`}>
                                <select
                                    // onChange={(e) => setQueryData(c => ({ ...c, role: e.target.value }))}
                                    className="rounded-md bg-white pl-4 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                >
                                    <option value='' selected >Campaign Status</option>
                                    <option value={'active'}>Active</option>
                                    <option value={'not_yet'}>Not Yet</option>
                                </select>
                                <select
                                    // onChange={(e) => setQueryData(c => ({ ...c, role: e.target.value }))}
                                    className="rounded-md bg-white pl-4 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                >
                                    <option value='' selected >We can offer</option>
                                    <option value={''}>App</option>
                                    <option value={''}>Development</option>
                                </select>
                                <input
                                    onChange={(e) => setQueryData(c => ({ ...c, create_date: format(new Date(e.target.value), 'yyyy-MM-dd') }))}
                                    type="date"
                                    className="rounded-md bg-white pl-2 pr-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                />
                                <button
                                    type="button"
                                    className="rounded-md bg-white pl-3 pr-2 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                >
                                    Last 30 Days  <AiOutlineDown className={`inline ml-4`} />
                                </button>
                            </div>
                            <table className="min-w-full divide-y divide-gray-300 lg:px-4">
                                <thead>
                                    <tr className='bg-gray-100 smm:rounded-t-xl'>
                                        <th scope="col" className="pl-5 py-3.5 text-left text-md font-semibold text-gray-900">
                                            Business
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-4 text-md font-semibold text-gray-900 sm:pl-6">
                                            Category
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 lg:table-cell"
                                        >
                                            Entry
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 lg:table-cell whitespace-pre"
                                        >
                                            Entry Date <button onClick={() => setQueryData(c => ({ ...c, sort: c.sort === "fast" ? "last" : "fast" }))}><CgArrowsExchangeV className={`inline-block ${queryData.sort === "fast" && "rotate-180"} text-2xl  text-green-500 duration-500`} /></button>
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-md font-semibold text-gray-900 lg:table-cell text-center"
                                        >
                                            Address
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 lg:table-cell"
                                        >
                                            Campaign
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 whitespace-pre lg:table-cell"
                                        >
                                            We-can-offer
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {data?.data?.length === 0 ?
                                        <tr className='w-full text-center'><div className='w-full text-center mt-11 text-2xl text-green-500'>Empty Entire data !</div></tr>
                                        : data?.data.map(({ businessDetails, _id, createdAt, address, data_entry_operator, we_offer_service, }, planIdx) => (
                                            <tr key={_id}>
                                                <td
                                                    className={classNames(
                                                        planIdx === 0 ? '' : 'border-t border-gray-200',
                                                        'px-2 py-3.5 text-sm text-gray-500 lg:table-cell'
                                                    )}
                                                >
                                                    <Link href={`/dashboard/single_entry_details/${_id}`}>
                                                        <div className="flex items-center">
                                                            <div className="h-11 w-11 flex-shrink-0">
                                                                <img className="h-11 w-11 rounded-md" src={businessDetails?.businessLogo || "http://localhost:5000/image/no_image-1682919865051.png"} alt="" />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="font-medium text-gray-900 whitespace-pre">{businessDetails?.businessName}</div>
                                                                <div className="mt-1 text-gray-500 whitespace-pre">{'+ ' + businessDetails.country_code + ' ' + businessDetails.businessPhone}</div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        planIdx === 0 ? '' : 'border-t border-gray-200',
                                                        'px-2 py-3.5 text-sm lg:table-cell font-medium text-center whitespace-pre capitalize'
                                                    )}
                                                >
                                                    {businessDetails?.category.main} <br />
                                                    <span className='text-xs'>{businessDetails?.category.sub1 || ''}</span>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        planIdx === 0 ? '' : 'border-t border-gray-200',
                                                        'px-2 py-3.5 text-sm text-gray-500 lg:table-cell'
                                                    )}
                                                >
                                                    <span className="text-gray-900 capitalize whitespace-pre">{data_entry_operator?.account_id?.fast_name + ' ' + data_entry_operator?.account_id?.last_name || ""}</span> <br />
                                                    <span className="text-gray-900 capitalize whitespace-pre">{data_entry_operator?.account_id?.email}</span>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        planIdx === 0 ? '' : 'border-t border-gray-200',
                                                        'px-3 py-3.5 text-center text-sm text-gray-500'
                                                    )}
                                                >
                                                    <div className="text-gray-900">{new Date(createdAt).toLocaleDateString()}</div>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        planIdx === 0 ? '' : 'border-t border-gray-200',
                                                        'px-3 py-3.5 text-sm text-gray-500 lg:table-cell text-center'
                                                    )}
                                                >
                                                    <span className="text-gray-900 whitespace-pre">{address?.street_address}</span> <br />
                                                    <span className="text-gray-900 capitalize whitespace-pre">{address?.city}, {address.state}, {address?.country}</span>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        planIdx === 0 ? '' : 'border-t border-gray-200',
                                                        'px-3 py-3.5 text-sm text-gray-500'
                                                    )}
                                                >
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-orange-500 drop-shadow hover:bg-gray-50"
                                                    >
                                                        Active
                                                    </button>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        planIdx === 0 ? '' : 'border-t border-gray-200',
                                                        'px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                                    )}
                                                >
                                                    <div className="text-gray-900 w-40">{!we_offer_service?.length ? "Empty" : <span>{we_offer_service.join(', ').length <20 ? we_offer_service.join(', ') : we_offer_service.join(', ').slice(0, 20) + '...'} </span>}</div>
                                                </td>
                                                <td
                                                    className={classNames(
                                                        planIdx === 0 ? '' : 'border-t border-gray-200',
                                                        'px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                                    )}
                                                >
                                                    <button
                                                        onClick={() => updateConfirm(_id, setUpdateEntry)}
                                                        className="flex justify-center items-center gap-2 hover:bg-slate-100 active:bg-slate-300 rounded-md border px-2 py-1 text-sm font-medium text-gray-500 active:text-gray-700 duration-75">
                                                        <FaEdit /> Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div >
                </div>
            </div >
        } else {
            return <Update_entry_data updateEntry={updateEntry} setUpdateEntry={setUpdateEntry}></Update_entry_data>
        }
    };
};

export default AdminProtect(Entires_data);