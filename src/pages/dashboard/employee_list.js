import { LargeSpinner } from '@/components/Spinner';
import React from 'react';
import { BsSearch } from 'react-icons/bs';

const EmployeeList = () => {
    const { data, isLoading, isError, error } = { data: { success: true } };

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
            content = <h3 className='text-2xl text-green-500 text-center mt-[20%]'>Empty services !</h3>
        } else {
            content = <section className="text-gray-600 body-font">
                <h1 className='text-2xl font-semibold text-center border-b shadow-xs mt-3'>All Account list</h1>
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
                        className="text-md bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <p className='text-[13px] font-medium border px-1 rounded text-center'><span className='text-green-500 drop-shadow-md text-sm'>{data?.data?.length}</span><br />Available</p>
                </div>
                <div className=" px-5 py-5 mx-auto">
                    <div className="w-full mx-auto overflow-auto">
                        {/* <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Logo</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Location</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Executor</th>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-3">Start</td>
                                    <td className="px-4 py-3">5 Mb/s</td>
                                    <td className="px-4 py-3">15 GB</td>
                                    <td className="px-4 py-3 text-lg text-gray-900">Free</td>
                                    <td className="w-10 text-center">
                                        <input name="plan" type="radio" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">Pro</td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">25 Mb/s</td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">25 GB</td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">$24</td>
                                    <td className="border-t-2 border-gray-200 w-10 text-center">
                                        <input name="plan" type="radio" />
                                    </td>
                                </tr>
                                <tr className='max-w-[100px]'>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">Business</td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">36 Mb/s</td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3">40 GB</td>
                                    <td className="border-t-2 border-gray-200 px-4 py-3 text-lg text-gray-900">$50</td>
                                    <td className="border-t-2 border-gray-200 w-10 text-center">
                                        <input name="plan" type="radio" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">Exclusive</td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">48 Mb/s</td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3">120 GB</td>
                                    <td className="border-t-2 border-b-2 border-gray-200 px-4 py-3 text-lg text-gray-900">$72</td>
                                    <td className="border-t-2 border-b-2 border-gray-200 w-10 text-center">
                                        <input name="plan" type="radio" />
                                    </td>
                                </tr>
                            </tbody>
                        </table> */}
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

export default EmployeeList;