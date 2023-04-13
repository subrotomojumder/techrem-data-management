import React from 'react';
import { EmptyLoader, SmallSpinner } from './Spinner';
import Countries from 'countries-list';
import { usePostMarketerTaskMutation } from '@/app/features/dataEntire/assignTaskApi';
import { useForm } from 'react-hook-form';

const MarketerAssignForm = ({ employee }) => {
    const [postMarketerTask, { isLoading, isError, error }] = usePostMarketerTaskMutation();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    if (!employee?.role) {
        return <EmptyLoader otherText={`Please select marketer name!`}></EmptyLoader>
    }
    const submit = (data) => {
        console.log("object");

    }
    return (
        <section className="text-gray-600 body-font border border-gray-400 h-full pt-4 pb-6 px-9">
            <h2 className='text-xl font-[400] text-blue-500 underline mb-3'>Work statements</h2>
            <from onSubmit={handleSubmit(submit)} className='col-span-2 grid grid-cols-1 gap-x-3 h-fit'>
                <div className="relative my-1 w-full">
                    <label className="leading-7 font-[500] text-gray-600">Write Work Aria *</label>
                    <div className='flex justify-center'>
                        <select

                            className="w-full bg-white rounded rounded-r-none placeholder:text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-2 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                        >
                            <option value='' disabled>Select Country</option>
                            {Object.values(Countries.countries).map((country, i) => (
                                <option key={i} value={country.name}>{country.name}</option>
                            ))}
                        </select>
                        <select
                            // value={inputData?.address?.country}
                            // onChange={(e) => setInputData({ ...inputData, address: { ...inputData?.address, country: e.target.value } })}
                            className="w-full bg-white rounded rounded-l-none placeholder:text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-2 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                        >
                            <option value='' disabled>Select Country</option>
                            <option value='noakhali' >Noakhali</option>
                            <option value='Borishal' >Borishal</option>
                            <option value='Asam' >Asam</option>
                            {/* {Object.values(Countries.countries).map((country, i) => (
                                <option key={i} value={country.name}>{country.name}</option>
                            ))} */}
                        </select>
                    </div>
                </div>
                <div className='w-full flex justify-start gap-x-2 md:gap-x-4 xl:gap-x-8  '>
                    <div className='w-full'>
                        <label className="leading-7 font-[500] text-gray-600">Start Date *</label>
                        <input
                            type="date" placeholder='Country Name...'
                            className="w-full bg-white rounded placeholder:text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className='w-full'>
                        <label className="leading-7 font-[500] text-gray-600">End Date *</label>
                        <input
                            type="date" placeholder='Country Name...'
                            className="w-full bg-white rounded placeholder:text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className="relative my-1 w-full grid grid-cols-7 items-center">
                    <label className="col-span-3 md:col-span-2  leading-7 text-gray-700">Operator Name :</label>
                    <input
                        value={employee.name} type="text" disabled
                        className="col-span-4 w-full border font-medium border-gray-300 text-base outline-none text-gray-500 py-1 px-3 mt-1 leading-8"
                    />
                </div>
                <div className="relative my-1 w-full grid grid-cols-7 items-center">
                    <label className="col-span-3 md:col-span-2  leading-7 text-gray-700">Operator Email :</label>
                    <input
                        value={employee.email} type="text" disabled
                        className="col-span-4 w-full border font-medium border-gray-300 text-base outline-none text-gray-500 py-1 px-3 mt-1 leading-8"
                    />
                </div>
                <div className="relative my-1 w-full grid grid-cols-7 items-center">
                    <label className="col-span-3 md:col-span-2  leading-7 text-gray-700">Operator Phone :</label>
                    <input
                        value={employee.phone} type="text" disabled
                        className="col-span-4 w-full border font-medium border-gray-300 text-base outline-none text-gray-500 py-1 px-3 mt-1 leading-8"
                    />
                </div>
                <button
                    type='submit'
                    className={`w-36 mx-auto py-2 rounded-md mt-6 disabled:bg-blue-500 disabled:cursor-not-allowed disabled:outline-0 bg-blue-700 hover:bg-blue-800 active:outline outline-green-600  disabled:outline-none font-semibold text-white flex justify-center items-center`}
                >
                    {"isLoading" ? <SmallSpinner /> : "Assign"}
                </button>
            </from>
        </section>
    );
};

export default MarketerAssignForm;