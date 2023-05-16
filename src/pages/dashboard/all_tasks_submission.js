import { useGetOperatorSubmissionByIdQuery } from '@/app/features/dataEntire/assignTaskApi';
import { LargeSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute';
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const All_Tasks_submission = () => {
    const { user } = useSelector((state) => state.auth);
    const [actionShow, setActionShow] = useState('');
    const [queryData, setQueryData] = useState({ country: "", state: "", city: "", keyword: '', category: '', create_date: '' });
    const [expectedData, setExpectedData] = useState(user.role === ON_FIELD_MARKETER ? "fild_marketer_data" : user.role === TELE_MARKETER ? "tele_marketer_data" : "data_entry");
    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
    }, [router.isReady]);
    // https://codeshare.io/Wdo84M // useEffect condition lonk
    // console.log(expectedData);
    const { data, isLoading, isError, error } = useGetOperatorSubmissionByIdQuery(`/data_entry/account_to_data?account_id=${user?._id}&expectedDataType=${expectedData}&country=${queryData.country}&state=${queryData.state}&city=${queryData.city}&keyword=${queryData.keyword}&category=${queryData.category}&create_date=${queryData.create_date}`)
    let content;
    if (isLoading) {
        content = <LargeSpinner />;
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
    } else if (!isLoading && data?.success) {
        if (data?.data?.length === 0) {
            content = <h3 className='text-2xl text-green-500 text-center mt-[20%]'>Empty submission !</h3>
        } else {
            content = <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr className='border-b'>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Logo</th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Category</th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Owner</th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Create Date</th>
                        <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br pr-2 lg:pr-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.data.map(({ businessDetails, _id, ownerDetails, createdAt }, ndx) => <tr key={_id} className={`${ndx % 2 || "bg-green-100"}`}>
                        <td className=''>
                            <img className='w-[80px] h-[50px]' alt='logo' src={businessDetails?.businessLogo || "http://localhost:5000/image/no_image-1682919865051.png"} />
                        </td>
                        <td className="px-4 py-1">
                            <span className='text-[14.2px] font-medium'> {businessDetails?.category}</span> <br />
                            <span> Name: {businessDetails?.businessName}</span>
                        </td>
                        <td className="px-4 py-3 text-lg text-gray-900">{ownerDetails?.name}</td>
                        <td className="px-4 py-3">
                            {new Date(createdAt).toLocaleDateString()}
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
                                        {/* <button
                                            // onClick={() => setDeletedBooking(book)}
                                            className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                        >Contact-Call</button>
                                        <button
                                            // onClick={() => setDeletedBooking(book)}
                                            className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                        >Contact-Field</button> */}
                                        <button onClick={() => router.push(`/dashboard/entire_details/${_id}`)}
                                            className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                        >Details</button>
                                    </ul>
                                </div>
                            }
                        </td>
                    </tr>)}
                </tbody >
            </table >

        };
    };
    return (
        <div className="text-gray-600 body-font max-w-6xl xxl:max-w-7xl min-h-[95vh] mx-auto">
            <section className="text-gray-600 body-font">
                <h1 className='text-lg md:text-xl font-semibold text-center border-b shadow-xs mt-1'>All Submission</h1>
                <div className="mx-auto ">
                    <div className="w-full mx-auto overflow-auto min-h-[90vh]">
                        <div className='bg-zinc-300 shadow-lg w-full py-2 pr-4 md:pr-6 ml-auto flex justify-end items-center gap-2'>
                            <input
                                className='rounded-md border border-blue-500 hover:bg-blue-700 focus:outline outline-green-600 font-semibold hover:text-white px-3 py-0.5' type="button" value='All'
                                onClick={() => setQueryData(c => ({ ...c, country: "", state: "", city: "", keyword: '', category: '', create_date: '' }))}
                            />
                            {user.role !== DATA_ENTRY_OPERATOR && <select
                                onChange={(e) => setExpectedData(e.target.value)}
                                className="text-md bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 font-medium pl-1 py-[3px] leading-8 transition-colors duration-200 ease-in-out"
                            >
                                <option value={user.role === ON_FIELD_MARKETER ? "fild_marketer_data" : user.role === TELE_MARKETER ? "tele_marketer_data" : "data_entry"} selected>select type</option>
                                <option value="data_entry">Data Entire</option>
                                <option value="tele_marketer_data">Telemarketing</option>
                                {user.role !== TELE_MARKETER && <option value="fild_marketer_data">Field Marketing</option>}
                            </select>}
                            <select
                                onChange={(e) => setQueryData(c => ({ ...c, category: e.target.value }))}
                                className="text-md bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 font-medium pl-1 py-[3px] leading-8 transition-colors duration-200 ease-in-out"
                            >
                                <option value='' selected>select category</option>
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
                        {content}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Private(All_Tasks_submission);