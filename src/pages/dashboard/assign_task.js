import { useGetEmployeeByQueQuery } from '@/app/features/users/userApi';
import MarketerAndEntireAssignForm from '@/components/MarketerAndEntireAssignForm';
import TeleAndFieldAssignForm from '@/components/TeleAndFieldAssignForm';
import { EmptyLoader } from '@/components/Spinner';
import { DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { errorToast } from '@/utils/neededFun';
import React, { useEffect, useState } from 'react';
const AssignTask = () => {
    const [userQuery, setUserQuery] = useState({ role: "", country: "", state: "", village: "" });
    const [employee, setEmployee] = useState({});
    const { data: userData, isLoading: userLoading, isError, error } = useGetEmployeeByQueQuery(`role=${userQuery.role}&country=${userQuery.country}&state=${userQuery.state}&village=${userQuery.village}`);
    // console.log(userData);
    useEffect(() => {
        if (isError) {
            if (error.data.message) {
                errorToast(error.data.message);
            }
            console.log(error);
        }
    }, [isError]);
    // console.log(userQuery);
    // console.log(userData,userLoading, isError, error);
    // console.log("query: ", userQuery.role, "employee: ", employee.role);
    return (
        <div className='max-w-lg md:max-w-2xl lg:max-w-7xl min-h-screen mx-auto px-6 md:px-8 lg:px-10 py-2 md:py-2 lg:py-4 md:my-2'>
            <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase">Assign task</h2>
            <p className="leading-relaxed mb-2 text-gray-600 w-80 md:w-full">Help us with your valuable information so that we can benefit you.</p>
            <div className='grid grid-cols-1 lg:grid-cols-5  lg:divide-x-2 gap-3 h-full relative'>
                <div className='col-span-2 grid grid-cols-1 gap-x-3 h-fit lg:sticky top-14 left-0'>
                    <hr className='col-span-full' />
                    <div className="relative my-2 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Select task type *</label>
                        <select
                            onChange={(e) => {
                                setEmployee({});
                                setUserQuery({ role: e.target.value, country: "", state: "", village: "" });
                            }}
                            name='busiCategory' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out" >
                            <option selected disabled >Select task type</option>
                            <option value={DATA_ENTRY_OPERATOR}>Data Entire</option>
                            <option value={MARKETER}>Marketer</option>
                            <option value={TELE_MARKETER}>Telemarketer</option>
                            <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                        </select>
                    </div>
                    <div className="relative my-2 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Employee address *</label>
                        <div className='grid grid-cols-10 justify-center'>
                            <select
                                onChange={(e) => {
                                    setEmployee({});
                                    setUserQuery({ ...userQuery, country: e.target.value, state: "", village: "" });
                                }}
                                name='busiCategory' className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out" >
                                <option selected value={""} >Select Country</option>
                                <option value="Bangladesh">Bangladesh</option>
                                <option value="India">India</option>
                                <option value="Australia">Australia</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Afghanistan">Afghanistan</option>
                            </select>
                            <select
                                onChange={(e) => {
                                    setEmployee({});
                                    setUserQuery({ ...userQuery, state: e.target.value, village: "" });
                                }}
                                name='busiCategory' className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out" >
                                <option selected value={""} >state</option>
                                <option value="noakhali">Noakhali</option>
                                <option value="Borishal">Borishal</option>
                                <option value="Asam">Asam</option>
                                <option value="Dhaka">Dhaka</option>
                            </select>
                            <select
                                onChange={(e) => {
                                    setEmployee({});
                                    setUserQuery({ ...userQuery, village: e.target.value });
                                }}
                                name='busiCategory' className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out" >
                                <option selected value={""} >Village</option>
                                <option value="charbata">Charbata</option>
                                <option value="Hazipur">Hazipur</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative my-2 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Choose worker *</label>
                        {userLoading ?
                            <input
                                type="text" disabled value='Please Wait.....'
                                className="w-full animate-pulse bg-indigo-100 text-center rounded border border-gray-300 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            : <select value={employee?.userId || ''}
                                onChange={(e) => setEmployee(userData?.data.find(user => user.userId === e.target.value))}
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                            >
                                <option selected >{userData?.success && userData.data.length === 0 && userQuery.role ? `Empty ${userQuery?.role}` : "Select below name"}</option>
                                {userQuery.role && userData?.success && userData.data.map(user =>
                                    <option key={user.userId} value={user.userId}>{user.name + ' - ' + user.userId}</option>
                                )}
                            </select>
                        }
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
                    {userQuery.role === "" && <EmptyLoader otherText={"Select Employee type!"} />}
                    {(userQuery.role === DATA_ENTRY_OPERATOR) && (employee.role === DATA_ENTRY_OPERATOR ) ? <MarketerAndEntireAssignForm employee={employee} /> : (userQuery.role === DATA_ENTRY_OPERATOR) && <EmptyLoader otherText={`Please select entire operator name!`} />}
                    {(userQuery.role === MARKETER) && (employee.role === MARKETER ) ? <MarketerAndEntireAssignForm employee={employee} /> : (userQuery.role === MARKETER) && <EmptyLoader otherText={`Please select marketer name!`} />}
                    {(userQuery.role === TELE_MARKETER) && (employee.role === TELE_MARKETER ) ? <TeleAndFieldAssignForm employee={employee} /> : (userQuery.role === TELE_MARKETER) && <EmptyLoader otherText={`Please select telemarketer name!`} />}
                    {(userQuery.role === ON_FIELD_MARKETER) && (employee.role === ON_FIELD_MARKETER) ? <TeleAndFieldAssignForm employee={employee} /> : (userQuery.role === ON_FIELD_MARKETER) && <EmptyLoader otherText={`Please select field marketer name!`} />}
                </main>
            </div>
        </div>
    );
};

export default AssignTask;