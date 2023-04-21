import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';
import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';

const Tasks_submission = () => {
    const { data, isLoading, isError, error } = useGetAllDataQuery("tele_marketer_data=true&process=pending");
    const logo = "https://img.freepik.com/free-vector/golden-bird-logo-design_1195-336.jpg?w=100";
    console.log(data);
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
    } else if (!isLoading && data?.success) {
        if (data?.data?.length === 0) {
            content = <h3 className='text-2xl text-green-500 text-center mt-[20%]'>Empty submission !</h3>
        } else {
            content = content = <div className=' grid grid-cols-1 md:grid-cols-2 lggg:grid-cols-3 gap-4 lg:max-w-5xl lggg:max-w-6xl xl:max-w-7xl mx-4 smm:mx-16 md:mx-4 lg:mx-auto mt-5'>
                {data?.data?.map((entire, i) => <div key={i} className='w-full  px-4 py-2 smm:py-4  md:py-2 lg:py- bg-white rounded drop-shadow'>
                    <button className='text-xs bg-slate-50 p-1 rounded-full active:text-green-400 absolute top-2 right-4'><BsThreeDotsVertical className='font-bold' /></button>
                    <h2 className="text-gray-900 font-medium text-[0.625rem] uppercase">Data No - {++i}</h2>
                    <p className="leading-relaxed text-xs -mt-1 text-gray-600">Owners :- {entire.ownerDetails?.name}</p>
                    <hr />
                    <Link href={`/dashboard/data_manage`}>
                        <div className='flex justify-start items-center text-md '>
                            <img src={logo} className='w-12 mr-1' alt="logo" />
                            <div className="relative mt-1 grid grid-cols-7 gap-3">
                                <p className="leading-7 text-gray-700 col-span-3">Business Name :</p>
                                <p className='col-span-4 font-[600]'>{entire?.businessDetails?.businessName}</p>
                                <p className="leading-7 -mt-4 text-gray-700 col-span-3">Location <span className='ml-12'>:</span></p>
                                <p className='col-span-4 -mt-4 font-[600]'>{data.state}, {data.country}</p>
                            </div>
                        </div>
                    </Link>
                </div>)}
            </div>
        };
    };
    return (
        <div className="text-gray-600 body-font max-w-6xl xxl:max-w-7xl min-h-[95vh] mx-auto">
            {content}
        </div>
    );
};

export default Tasks_submission;