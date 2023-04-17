import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ImPencil2 } from 'react-icons/im';
import Link from 'next/link';
import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';

// / http://localhost:5000/api/v1/data_entry
const Entires_data = () => {
    const [actionShow, setActionShow] = useState('');
    // limit=2
    const { data, isLoading, isError, error } = useGetAllDataQuery("");
    console.log(data?.data[0], isLoading, isError, error);

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
                <h1 className='text-2xl font-semibold text-center border-b shadow-xs mt-3'>All Entire data list</h1>
                <div className=" px-5 py-5 mx-auto">
                    <div className="w-full mx-auto overflow-auto">
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Logo</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Shop-Name</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Category</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Owner</th>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br pr-2 lg:pr-6">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.data.map(({ businessDetails, _id, ownerDetails }) => <tr key={_id}>
                                    <td className="px-4 py-3">Start</td>
                                    <td className="px-4 py-3">{businessDetails?.businessName}</td>
                                    <td className="px-4 py-3">{businessDetails?.category}</td>
                                    <td className="px-4 py-3 text-lg text-gray-900">{ownerDetails?.name}</td>
                                    <td className="w-10 text-center relative" onMouseLeave={() => setActionShow('')}>
                                        <button
                                            onClick={() => setActionShow(_id)}
                                            className='hover:bg-gray-300 active:text-blue-200 active:bg-gray-400 p-1 rounded-md'
                                        >
                                            <BsThreeDotsVertical />
                                        </button>
                                        {actionShow === _id &&
                                            <div
                                                className="absolute top-8 right-4 z-30"
                                            >
                                                <ul className="p-1 shadow-lg bg-blue-100 rounded-xl border border-white">
                                                    <button
                                                        className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                                    >Edit</button>
                                                    <button
                                                        onClick={() => setDeletedBooking(book)}
                                                        className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                                                    >Delete</button>
                                                    <button
                                                        onClick={() => navigate(`/booking-details/${_id}`)}
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
export default Entires_data;

// content = <div className=' grid grid-cols-1 md:grid-cols-2 lggg:grid-cols-3 gap-4 lg:max-w-5xl lggg:max-w-6xl xl:max-w-7xl mx-4 smm:mx-16 md:mx-4 lg:mx-auto mt-5'>
// {data?.data?.map((data, i) => <div key={i} className='w-full  px-4 py-2 smm:py-4  md:py-2 lg:py- bg-white rounded drop-shadow'>
//     <button className='text-xs bg-slate-50 p-1 rounded-full active:text-green-400 absolute top-2 right-4'><BsThreeDotsVertical className='font-bold' /></button>
//     <h2 className="text-gray-900 font-medium text-[0.625rem] uppercase">Data No - {++i}</h2>
//     <p className="leading-relaxed text-xs -mt-1 text-gray-600">Owners :- {data?.ownerName}</p>
//     <hr />
//     <Link href={`/dashboard/data_manage`}>
//         <div className='flex justify-start items-center text-md '>
//             <img src={data.busiLogo} className='w-12 mr-1' alt="company logo" />
//             <div className="relative mt-1 grid grid-cols-7 gap-3">
//                 <p className="leading-7 text-gray-700 col-span-3">Business Name :</p>
//                 <p className='col-span-4 font-[600]'>{data.busiName}</p>
//                 <p className="leading-7 -mt-4 text-gray-700 col-span-3">Location <span className='ml-12'>:</span></p>
//                 <p className='col-span-4 -mt-4 font-[600]'>{data.district}, {data.country}</p>
//             </div>
//         </div>
//     </Link>
// </div>)}
// </div>