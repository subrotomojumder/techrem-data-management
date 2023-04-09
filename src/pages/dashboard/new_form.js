import React, { useEffect, useState } from 'react';
import Countries from 'countries-list';

const New_form = () => {
    const [inputData, setInputData] = useState({
        businessDetails: {
            businessName: "",
            catagory: ""
        },
        ownerDetails: {
            name: "",
            email: "",
            phone: ""
        },
        address: {
            country: "",
            district: "",
            village: "",
            postCode: 0
        },
        have_website: {
            isWebsite: false,
            website_urls: [

            ]
        },
        document: [],
        have_pc: true,
        have_branchs: {
            isBranch: false,
            branch_quantity: 2,

        },
        other_business: {
            isOther_business: true,
            other_business_quantity: 0,
        },
        other_information: ""
    });
    const [branchBtn, setBranchBtn] = useState(1);
    const [branchs, setBranchs] = useState([]);
    const [branchDetails, setBranchDetails] = useState({});
    useEffect(() => {
        setInputData(JSON.parse(localStorage.getItem("entire")))
    }, [])
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("entire", JSON.stringify(inputData));
        }, 500);
    }, [inputData]);
    const handleInput = e => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };
    const clearForm = () => {
        setInputData({});
        localStorage.removeItem("entire");
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(inputData);
    };
    console.log(inputData);
    // console.log(branchs);
    // console.log(branchDetails);
    // console.log([...Array(inputData?.branchQty)]);
    // console.log(Object.keys(Countries.countries).map(key=> Countries.countries[key].phone));
    return (
        <form onSubmit={handleSubmit}>
            <div className='max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 md:my-5 bg-white rounded drop-shadow'>
                <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase text-center">Data Collect Form</h2>
                <p className="leading-relaxed mb-2 text-gray-600 w-80 md:w-full text-center">Help us with your valuable information so that we can benefit you.</p>
                <hr />
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Business Category *</label>
                    <select value={inputData?.businessDetails?.catagory} onChange={(e)=> setInputData({...inputData, businessDetails: {...inputData.businessDetails, catagory: e.target.value}})} name='busiCategory' className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
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
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Business Size *</label>
                    <select value={inputData?.busiSize} onChange={handleInput} name='busiSize' className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                        <option selected disabled >Select size</option>
                        <option value="Large">Large</option>
                        <option value="Medium">Medium</option>
                        <option value="Small">Small</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='business-name' className="leading-7 font-[600] text-gray-700 col-span-3">Business Name *</label>
                    <input
                        value={inputData?.busiName} onChange={handleInput} name='busiName' type="text" id='business-name' placeholder='Business name'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='name' className="leading-7 font-[600] text-gray-700 col-span-3">Business owner *</label>
                    <input
                        value={inputData?.ownerName} onChange={handleInput} name='ownerName' type="text" id='name' placeholder='Enter owner name'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='email' className="leading-7 font-[600] text-gray-700 col-span-3">Owner email *</label>
                    <input
                        value={inputData?.email} onChange={handleInput} name='email' type="email" id='email' placeholder='Enter owner email'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='ph-number' className="leading-7 font-[600] text-gray-700 col-span-3">Owner phone *</label>
                    <div className='col-span-4 grid grid-cols-4'>
                        <select value={inputData?.phCode} onChange={handleInput} name='phCode' className="col-span-1 w-full bg-white rounded rounded-r-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-[2px] text-center leading-8 transition-colors duration-200 ease-in-out" >
                            <option className='w-10' selected disabled>+ code</option>
                            {Object.keys(Countries.countries).map((key, i) => (
                                <option className='w-10' key={i} value={Countries.countries[key].phone}> {key + ' ' + '+' + Countries.countries[key].phone}</option>
                            ))}
                        </select>
                        <input
                            value={inputData?.phone} onChange={handleInput} type="text" id='ph-number' name='phone' placeholder='Enter phone number'
                            className="col-span-3 w-full bg-white rounded rounded-l-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Country *</label>
                    <select value={inputData?.country} onChange={handleInput} name='country' className="block col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
                        <option selected disabled>Select Country</option>
                        {Object.values(Countries.countries).map((country, i) => (
                            <option key={i} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </div>
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='district' className="leading-7 font-[600] text-gray-700 col-span-3">District *</label>
                    <input
                        value={inputData?.district} onChange={handleInput} name='district' type="text" id='district' placeholder='Local district'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='district' className="leading-7 font-[600] text-gray-700 col-span-3">Village </label>
                    <div className='col-span-4 grid grid-cols-4'>
                        <input
                            value={inputData?.village} onChange={handleInput} name='village' type="text" id='district' placeholder='Local village'
                            className="col-span-3 w-full bg-white rounded rounded-r-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <input
                            value={inputData?.postCode} onChange={handleInput} name='postCode' type="text" id='post-code' placeholder='Post code'
                            className="col-span-1 w-full bg-white rounded rounded-l-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='location' className="leading-7 font-[600] text-gray-700 col-span-3">Business google map location*</label>
                    <input
                        value={inputData?.location} onChange={handleInput} name='location' type="text" id='location' placeholder='Enter google map url'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-8 grid grid-cols-1 md:grid-cols-7 gap-3">
                    <label htmlFor='busi-logo' className="leading-7 font-[600] text-gray-700 col-span-3">Business logo</label>
                    <input
                        type="file" id='busi-logo' placeholder='Enter business logo'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[2px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className={`${!inputData.haveWeb ? 'h-7' : 'h-56 md:h-48'} overflow-y-hidden duration-300`}>
                    <div>
                        <input checked={inputData?.haveWeb} onClick={(e) => { setInputData({ ...inputData, [e.target.name]: inputData[e.target.name] ? false : true }) }} type="checkbox" name="haveWeb" id="website" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="website">Already have an website?</label>
                    </div>
                    <div className="relative mb-2 mt-1 grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='web-name' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            value={inputData?.webName} onChange={handleInput} name='webName' type="text" id='web-name' placeholder='Enter website name '
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-2 grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='web-link' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            value={inputData?.webLink} onChange={handleInput} name='webLink' type="text" id='web-link' placeholder='Enter website link'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-2  grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='web-name' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            value={inputData?.otherWeb} onChange={handleInput} name='otherWeb' type="text" id='web-others' placeholder='Website others'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div>
                    <input checked={inputData?.havePc} onClick={(e) => { setInputData({ ...inputData, [e.target.name]: inputData[e.target.name] ? false : true }) }} name='havePc' type="checkbox" id="pc" />
                    <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="pc">Have a business computers?</label>
                </div>
                <div>
                    <div>
                        <input checked={inputData.haveBranch} onClick={(e) => { setInputData({ ...inputData, [e.target.name]: inputData[e.target.name] ? false : true }) }} type="checkbox" name="haveBranch" id="branch" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="branch">Are there any branch institutions?</label>
                    </div>
                    <div className='flex justify-start items-center gap-2 flex-wrap'>
                        <input
                            value={inputData?.branchQty} onChange={(e) => setInputData({ ...inputData, branchQty: e.target.value < 0 ? 0 : parseFloat(e.target.value) })} name='branchQty' type="number" id='branch-qty' placeholder='Quantity'
                            className="max-w-[80px] text-center placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 pl-2 pr-1 ml-[2px] leading-8 transition-colors duration-200 ease-in-out"
                        />
                        {[...Array(inputData?.branchQty || 0)].map((branch, i) =>
                            <p
                                onClick={() => {
                                    setBranchBtn(i + 1)
                                    setBranchDetails({ brncName: '', brncLocation: "" })
                                }} key={i}
                                className={`${branchBtn === i + 1 ? "bg-green-400" : "bg-blue-400"} onFocus:bg-green-600 py-1 px-2 font-medium text-sm select-none text-white rounded-sm cursor-pointer`}
                            >Branch-{i + 1}</p>
                        )}
                    </div>
                    <div className="relative mb-4 grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        <input
                            onChange={(e) => setBranchDetails({ ...branchDetails, [e.target.name]: e.target.value })}
                            // onChange={(e)=> onChange={(e)=> setBranchDetail([...branchDetail, {[`branch_${branchBtn}`]: {[e.target.name]: e.target.value}}])} 
                            value={branchDetails.brncName}
                            name='brncName' type="text" placeholder='Enter branch name'
                            className=" placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <input
                            onChange={(e) => setBranchDetails({ ...branchDetails, [e.target.name]: e.target.value })} name='brncLocation' type="text" placeholder='Where located'
                            value={branchDetails.brncLocation}
                            className=" placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <p onClick={() => {
                            if (branchDetails.brncName !== "" && branchDetails.brncName) {
                                setBranchs(oldarray => [...oldarray, branchDetails])
                                setBranchDetails({ brncName: '', brncLocation: "" })
                            }
                        }} className='bg-blue-600 p-2 select-none rounded-2xl w-[30%] text-center'>Button</p>

                    </div>
                </div>
                <div className={`${!inputData.otherBusi ? 'h-5' : 'h-24 md:h-20'} overflow-y-hidden duration-300`}>
                    <div>
                        <input checked={inputData?.otherBusi} onClick={(e) => { setInputData({ ...inputData, [e.target.name]: inputData[e.target.name] ? false : true }) }} type="checkbox" name="otherBusi" id="other-business" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="other-business">Have any other of business?</label>
                    </div>
                    <div className="relative mb-2 mt-1 grid grid-cols-1 md:grid-cols-7 gap-3">
                        <label htmlFor='other-busi-name' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <select value={inputData?.otherBusiType} onChange={handleInput} name='busiCategory' className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" >
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
                <div className="relative mb-4 mt-8">
                    <label htmlFor='information' className="leading-7 font-[600] text-gray-700">Write another information</label>
                    <textarea
                        value={inputData?.otherInformation} onChange={handleInput} name='otherInformation' type="text" id='information' placeholder='Text.......'
                        className="w-full bg-white rounded-sm min-h-[150px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <button type='reset' onClick={clearForm} className="text-white bg-red-400 border-0 py-2 px-6 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded text-lg select-none inline cursor-pointer">Clear</button>
                <button type='submit' className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 rounded text-lg">Submit</button>
                <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
            </div>
        </form >
    );
};

export default New_form;