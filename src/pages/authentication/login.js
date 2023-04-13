import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import registerImg from "../../assets/images/authentication.png";
import { SmallSpinner } from '@/components/Spinner';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/app/features/users/userSlice';
import { useRouter } from 'next/router';
import { errorToast, successToast } from '@/utils/neededFun';

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user, isLoading, isError, error } = useSelector((state) => state.auth);
    const router = useRouter();
    const dispatch = useDispatch();
    const from = router.query.redirect || '/';

    // console.log(user, isLoading, isError, error);
    const handleLogin = async (data) => {
        dispatch(getUser(data)).then(res => {
            console.log(res);
            if (res.error?.message) {
                errorToast(res.error.message);
            }
            if (res?.payload?.success) {
                successToast("Your account login success!")
                localStorage.setItem("tech_token", res.payload.jwtToken);
                reset();
                router.replace(from);
            } else if (res.payload?.success === false) {
                errorToast(res.payload?.message)
            }
        })
    };
    return (
        <div className='min-h-[80vh] flex flex-col-reverse md:flex-row justify-center items-center'>
            <Image width={200} height={70} className='mx-auto' src={registerImg} alt="" />
            <div className='shadow-2xl border rounded-md w-full max-w-md md:-ml-20 lg:-ml-40 mt-4 mx-auto px-10 pt-6 pb-8 h-fit'>
                <h2 className='font-bold text-2xl mdd:text-3xl text-blue-600 mb-4'>Please Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="w-full mb-3">
                        <label htmlFor='email' className="font-semibold">Your email *</label>
                        <input
                            {...register("email", {
                                required: "Email field is required!", pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address!"
                                }
                            })}
                            placeholder="Enter your email" type="email" id='email'
                            className="w-full text-lg text-gray-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        {errors.email?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.email?.message}</p>}
                        {errors.email?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.email?.message}</p>}
                    </div>
                    <div className="w-full mb-3">
                        <label htmlFor='id' className="font-semibold">Account Id *</label>
                        <input
                            {...register("userId", { required: "Account id is required!" })}
                            placeholder="Enter your user Id" id='id' type="text"
                            className="w-full text-lg text-gray-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        {errors.userId?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.userId?.message}</p>}
                    </div>
                    <div className="w-full mb-4">
                        <label htmlFor='password' className="font-semibold">Account Password *</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password field is required!", minLength: { value: 6, message: "Password must be 6 characters!" },
                                // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'Password must be strong!' }
                            })}
                            placeholder="Enter your password"
                            id='password'
                            className="w-full text-lg text-gray-800 bg-slate-200 py-2 px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                        />
                        {errors.password?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.password?.message}</p>}
                        {errors.password?.type === 'minLength' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-3'>{errors.password?.message}</p>}
                        {/* {errors.password?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.password?.message}</p>} */}
                    </div>
                    <div className='flex justify-end'>
                        {/* onClick={() => setReset("Reset your account password")} */}
                        <p className='text-blue-500 hover:underline hover:text-blue-700 cursor-pointer'>Reset Password</p>
                    </div>
                    <button disabled={isLoading} type='submit' className='w-full py-2 rounded-md mt-1 disabled:bg-blue-500 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 active:outline outline-green-600  disabled:outline-none font-semibold text-white flex justify-center items-center'>
                        {isLoading ? <SmallSpinner /> : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;