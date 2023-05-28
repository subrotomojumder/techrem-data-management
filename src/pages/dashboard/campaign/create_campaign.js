import { CustomLoader, SmallSpinner } from '@/components/Spinner';
import Image from 'next/image';
import React, { useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { RxArrowRight } from 'react-icons/rx';
import DatePicker from "react-datepicker";
import AddressInput from '@/components/Forms/AddressInput';
import { MarketerProtect } from '@/utils/ProtectRoute';
import lightImage from '../../../assets/images/campaign_create.png'
import BusinessDataForCampaign from '@/components/CampaignCom/BusinessDataForCampaign';
import AllUserForCampaign from '@/components/CampaignCom/AllUserForCampaign';
import Swal from 'sweetalert2';
import { errorSweetAlert } from '@/utils/neededFun';
import { usePostCampaignMutation } from '@/app/features/campaignManage/campaignManageApi';

const Create_campaign = () => {
    const [campaignData, setCampaignData] = useState(null);
    const [togglePage, setTogglePage] = useState(1);
    const [custLoading, setCustLoading] = useState(false)
    const [custError, setCustError] = useState({});
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [campaignAddress, setCampaignAddress] = useState({});
    const [createCampaignPost, { isLoading }] = usePostCampaignMutation();

    const handleSubmit = event => {
        event.preventDefault();
        setCustLoading(true);
        const form = event.target;
        const campaign_name = form.campaign_name.value;
        const objective = form.objective.value;
        if (!campaignAddress?.country) {
            setCustLoading(false)
            setCustError(c => ({ ...c, country: "Address select is required!" }))
            return
        }
        setCustError(c => ({ ...c, country: null }));
        if (!campaign_name) {
            setCustLoading(false)
            setCustError(c => ({ ...c, name: "Campaign name is required!" }))
            return
        }
        setCustError(c => ({ ...c, name: null }));
        if (!objective) {
            setCustLoading(false)
            return setCustError(c => ({ ...c, objective: "Campaign objective is required!" }));
        }
        setCustError(c => ({ ...c, objective: null }));
        if (!endDate) {
            setCustLoading(false)
            return setCustError(c => ({ ...c, endDate: "Start and end date required!" }));
        }
        setCustError(c => ({ ...c, endDate: null }));
        setCustLoading(false);
        setCampaignData({ duration: { end: endDate, start: startDate }, campaign_name, objective, selectedAddress: campaignAddress });
        setTogglePage(c => (c + 1));
    };
    const createCampaignFunc = (newData) => {
        console.log(newData)
        createCampaignPost(newData)
            .then(res => {
                if (res.data?.success) {
                    Swal.fire(
                        'Complete!',
                        'Campaign create successful.',
                        'success'
                    )
                    setCampaignData(null);
                    setCampaignAddress({});
                    setStartDate(null)
                    setEndDate(null)
                    setTogglePage(1);
                } else {
                    console.log(res);
                    if (res.error) {
                        if (res.error?.message) {
                            return errorSweetAlert(res.error.message);
                        }
                        if (res?.error?.data?.message) {
                            return errorSweetAlert(res.error?.data.dev_error || res.error?.data.message);
                        }
                        if (res.error?.error) {
                            return errorSweetAlert(res.error.error);
                        }
                    } else if (res.data?.message) {
                        errorSweetAlert(res?.data.message);
                    }
                }
            });
    }
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    return (
        <div className='min-h-screen py-2 md:px-2 mb-10'>
            <div className='bg-white min-h-screen  max-w-6xl xl:max-w-7xl mx-auto rounded-lg drop-shadow'>
                {isLoading ? <CustomLoader></CustomLoader> :
                    togglePage === 1 ?
                        <div className='w-full grid grid-cols-3 justify-start items-center'>
                            <div className='hidden mdd:flex items-center col-span-1 min-h-full w-full bg-red-200 rounded-s-lg'>
                                <Image height={1000} width={400} src={lightImage} alt="" />
                            </div>
                            <div className='col-span-3 mdd:col-span-2 my-4 sm:mx-auto sm:w-full sm:max-w-sm'>
                                <h2 className="my-4 text-center text-2xl lg:text-3xl font-semibold leading-9 tracking-tight text-blue-700">
                                    Create a New Campaign
                                </h2>
                                <form onSubmit={handleSubmit} className="space-y-4" >
                                    <div>
                                        <label htmlFor="location" className="block font-semibold leading-6 text-gray-900">
                                            Select Location
                                        </label>
                                        <div className="mt-2">
                                            <AddressInput selectedValue={campaignAddress} setSelectedValue={setCampaignAddress} ownClass={{ button: 'w-full flex justify-between items-center rounded-sm border-0 py-2 px-3 capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6', container: 'w-full z-20', menu: "w-full relative inline-block text-left", menuWidth: "w-full" }}></AddressInput>
                                            {custError?.country && <p className='text-red-600 text-xs -mb-2'>{custError.country}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="camp_name" className="block font-semibold leading-6 text-gray-900">
                                            Campaign Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                defaultValue={campaignData?.campaign_name || ''}
                                                id="camp_name" name="campaign_name" type="text" required={custError?.name} placeholder="Campaign Name..."
                                                className="block w-full rounded-sm border-0 py-2 px-3 capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
                                            />
                                            {custError?.name && <p className='text-red-600 text-xs -mb-2'>{custError.name}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="objective" className="block font-semibold leading-6 text-gray-900">
                                            Campaign Objective
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                defaultValue={campaignData?.objective || ''}
                                                name='objective' id="objective" required={custError?.objective}
                                                className="block w-full rounded-sm border-0 py-2 px-3 capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-md sm:leading-6"
                                            >
                                                <option value={""} disabled selected>Select Objective</option>
                                                <option value={"data_entry"}>Data Entry</option>
                                                <option value={"marketing"}>Marketing</option>
                                            </select>
                                            {custError?.objective && <p className='text-red-600 text-xs -mb-2'>{custError.objective}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="duration" className="block font-semibold leading-6 text-gray-900">
                                            Campaign Duration
                                        </label>
                                        <div className="mt-2 w-full flex flex-col items-center justify-center -z-10">
                                            <DatePicker
                                                require
                                                calendarClassName=''
                                                selected={startDate}
                                                onChange={onChange}
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={new Date()}
                                                // excludeDates={[addDays(new Date(), 1), addDays(new Date(), 5)]}
                                                selectsRange
                                                selectsDisabledDaysInRange
                                                inline
                                            />
                                            {custError.endDate && <p className='text-red-600 text-xs -mb-2'>{custError.endDate}</p>}
                                        </div>
                                    </div>

                                    <div className="flex justify-center pt-3">
                                        <button
                                            type="submit" disabled={custLoading}
                                            className="w-full flex justify-center items-center gap-4 rounded-sm bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                                        >
                                            {custLoading ? <SmallSpinner /> : <span>Next <RxArrowRight className='inline' /></span>}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        : (togglePage === 2 && campaignData?.objective === "data_entry") ?
                            <AllUserForCampaign setTogglePage={setTogglePage} campaignData={campaignData} createCampaignFunc={createCampaignFunc} />
                            : (togglePage === 3 && campaignData?.objective === "marketing") ?
                                <AllUserForCampaign setTogglePage={setTogglePage} campaignData={campaignData} createCampaignFunc={createCampaignFunc} />
                                : (togglePage === 2 && campaignData?.objective === "marketing") &&
                                <BusinessDataForCampaign setTogglePage={setTogglePage} setCampaignData={setCampaignData} />
                }
            </div>
        </div>
    );
};

export default MarketerProtect(Create_campaign);