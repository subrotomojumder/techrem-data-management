import { useGetOperatorSubmissionByIdQuery, usePostOperatorTaskSubmitMutation } from '@/app/features/dataEntire/assignTaskApi';
import Entire_show from '@/components/Entire_show';
import { LargeSpinner, SmallSpinner } from '@/components/Spinner';
import { errorToast, successToast } from '@/utils/neededFun';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsTelephoneOutbound } from 'react-icons/bs';
import { TagsInput } from 'react-tag-input-component';

const Contact_manage = () => {
    const [requirements, setRequirements] = useState([]);
    const [alreadyProcessed, setAlreadyProcessed] = useState({ id: null });
    const [inputData, setInputData] = useState({ communication_note: "hell ojfkjsdk fkdjskfljdskl;  fdsf", left_side: "overview" });
    const router = useRouter();
    const { slug } = router.query;
    // useEffect(() => {
    //     if (user.role === MARKETER) {
    //         setRole("marketer_divide")
    //     } else if (user.role === TELE_MARKETER) {
    //         setRole("tele_divide")
    //     } else if (user.role === ON_FIELD_MARKETER) {
    //         setRole("onField_divide")
    //     } else if (user.role === DATA_ENTRY_OPERATOR) {
    //         setRole("dataEntry_divide")
    //     }
    // }, [user]);
    useEffect(() => {
        const dataFetch = async (id) => {
            const res = await axios(`${process.env.NEXT_PUBLIC_SERVER_DEV}/operator_data/teleOperator/${id}`);
            if (res.data?.success) {
                setInputData(res.data.data);
            }
        }
        if (alreadyProcessed?.id) {
            dataFetch(alreadyProcessed?.id)
        }
        return () => { }
    }, [alreadyProcessed.id])
    console.log(alreadyProcessed.oldData);
    const [postTask, { isLoading }] = usePostOperatorTaskSubmitMutation();
    const handleInput = e => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };
    // console.log(data, haveLoading, isError, error);
    let website_demo = [];
    const handleDemoSite = (value) => {
        if (website_demo.includes(value)) {
            website_demo = website_demo.filter(link => link !== value);
        } else {
            website_demo.push(value);
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
            website_category: { ...inputData.website_category, demo_site: website_demo },
            requirement: requirements,
            process: inputData.call_cancel ? "cancel-call" : inputData.talk_later ? "pending" : inputData.needWebsite ? "complete" : "rejected",
        }
        postTask({ url: "/operator_data/teleOperator", data })
            .then(res => {
                console.log(res);
                if (res.data?.success) {
                    successToast("Your submission successful!");
                    setInputData({});
                    setRequirements([]);
                    website_demo = [];
                    e.target.reset();
                } else {
                    // console.log(res);
                    errorToast("Something went wrong!")
                }
            });
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
    if (!router.query?.slug) {
        return <LargeSpinner></LargeSpinner>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 lg:max-w-5xl lggg:max-w-6xl xl:max-w-7xl mx-4 smm:mx-16 md:mx-4 lg:mx-auto'>
            <div className='col-span-3 px-2'>
                {/* <img className='w-full max-h-[250px]' src={"https://st2.depositphotos.com/4035913/6124/i/600/depositphotos_61243831-stock-photo-letter-s-logo.jpg"} alt="" /> */}
                <div className="flex justify-around mt-2">
                    <button
                        onClick={() => setInputData(c => ({ ...c, left_side: "overview" }))}
                        className={`text-orange-400 font-medium px-3 mb-1  hover:border-b-4 ${inputData.left_side === "overview" && " border-b-4 "} border-blue-400 `}
                    >Overview</button>
                    <button
                        onClick={() => setInputData(c => ({ ...c, left_side: "menu" }))}
                        className={`text-orange-400 font-medium px-3 mb-1  hover:border-b-4 ${inputData.left_side === "menu" && "border-b-4 "} border-blue-400 `}
                    >Menus</button>
                    <button
                        onClick={() => setInputData(c => ({ ...c, left_side: "other" }))}
                        className={`text-orange-400 font-medium px-3 mb-1  hover:border-b-4 ${inputData.left_side === "other" && " border-b-4 "} border-blue-400 `}
                    >Others</button>
                    <button
                        onClick={() => setInputData(c => ({ ...c, left_side: "contact" }))}
                        className={`text-orange-400 font-medium px-3 mb-1  hover:border-b-4 ${inputData.left_side === "contact" && "border-b-4 "} border-blue-400 `}
                    >Contact</button>
                </div>
                <hr />
                <div className='h-fit capitalize'>
                    <Entire_show inputData={inputData} slug={slug} setAlreadyProcessed={setAlreadyProcessed} />
                </div>
            </div>
            <div className='col-span-2 h-fit px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 md:my-5 bg-yellow-50 rounded-sm drop-shadow'>
                <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase text-center"><BsTelephoneOutbound className='inline' /> Tele communication report</h2>
                <p className='text-center mb-2'>Write your contact data</p>
                <hr />
                <div>
                    <form onSubmit={handleUpdate} className='mt-1'>
                        <input checked={inputData.needWebsite || false} type="checkbox" onChange={() => setInputData(c => ({ ...inputData, call_cancel: false, needWebsite: !inputData.needWebsite && true }))} name="needWeb" id="need-web" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="need-web">Do Need a website? *</label>
                        <div className="relative mb-2 mt-1">
                            <label className="leading-7 font-[600] text-gray-700">Website requirement? *</label>
                            <TagsInput
                                className="bg-gray-400"
                                value={requirements} onChange={setRequirements} name="tags" placeHolder="requirements..."
                            />
                        </div>
                        <div>
                            <input checked={inputData.call_cancel || false} type="checkbox" onChange={() => setInputData(c => ({ ...inputData, talk_later: false, needWebsite: false, call_cancel: !inputData.call_cancel && true }))} id="reject" />
                            <label onChange={handleInput} className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="reject">Call cancel?</label>
                            <br />
                            <input checked={inputData.talk_later || false} type="checkbox" onChange={() => setInputData(c => ({ ...inputData, call_cancel: false, talk_later: !inputData.talk_later && true }))} name="talkLater" id="talk-later" />
                            <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="talk-later">Talk to later?</label>
                            <div className={`${inputData.talk_later ? "h-[74px]" : "hidden"} relative mb-2`}>
                                <label htmlFor='later-talk-time' className="leading-7 font-[600] text-gray-700">Later talk time *</label>
                                <input
                                    onChange={handleInput} name='talk_later_time' type="datetime-local" id='later-talk-time'
                                    className="placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {inputData.timeErr && <p role="alert" className='pl-4px text-red-500 text-sm text-end col-span-6'>{inputData.timeErr}</p>}
                            </div>
                        </div>
                        <div className="relative mb-2 mt-1">
                            <label className="leading-7 font-[600] text-gray-700">Website service offers</label>
                            <select onChange={(e) => setInputData(c => ({ ...c, website_category: { category: e.target.value } }))} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                                <option value='' selected disabled >Select site type</option>
                                <option value="development"> Website Development</option>
                                <option value="erp">ERP Solution</option>
                                <option value="app">App development</option>
                                <option value="business">Business Accessories</option>
                                <option value="marketing">Digital Marketing</option>
                            </select>
                        </div>
                        <ol className='list-decimal pl-4'>
                            {demoWebsites.map((site, i) => site.ctg === inputData.website_category?.category && <li key={i}>
                                <input type="checkbox" onClick={() => handleDemoSite(site.link)} />
                                <a href={site.link} className='hover:underline text-blue-500 ml-1'>{site.name}</a>
                            </li>)}
                        </ol>
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
                                <button disabled={isLoading} type='submit' className="text-white bg-indigo-500 border-0 w-24 h-10 py-2 px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 font-semibold disabled:bg-indigo-400 rounded align-middle"> {isLoading ? <SmallSpinner /> : "Submit"}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Contact_manage;