import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ImPencil2 } from 'react-icons/im';
import Link from 'next/link';
import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute';
import { useRouter } from 'next/router';

// / http://localhost:5000/api/v1/data_entry
const Entires_data = () => {
    const [actionShow, setActionShow] = useState('');
    // limit=2
    const router = useRouter()
    const { data, isLoading, isError, error } = useGetAllDataQuery("");
    // console.log(data?.data[0], isLoading, isError, error);

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
            content = <section className="text-gray-600 body-font">
                <h1 className='text-xl md:text-2xl font-semibold text-center border-b shadow-xs mt-3'>All Entire data list</h1>
                <div className=" px-5 py-5 mx-auto">
                    <div className="w-full mx-auto overflow-auto">
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
                                {data.data.map(({ businessDetails, _id, ownerDetails }, ndx) => <tr key={_id} className={`${ndx % 2 || "bg-green-100"}`}>
                                    <td className="">
                                        <img className='max-w-[50px]' src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297__340.png" alt="" />
                                    </td>
                                    <td className="px-4 py-1">
                                        <span className='text-[14.2px] font-medium'> {businessDetails?.category}</span> <br />
                                        <span> Name: {businessDetails?.businessName}</span>
                                    </td>
                                    <td className="px-4 py-3 text-lg text-gray-900">{ownerDetails?.name}</td>
                                    <td className="px-4 py-3">Pending</td>
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
                                                        className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                                    >Edit</button>
                                                    <button
                                                        onClick={() => setDeletedBooking(book)}
                                                        className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                                    >Delete</button>
                                                    <button onClick={()=> router.push(`/dashboard/entire_details/${_id}`)}
                                                        className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                                    >Details</button>
                                                </ul>
                                            </div>
                                        }
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        };
    };
    return (
        <div className="text-gray-600 body-font max-w-6xl xxl:max-w-7xl min-h-[95vh] mx-auto">
            {content}
        </div>
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
export default Private(Entires_data);