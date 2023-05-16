import React, { useState } from 'react';
import { EmptyLoader, SmallSpinner } from './Spinner';
import { usePostEntireTaskMutation, usePostMarketerTaskMutation, } from '@/app/features/dataEntire/assignTaskApi';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { errorToast, successToast } from '@/utils/neededFun';
import { DATA_ENTRY_OPERATOR, MARKETER } from '@/utils/constant';
import { format } from 'date-fns';
import AddressAddForm from './extra/AddressAddForm';

const MarketerAndEntireAssignForm = ({ employee }) => {
    const [taskAria, setTaskAria] = useState(employee.address);
    const [postMarketerTask, { isLoading: marketerLoading }] = usePostMarketerTaskMutation();
    const [postDataEntireTask, { isLoading: dataEntireLoading }] = usePostEntireTaskMutation();
    const { user, isLoading: userLoading } = useSelector((state) => state.auth);
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();
    const startDate = watch('start');

    const submit = (data) => {
        let task_data = {
            [`${employee.role === MARKETER ? "marketer" : "dataEntry"}`]: {
                name: employee.name,
                account_id: employee._id
            },
            executor: {
                account_id: user._id,
                name: user.name,
                role: user.role
            },
            assign_date: {
                start: data.start,
                end: data.end
            },
            area: taskAria
        };
        if (employee.role === MARKETER) {
            postMarketerTask(task_data).then(res => {
                if (res.error) errorToast("Some thing went wrong!");
                if (res.data?.success) {
                    successToast("Successfully submited task!");
                    reset();
                }
                if (res.data?.success === false) errorToast(res.data.message);
                // console.log(res);
            }).catch(e => console.log(e));
        }
        if (employee.role === DATA_ENTRY_OPERATOR) {
            postDataEntireTask(task_data).then(res => {
                if (res.error) errorToast("Some thing went wrong!");
                if (res.data?.success) {
                    successToast("Successfully submited task!");
                    reset();
                }
                if (res.data?.success === false) errorToast(res.data.message);
                // console.log(res);
            }).catch(e => console.log(e));
        }
    };
    if (userLoading) {
        return <EmptyLoader isLoading={userLoading} />
    }
    return (
        <section className="text-gray-600 body-font border border-gray-400 h-full pt-4 pb-6 px-9">
            <h2 className='text-xl font-[400] text-blue-500 underline mb-3'>Work statements of {employee.role}</h2>
            <form onSubmit={handleSubmit(submit)} className='col-span-2 grid grid-cols-1 gap-x-3 h-fit'>
                <div className="relative my-1 w-full">
                    <label className="leading-7 font-[500] text-gray-600">Write Work Aria *</label>
                    <AddressAddForm addressValue={taskAria} setAddressValue={setTaskAria} classes={{ label: "text-xs", contain: 'grid grid-cols-2 gap-x-3'}} />
                </div>
                <div className='w-full flex justify-start gap-x-2 md:gap-x-4 xl:gap-x-8  '>
                    <div className='w-full'>
                        <label className="leading-7 font-[500] text-gray-600">Start Date *</label>
                        <input
                            {...register("start", { required: "Work start date is required!" })}
                            type="date" placeholder='Country Name...' min={format(new Date(), 'yyyy-MM-dd')}
                            className="w-full bg-white rounded placeholder:text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        {errors.start?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-1'>{errors.start?.message}</p>}
                    </div>
                    <div className='w-full'>
                        <label className="leading-7 font-[500] text-gray-600">End Date *</label>
                        <input
                            {...register("end", { required: "Work end date is required!" })}
                            type="date" placeholder='Country Name...' min={startDate || format(new Date(), 'yyyy-MM-dd')}
                            className="w-full bg-white rounded placeholder:text-gray-900 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-500 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        {errors.end?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-1'>{errors.end?.message}</p>}
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
                    type='submit' disabled={marketerLoading || dataEntireLoading}
                    className={`w-36 mx-auto py-2 rounded-md mt-6 disabled:bg-blue-500 disabled:cursor-not-allowed disabled:outline-0 bg-blue-700 hover:bg-blue-800 active:outline outline-green-600  disabled:outline-none font-semibold text-white flex justify-center items-center`}
                >
                    {marketerLoading || dataEntireLoading ? <SmallSpinner /> : "Assign"}
                </button>
            </form>
        </section>
    );
};

export default MarketerAndEntireAssignForm;