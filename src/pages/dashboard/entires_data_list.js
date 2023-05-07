import React, { useEffect, useState } from 'react';
import { BsArrowDownUp, BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';
import { useRouter } from 'next/router';
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import Image from 'next/image';
import AddressAddForm from '@/components/Forms/AddressAddForm';
import { format } from 'date-fns';
import { AdminProtect } from '@/utils/ProtectRoute';
import { FaEdit } from 'react-icons/fa';
import { TbArrowsUpDown } from 'react-icons/tb';
import { CgArrowsExchangeV } from 'react-icons/cg';
import Link from 'next/link';
import DropDown from '@/components/TailwindComponent/DropDown';
import { DateRangeInput } from '@/components/Forms/Inputs';
const status = [
    { id: 0, name: 'Tele Complete', value: "complete" },
    { id: 2, name: 'Fresh', value: '' },
    { id: 3, name: 'Tele Pending', value: "pending" },
    { id: 4, name: 'Tele Cancel', value: "cancel-call" },
    { id: 5, name: 'Tele Rejected', value: "rejected" },
];
const Entires_data = () => {
    const [category, setCategory] = useState({ id: 0, name: 'Category', value: "" });
    const [entry, setEntry] = useState({ id: 0, name: 'Entry', value: "" });
    const [queryData, setQueryData] = useState({ role: "", country: "", state: "", city: "", keyword: '', role: "", create_date: '', sort: "last" });
    const router = useRouter()
    const searchQuery = `country=${queryData.country}&state=${queryData.state}&city=${queryData.city}&keyword=${queryData.keyword}&role=${queryData.role}&category=${category?.value}&create_date=${queryData.create_date}&sort=${queryData.sort}`;
    const { data, isLoading, isError, error } = useGetAllDataQuery(searchQuery);
    const { data: allData, isLoading: allDataLoading, isError: allIsError, error: AllError } = useGetAllDataQuery("sort=last");
    console.log(allData, allDataLoading, allIsError, AllError);
    // console.log(data?.data, isLoading, isError, error);
    // console.log(queryData)
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    if (allDataLoading || isLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.error) {
            return <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            return <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    } else if (!isLoading && data.success) {
        return <div className='w-full max-w-[1940px] mx-auto'>
            <div className="px-4 sm:px-4 xl:px-8 py-4 sm:py-6 xl:py-6">
                <h1 className='text-lg md:text-xl font-semibold shadow-xs text-center -mt-3 pl-4 sm:pl-6 lg:pl-8 font-serif'>All Entire data list</h1>
                <div className='overflow-x-scroll p-4 bg-white rounded-lg drop-shadow-sm shadow-gray-100'>
                    <div className="min-w-fit min-h-[80vh]  ring-1 ring-black ring-opacity-20 sm:mx-0 sm:rounded-lg">
                        <div className='bg-indigo-100 shadow-md w-full py-2 px-4 ml-auto flex justify-between items-center gap-2'>
                            <label className="relative block rounded-md">
                                <span className="sr-only">Search</span>
                                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                                    <BsSearch className='active:text-green-300' />
                                </span>
                                <input
                                    onChange={(e) => setQueryData({ ...queryData, keyword: e.target.value })}
                                    className=" placeholder:text-slate-400 placeholder:text-base text-base py-1 bg-white border border-slate-300 rounded-md pr-9 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                    placeholder="email or name..." type="text" name="search"
                                />
                            </label>
                            <div className='flex justify-end items-center gap-2'>
                                <input
                                    className='rounded-md border border-blue-500 hover:bg-blue-700 focus:outline outline-2 outline-sky-500 font-semibold hover:text-white px-3 py-0.5' type="button" value='All'
                                // onClick={() => setQueryData({ role: "", country: "", state: "", city: "", keyword: '', create_date: '' })}
                                />
                                <select
                                    // onChange={(e) => setQueryData(c => ({ ...c, role: e.target.value }))}
                                    className="text-base bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 font-medium pl-1 py-[4px] leading-8 transition-colors duration-200 ease-in-out"
                                >
                                    <option value='' selected >select entry</option>
                                    <option value={''}>Admin</option>
                                    <option value={''}>Marketer</option>
                                    <option value={""}>Data Entire</option>
                                    <option value={''}>Field Marketer</option>
                                    <option value={''}>Telemarketer</option>
                                </select>
                                {/* <input
                                    onChange={(e) => setQueryData(c => ({ ...c, create_date: format(new Date(e.target.value), 'yyyy-MM-dd') }))} type="date"
                                    className=" bg-white border border-slate-300 rounded-md py-1 px-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                                /> */}
                                <DateRangeInput></DateRangeInput>
                            </div>
                        </div>
                        <table className="min-w-full divide-y divide-gray-300 lg:px-4">
                            <thead>
                                <tr className='bg-gray-100 smm:rounded-t-xl'>
                                    <th scope="col" className="px-3 py-3.5 text-left text-md font-semibold text-gray-900">
                                        Business
                                    </th>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-md font-semibold text-gray-900 sm:pl-6">
                                        <DropDown items={
                                            data.data?.map((item, i) => {
                                                return { id: i, name: item.businessDetails?.category, value: item.businessDetails?.category }
                                            })
                                        } selected={category} setSelected={setCategory} customClass={{ input: "border-0 justify-center" }} />
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
                                    : data?.data.map(({ businessDetails, _id, createdAt, address, data_entry_operator, onProcess }, planIdx) => (
                                        <tr key={_id}>
                                            <td
                                                className={classNames(
                                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                                    'px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                                )}
                                            >
                                                <Link href={`/dashboard/single_entry_details/${_id}`}>
                                                    <div className="flex items-center">
                                                        <div className="h-11 w-11 flex-shrink-0">
                                                            <img className="h-11 w-11 rounded-md" src={businessDetails?.businessLogo || "http://localhost:5000/image/no_image-1682919865051.png"} alt="" />
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="font-medium text-gray-900 whitespace-pre">{businessDetails?.businessName}</div>
                                                            <div className="mt-1 text-gray-500 whitespace-pre">{"business email"}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td
                                                className={classNames(
                                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                                    'px-3 py-3.5 text-sm lg:table-cell font-medium text-center whitespace-pre capitalize'
                                                )}
                                            >
                                                {businessDetails?.category}
                                            </td>
                                            <td
                                                className={classNames(
                                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                                    'px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                                )}
                                            >
                                                <span className="text-gray-900 whitespace-pre">{data_entry_operator?.account_id?.name}</span> <br />
                                                <span className="text-gray-900 capitalize whitespace-pre">{"+452"} {data_entry_operator?.account_id?.phone}</span>
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
                                                    className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-orange-500 drop-shadow hover:bg-gray-50"

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
                                                <div className="text-gray-900 w-40">{"App, ERP, Marketing, Online pay"}</div>
                                            </td>

                                            <td
                                                className={classNames(
                                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                                    'px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                                                )}
                                            >
                                                <button className="flex justify-center items-center gap-2 hover:bg-slate-100 active:bg-slate-300 rounded-md border px-2 py-1 text-sm font-medium text-gray-500 active:text-gray-700 duration-75">
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
    };
};

export async function getStaticProps(context) {
    // const res = await fetch(`/data.json`);
    // const entireData = await res.json();
    // console.log(entireData);
    return {
        props: {}, // will be passed to the page component as props
    }
}
export default AdminProtect(Entires_data);