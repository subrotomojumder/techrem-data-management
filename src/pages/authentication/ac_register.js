import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { CustomLoader, SmallSpinner } from '@/components/Spinner';
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { useRegisterMutation } from '@/app/features/users/userApi';
import { errorToast, successToast } from '@/utils/neededFun';
import { MdOutlineManageAccounts } from 'react-icons/md';
import Countries from 'countries-list';
import AddressAddForm from '@/components/Forms/AddressAddForm';
import { multipartHeaders } from '@/utils/headers';
import axios from 'axios';
import { AdminProtect } from '@/utils/ProtectRoute';

const Register = () => {
    const [loading, setLoading] = useState({ singleImg: false, multiImg: false, other: false });
    const [preview, setPreview] = useState({});
    const [imgFiles, setImgFiles] = useState({});
    const [createSuccess, setCreateSuccess] = useState(null);
    const [addressInfo, setAddressInfo] = useState({});
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [userRegisterApi, { isLoading }] = useRegisterMutation();

    const handleSignUp = async (data) => {
        if (!addressInfo.country || !addressInfo.state || !addressInfo.city) {
            return setAddressInfo({ ...addressInfo, addrErr: "All address is required!" })
        } else setAddressInfo({ ...addressInfo, addrErr: "" });
        const address = addressInfo;
        data.address = address;
        try {
            const formData = new FormData();
            const formData2 = new FormData();
            if (imgFiles.image) {
                setLoading(c=> ({...c, singleImg: true}))
                formData.append('image', imgFiles.image);
                const result = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_DEV}/img_upload`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'Access-Control-Allow-Origin': `http://localhost:5000`,
                        'Access-Control-Allow-Credentials': 'true',
                        authorization: localStorage.getItem("tech_token"),
                    }
                });
                console.log(result);
                if (result.data?.file) {
                    setLoading(c=> ({...c, singleImg: false}))
                    data.userImage = result.data.file;
                } else if (!result.success) {
                    setLoading(c=> ({...c, singleImg: false}))
                    return console.log(result);
                } else {
                    setLoading(c=> ({...c, singleImg: false}))
                    return console.log(result);
                }
            }
            if (imgFiles.document?.length) {
                setLoading(c=> ({...c, multiImg: true}))
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
                    setLoading(c=> ({...c, multiImg: false}))
                    data.document = result2.data?.files;
                } else if (!result2.success) {
                    setLoading(c=> ({...c, multiImg: false}))
                    return console.log(result2);
                } else {
                    setLoading(c=> ({...c, multiImg: false}))
                    return console.log(result2);
                }
            }
            // return console.log(data);
            userRegisterApi(data).then(res => {
                if (res.data?.success) {
                    successToast(res.data?.message);
                    setCreateSuccess(res.data.data);
                    setAddressInfo({});
                    reset();
                } else {
                    console.log(res);
                    if (res.error) {
                        if (res.error?.message) {
                            return errorToast(res.error.message);
                        }
                        if (res.error?.error) {
                            return errorToast(res.error.error);
                        }
                        if (res?.error?.data?.message) {
                            return errorToast(res.error?.data.dev_error || res.error?.data.message);
                        }
                    } else if (res.data?.message) {
                        errorToast(res?.data.message);
                    }
                }
            })
        } catch (error) {
            return errorToast(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        }
    };
    const clipboardCopy = () => {
        navigator.clipboard.writeText(`Your accounts Id: ${createSuccess?.userId} and Password: ${createSuccess?.password}`);
        successToast("copy to clipboard!")
    }

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
                : <div className='relative shadow-2xl border rounded-lg max-w-3xl mx-auto px-10 pt-12 pb-8'>
                    <h2 className='font-bold text-2xl mdd:text-3xl text-blue-600 mb-4'>Register account</h2>
                    <form onSubmit={handleSubmit(handleSignUp)} className='grid grid-cols-1 md:grid-cols-2 gap-x-3'>
                        <div className='w-full'>
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
                            {errors.userImage?.type === 'required' && <p role="alert" className='absolute right-5 text-sm top-[105px]'>{errors.userImage?.message}</p>}
                            <div className="w-full mb-2">
                                <label htmlFor='name' className="font-semibold text-sm">Name</label>
                                <input
                                    type="name"
                                    {...register("name", { required: "Name field is required!" })}
                                    placeholder="Enter your name"
                                    id='name'
                                    className="w-full text-base text-gray-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                />

                                {errors.name?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.name?.message}</p>}
                            </div>
                            <div className="w-full mb-2">
                                <label htmlFor='email' className="font-semibold text-sm">Email</label>
                                <input
                                    {...register("email", {
                                        required: "Email field is required!", pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address!"
                                        }
                                    })}
                                    placeholder="Enter your email" id='email' type="email"
                                    className="w-full text-base text-gray-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                />
                                {errors.email?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.email?.message}</p>}
                                {errors.email?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.email?.message}</p>}
                            </div>
                            <div className="w-full mb-2">
                                <label htmlFor='phone' className="font-semibold text-sm">Phone Number</label>
                                <div className='col-span-4 grid grid-cols-4'>
                                    <select
                                        {...register("country_code", {
                                            required: "Country code is required!"
                                        })}
                                        className="col-span-1 w-full rounded-md rounded-r-none text-base text-gray-800 bg-slate-200 py-[6px] text-center mt-1 border focus:outline-blue-700 border-blue-500" >
                                        <option className='w-10' value='' selected disabled>+ code</option>
                                        {Object.keys(Countries.countries).map((key, i) => (
                                            <option className='w-10' key={i} value={Countries.countries[key].phone}> {key + ' ' + Countries.countries[key].phone}</option>
                                        ))}
                                    </select>
                                    <input
                                        {...register("phone", {
                                            required: "phone number field is required!", minLength: { value: 7, message: "phone number must be 7 numeric!" },
                                            // pattern: { value: /^(0|[1-9]\d*)(e-?(0|[1-9]\d*))?$/i, message: "Phone numbers must be numeric!" }
                                        })}
                                        type="number" id='ph-number' placeholder='Enter phone number'
                                        className="col-span-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full rounded-md rounded-l-none text-base text-gray-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500"
                                    />
                                </div>
                                {errors.country_code?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.country_code?.message}</p>}
                                {(!errors.country_code?.message && errors.phone?.type === 'required') && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
                                {(!errors.country_code?.message && errors.phone?.type === 'minLength') && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
                                {(!errors.country_code?.message && errors.phone?.type === 'pattern') && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
                            </div>
                            <div className="w-full mb-2">
                                <label htmlFor='role' className="font-semibold text-sm">Employee role</label>
                                <select
                                    {...register("role", {
                                        required: "Employee role select required!"
                                    })}
                                    name='role' className="w-full text-base text-gray-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                >
                                    <option value='' selected disabled >Select role</option>
                                    <option value={ADMIN}>Admin</option>
                                    <option value={MARKETER}>Marketer</option>
                                    <option value={TELE_MARKETER}>Telemarketer</option>
                                    <option value={DATA_ENTRY_OPERATOR}>Data entire operator</option>
                                    <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                                </select>
                                {errors.role?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.role?.message}</p>}
                            </div>
                            <div className="w-full mb-2">
                                <label htmlFor='password' className="font-semibold text-sm">Password</label>
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password field is required!", minLength: { value: 6, message: "Password must be 6 characters!" },
                                        // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'Password must be strong!' }
                                    })}
                                    placeholder="Enter your password"
                                    id='password'
                                    className="w-full text-base text-gray-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                />
                                {errors.password?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.password?.message}</p>}
                                {errors.password?.type === 'minLength' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.password?.message}</p>}
                                {errors.password?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.password?.message}</p>}
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className="w-full mb-3">
                                <label htmlFor='phone' className="font-semibold text-sm">Document</label>
                                <input
                                    onChange={(e) => setImgFiles({ ...imgFiles, document: e.target.files })} id='document' type="file" multiple
                                    className="w-full text-base text-gray-800 bg-slate-200 py-[3.5px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                />
                                {/* {errors.phone?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
                                {errors.phone?.type === 'minLength' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>} */}
                            </div>
                            <div className="relative">
                                <AddressAddForm addressValue={addressInfo} setAddressValue={setAddressInfo} classes={{ label: "text-sm font-semibold block mt-2" }} />
                                {addressInfo.addrErr && <p role="alert" className='col-span-6 pl-4px text-red-600 text-sm text-right mr-5'>{addressInfo.addrErr}</p>}
                            </div>
                        </div>
                        <button
                            type='submit' disabled={isLoading}
                            className={`w-full py-2 rounded-md mt-1 disabled:bg-blue-500 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 active:outline outline-green-600  disabled:outline-none font-semibold text-white flex justify-center items-center`}
                        >
                            REGISTER
                        </button>
                    </form>
                </div >}
        </div >
    );
};

export default AdminProtect(Register);