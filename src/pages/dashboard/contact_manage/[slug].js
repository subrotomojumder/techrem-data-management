import Entire_show from '@/components/Entire_show';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsPencilSquare, BsTelephoneOutbound } from 'react-icons/bs';

const Contact_manage = () => {
    const [inputData, setInputData] = useState({ left_side: "overview" });
    const [webCtg, setWebCtg] = useState('');
    const router = useRouter();
    const { slug } = router.query;
    const handleInput = e => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };
    // const handleUpdate = () => {
    //     console.log(inputData);
    // }
    const demoWebsites = [
        { ctg: "development", name: "Food service", link: "http://www.dgfood.gov.bd/" },
        { ctg: "development", name: "Uniform", link: "http://www.dgfood.gov.bd/" },
        { ctg: "development", name: "Electric", link: "http://www.dgfood.gov.bd/" },
        { ctg: "development", name: "Light fare", link: "http://www.dgfood.gov.bd/" },
        { ctg: "erp", name: "ERP solution", link: "http://www.dgfood.gov.bd/" },
        { ctg: "erp", name: "JAngo part", link: "http://www.dgfood.gov.bd/" },
        { ctg: "app", name: "Honda Service", link: "http://www.dgfood.gov.bd/" },
        { ctg: "business", name: "E-airlines service", link: "http://www.dgfood.gov.bd/" },
        { ctg: "business", name: "Airport Service", link: "http://www.dgfood.gov.bd/" },
        { ctg: "marketing", name: "Hlekjdkljfjj", link: "http://www.dgfood.gov.bd/" },
        { ctg: "marketing", name: "Photography Zoom", link: "http://www.dgfood.gov.bd/" }
    ]
    
    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 lg:max-w-5xl lggg:max-w-6xl xl:max-w-7xl mx-4 smm:mx-16 md:mx-4 lg:mx-auto'>
            <div className='col-span-3 px-2'>
                <img className='w-full max-h-[250px]' src={"https://st2.depositphotos.com/4035913/6124/i/600/depositphotos_61243831-stock-photo-letter-s-logo.jpg"} alt="" />
                <div className="flex justify-around">
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
                    <Entire_show inputData={inputData} slug={slug} />
                </div>
            </div>
            <div className='col-span-2 h-fit px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 md:my-5 bg-yellow-50 rounded-sm drop-shadow'>
                <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase text-center"><BsTelephoneOutbound className='inline' /> Tele communication report</h2>
                <p className='text-center mb-2'>Write your correct data</p>
                <hr />
                <div>
                    <div className='mt-1'>
                        {/* checked={inputData?.otherBusi} onClick={(e) => { setInputData({ ...inputData, [e.target.name]: inputData[e.target.name] ? false : true }) }}  */}
                        <input type="checkbox" name="needWeb" id="need-web" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="need-web">Do you need a website? *</label>
                        <div className="relative mb-2 mt-1">
                            <label htmlFor='web-requ' className="leading-7 font-[600] text-gray-700">Website requirement? *</label>
                            <input
                                onChange={handleInput} name='webRequ' type="text" id='web-requ' placeholder='Website requirements'
                                className="placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <input type="checkbox" name="talkLater" id="need-web" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="talk-later">Talk to later?</label>
                        <div className="relative mb-2">
                            <label htmlFor='later-talk-time' className="leading-7 font-[600] text-gray-700">Later talk time *</label>
                            <input
                                onChange={handleInput} name='laterTalkTime' type="datetime-local" id='later-talk-time'
                                className="placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-2 mt-1">
                            <label className="leading-7 font-[600] text-gray-700">Website service offers</label>
                            <select value={webCtg} onChange={(e) => setWebCtg(e.target.value)} className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                                <option selected disabled >Select type</option>
                                <option value="development"> Website Development</option>
                                <option value="erp">ERP Solution</option>
                                <option value="app">App development</option>
                                <option value="business">Business Accessories</option>
                                <option value="marketing">Digital Marketing</option>
                                <option value="Add New">Add New</option>
                            </select>
                        </div>
                        <ol className='list-decimal pl-4'>
                            {demoWebsites.map((site, i) => site.ctg === webCtg && <li key={i}>
                                <a href={site.link} className='hover:underline text-blue-500 '>{site.name}</a>
                            </li>)}
                        </ol>
                        <div className="relative mb-1 mt-1">
                            <label htmlFor='details' className="leading-7 font-[600] text-gray-700">Communication details *</label>
                            <textarea
                                onChange={handleInput} name='commuDetails' type="text" id='details' placeholder='Important information.......'
                                className="w-full bg-white rounded-sm min-h-[80px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-2 mt-1">
                            <p className="leading-7 font-[600] text-gray-700">Confirmation of Field Manager *</p>
                            <div className='flex justify-center gap-2 mt-2'>
                                <button className="text-white font-semibold bg-red-400 border-0 py-2 px-4 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded">Cancel</button>
                                <button className="text-white font-semibold bg-green-400 border-0 py-2 px-4 focus:outline-none hover:bg-green-500 active:bg-green-600 rounded">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default Contact_manage;