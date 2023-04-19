import React, { useEffect, useState } from 'react';
import Countries from 'countries-list';
import { BsPencilSquare, BsTelephoneOutbound } from 'react-icons/bs';

const SingleData = () => {
    const [inputData, setInputData] = useState({});
    const [edit, setEdit] = useState(true);
    const [webCtg, setWebCtg] = useState('');
    useEffect(() => {
        setInputData(JSON.parse(localStorage.getItem("entire")))
    }, [])
    const handleInput = e => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };
    const handleUpdate = () => {
        console.log(inputData);
    }
    console.log(webCtg);
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
        <div className='grid grid-cols-1 md:grid-cols-5 gap-4 lg:max-w-5xl lggg:max-w-6xl xl:max-w-7xl mx-4 smm:mx-16 md:mx-4 lg:mx-auto mt-5'>
            <div className='col-span-3 px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 md:my-5 bg-white rounded drop-shadow'>
                {!edit || <button
                    onClick={() => setEdit(false)}
                    className='absolute top-6 right-6 text-xl shadow-lg bg-blue-100 active:bg-blue-200 text-gray-600 active:text-gray-800 p-2 rounded-full'
                ><BsPencilSquare /></button>}
                <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase">data manage</h2>
                <p className="leading-relaxed mb-2 text-gray-600 w-80 md:w-full">Owners :- {inputData?.ownerName}</p>
                <hr />
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Business Category </label>
                    <select disabled={edit} value={inputData?.busiCategory} onChange={handleInput} name='busiCategory' className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                        <option selected disabled >Select category</option>
                        <option value="E-Commerce">Clothes</option>
                        <option value="E-Commerce">Salon</option>
                        <option value="E-Commerce">Grocery</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Barber Shop">Barber Shop</option>
                        <option value="Agency">Agency</option>
                        <option value="Add New">Add New</option>
                    </select>
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Business Size</label>
                    <select disabled={edit} value={inputData?.busiSize} onChange={handleInput} name='busiSize' className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                        <option selected disabled >Select size</option>
                        <option value="Large">Large</option>
                        <option value="Medium">Medium</option>
                        <option value="Small">Small</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='business-name' className="leading-7 font-[600] text-gray-700 col-span-3">Business Name </label>
                    <input
                        disabled={edit} value={inputData?.busiName} onChange={handleInput} name='busiName' type="text" id='business-name' placeholder='Business name'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='name' className="leading-7 font-[600] text-gray-700 col-span-3">Business owner </label>
                    <input
                        disabled={edit} value={inputData?.ownerName} onChange={handleInput} name='ownerName' type="text" id='name' placeholder='Enter owner name'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='email' className="leading-7 font-[600] text-gray-700 col-span-3">Owner email </label>
                    <input
                        disabled={edit} value={inputData?.email} onChange={handleInput} name='email' type="email" id='email' placeholder='Enter owner email'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='ph-number' className="leading-7 font-[600] text-gray-700 col-span-3">Owner phone </label>
                    <div className='col-span-4 grid grid-cols-4'>
                        <select disabled={edit} value={inputData?.phCode} onChange={handleInput} name='phCode' className="col-span-1 w-full bg-white rounded rounded-r-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-[2px] text-center leading-8 transition-colors duration-200 ease-in-out" >
                            <option className='w-10' selected disabled>+ code</option>
                            {Object.keys(Countries.countries).map((key, i) => (
                                <option className='w-10' key={i} value={Countries.countries[key].phone}> {key + ' ' + '+' + Countries.countries[key].phone}</option>
                            ))}
                        </select>
                        <input
                            disabled={edit} value={inputData?.phone} onChange={handleInput} type="text" id='ph-number' name='phone' placeholder='Enter phone number'
                            className="col-span-3 w-full bg-white rounded rounded-l-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Country </label>
                    <select disabled={edit} value={inputData?.country} onChange={handleInput} name='country' className="block col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                        <option selected disabled>Select Country</option>
                        {Object.values(Countries.countries).map((country, i) => (
                            <option key={i} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='state' className="leading-7 font-[600] text-gray-700 col-span-3">state </label>
                    <input
                        disabled={edit} value={inputData?.state} onChange={handleInput} name='state' type="text" id='state' placeholder='Local state'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='state' className="leading-7 font-[600] text-gray-700 col-span-3">Village </label>
                    <div className='col-span-4 grid grid-cols-4'>
                        <input
                            disabled={edit} value={inputData?.village} onChange={handleInput} name='village' type="text" id='state' placeholder='Local village'
                            className="col-span-3 w-full bg-white rounded rounded-r-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <input
                            disabled={edit} value={inputData?.postCode} onChange={handleInput} name='postCode' type="text" id='post-code' placeholder='Post code'
                            className="col-span-1 w-full bg-white rounded rounded-l-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='location' className="leading-7 font-[600] text-gray-700 col-span-3">Business google map location</label>
                    <input
                        disabled={edit} value={inputData?.location} onChange={handleInput} name='location' type="text" id='location' placeholder='Enter google map url'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-2 mt-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='busi-logo' className="leading-7 font-[600] text-gray-700 col-span-3">Business logo</label>
                    <input
                        disabled={edit} type="file" id='busi-logo' placeholder='Enter business logo'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[2px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className={`${!inputData.haveWeb ? 'h-7' : 'h-56 md:h-48'} overflow-y-hidden duration-300`}>
                    <div>
                        <input disabled={edit} checked={inputData?.haveWeb} onClick={(e) => { setInputData({ ...inputData, [e.target.name]: inputData[e.target.name] ? false : true }) }} type="checkbox" name="haveWeb" id="website" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="website">Already have an website?</label>
                    </div>
                    <div className="relative mb-2 mt-1 grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='web-name' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            disabled={edit} value={inputData?.webName} onChange={handleInput} name='webName' type="text" id='web-name' placeholder='Enter website name '
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='web-link' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            disabled={edit} value={inputData?.webLink} onChange={handleInput} name='webLink' type="text" id='web-link' placeholder='Enter website link'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-2  grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='web-name' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            disabled={edit} value={inputData?.otherWeb} onChange={handleInput} name='otherWeb' type="text" id='web-others' placeholder='Website others'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div>
                    <input disabled={edit} checked={inputData?.havePc} onClick={(e) => { setInputData({ ...inputData, [e.target.name]: inputData[e.target.name] ? false : true }) }} name='havePc' type="checkbox" id="pc" />
                    <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="pc">Have a business computers?</label>
                </div>
                <div className={`${!inputData.haveBranch ? 'h-7' : 'h-40 md:h-36'} overflow-y-hidden duration-300`}>
                    <div>
                        <input disabled={edit} checked={inputData.haveBranch} onClick={(e) => { setInputData({ ...inputData, [e.target.name]: inputData[e.target.name] ? false : true }) }} type="checkbox" name="haveBranch" id="branch" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="branch">Are there any branch institutions?</label>
                    </div>
                    <div className="relative mb-2 mt-1 grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='branch-qty' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            disabled={edit} value={inputData?.branchQty} onChange={handleInput} name='branchQty' type="number" id='branch-qty' placeholder='How many branch'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='branch-lction' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            disabled={edit} value={inputData?.branchLocation} onChange={handleInput} name='branchLocation' type="text" id='branch-lction' placeholder='Where located'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className={`${!inputData.otherBusi ? 'h-5' : 'h-24 md:h-20'} overflow-y-hidden duration-300`}>
                    <div>
                        <input disabled={edit} checked={inputData?.otherBusi} onClick={(e) => { setInputData({ ...inputData, [e.target.name]: inputData[e.target.name] ? false : true }) }} type="checkbox" name="otherBusi" id="other-business" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="other-business">Have any other of business?</label>
                    </div>
                    <div className="relative mb-2 mt-1 grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='other-busi-name' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <select disabled={edit} value={inputData?.otherBusiType} onChange={handleInput} name='busiCategory' className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                            <option selected disabled >Select category</option>
                            <option value="E-Commerce">Clothes</option>
                            <option value="E-Commerce">Salon</option>
                            <option value="E-Commerce">Grocery</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Barber Shop">Barber Shop</option>
                            <option value="Agency">Agency</option>
                            <option value="Add New">Add New</option>
                        </select>
                    </div>
                </div>
                <div className="relative mb-2 mt-2">
                    <label htmlFor='information' className="leading-7 font-[600] text-gray-700">Write another information</label>
                    <textarea
                        disabled={edit} value={inputData?.otherInformation} onChange={handleInput} name='otherInformation' type="text" id='information' placeholder='Text.......'
                        className="w-full bg-white rounded-sm min-h-[80px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                {!edit && <button onClick={handleUpdate} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 rounded text-lg">Update</button>}
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

export default SingleData;