import { useGetEmployeeByQueQuery } from '@/app/features/users/userApi';
import SingleUser from '@/components/SingleUser';
import { LargeSpinner } from '@/components/Spinner';
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const EmployeeList = () => {
    const [queryData, setQueryData] = useState({ role: "", keyword: "" , active: true});
    const { data, isLoading, isError, error } = useGetEmployeeByQueQuery(`role=${queryData.role}&keyword=${queryData.keyword}`);
    console.log(queryData);
    let content;
    if (isLoading) {
        content = <LargeSpinner></LargeSpinner>
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
    };
    if (!isLoading && data?.data?.length === 0) {
        content = <div className='text-center mt-10 md:mt-52'>
            <p className="text-2xl text-red-500">User collection empty!</p>
        </div>
    };
    if (!isLoading && data?.success) {
        content = <div className='grid sm:grid-cols-1 smm:grid-cols-2 mdd:grid-cols-3 lg:grid-cols-4 gap-3'>
            {data?.data.map((user) => <SingleUser user={user} key={user._id} />)}
        </div>
    };
    return (
        <div
            className='w-full min-h-screen -mb-5'
            style={{ background: `linear-gradient(90deg, rgba(226, 145, 186, 0.5), rgba(226, 145, 186, 0.3)), url(https://png.pngtree.com/thumb_back/fh260/back_our/20190621/ourmid/pngtree-investment-financial-management-financial-background-image_194572.jpg)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}
        >
            <div className='bg-zinc-300 shadow-lg w-full py-2 pr-4 md:pr-6 ml-auto flex justify-end items-center gap-2'>
                <div className='font-semibold'>
                    <input checked={queryData.active || false} type="checkbox" onChange={(e) => setQueryData(c => ({ ...c, active: !c.active && true }))} /> Active
                </div>
                <select
                    onChange={(e) => setQueryData(c => ({ ...c, role: e.target.value }))}
                    className="text-md bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 font-medium pl-1 py-[2px] leading-8 transition-colors duration-200 ease-in-out"
                >
                    <option value='' selected >select-role</option>
                    <option value={ADMIN}>Admin</option>
                    <option value={MARKETER}>Marketer</option>
                    <option value={DATA_ENTRY_OPERATOR}>Data Entire</option>
                    <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                    <option value={TELE_MARKETER}>Telemarketer</option>
                </select>
                <label className="relative block rounded-md">
                    <span className="sr-only">Search</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <BsSearch className='active:text-green-300' />
                    </span>
                    <input
                        onChange={(e) => setQueryData({ ...queryData, keyword: e.target.value })}
                        className="placeholder:italic placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-1 pr-9 pl-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                        placeholder="email or name..." type="text" name="search"
                    />
                </label>
            </div>
            <main className="px-2 md:px-4 lg:px-6 pt-2 pb-8 ">
                {content}
            </main>
        </div >)
};

export default EmployeeList;