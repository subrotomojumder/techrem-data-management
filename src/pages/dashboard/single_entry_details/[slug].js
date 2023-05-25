import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetEntireDataByIdQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner, SmallSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute';
import { useSelector } from 'react-redux';
import { ADMIN, DATA_ENTRY_OPERATOR, INTERESTED, MARKETER, NOTINTERESTED, NOTSURE } from '@/utils/constant';
import Entire_show from '@/components/Entire_show';
import { usePostEmployeeTaskMutation } from '@/app/features/campaignManage/campaignManageApi';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { errorSweetAlert, successToast } from '@/utils/neededFun';

const Single_Entry_show = () => {
    const [inputData, setInputData] = useState({});
    const router = useRouter();
    const { slug } = router.query;
    const { data, isLoading: dataLoading, isError, error } = useGetEntireDataByIdQuery(slug, { skip: !slug });
    const [postTaskSubmission, { isLoading }] = usePostEmployeeTaskMutation();

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
        <div className='lg:max-w-4xl lggg:max-w-5xl xl:max-w-7xl  xxl:max-w-[1300px] min-h-screen bg-white rounded-lg shadow-md  md:mx-4 lgg:mx-auto md:my-4 px-4 py-4 lgg:px-6'>
            <Entire_show data={data} />
        </div >
    );
};

export default Private(Single_Entry_show);