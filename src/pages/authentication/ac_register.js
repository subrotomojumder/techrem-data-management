import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { CustomLoader, SmallSpinner } from '@/components/Spinner';
import { ADMIN, BILLING_TEAM, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { useRegisterMutation } from '@/app/features/users/userApi';
import { errorSweetAlert, errorToast, successToast } from '@/utils/neededFun';
import { MdOutlineManageAccounts } from 'react-icons/md';
import Countries, { countries } from 'countries-list';
import axios from 'axios';
import { AdminProtect } from '@/utils/ProtectRoute';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { CityInput, CountryInput, StateInput } from '@/components/Forms/Inputs';

const Register = () => {
    const [loading, setLoading] = useState({ singleImg: false, multiImg: false, other: false });
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [password, setPassword] = useState('');
    const [preview, setPreview] = useState({});
    const [imgFiles, setImgFiles] = useState({});
    const [createSuccess, setCreateSuccess] = useState(null);
    const [addressInfo, setAddressInfo] = useState({});
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [userRegisterApi, { isLoading }] = useRegisterMutation();
    useEffect(() => {
        if (password) {
            reset(
                { password: password }
            );
        }
    }, [password]);
    const handleSignUp = async (data) => {
        if (!selectedCountry?.name) {
            return setAddressInfo({ ...addressInfo, countryErr: "Country select is required!" });
        } else setAddressInfo({ ...addressInfo, countryErr: "" });
        if (!selectedState?.name) {
            return setAddressInfo({ ...addressInfo, stateErr: "State select is required!" });
        } else setAddressInfo({ ...addressInfo, stateErr: "" });
        if (!selectedCity?.name) {
            return setAddressInfo({ ...addressInfo, cityErr: "City select is required!" });
        } else setAddressInfo({ ...addressInfo, cityErr: "" });
        data.userId = data.fast_name.toLowerCase().split(" ").join("") + data.last_name.toLowerCase().split(" ").join("") + Math.floor(Math.random() * 9000);
        data.address = { country: selectedCountry.name, state: selectedState.name, city: selectedCity.name, address_1: data.address1, address_2: data.address1, postcode: data.postcode };
        try {
            const formData = new FormData();
            const formData2 = new FormData();
            if (imgFiles.image) {
                setLoading(c => ({ ...c, singleImg: true }))
                formData.append('image', imgFiles.image);
                const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DEV}/img_upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Access-Control-Allow-Origin': `http://localhost:5000`,
                        'Access-Control-Allow-Credentials': 'true',
                        authorization: localStorage.getItem("tech_token"),
                    }
                });
                if (result.data?.file) {
                    setLoading(c => ({ ...c, singleImg: false }))
                    data.userImage = result.data.file;
                } else if (!result.success) {
                    setLoading(c => ({ ...c, singleImg: false }))
                    return errorToast("In valid user image!");
                } else {
                    setLoading(c => ({ ...c, singleImg: false }))
                    return console.log(result);
                }
            }
            if (imgFiles.document?.length) {
                setLoading(c => ({ ...c, multiImg: true }))
                for (let i = 0; i < imgFiles.document.length; i++) {
                    formData2.append('images', imgFiles.document[i]);
                };
                const result2 = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DEV}/img_upload/multipal`, formData2, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Access-Control-Allow-Origin': `http://localhost:5000`,
                        'Access-Control-Allow-Credentials': 'true',
                        authorization: localStorage.getItem("tech_token"),
                    }
                });
                if (result2.data?.files?.length) {
                    setLoading(c => ({ ...c, multiImg: false }))
                    data.document = result2.data?.files;
                } else if (!result2.success) {
                    setLoading(c => ({ ...c, multiImg: false }))
                    return errorToast("In valid Document!");
                } else {
                    setLoading(c => ({ ...c, multiImg: false }))
                    return console.log(result2);
                }
            }
            // return console.log(data);
            userRegisterApi(data).then(res => {
                if (res.data?.success) {
                    successToast(res.data?.message);
                    setCreateSuccess(res.data.data);
                    setPassword('')
                    setAddressInfo({});
                    setSelectedCountry(null);
                    setSelectedState(null);
                    setSelectedCity(null);
                    reset();
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
            })
        } catch (error) {
            return errorSweetAlert(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        }
    };
    const clipboardCopy = () => {
        navigator.clipboard.writeText(`Your accounts Id: ${createSuccess?.userId} and Password: ${createSuccess?.password}`);
        successToast("copy to clipboard!")
    }
    const generatePassword = (length) => {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~|}{[]\:;?></=";
        var password = "";
        for (var i = 0; i < length; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        setPassword(password);
    };
    if (isLoading || loading.multiImg || loading.singleImg || loading.other) {
        return <CustomLoader></CustomLoader>
    }
    return (
        <div className='min-h-[95vh] flex items-center justify-center py-4 md:py-8 px-2'>
            {createSuccess ?
                <div className="p-4  md:w-1/2 lg:w-1/3">
                    <div className="h-full bg-gray-100 bg-opacity-75 drop-shadow-md border px-4 pt-6 pb-10 rounded-lg overflow-hidden text-center relative">
                        <button onClick={() => setCreateSuccess(null)} className='absolute top-2 right-2 px-[10px] pb-1 bg-red-500 rounded-full  text-white text-xl'>x</button>
                        <h2 className="tracking-widest text-sm title-font underline font-medium text-gray-400 mb-2">ACCOUNTS</h2>
                        <p className='text-4xl w-fit mx-auto text-indigo-500'><MdOutlineManageAccounts /></p>
                        <h1 className="title-font text-base  text-gray-900">Name-{createSuccess?.name}</h1>
                        <h1 className="title-font text-base  text-gray-900 mb-2">Email-{createSuccess?.email}</h1>
                        <h1 className="title-font text-base font-medium text-green-500 mb-1">Id: {createSuccess?.userId}</h1>
                        <h1 className="title-font text-base font-medium text-gray-900 mb-1">Password: {createSuccess?.password}</h1>
                        <button
                            onClick={clipboardCopy}
                            className='border shadow-sm mt-6 px-2 py-1 rounded-md font-medium text-zinc-500 hover:text-zinc-600 active:border-gray-400'
                        >Copy to clip board!</button>
                    </div>
                </div>
                : <div className='relative shadow-2xl border md:rounded-lg max-w-3xl mx-auto bg-white px-10 lg:px-14 pt-8 pb-8'>
                    <div className='absolute right-11 top-7'>
                        <label htmlFor="image" className='block h-20 w-[4.375rem] rounded-md border-2 border-gray-500 bg-slate-300 hover:bg-green-200 text-center pt-6'>{preview?.imageLive ? "" : "Image"}</label>
                        <input
                            onChange={(e) => {
                                setImgFiles({ ...imgFiles, image: e.target.files[0] })
                                setPreview({ imageLive: window.URL.createObjectURL(e.target.files[0]), imageText: e.target.files[0].name })
                            }}
                            type="file"
                            accept='image/*'
                            id="image"
                            className='hidden'
                        />
                        {preview?.imageLive && <label htmlFor="image"><img src={preview.imageLive} className='block h-[76px] w-[66px] rounded-md absolute right-[2px] top-[2px]' alt='preview_img' /></label>}
                    </div>
                    <form onSubmit={handleSubmit(handleSignUp)} className='grid grid-cols-1 space-y-6'>
                        <h2 className='font-bold text-xl mdd:text-2xl text-blue-600 -mb-2'>Add New User</h2>
                        <p>Create a brand new user and add them to this site.</p>
                        <div className="relative grid grid-cols-1 md:grid-cols-7 gap-x-3 items-center">
                            <label htmlFor='first-name' className="leading-7 font-[600] text-gray-700 col-span-2">First Name (required)</label>
                            <div className='col-span-4 w-full'>
                                <input
                                    type="first-name"
                                    {...register("fast_name", { required: "First name is required!" })}
                                    placeholder="Enter first name" id='first-name'
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {errors.fast_name?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.fast_name?.message}</p>}
                            </div>
                        </div>
                        <div className="relative grid grid-cols-1 md:grid-cols-7 gap-x-3 items-center">
                            <label htmlFor='last_name' className="leading-7 font-[600] text-gray-700 col-span-2">Last Name (required)</label>
                            <div className='col-span-4 w-full'>
                                <input
                                    type="name"
                                    {...register("last_name", { required: "Last name is required!" })}
                                    placeholder="Enter last name" id='last_name'
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 md:py-[6px] px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {errors.last_name?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.last_name?.message}</p>}
                            </div>
                        </div>
                        <div className="relative grid grid-cols-1 md:grid-cols-7 gap-x-3 items-center">
                            <label htmlFor='email' className="leading-7 font-[600] text-gray-700 col-span-2">Email (required)</label>
                            <div className='col-span-4 w-full'>
                                <input
                                    {...register("email", {
                                        required: "Email field is required!", pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address!"
                                        }
                                    })}
                                    placeholder="Enter your email" id='email' type="email"
                                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 md:py-[6px]  px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                {errors.email?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.email?.message}</p>}
                                {errors.email?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.email?.message}</p>}
                            </div>
                        </div>
                        <div className="relative grid grid-cols-1 md:grid-cols-7 gap-x-3 items-center">
                            <label htmlFor='phone' className="leading-7 font-[600] text-gray-700 col-span-2">Contact Number</label>
                            <div className='col-span-4 w-full'>
                                <div className='w-full grid grid-cols-4'>
                                    <select
                                        {...register("country_code", {
                                            required: "Country code is required!"
                                        })}
                                        className="col-span-1 w-full bg-white rounded rounded-r-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 md:py-[6px]  text-center leading-8 transition-colors duration-200 ease-in-out" >
                                        <option className='w-10' value='' selected disabled>+ code</option>
                                        {Object.keys(countries).map((key, i) => (
                                            <option className='w-10' key={i} value={countries[key].phone}> {key + ' ' + countries[key].phone}</option>
                                        ))}
                                    </select>
                                    <input
                                        {...register("phone", {
                                            required: "phone number field is required!", minLength: { value: 7, message: "phone number must be 7 numeric!" },
                                        })}
                                        type="number" id='ph-number' placeholder='Enter phone number'
                                        className="col-span-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full bg-white rounded  rounded-l-none border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 md:py-[6px]  px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                </div>
                                {errors.country_code?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.country_code?.message}</p>}
                                {(!errors.country_code?.message && errors.phone?.type === 'required') && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.phone?.message}</p>}
                                {(!errors.country_code?.message && errors.phone?.type === 'minLength') && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.phone?.message}</p>}
                            </div>
                        </div>
                        <div className='w-full space-y-2 md:space-y-3'>
                            <div className="relative grid grid-cols-1 md:grid-cols-10 gap-x-3 items-center pt-6">
                                <label htmlFor='address1' className="leading-7 font-[600] text-gray-700 col-span-3 md:text-right">Address Line 1 :</label>
                                <input
                                    {...register("address1")} id='address1' type="text"
                                    className="col-span-7 w-full bg-white rounded-sm border border-gray-300 focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-[2px] md:py-1  px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <span className='col-span-3'></span>
                                <span className='col-span-7 text-sm text-zinc-700'>Street address, P.O. box, company name, c/o</span>
                            </div>
                            <div className="relative grid grid-cols-1 md:grid-cols-10 gap-x-3 items-center">
                                <label htmlFor='address2' className="leading-7 font-[600] text-gray-700 col-span-3 md:text-right">Address Line 2 :</label>
                                <input
                                    {...register("address2")} id='address2' type="text"
                                    className="col-span-7 w-full bg-white rounded-sm border border-gray-300 focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-[2px] md:py-1  px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <span className='col-span-3'></span>
                                <span className='col-span-7 text-sm text-zinc-700'>Apartment, suite, unit, building, floor, etc.</span>
                            </div>
                            <div className="relative grid grid-cols-1 md:grid-cols-10 gap-x-3 items-center">
                                <label htmlFor='country' className="leading-7 font-[600] text-gray-700 col-span-3 md:text-right">Country :</label>
                                <div className='col-span-7'>
                                    <CountryInput selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} wornClass={{ input: " w-full bg-white rounded-sm border border-gray-300 focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-[2px] md:py-1  px-3 leading-8 transition-colors duration-200 ease-in-out" }}></CountryInput>
                                    {!selectedCountry && <p role="alert" className='pl-4px text-red-500 text-sm -mb-1'>{addressInfo.countryErr}</p>}
                                </div>
                            </div>
                            <div className="relative grid grid-cols-1 md:grid-cols-10 gap-x-3 items-center">
                                <label htmlFor='state' className="leading-7 font-[600] text-gray-700 col-span-3 md:text-right">State/Province/Region :</label>
                                <div className='col-span-7 w-full'>
                                    <StateInput country={selectedCountry?.name || ""} selectedState={selectedState} setSelectedState={setSelectedState} wornClass={{ input: "w-full bg-white rounded-sm border border-gray-300  text-base outline-none text-gray-800 py-[2px] md:py-1  px-3 leading-8 transition-colors duration-200 ease-in-out focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200" }} />
                                    {!selectedState && <p role="alert" className='pl-4px text-red-500 text-sm -mb-1'>{addressInfo.stateErr}</p>}
                                    {/* <input
                                        {...register("state", {
                                            required: "State field is required!",
                                        })} id='state' type="text"
                                        className="w-full bg-white rounded-sm border border-gray-300  text-base outline-none text-gray-800 py-[2px] md:py-1  px-3 leading-8 transition-colors duration-200 ease-in-out focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200"
                                    />
                                    {errors.state?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-1'>{errors.state?.message}</p>} */}
                                </div>
                            </div>
                            <div className="relative grid grid-cols-1 md:grid-cols-10 gap-x-3 items-center">
                                <label htmlFor='city' className="leading-7 font-[600] text-gray-700 col-span-3 md:text-right">City :</label>
                                <div className='col-span-7 w-full'>
                                    <CityInput country={selectedCountry?.name || ""} state={selectedState?.name || ""} selectedCity={selectedCity} setSelectedCity={setSelectedCity} wornClass={{ input: "w-full bg-white rounded-sm border border-gray-300 focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-[2px] md:py-1  px-3 leading-8 transition-colors duration-200 ease-in-out" }} />
                                    {!selectedCity && <p role="alert" className='pl-4px text-red-500 text-sm -mb-1'>{addressInfo.cityErr}</p>}
                                    {/* <input
                                        {...register("city", {
                                            required: "City field is required!",
                                        })} id='city' type="text"
                                        className="w-full bg-white rounded-sm border border-gray-300 focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-[2px] md:py-1  px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    {errors.city?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-1'>{errors.city?.message}</p>} */}
                                </div>
                            </div>
                            <div className="relative grid grid-cols-1 md:grid-cols-10 gap-x-3 items-center">
                                <label htmlFor='postcode' className="leading-7 font-[600] text-gray-700 col-span-3 md:text-right">ZIP/Postal code :</label><div className='col-span-7 w-full'>
                                    <input
                                        {...register("postcode", {
                                            required: "ZIP/Postal code required!",
                                        })} id='postcode' type="number"
                                        className="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-white rounded-sm border border-gray-300 focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-[2px] md:py-1  px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    />
                                    {errors.postcode?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-1'>{errors.postcode?.message}</p>}
                                </div>
                            </div>
                            <div className="relative grid grid-cols-1 md:grid-cols-10 gap-x-3 items-center">
                                <label htmlFor='Document' className="leading-7 font-[600] text-gray-700 col-span-3 md:text-right">Documents :</label>
                                <input
                                    onChange={(e) => setImgFiles({ ...imgFiles, document: e.target.files })} id='document' type="file" multiple
                                    className="col-span-7 w-full bg-white rounded-sm border border-gray-300 focus:border-zinc-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-[0px] md:py-[2px]  px-3 leading-8 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative grid grid-cols-1 md:grid-cols-7 gap-x-3 pt-6">
                                <label htmlFor='' className="leading-7 font-[600] text-gray-700 col-span-2">Password *</label>
                                <div className="col-span-4">
                                    <p onClick={() => generatePassword(10)} className="w-[60%] mb-4 py-[6px] rounded-md cursor-pointer select-none bg-orange-300 hover:bg-orange-400 active:outline outline-2 outline-indigo-400 font-semibold text-white flex justify-center items-center duration-75">
                                        Generate Password
                                    </p>
                                    <div className='w-full flex justify-between gap-1'>
                                        <div className='w-full'>
                                            <input
                                                type={addressInfo.showPass ? 'text' : "password"}
                                                {...register("password", {
                                                    required: "Strong password is required!", minLength: { value: 6, message: "Password must be 6 characters!" },
                                                })} readOnly
                                                className="w-full text-base text-gray-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-none border-blue-500 rounded-md"
                                            />
                                            <p className="w-full mt-0.5 py-1 rounded-sm cursor-pointer select-none bg-green-400 font-semibold text-white flex justify-center items-center duration-75">
                                                Strong
                                            </p>
                                        </div>
                                        <p onClick={() => setAddressInfo(c => ({ ...c, showPass: !c.showPass && true }))} className="h-fit text-base font-medium text-gray-600 cursor-pointer bg-slate-100 select-none py-[6px] pl-1 pr-2 mt-1 border focus:outline-none border-zinc-200 rounded-md duration-75 flex justify-center items-center gap-1">
                                            {addressInfo.showPass ? <BsEye className='inline' /> : < BsEyeSlash className='inline' />} Hide
                                        </p>
                                    </div>
                                    {errors.password?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.password?.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="relative grid grid-cols-1 md:grid-cols-7 gap-x-3 items-center">
                            <label htmlFor='role' className="leading-7 font-[600] text-gray-700 col-span-2">User role (required)</label>
                            <div className='col-span-3 w-full'>
                                <select
                                    {...register("role", {
                                        required: "Employee role select required!"
                                    })}
                                    name='role' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 md:py-[6px]  px-3 leading-8 transition-colors duration-200 ease-in-out"
                                >
                                    <option value='' selected disabled >Select role</option>
                                    <option value={ADMIN}>Admin</option>
                                    <option value={MARKETER}>Marketing Manager</option>
                                    <option value={TELE_MARKETER}>Telemarketer</option>
                                    <option value={DATA_ENTRY_OPERATOR}>Data entire operator</option>
                                    <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                                    <option value={BILLING_TEAM}>Billing Team</option>
                                </select>
                                {errors.role?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.role?.message}</p>}
                            </div>
                        </div>
                        <div className="relative grid grid-cols-1 md:grid-cols-7 gap-x-3 items-center">
                            <label htmlFor='' className="leading-7 font-[600] text-gray-700 col-span-2">Send User Notification</label>
                            <div className="col-span-5 flex items-center">
                                <input
                                    {...register("email_send")}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <span className='leading-7 font-[500] text-gray-500 ml-1'>Send the new user an email about there account. </span>
                            </div>
                        </div>
                        <button
                            type='submit' disabled={isLoading}
                            className={`w-[190px] py-2 rounded-md disabled:bg-blue-500 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 active:outline outline-green-600  disabled:outline-none font-semibold text-white text-center`}
                        >
                            Add New User
                        </button>
                    </form>
                </div >}
        </div >
    );
};

export default AdminProtect(Register);