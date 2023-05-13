import { useGetEmployeeByQueQuery } from '@/app/features/users/userApi';
import SingleUser from '@/components/SingleUser';
import { LargeSpinner } from '@/components/Spinner';
import { AdminProtect } from '@/utils/ProtectRoute';
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const EmployeeList = () => {
    const [queryData, setQueryData] = useState({ role: "", keyword: "", active: true });
    const { data, isLoading, isError, error } = useGetEmployeeByQueQuery(`role=${queryData.role}&keyword=${queryData.keyword}`);
    console.log(queryData);
    let content;
    if (isLoading) {
        content = <LargeSpinner></LargeSpinner>
    };
    if (isError) {
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
    if (!isLoading && data?.data?.length === 0) {
        content = <div className='text-center mt-10 md:mt-52'>
            <p className="text-2xl text-red-500">User collection empty!</p>
        </div>
    };
    if (!isLoading && data?.success) {
        content = <div className='grid sm:grid-cols-1 smm:grid-cols-2 mdd:grid-cols-3 lg:grid-cols-4 gap-3'>
            {data?.data.map((user) => <SingleUser user={user} key={user._id} />)}
        </div>
    };
    return (
        <div
            className='w-full min-h-screen -mb-5'
            style={{ background: `linear-gradient(90deg, rgba(226, 145, 186, 0.5), rgba(226, 145, 186, 0.3)), url(https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-investment-financial-management-financial-background-image_194572.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
        >
            <div className='bg-zinc-300 shadow-lg w-full py-2 pr-4 md:pr-6 ml-auto flex justify-end items-center gap-2'>
                <div className='font-semibold'>
                    <input checked={queryData.active || false} type="checkbox" onChange={(e) => setQueryData(c => ({ ...c, active: !c.active && true }))} /> Active
                </div>
                <select
                    onChange={(e) => setQueryData(c => ({ ...c, role: e.target.value }))}
                    className="text-md bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 font-medium pl-1 py-[2px] leading-8 transition-colors duration-200 ease-in-out"
                >
                    <option value='' selected >select-role</option>
                    <option value={ADMIN}>Admin</option>
                    <option value={MARKETER}>Marketer</option>
                    <option value={DATA_ENTRY_OPERATOR}>Data Entire</option>
                    <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                    <option value={TELE_MARKETER}>Telemarketer</option>
                </select>
                <label className="relative block rounded-md">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <BsSearch className='active:text-green-300' />
                    </span>
                    <input
                        onChange={(e) => setQueryData({ ...queryData, keyword: e.target.value })}
                        className="placeholder:italic placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-1 pr-9 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="email or name..." type="text" name="search"
                    />
                </label>
            </div>
            <main className="px-2 md:px-4 lg:px-6 pt-2 pb-8 ">
                {content}
            </main>
        </div >)
};

export default AdminProtect(EmployeeList);

{/* <div className='flex justify-end items-center gap-2'>
                    <select
                        onChange={(e) => setQueryData(c => ({ ...c, role: e.target.value }))}
                        className="text-sm bg-white rounded-sm border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 py-1 leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' selected >select-role</option>
                        <option value={ADMIN}>Admin</option>
                        <option value={MARKETER}>Marketer</option>
                        <option value={DATA_ENTRY_OPERATOR}>Data Entire</option>
                        <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                        <option value={TELE_MARKETER}>Telemarketer</option>
                    </select>
                    <select
                        onChange={(e) => setQueryData(c => ({ ...c, status: e.target.value }))}
                        className="text-sm bg-white rounded-sm border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 py-1 leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' selected >select-status</option>
                        <option value={`active`}>Active</option>
                        <option value={`inactive`}>Inactive</option>
                    </select>
                    <label className="relative block rounded-md">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsSearch className='active:text-green-300' />
                        </span>
                        <input
                            onChange={(e) => setQueryData({ ...queryData, keyword: e.target.value })}
                            className="placeholder:italic placeholder:text-slate-400 bg-white w-full rounded-sm text-sm  border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 py-1 transition-colors duration-200 ease-in-out"
                            placeholder="email or name..." type="text" name="search"
                        />
                    </label>
                </div> */}

{/* <div className="flow-root overflow-x-auto">
            <div className="">
                <div className="inline-block min-w-full py-2 align-middle bg-white rounded-md">
                    <table className="min-w-full border-separate border-spacing-0">
                        <thead>
                            <tr className='mb-2'>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-md font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-8 lg:pl-12"
                                >
                                    Staff Name <button className='hover:bg-slate-100 rounded-md px-2 ml-1  text-sm pb-1 -mb-1 text-gray-600'><TbArrowsDownUp className='inline' /></button>
                                </th>
                                <th
                                    scope="col"
                                    className="sticky text-center top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-md font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                >
                                    Position
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-md font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-md font-semibold text-gray-900 backdrop-blur backdrop-filter"
                                >
                                    Address
                                </th>
                                <th
                                    scope="col"
                                    className="sticky top-0 z-10 border-b text-md border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                >
                                    <span className="sr-only">Option</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data.map((user, personIdx) => (
                                <tr key={user.email}>
                                    <td
                                        className={classNames(
                                            personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                            'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                        )}
                                    >
                                        <Link href={`/authentication/vew_profile/${user._id}`}>
                                            <div className="flex items-center gap-x-4">
                                                <img src={user.userImage} alt="Image" className="h-9 w-9 rounded-full bg-gray-800" />
                                                <div className="truncate font-medium leading-6 text-gray-700 capitalize">{user.fast_name + " " + user.last_name}</div>
                                            </div>
                                        </Link>
                                    </td>
                                    <td
                                        className={classNames(
                                            personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                            'whitespace-nowrap hidden px-3 py-4 text-center text-sm text-gray-500 sm:table-cell'
                                        )}
                                    >
                                        <span className='capitalize'>{user.role}</span>
                                    </td>
                                    <td
                                        className={classNames(
                                            personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                            'whitespace-nowrap hidden px-3 py-4 text-sm text-center text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        <button
                                            type="button"
                                            className="rounded-full bg-indigo-50 px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm"
                                        >
                                            Active  <GoPrimitiveDot className='inline text-orange-300' />
                                        </button>
                                    </td>
                                    <td
                                        className={classNames(
                                            personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                            'whitespace-nowrap px-3 py-4 text-sm text-center text-gray-500'
                                        )}
                                    >
                                        <span>{user.address.country},</span> <br />
                                        <span>{user.address.city}, {user.address.state}</span>
                                    </td>
                                    <td
                                        className={classNames(
                                            personIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                            'relative whitespace-nowrap py-4 pr-4 pl-3 text-center text-sm font-medium sm:pr-8 lg:pr-8'
                                        )}
                                    >
                                        <Link href={`/authentication/user_edit/${user._id}`}>
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-2.5 py-1 text-sm text-green-500 font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
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
        </div> */}