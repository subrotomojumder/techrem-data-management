import { useGetEmployeeByQueQuery } from '@/app/features/users/userApi';
import AddressInput from '@/components/Forms/AddressInput';
import PaginationBar from '@/components/PaginationBar';
import SingleUser from '@/components/SingleUser';
import { LargeSpinner } from '@/components/Spinner';
import { AdminProtect } from '@/utils/ProtectRoute';
import { ADMIN, BILLING_TEAM, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import React, { useState, Fragment } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FiEdit, FiFilter } from 'react-icons/fi';
import { GoPrimitiveDot } from 'react-icons/go';
import { TbArrowsDownUp } from 'react-icons/tb';

const EmployeeList = () => {
    const [openFilter, setOpenFilter] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({});
    const [queryData, setQueryData] = useState({});
    const [stockLimit, setStockLimit] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading, isError, error } = useGetEmployeeByQueQuery(`skip=${(currentPage - 1) * stockLimit}&limit=${stockLimit}&role=${queryData.role || ''}&keyword=${queryData.keyword || ''}&active=${queryData.status || ""}&country=${selectedAddress.country || ""}&state=${selectedAddress.state || ""}&city=${selectedAddress.city || ""}&sort=${queryData?.sort || ''}`);
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    let content;
    if (isLoading) {
        content = <LargeSpinner></LargeSpinner>
    };
    if (isError) {
        if (error.error) {
            content = <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            content = <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    };
    if (!isLoading && data?.data?.length === 0) {
        content = <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
            <p className="text-2xl text-red-500">User collection empty!</p>
        </div>
    };
    if (!isLoading && data?.success) {
        content = <div className="flow-root">
            <div className="">
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
                                <tr key={user.email}>
                                    {/* {console.log(user.active)} */}
                                    <td
                                        className={classNames(
                                            personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                            'whitespace-nowrap py-2 md:py-2 lg:py-4 pl-4 pr-3 text-xs md:text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8:'
                                        )}
                                    >
                                        <Link href={`/authentication/view_profile/${user._id}`}>
                                            <div className="flex items-center gap-x-4 group">
                                                <img src={user.userImage} alt="Image" className="h-7 w-7 md:h-9 md:w-9 rounded-full bg-gray-800" />
                                                <div className="truncate font-medium leading-6 text-gray-700 group-hover:text-gray-900 capitalize duration-200">{user.fast_name + " " + user.last_name}</div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td
                                        className={classNames(
                                            personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                            'whitespace-nowrap hidden px-3 py-2 md:py-2 lg:py-4 text-center text-xs md:text-sm text-gray-800 font-medium sm:table-cell'
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
                                            'whitespace-nowrap capitalize px-3 py-2 md:py-2 lg:py-4 text-xs md:text-sm text-center font-medium text-gray-700'
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
                                        <Link href={`/authentication/user_edit/${user._id}`}>
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1 text-xs md:text-sm text-gray-700 shadow-sm ring-1 ring-inset ring-green-300 hover:bg-gray-50"
                                            >
                                                <FiEdit className='inline text-gray-700' />  Edit
                                            </button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <PaginationBar totalDataLength={data.totalData} stockLimit={stockLimit} setStockLimit={setStockLimit} currentPage={currentPage} setCurrentPage={setCurrentPage}></PaginationBar>
        </div>
    };
    return (
        <div className="px-4 sm:px-6 lg:px-8 w-full min-h-screen overflow-x-auto md:overflow-x-visible">
            <div className="w-full flex justify-between items-center my-4">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900 whitespace-pre  w-fit px-1">Total Staff:  <span className='bg-green-200 px-1 rounded-sm'>{data?.data?.length || 0}</span></h1>
                </div>
                <button
                    onClick={() => setOpenFilter(c => (!c))} type="button"
                    className="rounded-md bg-white pl-4 pr-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                >
                    Filters  <FiFilter className={`inline-block -mt-1 ml-4`} />
                </button>
            </div>
            <div className={`w-full ${openFilter ? "flex" : "hidden"} justify-between items-center gap-2`}>
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
                            className=" block w-full min-w-[200px] rounded-md bg-white py-1 lg:py-1.5 pl-10 pr-3 text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none placeholder:text-gray-400  text-sm leading-6 transition-colors duration-200 ease-in-out"
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
                        <option value={ADMIN}>Admin</option>
                        <option value={MARKETER}>Marketer</option>
                        <option value={DATA_ENTRY_OPERATOR}>Data Entire</option>
                        <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                        <option value={TELE_MARKETER}>Telemarketer</option>
                        <option value={BILLING_TEAM}>Billing Team</option>
                    </select>
                    <select
                        onChange={(e) => setQueryData(c => ({ ...c, status: e.target.value }))}
                        className="text-sm bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 py-1 lg:py-1.5 leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' selected >Select Status</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
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
            {content}
        </div >
    )
};

export default AdminProtect(EmployeeList);
