import { useGetEmployeeTaskQuery } from '@/app/features/dataEntire/assignTaskApi';
import { LargeSpinner } from '@/components/Spinner';
import { DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsPersonCircle, BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Details = () => {
    const [role, setRole] = useState('');
    const router = useRouter();
    const { slug } = router.query;
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (user.role === MARKETER) {
            setRole("marketer_divide")
        } else if (user.role === TELE_MARKETER) {
            setRole("tele_divide")
        } else if (user.role === ON_FIELD_MARKETER) {
            setRole("onField_divide")
        } else if (user.role === DATA_ENTRY_OPERATOR) {
            setRole("dataEntry_divide")
        }
    }, [user]);
    const { data, isLoading, isError, error } = useGetEmployeeTaskQuery(`/divide_work/${role}/${slug}`);

    let content;
    if (isLoading) {
        content = <LargeSpinner />;
    };
    if (!user.role) {
        content = <LargeSpinner></LargeSpinner>
    }
    console.log(data, isLoading, isError, error);
    if (isError) {
        if (error.message) {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.message}</p>
            </div>
        } else if (error.error) {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    } else if (!isLoading && data?.success) {
        content = <section className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-col">
                <div className="flex flex-col sm:flex-row mt-10">
                    <div className=" text-center sm:pr-8 sm:py-8">
                        <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                            <BsPersonCircle className='text-6xl' />
                        </div>
                        <div className="flex flex-col items-center text-center justify-center">
                            <h2 className="font-medium title-font mt-3 text-gray-900 text-md">{data.data?.executor?.role}</h2>
                            <h2 className="font-medium title-font text-gray-900 text-lg">Provided by {data.data?.executor?.name}</h2>
                            <div className="w-32 h-1 bg-indigo-500 rounded mb-4"></div>
                            <div className='text-left'>
                                <p>Total Segment: {data.data?.dataIds?.length}</p>
                                <p>Assign Date: {new Date(data.data?.createdAt).toLocaleString()}</p>
                                <p>Task Start: {new Date(data.data?.assign_date?.start).toDateString()}</p>
                                <p>Task end: {new Date(data.data?.assign_date?.end).toDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                        <section className="text-gray-600 body-font h-full relative">
                            <div className='col-span-full bg-slate-200 py-1 flex justify-end h-fit'>
                                <div className='flex justify-end items-center gap-1'>
                                    <label className="relative block rounded-md">
                                        <span className="sr-only">Search</span>
                                        <span className="absolute top-[14px] right-0 flex items-center pr-2">
                                            <BsSearch className='active:text-green-300 text-sm' />
                                        </span>
                                        <input
                                            className="w-full text-md placeholder:italic bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 pr-6 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                            placeholder="Search for anything..." type="text" name="search" autoComplete="off"
                                        />
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full text-md bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    <p className='text-[13px] font-medium border px-1 rounded text-center'><span className='text-green-500 drop-shadow-md text-sm'>{data?.data?.length}</span><br />Available</p>
                                </div>
                            </div>
                            <table className="table-auto w-full text-left whitespace-no-wrap">
                                <thead>
                                    <tr>
                                        <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tr rounded-br"></th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tl rounded-bl">Business</th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Address</th>
                                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.data?.dataIds.map((entire, i) => <tr key={entire._id} className={`${i % 2 === 0 && 'bg-indigo-50'}`}>
                                        <td className="w-10 text-center">
                                            {/* <input onClick={()=>  setSelectedData([...selectedData, entire._id])} name="plan" type="checkbox" /> */}
                                            <input name="plan" type="checkbox" readOnly />
                                        </td>
                                        <td className="px-4 py-3">{entire.businessDetails?.businessName}</td>
                                        <td className="px-4 py-3">{entire.address?.country}, {entire.address?.state}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    }
    return (
        <div className='min-h-[95vh] body-font max-w-6xl xxl:max-w-7xl my-4 mx-auto'>
            <h1 className='text-xl md:text-2xl text-center font-serif font-medium'>Your tasks details</h1>
            {content}
        </div>
    );
};

export default Details;