import { useGetEmployeeTaskQuery } from '@/app/features/dataEntire/assignTaskApi';
import { LargeSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute';
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsSearch, BsThreeDotsVertical } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const TasksList = () => {
    const router = useRouter();
    const { user } = useSelector((state) => state.auth);
    const [role, setRole] = useState('');
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
    console.log(`/divide_work/${role}?account_id=${user._id}`);
    const { data, isLoading, isError, error } = useGetEmployeeTaskQuery(`/divide_work/${role}?account_id=${user._id}`);
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
                    <p className="leading-relaxed text-sm -mt-1 text-gray-600">Provider :- {task?.executor?.name}({task?.executor?.role})</p>
                    <hr />
                    <div
                        onClick={() => (user.role === TELE_MARKETER || user.role === ON_FIELD_MARKETER) && router.push(`/dashboard/task_details/${task._id}`)}
                        className='flex justify-start items-center text-md cursor-pointer'
                    >
                        <div className="relative mt-1 text-[14.5px] grid grid-cols-7 items-center gap-3">
                            <p className="leading-7 text-gray-700 col-span-2">Task Status</p>
                            <p className='col-span-5 font-[400]'>: {"Pending"}</p>
                            {(user.role === MARKETER || user.role === DATA_ENTRY_OPERATOR) && <>
                                <p className="leading-7 -mt-4 text-gray-700 col-span-2">Work Aria </p>
                                <p className='col-span-5 -mt-4 font-[400] capitalize'>: {task?.area?.district || "N/A"}, {task?.area?.country || "N/A"}</p>
                            </>}
                            {(user.role === TELE_MARKETER || user.role === ON_FIELD_MARKETER) && <>
                                <p className="leading-7 -mt-4 text-gray-700 col-span-2">In-Total</p>
                                <p className='col-span-5 -mt-4 font-[400]'>: {task.dataIds.length} Segment</p>
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
                <div className='w-full flex justify-end items-center gap-1 py-[6px] bg-indigo-300'>
                    <label className="relative block rounded-md">
                        <span className="sr-only">Search</span>
                        <span className="absolute top-[14px] right-0 flex items-center pr-2">
                            <BsSearch className='active:text-green-300 text-sm' />
                        </span>
                        <input
                            className="w-full text-md placeholder:italic bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 pr-6 leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="Search for anything..." type="text" name="search" autoComplete="off"
                        />
                    </label>
                    <input
                        type="date"
                        className="text-md bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 px-3 leading-8 transition-colors duration-200 ease-in-out mr-2"
                    />
                </div>
                {content}
            </section>
        </div>
    );
};


export default Private(TasksList);