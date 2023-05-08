import React, { useEffect, useState } from 'react';
import Countries from 'countries-list';
import { SmallSpinner } from '@/components/Spinner';
import { usePostDataMutation } from '@/app/features/dataEntire/dataEntireApi';
import { errorToast, successToast } from '@/utils/neededFun';
import { TagsInput } from "react-tag-input-component";
import axios from 'axios';
import { Private } from '@/utils/ProtectRoute';
import CountryInput from '@/components/Forms/Inputs';
import { PhotoIcon } from '@heroicons/react/20/solid';
import { useForm } from 'react-hook-form';
import EntrySubPreview from '@/components/EntrySubPreview';

const ourServices = ["Website design and Development", "ERP Solution", "App Development", "Business Accessories", "Digital Marketing"];

const New_form = () => {
    const [imgFiles, setImgFiles] = useState({}); // ekhane (images: e.target.files, logo: e.target.files[0]) set korte hobe
    const [inputData, setInputData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [count, setCount] = useState({ website: 1, branch: 1 });
    const [website, setWebsite] = useState({});
    const [branch, setBranch] = useState({});
    const [postData, { isLoading }] = usePostDataMutation();
    const [theyService, setTheyService] = useState([]);
    const [weCanService, setWeCanService] = useState([]);
    const [openView, setOpenView] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    useEffect(() => {
        const localStorageEntry = JSON.parse(localStorage.getItem("entire"));
        console.log(localStorageEntry);
        setInputData(localStorageEntry || {})
        setTimeout(() => {
            reset(
                localStorageEntry || {}
            );
            setSelectedCountry(localStorageEntry?.country || null);
            setCount(localStorageEntry?.count || {});
            setBranch(localStorageEntry?.branch || {})
            setWebsite(localStorageEntry?.website || {});
            setTheyService(localStorageEntry?.theyService || []);
            setWeCanService(localStorageEntry?.weCanService || []);
        }, 100)
    }, [])
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem("entire", JSON.stringify({ ...inputData, country: selectedCountry, website, count, branch, theyService, weCanService }));
        }, 500);
    }, [inputData, selectedCountry, website, count, branch, theyService, weCanService]);
    console.log(weCanService)
    const submit = async (data) => {
        if (!selectedCountry) {
            return setInputData(c => ({ ...c, countryErr: "Country is required!" }));
        } else setInputData(c => ({ ...c, countryErr: "" }));
        return console.log(data)
        const entireData = {
            ...inputData,
            tag: service,
            address: { ...inputData.address, country: addressValue?.country, state: addressValue?.state, city: addressValue?.city },
            have_website: { website_urls: Object.values(website).filter(link => link !== ''), isWebsite: inputData?.have_website?.isWebsite },
            have_branchs: { isBranch: inputData?.have_branchs?.isBranch, branch_detalis: Object.values(branch) }
        }

        // try {
        //     const formData = new FormData();
        //     const formData2 = new FormData();
        //     if (imgFiles.logo) {
        //         setImageLoading(true);
        //         formData.append('image', imgFiles.logo);
        //         const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DEV}/img_upload`, formData, {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //                 'Access-Control-Allow-Origin': `http://localhost:5000`,
        //                 'Access-Control-Allow-Credentials': 'true',
        //                 authorization: localStorage.getItem("tech_token"),
        //             }
        //         })
        //         if (result.data?.file) {
        //             setImageLoading(false);
        //             entireData.businessDetails.businessLogo = result.data.file;
        //         } else {
        //             setImageLoading(false);
        //             return console.log(result);
        //         }
        //     }
        //     if (imgFiles.images?.length) {
        //         setImageLoading(true);
        //         for (let i = 0; i < imgFiles.images.length; i++) {
        //             formData2.append('images', imgFiles.images[i]);
        //         };
        //         const result2 = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DEV}/img_upload/multipal`, formData2, {
        //             headers: {
        //                 "Content-Type": "multipart/form-data",
        //                 'Access-Control-Allow-Origin': `http://localhost:5000`,
        //                 'Access-Control-Allow-Credentials': 'true',
        //                 authorization: localStorage.getItem("tech_token"),
        //             }
        //         });
        //         if (result2.data?.files?.length) {
        //             setImageLoading(false);
        //             entireData.businessDetails.images = result2.data?.files;
        //         } else {
        //             setImageLoading(false);
        //             return console.log(result2);
        //         }
        //     }
        //     // return console.log(entireData);
        //     postData(entireData)
        //         .then(res => {
        //             if (res.data?.success) {
        //                 console.log(res.data);
        //                 successToast("Data Entire Successful!");
        //                 localStorage.removeItem("entire");
        //                 setInputData({});
        //                 setService([]);
        //                 selectedCountry(null)
        //                 e.target.reset();
        //             } else {
        //                 console.log(res);
        //                 errorToast("Something went wrong!")
        //             }
        //         });
        // } catch (error) {
        //     errorToast(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        // }
    };
    const handleInput = e => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }

    return (
        <div className='relative'>
            <form onSubmit={handleSubmit(submit)}>
                <div className='max-w-full smm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-6 md:px-8 lg:px-16 xl:px-20 py-4 md:py-6 lg:py-8 md:my-5 bg-white rounded drop-shadow-md'>
                    <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase text-center">Data Collect Form</h2>
                    <p className="leading-relaxed mb-2 text-gray-600 w-80 md:w-full text-center">Help us with your valuable information so that we can benefit you.</p>
                    <hr />
                    <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label className="leading-7 font-[600] text-gray-700 col-span-3">Business Category *</label>
                        <select
                            {...register("category", { required: "Category select required!" })}
                            onChange={handleInput} name='category'
                            className="col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 md:py-[10px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                        >
                            <option value='' selected disabled>Select category</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Salon">Salon</option>
                            <option value="Grocery">Grocery</option>
                            <option value="E-Commerce">E-Commerce</option>
                            <option value="Restaurant">Restaurant</option>
                            <option value="Barber Shop">Barber Shop</option>
                            <option value="Agency">Agency</option>
                            <option value="Add New">Add New</option>
                        </select>
                        {errors.category?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.category.message}</p>}
                    </div>
                    <div className="relative mb-4 mt-0 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label htmlFor='business-name' className="leading-7 font-[600] text-gray-700 col-span-3">Business Name *</label>
                        <div className='col-span-4 w-full'>
                            <input
                                {...register("businessName", { required: "Business name is required!" })}
                                onChange={handleInput} name='businessName'
                                type="text" id='business-name' placeholder='Business name'
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            {errors.businessName?.type === 'required' && <p role="alert" className='pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.businessName.message}</p>}
                        </div>
                    </div>
                    <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label htmlFor='ph-number' className="leading-7 font-[600] text-gray-700 col-span-3">Contact number *</label>
                        <div className='col-span-4 w-full'>
                            <div className='col-span-4 grid grid-cols-4'>
                                <select
                                    {...register("country_code", { required: "Phone code is required!" })}
                                    onChange={handleInput} name='country_code'
                                    className="col-span-1 w-full bg-white rounded rounded-r-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-[2px] text-center leading-8 transition-colors duration-200 ease-in-out"
                                >
                                    <option className='w-10' value='' selected disabled>+ code</option>
                                    {Object.keys(Countries.countries).map((key, i) => (
                                        <option className='w-10' key={i} value={Countries.countries[key].phone}> {key + ' ' + '+' + Countries.countries[key].phone}</option>
                                    ))}
                                </select>
                                <input
                                    {...register("businessPhone", { required: "Contact number is required!" })}
                                    onChange={handleInput} name='businessPhone'
                                    type="number" id='ph-number' placeholder='Enter phone number'
                                    className="col-span-3 w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-white rounded rounded-l-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                            {errors.country_code?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.country_code.message}</p>}
                            {!errors.country_code?.type === 'required' && errors.businessPhone?.type === 'required' && <p role="alert" className='col-span-7 pl-4px text-red-600 animate-pulse text-sm text-right  absolute -bottom-5 right-1'>{errors.businessPhone.message}</p>}
                        </div>
                    </div>
                    <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label htmlFor='email' className="leading-7 font-[600] text-gray-700 col-span-3">Business Email </label>
                        <input
                            {...register("businessEmail")}
                            onChange={handleInput} name='businessEmail'
                            type="email" id='email' placeholder='Enter Business email'
                            className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4 mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <p className="leading-7 font-[600] text-gray-700 col-span-3">Address *</p>
                        <div className="col-span-4 grid grid-cols-2 relative gap-x-2 gap-y-5">
                            <div className='col-span-2 w-full'>
                                <input
                                    {...register("street_address", { required: "Street address is required!" })}
                                    onChange={handleInput} name='street_address'
                                    placeholder='Street Address' type="text"
                                    className="w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {errors.street_address?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.street_address.message}</p>}
                            </div>
                            <div className='col-span-1 w-full'>
                                <input
                                    {...register("city", { required: "City / Suburb is required!" })}
                                    onChange={handleInput} name='city'
                                    placeholder='City / Suburb' type="text"
                                    className="w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {errors.city?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.city.message}</p>}
                            </div>
                            <div className='col-span-1 w-full'>
                                <input
                                    {...register("state", { required: "State / Province is required!" })}
                                    onChange={handleInput} name='state'
                                    placeholder='State / Province' type="text"
                                    className="w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {errors.state?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.state.message}</p>}
                            </div>
                            <div className='col-span-1 w-full'>
                                <input
                                    {...register("postCode", { required: "Postal code is required!" })}
                                    onChange={handleInput} name='postCode'
                                    placeholder='Postal / Zip code' type="text"
                                    className="w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {errors.postCode?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.postCode.message}</p>}
                            </div>
                            <div className='col-span-1 w-full -mt-2'>
                                <CountryInput selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} required={!selectedCountry} placeHolder={"Country"} wornClass={{ input: "w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out" }}></CountryInput>
                                {!selectedCountry && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{inputData.countryErr}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label htmlFor='location' className="leading-7 font-[600] text-gray-700 col-span-3">Google map location</label>
                        <input
                            {...register("location_link")}
                            onChange={handleInput} name="location_link"
                            type="url" id='location' placeholder='Enter google map link'
                            className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label htmlFor='busi-logo' className="leading-7 font-[600] text-gray-700 col-span-3">Business logo</label>
                        <label
                            htmlFor="file-upload"
                            className=" col-span-4 rounded-lg cursor-pointer font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                            <div className="w-full flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5 bg-gray-50">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <span className=' text-indigo-600'>Upload a logo image</span>
                                        <input
                                            onChange={(e) => setImgFiles({ ...imgFiles, logo: e.target.files[0] })} accept='image/*'
                                            id="file-upload" name="file-upload" type="file" className="sr-only"
                                        />
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label htmlFor='' className="leading-7 font-[600] text-gray-700 col-span-3">Others image</label>
                        <input
                            onChange={(e) => setImgFiles({ ...imgFiles, images: e.target.files })}
                            type="file" id='other_image' placeholder='Other image' multiple
                            className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[2px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className={`relative mb-2 w-full`}>
                        <label className='leading-7 font-[600] text-gray-700 col-span-3' htmlFor="branch">Services They Offer</label>
                        <div className={""} >
                            <TagsInput
                                className="bg-gray-400"
                                value={theyService} onChange={setTheyService} name="tags" placeHolder="enter products"
                            />
                        </div>
                    </div>
                    <div className={`${!inputData.isWebsite ? 'h-7' : 'h-fit'} overflow-y-hidden duration-300`}>
                        <div className="relative mb-2 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                            <div className='col-span-3'>
                                <input
                                    checked={inputData.isWebsite || false}
                                    onClick={(e) => {
                                        setInputData({ ...inputData, isWebsite: inputData.isWebsite ? false : true });
                                        setWebsite({})
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
                                        value={website[`site${i}`] || ''}
                                        onChange={(e) => setWebsite(c => ({ ...c, [`site${i}`]: e.target.value }))}
                                        type="url" placeholder='Website url link'
                                        className="placeholder:text-gray-900 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>)}
                                <div className='flex justify-end'> <p onClick={() => setCount((c) => ({ ...c, website: c.website + 1 }))} className="text-white bg-red-400 border-0 h-7  whitespace-pre text-sm py-[4px] px-4 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded font-semibold select-none inline cursor-pointer">+ New website</p></div>
                            </div>
                        </div>
                    </div>
                    <div className={`${!inputData?.isBranch ? 'h-7' : 'h-fit'} overflow-y-hidden duration-300`}>
                        <div className="relative mb-2 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                            <div className='col-span-3'>
                                <input
                                    checked={inputData?.isBranch}
                                    onClick={(e) => {
                                        setInputData({ ...inputData, isBranch: inputData?.isBranch ? false : true });
                                        setCount(c => ({ ...c, branch: 1 }))
                                        setBranch({})
                                    }}
                                    type="checkbox" id="branch"
                                />
                                <label className='ml-2 leading-7 font-[600] text-gray-700 col-span-3' htmlFor="branch">Are there any branch institutions?</label>
                            </div>
                            <div className='col-span-4 mt-8'>
                                {[...Array(count.branch)].map((site, i) => <div className='mb-2' key={i}>
                                    <h4 className='text-sm text-gray-700 font-semibold'>Branch - {++i}</h4>
                                    <input
                                        value={branch[`branch${i}`]?.name || ""}
                                        onChange={(e) => setBranch(c => ({ ...c, [`branch${i}`]: { ...c[`branch${i}`], name: e.target.value } }))}
                                        type="text" placeholder='Branch name'
                                        className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    <div className='w-full grid grid-cols-6 gap-2 justify-between items-center'>
                                        <div className='w-full col-span-3'>
                                            <label className="leading-7 text-gray-700 text-xs">Country *</label>
                                            <select
                                                value={branch[`branch${i}`]?.country || ""}
                                                onChange={(e) => setBranch(c => ({ ...c, [`branch${i}`]: { ...c[`branch${i}`], country: e.target.value } }))}
                                                className="block w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-[10px] md:py-[11px] px-3 -mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                            >
                                                <option value='' selected disabled>country</option>
                                                {Object.values(Countries.countries).map((country, i) => (
                                                    <option key={i} value={country.name}>{country.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="w-full col-span-3">
                                            <label htmlFor='branchState' className="leading-7 text-gray-700 text-xs">State / Province </label>
                                            <input
                                                value={branch[`branch${i}`]?.state || ""}
                                                onChange={(e) => setBranch(c => ({ ...c, [`branch${i}`]: { ...c[`branch${i}`], state: e.target.value } }))}
                                                type="text" id='branchState' placeholder='Local state state'
                                                className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 -mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                        </div>
                                        <div className="w-full col-span-6 -mt-1">
                                            <label htmlFor='address' className="leading-7 text-gray-700  text-xs">Street Address</label>
                                            <input
                                                value={branch[`branch${i}`]?.street_address || ""}
                                                onChange={(e) => setBranch(c => ({ ...c, [`branch${i}`]: { ...c[`branch${i}`], street_address: e.target.value } }))}
                                                type="text" id='address' placeholder='Street Address'
                                                className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 -mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                            />
                                        </div>
                                    </div>
                                </div>)}
                                <div className='flex justify-end'> <p onClick={() => setCount((c) => ({ ...c, branch: c.branch + 1 }))} className="text-white bg-red-400 border-0 h-7  whitespace-pre text-sm py-[4px] px-4 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded font-semibold select-none inline cursor-pointer">+ New Branch</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="relative mb-4 grid grid-cols-1 gap-x-3 py-2 rounded bg-slate-50 -mx-4 px-4">
                        <p className="leading-7 font-[600] text-gray-700 col-span-3">Services We can Offer *</p>
                        <div className="col-span-4 grid grid-cols-1 relative gap-x-2 gap-y-3 mt-2">
                            {ourServices.map((service, i) => <div key={i} className="relative flex justify-start items-center gap-x-3">
                                {++i}.
                                <input
                                    checked={weCanService.includes(service) || false}
                                    onClick={() => setWeCanService(c => (weCanService.includes(service) ? [c.filter(p => service !== p)] : [...c, service]))}
                                    id={i} type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor={i} className="font-[400] text-gray-900">
                                    {service}
                                </label>
                            </div>)}
                        </div>
                    </div>
                    <div className="relative mb-4 mt-2">
                        <label htmlFor='information' className="leading-7 font-[600] text-gray-700">Another information *</label>
                        <textarea
                            {...register("other_information", { required: "Comment is required!" })}
                            onChange={(e) => setInputData({ ...inputData, other_information: e.target.value })}
                            type="text" id='information' placeholder='Text.......'
                            className="w-full bg-white rounded-sm min-h-[150px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        {errors.other_information?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.other_information.message}</p>}
                    </div>
                    <p
                        type='reset'
                        onClick={() => {
                            // setOpenView(c => (!c && true)) 
                            setCount({ branch: 1, website: 1 });
                            setSelectedCountry(null);
                            setWebsite({});
                            setBranch({})
                            setTheyService([])
                            localStorage.removeItem("entire");
                            setInputData({});
                        }}
                        className="text-white bg-red-400 border-0  h-10 w-[90px] py-2 px-6 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded font-semibold select-none inline cursor-pointer"
                    >Clear</p>
                    <button disabled={isLoading || imageLoading} type='submit' className="text-white bg-indigo-500 border-0 h-10 w-[120px] py-2 px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 font-semibold disabled:bg-indigo-400 rounded align-middle"> {(isLoading || imageLoading) ? <SmallSpinner /> : "Continue"}</button>
                </div>
            </form >
            {
                openView && <EntrySubPreview open={openView} setOpen={setOpenView}></EntrySubPreview>
            }
        </div>
    );
};

export default Private(New_form);