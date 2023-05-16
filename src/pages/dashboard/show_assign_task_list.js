
import { useGetEmployeeTaskQuery } from '@/app/features/dataEntire/assignTaskApi';
import { LargeSpinner } from '@/components/Spinner';
import { MarketerProtect } from '@/utils/ProtectRoute';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Show_assign_task_list = () => {
    const { user } = useSelector((state) => state.auth);
    const [queryData, setQueryData] = useState({ expectedRole: "dataEntry_divide", keyword: '' });

    const { data, isLoading, isError, error } = useGetEmployeeTaskQuery(`/divide_work/${queryData?.expectedRole}?executor_id=${user._id}&keyword=${queryData?.keyword}`);//&create_date=${queryData?.create_date || ''}
    let content;
    if (isLoading) {
        content = <LargeSpinner />;
    };
    if (!user.role) {
        content = <LargeSpinner></LargeSpinner>
    }
    // console.log(data, isLoading, isError, error);
    if (isError) {
        if (error.message) {
            content = <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.message}</p>
            </div>
        } else if (error.error) {
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
            content = <h3 className='text-2xl text-green-500 text-center mt-[20%]'>Empty task !</h3>
        } else {
            content = <div className=' grid grid-cols-1 md:grid-cols-2 lggg:grid-cols-3 gap-4 lg:max-w-5xl lggg:max-w-6xl xl:max-w-7xl mx-2 mt-5'>
                {data?.data?.map((task, i) => <div key={i} className='w-full  px-4 py-2 smm:py-4  md:py-2 lg:py- bg-white rounded drop-shadow'>
                    <button className='text-xs bg-slate-50 p-1 rounded-full active:text-green-400 absolute top-2 right-4'><BsThreeDotsVertical className='font-bold' /></button>
                    <h2 className="text-gray-900 font-medium text-[0.625rem] uppercase">Assign date - {format(new Date(task.create_date), 'yyyy-MM-dd')}</h2>
                    <p className="leading-relaxed text-sm -mt-1 text-gray-600">Assign by -  {task?.teleMarketer?.name || task?.dataEntry?.name || task?.onfieldMarketer?.name || task?.marketer?.name}</p>
                    <hr />
                    <div className='flex justify-start items-center text-md'>
                        <div className="relative mt-1 text-[14.5px] grid grid-cols-7 items-center gap-3">
                            <p className="leading-7 text-gray-700 col-span-2">Task Status</p>
                            <p className='col-span-5 font-[400]'>: {"Pending"}</p>
                            {(queryData?.expectedRole === "dataEntry_divide" || queryData?.expectedRole === "marketer_divide") && <>
                                <p className="leading-7 -mt-4 text-gray-700 col-span-2">Work Aria </p>
                                <p className='col-span-5 -mt-4 font-[400] capitalize'>: {task?.area?.district || "N/A"}, {task?.area?.country || "N/A"}</p>
                            </>}
                            {(queryData?.expectedRole === "tele_divide" || queryData?.expectedRole === "onField_divide") && <>
                                <p className="leading-7 -mt-4 text-gray-700 col-span-2">In-Total</p>
                                <p className='col-span-5 -mt-4 font-[400]'>: {task.dataIds?.length} Segment</p>
                            </>}
                            <p className="leading-7 -mt-4 text-gray-700 col-span-2">Daterange</p>
                            <p className='col-span-5 -mt-4 font-[400]'>: {format(new Date(task.assign_date?.start), 'yyyy-MM-dd')} To {format(new Date(task.assign_date?.end), 'yyyy-MM-dd')}</p>
                        </div>
                    </div>
                </div >)}
            </div >
        };
    };
    return (
        <div className="text-gray-600 body-font max-w-6xl xxl:max-w-7xl border min-h-[95vh] mb-4 mt-1 mx-auto">
            <section className="text-gray-600 body-font h-full relative">
                <div className='bg-zinc-300 shadow-lg w-full py-2 pr-4 md:pr-6 ml-auto flex justify-end items-center gap-2'>
                    <select
                        onChange={(e) => setQueryData(c => ({ ...c, expectedRole: e.target.value }))}
                        className="text-md bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 font-medium pl-1 py-[3px] leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value="dataEntry_divide">Data Entire</option>
                        <option value="marketer_divide">Marketer</option>
                        <option value="tele_divide">Telemarketer</option>
                        <option value="onField_divide">Field Marketer</option>
                    </select>
                    <input
                        onChange={(e) => setQueryData(c => ({ ...c, create_date: format(new Date(e.target.value), 'yyyy-MM-dd') }))}
                        type="date" className=" bg-white border border-slate-300 rounded-md py-1 px-1 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
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
            </section>
        </div>
    );
};


export default MarketerProtect(Show_assign_task_list);