import React, { useEffect, useState } from 'react';
import { LargeSpinner, SmallSpinner } from './Spinner';
import { useGetEntireDataByIdQuery, useUpdateEntryDataMutation } from '@/app/features/dataEntire/dataEntireApi';
import { useForm } from 'react-hook-form';
import { TagsInput } from 'react-tag-input-component';
import { PhotoIcon, PlusIcon } from '@heroicons/react/20/solid';
import { CityInput, CountryInput, StateInput } from './Forms/Inputs';
import CategoryInput from './Forms/CategoryInput';
import { countries } from 'countries-list';
import { errorToast, successToast } from '@/utils/neededFun';
import axios from 'axios';
import { useGetOurServiceQuery } from '@/app/features/others/othersApi';

const Update_entry_data = ({ updateEntry, setUpdateEntry }) => {
    const { data, isLoading, isError, error } = useGetEntireDataByIdQuery(updateEntry, { refetchOnMountOrArgChange: true });
    const { data: serviceData, isLoading: serviceLoading } = useGetOurServiceQuery(`/service_we_offer`);
    const ourServices = serviceData?.data || [];
    const [imgFiles, setImgFiles] = useState({}); // ekhane (images: e.target.files, logo: e.target.files[0]) set korte hobe
    const [inputData, setInputData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [count, setCount] = useState({ website: 1, branch: 1 });
    const [website, setWebsite] = useState({});
    const [theyService, setTheyService] = useState([]);
    const [weCanService, setWeCanService] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [updateData, { isLoading: updateLoading }] = useUpdateEntryDataMutation();
    useEffect(() => {
        if (data?.success) {
            const { address, businessDetails, have_website, other_information, they_offer_service, we_offer_service, } = data.data;
            setInputData({ isWebsite: have_website?.needWebsite, id: data.data._id, logo: businessDetails?.businessLogo || '' })
            setTimeout(() => {
                reset(
                    { ...address, ...businessDetails, other_information }
                );
                setSelectedCountry({ name: address.country });
                setSelectedState({ name: address.state });
                setSelectedCity({ name: address.city })
                setCount({ website: have_website?.website_urls?.length > 0 ? have_website.website_urls.length : 1 });
                setWebsite(have_website?.website_urls?.length > 0 ? have_website.website_urls.reduce((a, v, i) => ({ ...a, [`site${++i}`]: v }), {}) : {});
                setTheyService(they_offer_service || []);
                setSelectedCategory({ ...businessDetails.category })
                setWeCanService(we_offer_service || []);
            }, 100)
        }
    }, [data]);
    const submit = async (formDatas) => {
        if (!selectedCategory.main) {
            return setInputData(c => ({ ...c, categoryErr: "Business category is required!" }));
        } else setInputData(c => ({ ...c, categoryErr: null }));
        if (!selectedCountry) {
            return setInputData(c => ({ ...c, countryErr: "Country is required!" }));
        } else setInputData(c => ({ ...c, countryErr: "" }));
        setImageLoading(true)
        const { businessName, country_code, businessPhone, businessEmail, state, city, street_address, postCode, location_link, other_information, } = formDatas;
        const entireData = {
            _id: inputData.id,
            other_information,
            we_offer_service: weCanService,
            they_offer_service: theyService,
            have_website: { needWebsite: inputData?.isWebsite, website_urls: Object.values(website).filter(link => link !== '') },
            // have_branchs: { isBranch: inputData?.isBranch, branch_detalis: branch },
            businessDetails: { category: selectedCategory, businessName, country_code, businessPhone: businessPhone?.toString(), businessEmail, businessLogo: data?.data?.businessDetails?.businessLogo || '' },
            address: { country: selectedCountry.name, state: selectedState.name, city: selectedCity.name, street_address, postCode, location_link }
        }
        // return console.log(entireData);
        try {
            const formData = new FormData();
            if (imgFiles.logo) {
                formData.append('image', imgFiles.logo);
                const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DEV}/img_upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Access-Control-Allow-Origin': `http://localhost:5000`,
                        'Access-Control-Allow-Credentials': 'true',
                        authorization: localStorage.getItem("tech_token"),
                    }
                })
                if (result.data?.file) {
                    setImageLoading(false);
                    entireData.businessDetails.businessLogo = result.data.file;
                } else {
                    setImageLoading(false);
                    return console.log(result);
                }
            }

            updateData(entireData)
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Business data update successful!")
                        setCount({ branch: 1, website: 1 });
                        setWebsite({});
                        setSelectedCountry(null);
                        setTheyService([]);
                        setWeCanService([]);
                        setInputData({});
                        setSelectedCategory({});
                        reset();
                        setUpdateEntry(null);
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        } catch (error) {
            setImageLoading(false)
            errorToast(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        }
    };

    const handleInput = e => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    }
    if (isLoading || serviceLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.message) {
            return <div className='text-center mt-10 md:mt-40'>
                <p className="text-2xl text-red-500">{error.message}</p>
            </div>
        } else if (error.error) {
            return <div className='text-center mt-10 md:mt-40'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else if (error.data.message) {
            return <div className='text-center mt-10 md:mt-40'>
                <p className="text-2xl text-red-500">{error.data.dev_err || error.data.message}</p>
            </div>
        }
    };

    return (
        <div className='relative'>
            <form onSubmit={handleSubmit(submit)}>
                <div className='relative max-w-full smm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-6 md:px-8 lg:px-16 xl:px-20 py-4 md:py-6 lg:py-8 md:my-5 bg-white rounded drop-shadow-md'>
                    <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase text-center">Business Data Update Form</h2>
                    <p className="leading-relaxed mb-2 text-gray-600 w-80 md:w-full text-center">Help us with your valuable information so that we can benefit you.</p>
                    <button
                        onClick={() => setUpdateEntry(null)} type="button"
                        className="absolute top-8 right-8 rounded-full bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-red-500 shadow-sm hover:bg-indigo-200"
                    >X</button>
                    <hr />
                    <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                        <label className="leading-7 font-[600] text-gray-700 col-span-3">Business Category *</label>
                        <div className="col-span-3 w-full">
                            <CategoryInput selectedValue={selectedCategory} setSelectedValue={setSelectedCategory} ownClass={{ position: " absolute z-40 top-12 left-0 ", input: "bg-white rounded border border-gray-300 px-3 py-[6px] flex justify-between items-center text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out", focus: "border-indigo-500 ring-2 text-gray-500" }}></CategoryInput>
                        </div>
                        {!selectedCategory.main && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{inputData.categoryErr}</p>}
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
                                    {Object.keys(countries).map((key, i) => (
                                        <option className='w-10' key={i} value={countries[key].phone}> {key + ' ' + '+' + countries[key].phone}</option>
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
                            <div className='col-span-1 w-full '>
                                <CountryInput selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} placeHolder={"Country"} wornClass={{ input: "w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out" }}></CountryInput>
                                {/* <input type="" required={inputData.countryErr} className='sr-only ml-[30%]' /> */}
                                {!selectedCountry && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{inputData.countryErr}</p>}
                            </div>
                            <div className='col-span-1 w-full'>
                                <StateInput country={selectedCountry?.name || ""} selectedState={selectedState} setSelectedState={setSelectedState} placeHolder={"State / Province"} wornClass={{ input: "w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out" }} />
                                {/* <input
                                        {...register("state", { required: "State / Province is required!" })}
                                        onChange={handleInput} name='state'
                                        placeholder='State / Province' type="text"
                                        className="w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    {errors.state?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.state.message}</p>} */}
                            </div>
                            <div className='col-span-1 w-full'>
                                <CityInput country={selectedCountry?.name || ""} state={selectedState?.name || ""} selectedCity={selectedCity} setSelectedCity={setSelectedCity} placeHolder={"City / Suburb"} wornClass={{ input: "w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out" }} />
                                {/* <input
                                        {...register("city", { required: "City / Suburb is required!" })}
                                        onChange={handleInput} name='city'
                                        placeholder='City / Suburb' type="text"
                                        className="w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    {errors.city?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.city.message}</p>} */}
                            </div>
                            <div className='col-span-1 w-full mt-2'>
                                <input
                                    {...register("postCode", { required: "Postal code is required!" })}
                                    onChange={handleInput} name='postCode'
                                    placeholder='Postal / Zip code' type="text"
                                    className="w-full placeholder:text-zinc-900 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {errors.postCode?.type === 'required' && <p role="alert" className='col-span-6 pl-4px text-red-600 animate-pulse text-sm text-right -mb-3'>{errors.postCode.message}</p>}
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
                        <div className=" col-span-4 w-full flex justify-center items-center gap-3 rounded-lg border border-dashed border-gray-200 py-5">
                            <img className='max-w-[400px] max-h-[120px] rounded' src={imgFiles.logo ? window.URL.createObjectURL(imgFiles.logo) : inputData.logo} alt="logo" />
                            <div                            >
                                <label
                                    htmlFor="file-upload"
                                    className="block rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <PlusIcon className="h-8 w-8" aria-hidden="true" />
                                </label>
                                <input
                                    onChange={(e) => setImgFiles({ ...imgFiles, logo: e.target.files[0] })} accept='image/*'
                                    id="file-upload" name="file-upload" type="file" className="sr-only"
                                />
                            </div>
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
                    <div className={`relative mb-2 w-full`}>
                        <label className='leading-7 font-[600] text-gray-700 col-span-3' htmlFor="branch">Services They Offer</label>
                        <div className={""} >
                            <TagsInput
                                className="bg-gray-400"
                                value={theyService} onChange={setTheyService} name="tags" placeHolder="enter products"
                            />
                        </div>
                    </div>
                    <div className="relative mb-4 grid grid-cols-1 gap-x-3 py-2 rounded bg-slate-50 -mx-4 px-4">
                        <p className="leading-7 font-[600] text-gray-700 col-span-3">Services We can Offer *</p>
                        <div className="col-span-4 grid grid-cols-1 relative gap-x-2 gap-y-3 mt-2">
                            {ourServices.map((service, i) => <div key={i} className="relative flex justify-start items-center gap-x-3">
                                {++i}.
                                <input
                                    checked={weCanService.includes(service.name) || false}
                                    onClick={() => setWeCanService(c => (weCanService.includes(service.name) ? c.filter(p => service.name !== p) : [...c, service.name]))}
                                    id={i} type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor={i} className="font-[400] text-gray-900">
                                    {service.name}
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

                    <button disabled={imageLoading || updateLoading} type='submit' className="text-white bg-indigo-500 border-0 h-10 w-[120px] py-2 px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 font-semibold disabled:bg-indigo-400 rounded align-middle"> {imageLoading || updateLoading ? <SmallSpinner /> : "Update"}</button>
                </div>
            </form >
        </div>
    );
};

export default Update_entry_data;