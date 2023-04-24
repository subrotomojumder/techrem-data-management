import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { SmallSpinner } from '@/components/Spinner';
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { useRegisterMutation } from '@/app/features/users/userApi';
import { errorToast, successToast } from '@/utils/neededFun';
import { MdOutlineManageAccounts } from 'react-icons/md';
import Countries from 'countries-list';
import AddressAddForm from '@/components/Forms/AddressAddForm';

const Register = () => {
    const [preview, setPreview] = useState({});
    const [imgFile, setImgFile] = useState({});
    const [createSuccess, setCreateSuccess] = useState(null);
    const [addressInfo, setAddressInfo] = useState({});
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [userRegister, { isLoading }] = useRegisterMutation();

    const handleSignUp = async (data) => {
        if (!addressInfo.country || !addressInfo.state || !addressInfo.city) {
            return setAddressInfo({ ...addressInfo, addrErr: "All address is required!" })
        } else setAddressInfo({ ...addressInfo, addrErr: "" });
        const address = addressInfo;
        data.address = address;
        // delete data.userImage;
        // const formData = new FormData();
        // formData.append('image', imgFile);
        try {
            // const result = await axios.post(`${process.env.REACT_APP_DEV_URL}/img`,
            //     formData,
            //     {
            //         headers: multipartHeaders
            //     })
            // if (result.data.file) { 
            setAddressInfo({ ...addressInfo, post: true }); 
            userRegister(data).then(res => {
                if (res.data?.success) {
                    successToast(res.data?.message);
                    setCreateSuccess(res.data.data);
                    setAddressInfo({});
                    reset();
                } else {
                    // console.log(res);
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
            errorToast(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        }
    };
    const clipboardCopy = () => {
        navigator.clipboard.writeText(`Your accounts Id: ${createSuccess?.userId} and Password: ${createSuccess?.password}`);
        successToast("copy to clipboard!")
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
                                        setImgFile(e.target.files[0])
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
                                <input
                                    {...register("phone", {
                                        required: "phone number field is required!", minLength: { value: 10, message: "phone number must be 10 numeric!" },
                                    })}
                                    placeholder="Enter phone" id='phone' type="text"
                                    className="w-full text-base text-gray-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                />
                                {errors.phone?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
                                {errors.phone?.type === 'minLength' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
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
                                    id='document' type="file" multiple
                                    className="w-full text-base text-gray-800 bg-slate-200 py-[3.5px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                                />
                                {errors.phone?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
                                {errors.phone?.type === 'minLength' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
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
                            {isLoading ? <SmallSpinner /> : "REGISTER"}
                        </button>
                    </form>
                </div >}
        </div >
    );
};

export default Register;