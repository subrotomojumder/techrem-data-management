import React, { useEffect, useState } from 'react';
import Countries from 'countries-list';
import { LARGE, MEDIUM, SMALL } from '@/utils/constant';
import { SmallSpinner } from '@/components/Spinner';
import { usePostDataMutation } from '@/app/features/dataEntire/dataEntireApi';
import { errorToast, successToast } from '@/utils/neededFun';

const New_form = () => {
    const [inputData, setInputData] = useState({});
    const [postData, { isLoading }] = usePostDataMutation();
    useEffect(() => {
        setInputData(JSON.parse(localStorage.getItem("entire")))
    }, [])
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("entire", JSON.stringify(inputData));
        }, 500);
    }, [inputData]);
    const clearForm = () => {
        setInputData({});
        localStorage.removeItem("entire");
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(inputData);
        postData(inputData)
            .then(res => {
                // console.log(res);
                if (res.error) {
                    if (res.error.data.dev_error) {
                        errorToast(res.error.data.dev_error)
                    }
                } else if (res.data.success) {
                    e.target.reset();
                    successToast("Data Entire Successful!");
                    clearForm();
                } else {
                    errorToast(res.data.massage);
                }
            })
    };
    return (
        <form onSubmit={handleSubmit}>
            <div className='max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 md:my-5 bg-white rounded drop-shadow'>
                <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase text-center">Data Collect Form</h2>
                <p className="leading-relaxed mb-2 text-gray-600 w-80 md:w-full text-center">Help us with your valuable information so that we can benefit you.</p>
                <hr />
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Business Category *</label>
                    <select
                        value={inputData?.businessDetails?.category}
                        onChange={(e) => setInputData({ ...inputData, businessDetails: { ...inputData.businessDetails, category: e.target.value } })}
                        className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' selected disabled >Select category</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Salon">Salon</option>
                        <option value="Grocery">Grocery</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Barber Shop">Barber Shop</option>
                        <option value="Agency">Agency</option>
                        <option value="Add New">Add New</option>
                    </select>
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Business Size *</label>
                    <select
                        value={inputData?.businessDetails?.businessSize}
                        onChange={(e) => setInputData({ ...inputData, businessDetails: { ...inputData?.businessDetails, businessSize: e.target.value } })}
                        className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' selected disabled >Select size</option>
                        <option value={LARGE}>Large</option>
                        <option value={MEDIUM}>Medium</option>
                        <option value={SMALL}>Small</option>
                    </select>
                </div>
                <div className="relative mb-4 mt-0 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='business-name' className="leading-7 font-[600] text-gray-700 col-span-3">Business Name *</label>
                    <input
                        value={inputData?.businessDetails?.businessName}
                        onChange={(e) => setInputData({ ...inputData, businessDetails: { ...inputData?.businessDetails, businessName: e.target.value } })}
                        type="text" id='business-name' placeholder='Business name'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='name' className="leading-7 font-[600] text-gray-700 col-span-3">Business owner *</label>
                    <input
                        value={inputData?.ownerDetails?.name}
                        onChange={(e) => setInputData({ ...inputData, ownerDetails: { ...inputData?.ownerDetails, name: e.target.value } })}
                        type="text" id='name' placeholder='Enter owner name'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='email' className="leading-7 font-[600] text-gray-700 col-span-3">Owner email *</label>
                    <input
                        value={inputData?.ownerDetails?.email}
                        onChange={(e) => setInputData({ ...inputData, ownerDetails: { ...inputData?.ownerDetails, email: e.target.value } })}
                        type="email" id='email' placeholder='Enter owner email'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='ph-number' className="leading-7 font-[600] text-gray-700 col-span-3">Owner phone *</label>
                    <div className='col-span-4 grid grid-cols-4'>
                        <select
                            value={inputData?.ownerDetails?.country_code}
                            onChange={(e) => setInputData({ ...inputData, ownerDetails: { ...inputData?.ownerDetails, country_code: e.target.value } })}
                            className="col-span-1 w-full bg-white rounded rounded-r-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-[2px] text-center leading-8 transition-colors duration-200 ease-in-out" >
                            <option className='w-10' value='' disabled>+ code</option>
                            {Object.keys(Countries.countries).map((key, i) => (
                                <option className='w-10' key={i} value={Countries.countries[key].phone}> {key + ' ' + '+' + Countries.countries[key].phone}</option>
                            ))}
                        </select>
                        <input
                            value={inputData?.ownerDetails?.phone}
                            onChange={(e) => setInputData({ ...inputData, ownerDetails: { ...inputData?.ownerDetails, phone: e.target.value } })}
                            type="text" id='ph-number' placeholder='Enter phone number'
                            className="col-span-3 w-full bg-white rounded rounded-l-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Country *</label>
                    <select
                        value={inputData?.address?.country}
                        onChange={(e) => setInputData({ ...inputData, address: { ...inputData?.address, country: e.target.value } })}
                        className="block col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' disabled>Select Country</option>
                        {Object.values(Countries.countries).map((country, i) => (
                            <option key={i} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='district' className="leading-7 font-[600] text-gray-700 col-span-3">District *</label>
                    <input
                        value={inputData?.address?.district}
                        onChange={(e) => setInputData({ ...inputData, address: { ...inputData?.address, district: e.target.value } })}
                        type="text" id='district' placeholder='Local district'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='district' className="leading-7 font-[600] text-gray-700 col-span-3">Village </label>
                    <div className='col-span-4 grid grid-cols-4'>
                        <input
                            value={inputData?.address?.village}
                            onChange={(e) => setInputData({ ...inputData, address: { ...inputData?.address, village: e.target.value } })}
                            type="text" id='district' placeholder='Local village'
                            className="col-span-3 w-full bg-white rounded rounded-r-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <input
                            value={inputData?.address?.postCode}
                            onChange={(e) => setInputData({ ...inputData, address: { ...inputData?.address, postCode: e.target.value } })}
                            type="text" id='post-code' placeholder='Post code'
                            className="col-span-1 w-full bg-white rounded rounded-l-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-2 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='location' className="leading-7 font-[600] text-gray-700 col-span-3">Business google map location*</label>
                    <input
                        value={inputData?.address?.location_link}
                        onChange={(e) => setInputData({ ...inputData, address: { ...inputData?.address, location_link: e.target.value } })}
                        type="text" id='location' placeholder='Enter google map link'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='busi-logo' className="leading-7 font-[600] text-gray-700 col-span-3">Business logo</label>
                    <input
                        type="file" id='busi-logo' placeholder='Enter business logo'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[2px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className={`${!inputData?.have_website?.isWebsite ? 'h-7' : 'h-36 md:h-20'} overflow-y-hidden duration-300`}>
                    <div>
                        <input
                            checked={inputData?.have_website?.isWebsite}
                            onClick={(e) => setInputData({ ...inputData, have_website: { ...inputData?.have_website, isWebsite: inputData?.have_website?.isWebsite ? false : true } })}
                            type="checkbox" id="website"
                        />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="website">Already have an website?</label>
                    </div>
                    <div className="relative mb-2 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label htmlFor='web-link' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            checked={inputData?.have_website?.website_urls}
                            onChange={(e) => setInputData({ ...inputData, have_website: { ...inputData?.have_website, website_urls: e.target.value } })}
                            type="text" id='web-link' placeholder='Enter website link'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div>
                    <input
                        checked={inputData?.have_pc}
                        onClick={(e) => setInputData({ ...inputData, have_pc: inputData?.have_pc ? false : true })}
                        type="checkbox" id="pc" />
                    <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="pc">Have a business computers?</label>
                </div>
                <div className={` ${!inputData?.have_branchs?.isBranch ? 'h-7' : 'h-36 md:h-20'} overflow-y-hidden duration-300`}>
                    <div>
                        <input
                            checked={inputData?.have_branchs?.isBranch}
                            onClick={(e) => setInputData({ ...inputData, have_branchs: { ...inputData?.have_branchs, isBranch: inputData?.have_branchs?.isBranch ? false : true } })}
                            type="checkbox" name="haveBranch" id="branch" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="branch">Are there any branch institutions?</label>
                    </div>
                    <div className="relative mb-2 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label htmlFor='brQty' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            value={inputData?.have_branchs?.branch_quantity}
                            onChange={(e) => setInputData({ ...inputData, have_branchs: { ...inputData?.have_branchs, branch_quantity: e.target.value } })}
                            type="number" id='brQty' placeholder='Enter branch number'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className={`${!inputData.other_business?.isOther_business ? 'h-7' : 'h-24 md:h-20'} overflow-y-hidden duration-300`}>
                    <div>
                        <input
                            checked={inputData.other_business?.isOther_business}
                            onClick={(e) => setInputData({ ...inputData, other_business: { ...inputData?.other_business, isOther_business: inputData?.other_business?.isOther_business ? false : true } })}
                            type="checkbox" id="other-business" />
                        <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="other-business">Have any other of business?</label>
                    </div>
                    <div className="relative mb-2 mt-1 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label htmlFor='other-busi-name' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                        <input
                            value={inputData?.other_business?.other_business_quantity}
                            onChange={(e) => setInputData({ ...inputData, other_business: { ...inputData?.other_business, other_business_quantity: e.target.value } })}
                            type="number" id='brQty' placeholder='Enter branch number'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className="relative mb-4 mt-2 md:mt-4">
                    <label htmlFor='information' className="leading-7 font-[600] text-gray-700">Write another information</label>
                    <textarea
                        value={inputData?.other_information}
                        onChange={(e) => setInputData({ ...inputData, other_information: e.target.value })}
                        type="text" id='information' placeholder='Text.......'
                        className="w-full bg-white rounded-sm min-h-[150px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <button type='reset' onClick={clearForm} className="text-white bg-red-400 border-0  h-10 w-[90px] py-2 px-6 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded font-semibold select-none inline cursor-pointer">Clear</button>
                <button disabled={isLoading} type='submit' className="text-white bg-indigo-500 border-0 h-10 w-[90px] py-2 px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 font-semibold disabled:bg-indigo-400 rounded align-middle"> {isLoading ? <SmallSpinner /> : "Submit"}</button>
                <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
            </div>
        </form >
    );
};

export default New_form;