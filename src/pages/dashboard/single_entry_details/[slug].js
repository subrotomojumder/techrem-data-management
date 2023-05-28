import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetEntireDataByIdQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner, SmallSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute';
import { useSelector } from 'react-redux';
import { ADMIN, INTERESTED, MARKETER, NOTINTERESTED, NOTSURE, ORDER_COMPLETED } from '@/utils/constant';
import Entire_show from '@/components/Entire_show';
import { usePostEmployeeTaskMutation } from '@/app/features/campaignManage/campaignManageApi';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { errorSweetAlert, successToast } from '@/utils/neededFun';

const Single_Entry_show = () => {
    const [inputData, setInputData] = useState({});
    const router = useRouter();
    const { slug } = router.query;
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading: dataLoading, isError, error } = useGetEntireDataByIdQuery(slug, { skip: !slug });
    const [postTaskSubmission, { isLoading }] = usePostEmployeeTaskMutation();
    console.log(data)
    const handleUpdate = (e) => {
        e.preventDefault();
        const data = { process: e.target?.customer_response?.value, dataId: slug, communication_note: e.target?.note?.value };
        // return console.log(data)
        postTaskSubmission(data)
            .then(res => {
                console.log(res);
                if (res.data?.success) {
                    successToast("Submit Successful!")
                    setInputData({});
                } else {
                    errorSweetAlert("Something went wrong!")
                }
            })
    };
    if (!router.query?.slug || dataLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.message) {
            return <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.message}</p>
            </div>
        } else if (error.error) {
            return <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else if (error.data.message) {
            return <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.data.dev_err || error.data.message}</p>
            </div>
        }
    };
    return (
        <div className={`grid grid-cols-1 ${(user.role === ADMIN || user.role.MARKETER) && 'lgg:grid-cols-9'} gap-4 lg:max-w-4xl lggg:max-w-5xl xl:max-w-7xl  xxl:max-w-[1300px] min-h-screen bg-white rounded shadow-md  md:mx-4 lgg:mx-auto md:my-4 px-4 py-4 lgg:px-6 lgg:divide-x-2`}>
            <div className={`col-span-5 px-2`}>
                {/* <img className='w-full max-h-[250px]' src={"https://st2.depositphotos.com/4035913/6124/i/600/depositphotos_61243831-stock-photo-letter-s-logo.jpg"} alt="" /> */}
                <div className='h-fit capitalize'>
                    <Entire_show data={data} />
                </div>
            </div>
            {(user.role === ADMIN || user.role.MARKETER) &&
                <div className={`col-span-4 h-fit px-4 md:my-2 rounded-sm`}>
                    <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase text-center"><BsTelephoneOutbound className='inline' /> Communication report</h2>
                    <p className='text-center mb-2'>Write your contact data</p>
                    <hr />
                    <div>
                        <form onSubmit={handleUpdate} className='mt-1'>
                            <div className="relative mb-2 mt-1">
                                <label className="leading-7 font-[600] text-gray-700">Customer Response</label>
                                <select
                                    value={inputData.response || ''} required={!inputData?.response}
                                    onChange={(e) => setInputData({ ...inputData, response: e.target.value })}
                                    name='customer_response'
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                                    <option value={''} selected >Select Response</option>
                                    <option value={INTERESTED}>Interested Customer</option>
                                    <option value={NOTINTERESTED}>Not Interested Customer</option>
                                    <option value={NOTSURE}>Not Sure Customer</option>
                                    <option value={ORDER_COMPLETED}>Order Completed</option>
                                </select>
                            </div>

                            <div className="relative mb-1 mt-1">
                                <label htmlFor='details' className="leading-7 font-[600] text-gray-700">Communication details *</label>
                                <textarea
                                    value={inputData.note || ''} required onChange={(e) => setInputData({ ...inputData, note: e.target.value })} name='note' type="text" id='details' placeholder='Important information.......'
                                    rows="12" cols="50" className="w-full bg-white rounded-sm  border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="relative mb-2 mt-1">
                                <div className='flex justify-center gap-2 mt-2'>
                                    <button type='reset' onClick={() => setInputData({})} className="text-white font-semibold bg-red-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded duration-75">Reset</button>
                                    <button disabled={isLoading} type='submit' className="text-white bg-indigo-500 border-0 w-24 h-10 py-2 px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 font-semibold disabled:bg-indigo-400 rounded align-middle">
                                        {(isLoading) ? <SmallSpinner /> : "Submit"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >}
        </div >
    );
};

export default Private(Single_Entry_show);