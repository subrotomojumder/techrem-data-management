import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { ImPencil2 } from 'react-icons/im';
import Link from 'next/link';
import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';

const Entires_data = () => {
    const [entireData, setEntireData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/data.json`);
            const entireData = await res.json();
            setEntireData(entireData)
        }
        return () => fetchData();
    }, [])

    const { data, isLoading, isError, error } = useGetAllDataQuery("limit=2");
    console.log(data, isLoading, isError, error);

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
            content = <h3 className='text-2xl text-green-500 text-center mt-[20%]'>Empty services !</h3>
        } else {
            content = <div className=' grid grid-cols-1 md:grid-cols-2 lggg:grid-cols-3 gap-4 lg:max-w-5xl lggg:max-w-6xl xl:max-w-7xl mx-4 smm:mx-16 md:mx-4 lg:mx-auto mt-5'>
                {entireData.map((data, i) => <div key={i} className='w-full  px-4 py-2 smm:py-4  md:py-2 lg:py- bg-white rounded drop-shadow'>
                    <button className='text-xs bg-slate-50 p-1 rounded-full active:text-green-400 absolute top-2 right-4'><BsThreeDotsVertical className='font-bold' /></button>
                    <h2 className="text-gray-900 font-medium text-[0.625rem] uppercase">Data No - {++i}</h2>
                    <p className="leading-relaxed text-xs -mt-1 text-gray-600">Owners :- {data?.ownerName}</p>
                    <hr />
                    <Link href={`/dashboard/data_manage`}>
                        <div className='flex justify-start items-center text-md '>
                            <img src={data.busiLogo} className='w-12 mr-1' alt="company logo" />
                            <div className="relative mt-1 grid grid-cols-7 gap-3">
                                <p className="leading-7 text-gray-700 col-span-3">Business Name :</p>
                                <p className='col-span-4 font-[600]'>{data.busiName}</p>
                                <p className="leading-7 -mt-4 text-gray-700 col-span-3">Location <span className='ml-12'>:</span></p>
                                <p className='col-span-4 -mt-4 font-[600]'>{data.district}, {data.country}</p>
                            </div>
                        </div>
                    </Link>
                </div>)}
            </div>
        };
    };
    return (
        <div className='min-h-[80vh]'>
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
export default Entires_data