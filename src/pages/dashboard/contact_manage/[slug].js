import { usePostOperatorTaskSubmitMutation, useUpdateOperatorSubmissionByIdMutation } from '@/app/features/dataEntire/assignTaskApi';
import { useGetEntireDataByIdQuery } from '@/app/features/dataEntire/dataEntireApi';
import Entire_show from '@/components/Entire_show';
import { LargeSpinner, SmallSpinner } from '@/components/Spinner';
import { TeleAndFieldProtect } from '@/utils/ProtectRoute';
import { ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { errorToast, successToast } from '@/utils/neededFun';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { TagsInput } from 'react-tag-input-component';

const Contact_manage = () => {
    const [requirements, setRequirements] = useState([]);
    const [demoSite, setDemoSite] = useState([]);
    const [inputData, setInputData] = useState({});
    const router = useRouter();
    const { slug } = router.query;
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading: dataLoading, isError, error } = useGetEntireDataByIdQuery(slug);
    const [tele_field_taskPost, { isLoading }] = usePostOperatorTaskSubmitMutation();
    const [updateTaskSubmission, { isLoading: upLoading }] = useUpdateOperatorSubmissionByIdMutation();
    useEffect(() => {
        if (user.role === TELE_MARKETER && data?.data?.onProcess?.teleMarketer?.communicationId) {
            const { website_category, talk_later_time, process, requirement } = data?.data?.onProcess?.teleMarketer?.communicationId;
            setInputData({
                ...data?.data?.onProcess?.teleMarketer?.communicationId,
                category: website_category?.category || "",
                include_app: website_category?.include_app || false,
                talk_later: talk_later_time && true,
                call_cancel: process === "cancel-call" && true
            })
            setTimeout(() => {
                setRequirements(requirement)
            }, 200)
            setDemoSite(website_category?.demo_site || [])
        } else if (user.role === ON_FIELD_MARKETER && data?.data?.onProcess?.onfieldMarketer?.communicationId) {
            const { website_category, talk_later_time, requirement } = data?.data?.onProcess?.onfieldMarketer?.communicationId;
            setInputData({
                ...data?.data?.onProcess?.onfieldMarketer?.communicationId,
                category: website_category?.category || "",
                include_app: website_category?.include_app || false,
                talk_later: talk_later_time && true,
            })
            setTimeout(() => {
                setRequirements(requirement)
            }, 200)
            setDemoSite(website_category?.demo_site || [])
        }
    }, [data])
    // console.log(data, haveLoading, isError, error);
    const handleInput = e => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };
    const handleDemoSite = (value) => {
        if (demoSite.includes(value)) {
            setDemoSite(demoSite.filter(link => link !== value));
        } else {
            setDemoSite(c => ([...c, value]));
        }
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        if (inputData.talk_later && !inputData.talk_later_time) {
            return setInputData(c => ({ ...c, timeErr: "Later talk time is required!" }))
        } setInputData(c => ({ ...c, timeErr: "" }))
        const data = {
            ...inputData,
            dataId: slug,
            talk_later_time: inputData.talk_later ? inputData.talk_later_time : "",
            website_category: inputData.category ? { category: inputData.category, demo_site: demoSite, include_app: inputData.include_app } : {},
            requirement: requirements,
            process: inputData.call_cancel ? "cancel-call" : inputData.talk_later ? "pending" : inputData.needWebsite ? "complete" : "rejected",
        }
        let submitUrl = `/operator_data/${user.role === TELE_MARKETER ? "teleOperator" : "onfieldOperator"}`;
        if (inputData?._id) {
            updateTaskSubmission({ url: `${submitUrl}/${inputData?._id}`, updateData: data })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Your update successful!");
                    } else {
                        // console.log(res);
                        return errorToast("Something went wrong!")
                    }
                });
        } else {
            tele_field_taskPost({ url: submitUrl, data })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Your submission successful!");
                        // setInputData({});
                        // setRequirements([]);
                        // demoSite = [];
                        // e.target.reset();
                    } else {
                        // console.log(res);
                        return errorToast("Something went wrong!")
                    }
                });
        }
    };

    const demoWebsites = [
        { ctg: "development", name: "Food service", link: "http://www.dgfood.gov.bd/1" },
        { ctg: "development", name: "Uniform", link: "http://www.dgfood.gov.bd/2" },
        { ctg: "development", name: "Electric", link: "http://www.dgfood.gov.bd/3" },
        { ctg: "development", name: "Light fare", link: "http://www.dgfood.gov.bd/4" },
        { ctg: "erp", name: "ERP solution", link: "http://www.dgfood.gov.bd/5" },
        { ctg: "erp", name: "JAngo part", link: "http://www.dgfood.gov.bd/6" },
        { ctg: "app", name: "Honda Service", link: "http://www.dgfood.gov.bd/7" },
        { ctg: "business", name: "E-airlines service", link: "http://www.dgfood.gov.bd/8" },
        { ctg: "business", name: "Airport Service", link: "http://www.dgfood.gov.bd/9" },
        { ctg: "marketing", name: "Hlekjdkljfjj", link: "http://www.dgfood.gov.bd/10" },
        { ctg: "marketing", name: "Photography Zoom", link: "http://www.dgfood.gov.bd/11" }
    ]
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
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 lg:max-w-5xl lggg:max-w-6xl xl:max-w-7xl mx-4 smm:mx-16 md:mx-4 lg:mx-auto'>
            <div className='col-span-3 px-2'>
                {/* <img className='w-full max-h-[250px]' src={"https://st2.depositphotos.com/4035913/6124/i/600/depositphotos_61243831-stock-photo-letter-s-logo.jpg"} alt="" /> */}
                <div className='h-fit capitalize'>
                    <Entire_show data={data} />
                </div>
            </div>
            <div className='col-span-2 h-fit px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 md:my-5 bg-yellow-50 rounded-sm drop-shadow'>
                <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase text-center"><BsTelephoneOutbound className='inline' /> Communication report</h2>
                <p className='text-center mb-2'>Write your contact data</p>
                <hr />
                <div>
                    <form onSubmit={handleUpdate} className='mt-1'>
                        <input checked={inputData.needWebsite || false} type="checkbox" onChange={() => setInputData(c => ({ ...inputData, call_cancel: false, communication_note: '', needWebsite: !inputData.needWebsite && true }))} name="needWeb" id="need-web" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="need-web">Do Need a website? *</label>
                        <div className="relative before:mt-1">
                            <label className="leading-7 font-[600] text-gray-700">Website requirement? *</label>
                            <TagsInput
                                className="bg-gray-400"
                                value={requirements} onChange={setRequirements} name="tags" placeHolder="requirements..."
                            />
                        </div>
                        <div>
                            {user.role === TELE_MARKETER && <div className='mt-2'>
                                <input checked={inputData.call_cancel || false} type="checkbox" onChange={() => setInputData(c => ({ ...inputData, talk_later: false, talk_later_time: '', category: "", communication_note: '', needWebsite: false, call_cancel: !inputData.call_cancel && true }))} id="reject" />
                                <label onChange={handleInput} className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="reject">Call cancel?</label>
                            </div>}
                            <br />
                            <input checked={inputData.talk_later || false} type="checkbox" onChange={() => setInputData(c => ({ ...inputData, call_cancel: false, talk_later_time: '', communication_note: '', talk_later: !inputData.talk_later && true }))} name="talkLater" id="talk-later" />
                            <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="talk-later">Talk to later?</label>
                            <div className={`${inputData.talk_later ? "h-[74px]" : "hidden"} relative mb-2`}>
                                <label htmlFor='later-talk-time' className="leading-7 font-[600] text-gray-700">Later talk time * <span className='text-green-500 underline underline-offset-4 '>{inputData?.talk_later_time ? format(new Date(inputData?.talk_later_time), "Pp") : ""}</span></label>
                                <input
                                    onChange={handleInput} required={inputData.talk_later || false} name='talk_later_time' type="datetime-local" id='later-talk-time'
                                    className="placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {inputData.timeErr && <p role="alert" className='pl-4px text-red-500 text-sm text-end col-span-6'>{inputData.timeErr}</p>}
                            </div>
                        </div>
                        <div className="relative mb-2 mt-1">
                            <label className="leading-7 font-[600] text-gray-700">Website service offers</label>
                            <select
                                value={inputData.category || ''}
                                onChange={(e) => {
                                    setInputData(c => ({ ...c, category: e.target.value, include_app: false }))
                                    setDemoSite([]);
                                }} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                                <option value='' selected >Select site type</option>
                                <option value="development"> Website Development</option>
                                <option value="erp">ERP Solution</option>
                                <option value="app">App development</option>
                                <option value="business">Business Accessories</option>
                                <option value="marketing">Digital Marketing</option>
                            </select>
                        </div>
                        {inputData.category && <ol className='list-decimal pl-4'>
                            {demoWebsites.map((site, i) => site.ctg === inputData.category && <li key={i}>
                                <input checked={demoSite.includes(site.link) || false} readOnly type="checkbox" onClick={() => handleDemoSite(site.link)} />
                                <a href={
                                    site.link} className='hover:underline text-blue-500 ml-1'>{site.name}</a>
                            </li>)}
                            <input checked={inputData.include_app || false} type="checkbox" onChange={() => setInputData(c => ({ ...inputData, include_app: !inputData.include_app && true }))} id="need_app" className='-ml-4' />
                            <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="need_app">Include Apps?</label>
                        </ol>}
                        <div className="relative mb-1 mt-1">
                            <label htmlFor='details' className="leading-7 font-[600] text-gray-700">Communication details *</label>
                            <textarea
                                value={inputData.communication_note || ''} required onChange={handleInput} name='communication_note' type="text" id='details' placeholder='Important information.......'
                                className="w-full bg-white rounded-sm min-h-[80px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-2 mt-1">
                            <p className="leading-7 font-[600] text-gray-700">Confirmation of Field Manager *</p>
                            <div className='flex justify-center gap-2 mt-2'>
                                <button type='reset' className="text-white font-semibold bg-red-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded duration-75">Reset</button>
                                <button disabled={isLoading || upLoading} type='submit' className="text-white bg-indigo-500 border-0 w-24 h-10 py-2 px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 font-semibold disabled:bg-indigo-400 rounded align-middle"> {(isLoading || upLoading) ? <SmallSpinner /> : "Submit"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default TeleAndFieldProtect(Contact_manage);