import React, { useEffect, useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';
import { AdminProtect } from '@/utils/ProtectRoute';
import { FaEdit } from 'react-icons/fa';
import { CgArrowsExchangeV } from 'react-icons/cg';
import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { DateRangeInput } from '@/components/Forms/Inputs';
import CategoryInput from '@/components/Forms/CategoryInput';
import UserInput from '@/components/Forms/UserInput';
import { format } from 'date-fns';
import Update_entry_data from '@/components/Update_entry_data';
import { updateConfirm } from '@/utils/neededFun';
import { TbFilter, TbFilterOff } from 'react-icons/tb';
import AddressInput from '@/components/Forms/AddressInput';
import { useGetOurServiceQuery } from '@/app/features/others/othersApi';

const Entires_data = () => {
    const [updateEntry, setUpdateEntry] = useState(null)
    const [openFilter, setOpenFilter] = useState(false);
    const [queryData, setQueryData] = useState({});
    const [selectedAddress, setSelectedAddress] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    // ${queryData.createDate && `&create_date[eq]=${queryData.createDate}`} main=&sub1=&country=&state=&city=&keyword=&account_id=&we_offer=&create_date=&sort=&create_date[gte]=&create_date[lte]=
    const searchQuery = `main=${selectedCategory?.main || ''}&sub1=${selectedCategory?.sub1 || ''}&country=${selectedAddress?.country || ''}&state=${selectedAddress?.state || ""}&city=${selectedAddress?.city || ""}&keyword=${queryData?.keyword || ''}&account_id=${selectedUser?._id || ''}&we_offer=${queryData.we_offer || ''}&campaignStatus=${queryData.campaign || ""}&create_date=${queryData?.createDate || ''}&dataRange_start=${startDate && endDate ? startDate : ""}&dataRange_end=${startDate && endDate ? endDate : ""}&sort=${queryData?.sort || ''}`;
    const { data, isLoading, isError, error } = useGetAllDataQuery(searchQuery);
    const { data: ourServiceData, isLoading: serviceLoading, isError: serviceIsError, error: serviceError } = useGetOurServiceQuery(`/service_we_offer`);

    // console.log(allData, allDataLoading, allIsError, AllError);
    // console.log(data?.data, isLoading, isError, error);
    console.log(searchQuery)
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    if (isLoading) {
        return <LargeSpinner />;
    };
    if (serviceIsError) {
        if (serviceError.error) {
            return <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{serviceError.error}</p>
            </div>
        } else {
            return <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{serviceError.data.message}</p>
            </div>
        }
    }
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
    } else if (!isLoading && data.success) {
        if (!updateEntry) {
            return <div className='w-full max-w-[1940px] mx-auto'>
                <div className="px-4 sm:px-4 xl:px-8 py-4 sm:py-6 xl:py-6">
                    <h1 className='text-lg md:text-xl font-semibold shadow-xs text-center -mt-3 pl-4 sm:pl-6 lg:pl-8 font-serif'>All Entire data list</h1>
                    <div className='overflow-x-auto p-4 bg-white rounded-lg drop-shadow-sm shadow-gray-100'>
                        <div className="min-w-fit min-h-[80vh]  ring-1 ring-black ring-opacity-20 sm:mx-0 sm:rounded-lg">
                            <div className='bg-indigo-100 shadow-md w-full py-2 px-4 ml-auto flex justify-between items-center gap-2'>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        onChange={(e) => setQueryData(c => ({ ...c, keyword: e.target.value }))}
                                        className="block w-full min-w-[300px] max-w-sm rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                                        type="search" id="search" placeholder="Search"
                                    />
                                </div>
                                <div className='flex justify-end gap-2'>
                                    <button
                                        onClick={() => {
                                            setQueryData({});
                                            setSelectedCategory({});
                                            setSelectedAddress({});
                                            setSelectedUser(null);
                                            setDateRange([null, null])
                                        }} type="button"
                                        className="rounded-md h-fit bg-white px-5 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 hover:bg-gray-50"
                                    >
                                        Reset
                                    </button>
                                    <button
                                        onClick={() => setOpenFilter(c => (!c))} type="button"
                                        className="rounded-md bg-white pl-4 pr-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                    >
                                        Filters {openFilter ? <TbFilterOff className={`inline-block ml-4`} /> : <TbFilter className={`inline ml-4`} />}
                                    </button>

                                    <button
                                        type="button" onClick={() => {
                                            console.log(new Date(new Date().getTime() - 120 * 60 * 60 * 1000))
                                        }}
                                        className="rounded-md bg-white pl-3 pr-2 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                    >
                                        Last 30 Days  <AiOutlineDown className={`inline ml-4`} />
                                    </button>
                                </div>
                            </div>
                            <div className={`w-full flex justify-end items-center gap-2 ${openFilter ? "block" : "hidden"} duration-300 bg-gray-100 drop-shadow-md px-3 py-2`}>
                                <CategoryInput selectedValue={selectedCategory} setSelectedValue={setSelectedCategory} ownClass={{ position: " absolute z-40 top-[34px] left-0 ", input: "bg-white rounded-md border border-gray-300 pl-3 py-1 min-w-[200px] flex justify-between items-center text-base outline-none text-gray-700 px-3 transition-colors duration-200 ease-in-out", focus: "border-indigo-500 ring-2 text-gray-500" }}></CategoryInput>
                                <AddressInput selectedValue={selectedAddress} setSelectedValue={setSelectedAddress}></AddressInput>
                                <UserInput selectedUser={selectedUser} setSelectedUser={setSelectedUser} placeHolder={"Entry By"} wornClass={{ input: "placeholder:text-gray-600 rounded-md bg-white pl-4 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" }}></UserInput>
                                <DateRangeInput dateRange={dateRange} setDateRange={setDateRange}></DateRangeInput>
                                <input
                                    onChange={(e) => setQueryData(c => ({ ...c, createDate: format(new Date(e.target.value), 'yyyy-MM-dd') }))}
                                    type="date" value={queryData.createDate || ''}
                                    className="rounded-md bg-white pl-2 pr-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                />
                                <select
                                    onChange={(e) => setQueryData(c => ({ ...c, we_offer: e.target.value }))}
                                    value={queryData.we_offer || ""}
                                    className="rounded-md bg-white pl-2 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                >
                                    <option value='' selected >We can offer</option>
                                    {ourServiceData?.data?.map((service, i) => <option key={i} value={service.name}>{service.name.slice(0, 15)}</option>)}
                                </select>
                                <select
                                    onChange={(e) => setQueryData(c => ({ ...c, campaign: e.target.value }))}
                                    value={queryData.campaign || ''}
                                    className="rounded-md bg-white pl-4 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                >
                                    <option value='' selected >Campaign Status</option>
                                    <option value={true}>Active</option>
                                    <option value={false}>Not Yet</option>
                                </select>
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
                                            className="pl-1 pr-3 py-3.5 text-left text-md font-semibold text-gray-900 lg:table-cell"
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
                                                        <div className="flex items-center min-w-[90px]">
                                                            <div className="w-full flex flex-col justify-center mb-2">
                                                                <img className="h-11 w-14 mx-auto rounded-md" src={businessDetails?.businessLogo || "http://localhost:5000/image/no_image-1682919865051.png"} alt="" />
                                                                <div className="font-bold text-base text-center text-gray-900 whitespace-pre truncate">{businessDetails?.businessName}{/* .length > 15 ? businessDetails?.businessName.slice(0, 15) + '...' : businessDetails?.businessName */}</div>
                                                            </div>
                                                            {/* <div className="ml-4">
                                                            </div> */}
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
                                                    <span className=''>{businessDetails?.category.sub1 || ''}</span>
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
                                                        className="items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-green-500  shadow bg-gray-100"
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
                                                    <div className="text-gray-900 w-40">{!we_offer_service?.length ? "Empty" : <span>{we_offer_service.join(', ').length < 20 ? we_offer_service.join(', ') : we_offer_service.join(', ').slice(0, 20) + '...'} </span>}</div>
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