import React, { useEffect, useState } from 'react';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';
import { useRouter } from 'next/router';
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import Image from 'next/image';
import AddressAddForm from '@/components/Forms/AddressAddForm';
import { format } from 'date-fns';
import { AdminProtect } from '@/utils/ProtectRoute';

const Entires_data = () => {
    const [actionShow, setActionShow] = useState('');
    const [queryData, setQueryData] = useState({ role: "", country: "", state: "", city: "", keyword: '', role: "", category: '', create_date: '' });
    const router = useRouter()
    const searchQuery = `country=${queryData.country}&state=${queryData.state}&city=${queryData.city}&keyword=${queryData.keyword}&role=${queryData.role}&category=${queryData.category}&create_date=${queryData.create_date}`;
    const { data, isLoading, isError, error } = useGetAllDataQuery(searchQuery);
    // console.log(data?.data, isLoading, isError, error);
    console.log(queryData)
    let content;
    if (isLoading) {
        content = <LargeSpinner />;
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
    } else if (!isLoading && data.success) {
        if (data?.data?.length === 0) {
            content = <h3 className='text-2xl text-green-500 text-center mt-[20%]'>Empty Entire data !</h3>
        } else {
            content =
                data.data.map(({ businessDetails, _id, ownerDetails, onProcess }, ndx) => <tr key={_id} className={`${ndx % 2 || "bg-green-100"}`}>
                    <td className=''>
                        <img className='w-[80px] h-[50px]' alt='logo' src={businessDetails?.businessLogo || "http://localhost:5000/image/no_image-1682919865051.png"} />
                    </td>
                    <td className="px-4 py-1">
                        <span className='text-[14.2px] font-medium'> {businessDetails?.category}</span> <br />
                        <span> Name: {businessDetails?.businessName}</span>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">{ownerDetails?.name}</td>
                    <td className="px-4 py-3">
                        {onProcess?.onfieldMarketer?.process || "N/A"}
                    </td>
                    <td className="w-10 text-center relative" onMouseLeave={() => setActionShow('')}>
                        <button
                            onClick={() => setActionShow(_id)}
                            className='hover:bg-gray-300 active:text-blue-200 active:bg-gray-400 p-1 rounded-md'
                        >
                            <BsThreeDotsVertical />
                        </button>
                        {actionShow === _id &&
                            <div
                                className="absolute top-10 right-1 z-30"
                            >
                                <ul className="p-1 shadow-lg bg-blue-100 rounded-xl border border-white">
                                    <button
                                        className='text-sm text-gray-400 font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                    >Edit</button>
                                    <button
                                        // onClick={() => setDeletedBooking(book)}
                                        className='text-sm text-gray-400 font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                    >Delete</button>
                                    <button
                                        // onClick={() => setDeletedBooking(book)}
                                        className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                    >Contact-Call</button>
                                    <button
                                        // onClick={() => setDeletedBooking(book)}
                                        className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                    >Contact-Field</button>
                                    <button onClick={() => router.push(`/dashboard/entire_details/${_id}`)}
                                        className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                    >Details</button>
                                </ul>
                            </div>
                        }
                    </td>
                </tr>)
        };
    };
    return (
        <div className="text-gray-600 body-font max-w-6xl xxl:max-w-7xl min-h-[95vh] mx-auto">
            <section className="text-gray-600 body-font">
                <h1 className='text-xl md:text-2xl font-semibold text-center border-b shadow-xs mt-1'>All Entire data list</h1>
                <div className='bg-zinc-300 shadow-lg w-full py-2 pr-4 md:pr-6 ml-auto flex justify-end items-center gap-2'>
                    <input
                        className='rounded-md border border-blue-500 hover:bg-blue-700 focus:outline outline-green-600 font-semibold hover:text-white px-3 py-0.5' type="button" value='All'
                        onClick={() => setQueryData({ role: "", country: "", state: "", city: "", keyword: '', role: "", category: '', create_date: '' })}
                    />
                    <select
                        onChange={(e) => setQueryData(c => ({ ...c, role: e.target.value }))}
                        className="text-md bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 font-medium pl-1 py-[3px] leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' selected >Entire-role</option>
                        <option value={ADMIN}>Admin</option>
                        <option value={MARKETER}>Marketer</option>
                        <option value={DATA_ENTRY_OPERATOR}>Data Entire</option>
                        <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                        <option value={TELE_MARKETER}>Telemarketer</option>
                    </select>
                    <select
                        onChange={(e) => setQueryData(c => ({ ...c, category: e.target.value }))}
                        className="text-md bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 font-medium pl-1 py-[3px] leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' selected>Select category</option>
                        <option value="clothes">Clothes</option>
                        <option value="salon">Salon</option>
                        <option value="grocery">Grocery</option>
                        <option value="e-Commerce">E-Commerce</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="barber Shop">Barber Shop</option>
                        <option value="agency">Agency</option>
                    </select>
                    <input
                        onChange={(e) => setQueryData(c => ({ ...c, create_date: format(new Date(e.target.value), 'yyyy-MM-dd') }))} type="date"
                        className=" bg-white border border-slate-300 rounded-md py-1 px-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    />
                    <label className="relative block rounded-md">
                        <span className="sr-only">Search</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsSearch className='active:text-green-300' />
                        </span>
                        <input
                            onChange={(e) => setQueryData({ ...queryData, keyword: e.target.value })}
                            className="placeholder:italic placeholder:text-slate-400 bg-white border border-slate-300 rounded-md py-1 pr-9 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                            placeholder="email or name..." type="text" name="search"
                        />
                    </label>
                </div>
                <div className='bg-zinc-300 shadow-lg w-full py-2 pr-4 md:pr-6 ml-auto flex justify-end items-center gap-2'>
                    <div>
                        <AddressAddForm addressValue={queryData} loadingShow={false} setAddressValue={setQueryData} classes={{ label: "hidden", addBtn: "hidden", contain: 'grid grid-cols-3 gap-x-2' }} />
                    </div>

                </div>
                <div className="px-2 mx-auto">
                    <div className="w-full mx-auto overflow-auto  min-h-[90vh]">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr className='border-b'>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Logo</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Category</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Owner</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Work-Process</th>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br pr-2 lg:pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {content}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section >
        </div >
    );
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