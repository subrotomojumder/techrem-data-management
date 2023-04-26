import React, { useEffect, useState } from 'react';
import Countries from 'countries-list';
import { LARGE, MEDIUM, SMALL } from '@/utils/constant';
import { EmptyLoader, SmallSpinner } from '@/components/Spinner';
import { usePostDataMutation } from '@/app/features/dataEntire/dataEntireApi';
import { errorToast, successToast } from '@/utils/neededFun';
import { useSelector } from 'react-redux';
import AddressAddForm from '@/components/Forms/AddressAddForm';
import { usePostAddressMutation } from '@/app/features/address/addressApi';
import { TagsInput } from "react-tag-input-component";
import Private from '@/utils/Private';
import { multipartHeaders } from '@/utils/headers';
import axios from 'axios';

const New_form = () => {
    const [imgFiles, setImgFiles] = useState({});
    const [imageUploads, setImageUploads] = useState({ image: '', images: [] });
    const [addressValue, setAddressValue] = useState({ country: "", state: "", city: "" });
    const [inputData, setInputData] = useState({});
    const [count, setCount] = useState({ website: 1, branch: 1 });
    const [website, setWebsite] = useState({});
    const [branch, setBranch] = useState({});
    const [errors, setErrors] = useState({});
    const [postData, { isLoading }] = usePostDataMutation();
    const [service, setService] = useState([]);
    const [postAddress, { isLoading: postLoading, }] = usePostAddressMutation();
    useEffect(() => {
        setInputData(JSON.parse(localStorage.getItem("entire") || {}))
    }, [])
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("entire", JSON.stringify(inputData));
        }, 500);
    }, [inputData]);
    // console.log(imgFiles.images);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputData?.businessDetails?.category) {
            setErrors(c => ({ ...c, category: "Category field is required!" }));
        } else setErrors(c => ({ ...c, category: "" }));
        if (!inputData?.businessDetails?.businessName) {
            setErrors(c => ({ ...c, businessName: "Business name is required!" }));
        } else setErrors(c => ({ ...c, businessName: "" }));
        if (!inputData?.ownerDetails?.email) {
            setErrors(c => ({ ...c, email: "Owner name is required!" }));
        } else setErrors(c => ({ ...c, email: "" }));
        if (!inputData?.ownerDetails?.country_code) {
            setErrors(c => ({ ...c, code: "Country code is required!" }));
        } else setErrors(c => ({ ...c, code: "" }));
        if (!inputData?.ownerDetails?.phone) {
            setErrors(c => ({ ...c, phone: "Phone number is required!" }));
        } else setErrors(c => ({ ...c, phone: "" }));
        if (!addressValue.city) {
            setErrors(c => ({ ...c, address: "All addresses are required!" }));
        } else setErrors(c => ({ ...c, address: "" }));
        if (!inputData?.businessDetails?.category || !inputData?.businessDetails?.businessName || !inputData?.ownerDetails?.email || !inputData?.ownerDetails?.country_code || !inputData?.ownerDetails?.phone || !addressValue.city) {
            return;
        }
        const entireData = {
            ...inputData,
            tag: service,
            address: { ...inputData.address, country: addressValue?.country, state: addressValue?.state, city: addressValue?.city },
            have_website: { website_urls: Object.values(website).filter(link => link !== ''), isWebsite: inputData?.have_website?.isWebsite },
            have_branchs: { isBranch: inputData?.have_branchs?.isBranch, branch_detalis: Object.values(branch) }
        }
        try {
            const addressRes = await postAddress(addressValue);
            if (!addressRes?.data.success) {
                console.log(addressRes);
                return errorToast("Address Error");
            } else {
                const formData = new FormData();
                const formData2 = new FormData();
                if (imgFiles.logo) {
                    formData.append('image', imgFiles.logo);
                    const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DEV}/img_upload`, formData, { headers: multipartHeaders })
                    if (result.data?.file) {
                        entireData.businessDetails.businessLogo = result.data.file;
                    } else if (!result.success) {
                        return console.log(result);
                    } else {
                        return console.log(result);
                    }
                }
                if (imgFiles.images?.length) {
                    for (let i = 0; i < imgFiles.images.length; i++) {
                        formData2.append('images', imgFiles.images[i]);
                    };
                    const result2 = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DEV}/img_upload/multipal`, formData2, { headers: multipartHeaders });
                    if (result2.data?.files?.length) {
                        entireData.businessDetails.images = result2.data?.files;
                    } else if (!result2.success) {
                        return console.log(result2);
                    } else {
                        return console.log(result2);
                    }
                }
                // return console.log(entireData);
                postData(entireData)
                    .then(res => {
                        if (res.data?.success) {
                            console.log(res.data);
                            successToast("Data Entire Successful!");
                            localStorage.removeItem("entire");
                            setInputData({});
                            setService([]);
                            setAddressValue({ country: "", state: "", city: "" });
                            e.target.reset();
                        } else {
                            console.log(res);
                            errorToast("Something went wrong!")
                        }
                    });
            }
        } catch (error) {
            errorToast(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        }
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
                        value={inputData?.businessDetails?.category || ""}
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
                    {errors.category && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.category}</p>}
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Business Size *</label>
                    <select
                        value={inputData?.businessDetails?.businessSize || ""}
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
                        value={inputData?.businessDetails?.businessName || ""}
                        onChange={(e) => setInputData({ ...inputData, businessDetails: { ...inputData?.businessDetails, businessName: e.target.value } })}
                        type="text" id='business-name' placeholder='Business name'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {errors.businessName && <p role="alert" className='pl-4px text-red-600 animate-pulse text-sm absolute -bottom-5 right-1'>{errors.businessName}</p>}
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='name' className="leading-7 font-[600] text-gray-700 col-span-3">Business owner *</label>
                    <input
                        value={inputData?.ownerDetails?.name || ""}
                        onChange={(e) => setInputData({ ...inputData, ownerDetails: { ...inputData?.ownerDetails, name: e.target.value } })}
                        type="text" id='name' placeholder='Enter owner name'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='email' className="leading-7 font-[600] text-gray-700 col-span-3">Owner email *</label>
                    <input
                        value={inputData?.ownerDetails?.email || ""}
                        onChange={(e) => setInputData({ ...inputData, ownerDetails: { ...inputData?.ownerDetails, email: e.target.value } })}
                        type="email" id='email' placeholder='Enter owner email'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {errors.email && <p role="alert" className='col-span-full pl-4px text-red-600 animate-pulse text-sm text-right absolute -bottom-5 right-1'>{errors.email}</p>}
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='ph-number' className="leading-7 font-[600] text-gray-700 col-span-3">Owner phone *</label>
                    <div className='col-span-4 grid grid-cols-4'>
                        <select
                            value={inputData?.ownerDetails?.country_code || ""}
                            onChange={(e) => setInputData({ ...inputData, ownerDetails: { ...inputData?.ownerDetails, country_code: e.target.value } })}
                            className="col-span-1 w-full bg-white rounded rounded-r-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-[2px] text-center leading-8 transition-colors duration-200 ease-in-out" >
                            <option className='w-10' value='' selected disabled>+ code</option>
                            {Object.keys(Countries.countries).map((key, i) => (
                                <option className='w-10' key={i} value={Countries.countries[key].phone}> {key + ' ' + '+' + Countries.countries[key].phone}</option>
                            ))}
                        </select>
                        <input
                            value={inputData?.ownerDetails?.phone || ""}
                            onChange={(e) => setInputData({ ...inputData, ownerDetails: { ...inputData?.ownerDetails, phone: e.target.value } })}
                            type="text" id='ph-number' placeholder='Enter phone number'
                            className="col-span-3 w-full bg-white rounded rounded-l-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    {errors.code && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right absolute -bottom-5 right-1'>{errors.code}</p>}
                    {!errors.code && errors.phone && <p role="alert" className='col-span-7 pl-4px text-red-600 animate-pulse text-sm text-right  absolute -bottom-5 right-1'>{errors.phone}</p>}
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <p className="leading-7 font-[600] text-gray-700 col-span-3">Address *</p>
                    <div className="col-span-4 relative">
                        <AddressAddForm addressValue={addressValue} setAddressValue={setAddressValue} classes={{ label: "text-xs" }} />
                        <div className='w-full grid grid-cols-6 gap-2 justify-between items-center'>
                            <div className="w-full col-span-4">
                                <label htmlFor='street' className="leading-7 text-gray-700  text-xs">Street Address</label>
                                <input
                                    value={inputData?.address?.street_address || ""}
                                    onChange={(e) => setInputData({ ...inputData, address: { ...inputData?.address, street_address: e.target.value } })}
                                    type="text" id='street' placeholder='Street Address'
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3  mb-[2px] leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            <div className="w-full col-span-2">
                                <label htmlFor='post' className="leading-7 text-gray-700 text-xs">Post code </label>
                                <input
                                    value={inputData?.address?.postCode || ""}
                                    onChange={(e) => setInputData({ ...inputData, address: { ...inputData?.address, postCode: e.target.value } })}
                                    type="text" id='post' placeholder='Post-code'
                                    className=" w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3  mb-[6px] leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        {errors.address && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.address}</p>}
                    </div>
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='location' className="leading-7 font-[600] text-gray-700 col-span-3">Business google map location*</label>
                    <input
                        value={inputData?.address?.location_link || ""}
                        onChange={(e) => setInputData({ ...inputData, address: { ...inputData?.address, location_link: e.target.value } })}
                        type="url" id='location' placeholder='Enter google map link'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='busi-logo' className="leading-7 font-[600] text-gray-700 col-span-3">Business logo</label>
                    <input
                        onChange={(e) => setImgFiles({ ...imgFiles, logo: e.target.files[0] })} type="file" id='busi-logo' placeholder='Enter business logo'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[2px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='other_image' className="leading-7 font-[600] text-gray-700 col-span-3">Others image</label>
                    <input
                        onChange={(e) => setImgFiles({ ...imgFiles, images: e.target.files })}
                        type="file" id='other_image' placeholder='Other image' multiple
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[2px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <div className={`${!inputData?.have_website?.isWebsite ? 'h-7' : 'h-fit'} overflow-y-hidden duration-300`}>
                    <div className="relative mb-2 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <div className='col-span-3'>
                            <input
                                checked={inputData?.have_website?.isWebsite || false}
                                onClick={(e) => {
                                    setInputData({ ...inputData, have_website: { ...inputData?.have_website, isWebsite: inputData?.have_website?.isWebsite ? false : true } });
                                    setCount(c => ({ ...c, website: 1 }))
                                }} readOnly
                                type="checkbox" id="website"
                            />
                            <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="website">Already have an website?</label>
                        </div>
                        <div className='col-span-4 mt-8'>
                            {[...Array(count.website)].map((site, i) => <div className='mb-1' key={i}>
                                <h4 className='text-xs text-gray-400 '>Website Link - {++i}</h4>
                                <input
                                    onChange={(e) => setWebsite(c => ({ ...c, [`site${i}`]: e.target.value }))}
                                    type="url" placeholder='Website url link'
                                    className="placeholder:text-gray-900 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>)}
                            <div className='flex justify-end'> <p onClick={() => setCount((c) => ({ ...c, website: c.website + 1 }))} className="text-white bg-red-400 border-0 h-7  whitespace-pre text-sm py-[4px] px-4 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded font-semibold select-none inline cursor-pointer">+ New website</p></div>
                        </div>
                    </div>
                </div>
                <div>
                    <input
                        checked={inputData?.have_pc}
                        onClick={(e) => setInputData({ ...inputData, have_pc: inputData?.have_pc ? false : true })}
                        type="checkbox" id="pc" />
                    <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="pc">Have a business computers?</label>
                </div>
                <div className={`${!inputData?.have_branchs?.isBranch ? 'h-7' : 'h-fit'} overflow-y-hidden duration-300`}>
                    <div className="relative mb-2 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <div className='col-span-3'>
                            <input
                                checked={inputData?.have_branchs?.isBranch}
                                onClick={(e) => {
                                    setInputData({ ...inputData, have_branchs: { ...inputData?.have_branchs, isBranch: inputData?.have_branchs?.isBranch ? false : true } });
                                    setCount(c => ({ ...c, branch: 1 }))
                                }}
                                type="checkbox" id="branch"
                            />
                            <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="branch">Are there any branch institutions?</label>
                        </div>
                        <div className='col-span-4 mt-8'>
                            {[...Array(count.branch)].map((site, i) => <div className='mb-2' key={i}>
                                <h4 className='text-sm text-gray-700 font-semibold'>Branch - {++i}</h4>
                                <input
                                    onChange={(e) => setBranch(c => ({ ...c, [`branch${i}`]: { ...c[`branch${i}`], name: e.target.value } }))}
                                    type="text" placeholder='Branch name'
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <div className='w-full grid grid-cols-6 gap-2 justify-between items-center'>
                                    <div className='w-full col-span-3'>
                                        <label className="leading-7 text-gray-700 text-xs">Country *</label>
                                        <select
                                            onChange={(e) => setBranch(c => ({ ...c, [`branch${i}`]: { ...c[`branch${i}`], country: e.target.value } }))}
                                            className="block w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 -mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                        >
                                            <option value='' disabled>Select Country</option>
                                            {Object.values(Countries.countries).map((country, i) => (
                                                <option key={i} value={country.name}>{country.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-full col-span-3">
                                        <label htmlFor='branchState' className="leading-7 text-gray-700 text-xs">State / Province </label>
                                        <input
                                            onChange={(e) => setBranch(c => ({ ...c, [`branch${i}`]: { ...c[`branch${i}`], state: e.target.value } }))}
                                            type="text" id='branchState' placeholder='Local state state'
                                            className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 -mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                    <div className="w-full col-span-6 -mt-1">
                                        <label htmlFor='address' className="leading-7 text-gray-700  text-xs">Street Address</label>
                                        <input
                                            onChange={(e) => setBranch(c => ({ ...c, [`branch${i}`]: { ...c[`branch${i}`], street_address: e.target.value } }))}
                                            type="text" id='address' placeholder='Street Address'
                                            className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 -mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                        />
                                    </div>
                                </div>
                            </div>)}
                            <div className='flex justify-end'> <p onClick={() => setCount((c) => ({ ...c, branch: c.branch + 1 }))} className="text-white bg-red-400 border-0 h-7  whitespace-pre text-sm py-[4px] px-4 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded font-semibold select-none inline cursor-pointer">+ New Branch</p></div>
                        </div>
                    </div>
                </div>
                <div className={`${!inputData?.other_business?.isOther_business ? 'h-7' : 'h-24 md:h-20'} overflow-y-hidden duration-300`}>
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
                            value={inputData?.other_business?.other_business_quantity || ""}
                            onChange={(e) => setInputData({ ...inputData, other_business: { ...inputData?.other_business, other_business_quantity: e.target.value } })}
                            type="number" id='brQty' placeholder='Enter branch number'
                            className="col-span-4 placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>
                <div className={`relative mb-2 w-full`}>
                    <input
                        checked={inputData.products}
                        onClick={(e) => {
                            setInputData({ ...inputData, products: inputData?.products ? false : true });
                        }}
                        type="checkbox" id="tags"
                    />
                    <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="branch">Services They Offer</label>
                    <div className={inputData?.products ? "block" : "hidden"} >
                        <TagsInput
                            className="bg-gray-400"
                            value={service} onChange={setService} name="tags" placeHolder="enter products"
                        />
                    </div>
                </div>
                <div className="relative mb-4 mt-2 md:mt-4">
                    <label htmlFor='information' className="leading-7 font-[600] text-gray-700">Write another information</label>
                    <textarea
                        value={inputData?.other_information || ""}
                        onChange={(e) => setInputData({ ...inputData, other_information: e.target.value })}
                        type="text" id='information' placeholder='Text.......'
                        className="w-full bg-white rounded-sm min-h-[150px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                <button type='reset'
                    onClick={() => {
                        localStorage.removeItem("entire");
                        setInputData({});
                    }}
                    className="text-white bg-red-400 border-0  h-10 w-[90px] py-2 px-6 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded font-semibold select-none inline cursor-pointer">Clear</button>
                <button disabled={isLoading} type='submit' className="text-white bg-indigo-500 border-0 h-10 w-[90px] py-2 px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 font-semibold disabled:bg-indigo-400 rounded align-middle"> {isLoading ? <SmallSpinner /> : "Submit"}</button>
                <p className="text-xs text-gray-500 mt-3">Chicharrones blog helvetica normcore iceland tousled brook viral artisan.</p>
            </div>
        </form >
    );
};

export default Private(New_form);