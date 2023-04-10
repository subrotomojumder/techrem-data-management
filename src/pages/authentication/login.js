import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// import { googleLogin, loginUser } from '../../app/features/auth/authSlice';
// import { useRegisterMutation, useUserUpdateMutation } from '../../app/features/auth/authApi';
// import ResetPassword from '../../component/form/ResetPassword';
import registerImg from "../../assets/images/authentication.png";
import { SmallSpinner } from '@/components/Spinner';
import Link from 'next/link';
import Image from 'next/image';

const Login = () => {
    const { user, isLoading, isError, error } = {};
    const { register, handleSubmit, formState: { errors } } = useForm();
    
  
    const [reset, setReset] = useState(false);
    // const from = location.state?.from?.pathname || '/';

    const handleLogin = async (data) => {
        return console.log(data);
       
        // const results = await dispatch(loginUser(data));
        // if (!results.error) {
        //     const findEmail = await dispatch(getUser(results.payload.email));
        //     // console.log(findEmail)
        //     if (!findEmail.payload.success) {
        //         toast.error(findEmail.payload.message ? findEmail.payload.message : "this email not fond")
        //     } else {
        //         navigate(from, { replace: true });
        //         //    const update = await updateUser(data);
        //         // console.log(update)
        //     }
        // } else {
        //     toast.error(results.error.message)
        // }
    };
    const handleGoogleLogin = async () => {
    //     const results = await dispatch(googleLogin());
    //     if (!results.error) {
    //         const findEmail = await dispatch(getUser(results.payload.email));
    //         if (!findEmail.payload.success) {
    //             const res = await postUser({ name: results?.payload?.name, email: results?.payload?.email, userImage: results?.payload?.userImage, role: USER });
    //             if (res.data.success) {
    //                 // console.log(res.data.message)
    //                 navigate(from, { replace: true });
    //                 localStorage.setItem("tech_token", res.data.jwtToken);
    //                 toast.success(res.data?.message)
    //             } else {
    //                 toast.error(res?.message)
    //             }
    //         } else {
    //             navigate(from, { replace: true });
    //         }
    //     } else {
    //         toast.error(results.error.message);
    //     }
    };
    return (
        <div className='flex flex-col-reverse md:flex-row justify-center'>
            <Image width={600} height={100} className='mx-auto' src={registerImg} alt="" />
            <div className='w-full min-h-[70vh] px-4 md:px-0 py-6 lg:py-0 flex items-center mt-5'>
                <div className='shadow-2xl border rounded-md w-full max-w-lg mx-auto px-10 pt-12 pb-8'>
                    <h2 className='font-bold text-2xl mdd:text-3xl text-blue-600 mb-4'>Please Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="w-full mb-3">
                            <label htmlFor='email' className="font-semibold">Email</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email field is required!", pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address!"
                                    }
                                })}
                                placeholder="Enter your email"
                                id='email'
                                className="w-full text-lg text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-blue-700 border-blue-500 rounded-md"
                            />
                            {errors.email?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.email?.message}</p>}
                            {errors.email?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.email?.message}</p>}
                        </div>
                        <div className="w-full mb-4">
                            <label htmlFor='password' className="font-semibold">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password field is required!", minLength: { value: 6, message: "Password must be 6 characters!" },
                                    // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'Password must be strong!' }
                                })}
                                placeholder="Enter your password"
                                id='password'
                                className="w-full text-lg text-gray-800 bg-slate-200 py-2 px-3 mt-2 border focus:outline-blue-700 border-blue-500 rounded-md"
                            />
                            {errors.password?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.password?.message}</p>}
                            {errors.password?.type === 'minLength' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.password?.message}</p>}
                            {/* {errors.password?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm'>{errors.password?.message}</p>} */}
                        </div>
                        <div className='flex justify-between'>
                            <p className='text-blue-500 hover:underline hover:text-blue-700'><Link href="/register">Create a new account</Link></p>
                            <p onClick={() => setReset("Reset your account password")} className='text-blue-500 hover:underline hover:text-blue-700'>Reset Password</p>
                        </div>
                        <button type='submit' className='w-full bg-blue-700 hover:bg-blue-800 font-semibold text-white py-2 rounded-md hover:outline outline-green-600 mt-2'>
                            {isLoading ? <SmallSpinner /> : "Login"}
                        </button>
                    </form>
                    <div className='flex justify-center items-center mt-2 gap-1'>
                        <div className='bg-gray-500 h-[1px] w-full'></div>
                        <p>or</p>
                        <div className='bg-gray-500 h-[1px] w-full'></div>
                    </div>
                    <div className='flex justify-center gap-4 mt-4'>
                        <button><FaFacebook className='text-3xl text-green-500 hover:text-green-600' /></button>
                        <button onClick={handleGoogleLogin}><FaGoogle className='text-3xl text-green-500 hover:text-green-600' /></button>
                        <button><FaInstagram className='text-3xl text-green-500 hover:text-green-600' /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;