import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { useGetEmployeeByQueQuery } from '@/app/features/users/userApi';
import { SmallSpinner } from '@/components/Spinner';
import { DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import React, { useState } from 'react';
import { BsPersonVideo3 } from 'react-icons/bs';

const AssignTask = () => {
    const [userQuery, setUserQuery] = useState({ role: '' });
    const [employee, setEmployee] = useState({});
    const { data: userData, isLoading: userLoading } = useGetEmployeeByQueQuery(`role=${userQuery.role}`);
    const { data, isLoading, isError, error } = useGetAllDataQuery(``);
    console.log(data, isError, isLoading, error);
    // console.log(employee);

    return (
        <div className='max-w-lg md:max-w-2xl lg:max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-2 md:py-2 lg:py-4 md:my-2'>
            <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase">Assign task</h2>
            <p className="leading-relaxed mb-2 text-gray-600 w-80 md:w-full">Help us with your valuable information so that we can benefit you.</p>
            <div className='grid grid-cols-1 lg:grid-cols-5  lg:divide-x-2 gap-3 h-fit'>
                <div className='col-span-2 grid grid-cols-1 gap-x-3 h-fit'>
                    <hr className='col-span-full' />
                    <div className="relative my-2 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Select task type *</label>
                        <select onChange={(e) => setUserQuery({ ...userQuery, role: e.target.value })} name='busiCategory' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out" >
                            <option selected disabled >Select task type</option>
                            <option value={DATA_ENTRY_OPERATOR}>Data Entire</option>
                            <option value={MARKETER}>Marketing</option>
                            <option value={TELE_MARKETER}>Telemarketing</option>
                            <option value={ON_FIELD_MARKETER}>Field Marketing</option>
                        </select>
                    </div>
                    <div className="relative my-2 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Choose worker *</label>
                        {userLoading ?
                            <input
                                type="text" disabled value='Please Wait.....'
                                className="w-full animate-pulse bg-indigo-100 text-center rounded border border-gray-300 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            : <select onChange={(e) => setEmployee(userData?.data.find(user => user.userId === e.target.value))} name='busiSize' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out" >
                                <option selected disabled >{userData?.success && userData.data.length === 0 && userQuery.role ? `Empty ${userQuery?.role}` : "Select name"}</option>
                                {userData?.success && userData.data.map(user =>
                                    <option key={user.userId} value={user.userId}>{user.name + ' - ' + user.userId}</option>
                                )}
                            </select>
                        }
                    </div>
                    <div className="relative my-2 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Employee address *</label>
                        <div className='flex justify-center'>
                            <input
                                value={employee?.address?.country || "Select worker"} type="text" disabled
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            <input
                                value={employee?.address?.district || "Select worker"} type="text" disabled
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="relative my-2 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Other Address *</label>
                        <input
                            value={`Village - ${employee?.address?.village ? employee?.address?.village : "invalid"} Postcode - ${employee?.address?.postcode ? employee?.address?.postcode : "invalid"}`} type="text" disabled
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <main className='col-span-3 lg:pl-4'>
                    {(employee.email && !isLoading) || <div className='h-full bg-indigo-50 animate-pulse min-h-[300px] relative'>
                        <nav className='h-[15%] bg-indigo-100 animate-pulse shadow-sm'></nav>
                        <h1 className='text-lg font-medium text-gray-400 duration-500 absolute top-1/2 text-center w-full select-none'>{isLoading ? <span>Loading.....!</span> : <span>Select Employee Type!</span>} </h1>
                        <nav className='h-[15%] bg-indigo-100 w-[80%] animate-pulse mt-8 shadow-sm'></nav>
                        <div className='bg-blue-100 h-[50%] w-1/2 mt-5'></div>
                    </div>
                    }
                    {employee.email && <section className="text-gray-600 body-font border border-gray-400 h-full">
                        <div className='col-span-full bg-slate-200 py-1 flex justify-between h-fit'>
                            <input
                                // value={inputData?.branchQty} onChange={(e) => setInputData({ ...inputData, branchQty: e.target.value < 0 ? 0 : parseFloat(e.target.value) })}
                                name='quantity' type="number" id='qty' placeholder='QTY'
                                className="max-w-[80px] text-center placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm font-medium outline-none text-gray-700 pl-2 pr-1 ml-1 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            <div className='flex justify-end gap-1'>
                                <input
                                    type="date"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <p className='text-sm font-medium border px-1 rounded'>Task <br /> <span className='text-green-500 drop-shadow-md'>2050</span></p>
                            </div>
                        </div>
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Business</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">address</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.success && data.data.map(entire => <tr key={entire._id}>
                                        <td className="w-10 text-center">
                                            <input name="plan" type="checkbox" />
                                        </td>
                                        <td className="px-4 py-3">{entire.businessDetails?.businessName}</td>
                                        <td className="px-4 py-3">{entire.address?.country}, {entire.address?.district}</td>
                                        <td className="px-4 py-3 text-lg text-gray-900">Free</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </section>}
                </main>
            </div>
        </div>
    );
};

export default AssignTask;