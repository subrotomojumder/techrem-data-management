import React, { useEffect } from 'react';
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { SmallSpinner } from '@/components/Spinner';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Register = () => {
    const [preview, setPreview] = useState({});
    const [imgFile, setImgFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // const dispatch = useDispatch();
    // const { user, isLoading, isError, error } = useSelector((state) => state.auth);
    // const [postUser, { isSuccess, isError: isPostError, error: postError }] = useRegisterMutation();
    // const { dbUser, isLoading: isDbLoading, isError: isDbError, error: dbError } = useSelector((state) => state.dbAuth);
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const term = useWatch({ control, name: "term" });
    const handleSignUp = async (data) => {
        console.log(data);
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
            // const results = await dispatch(createUser(data));
            // if (!results.error) {
            //             const res = await postUser({ name: data.name, email: data.email, password: data.password, userImage: result.data.file, role: USER });
            //             if (res.data.success) {
            //                 localStorage.setItem("tech_token", res.data.jwtToken);
            //                 toast.success(res.data?.message);
            //             } else {
            //                 toast.error(res?.message);
            //             }
            //         } else {
            //             toast.error(results.error.message);
            //         }
            //     }
        } catch (error) {
            toast.error(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        }
    };
    return (
            <div className='flex items-center justify-center py-4 px-2'>
                <div className='relative shadow-2xl border rounded-lg w-full max-w-lg mx-auto px-10 pt-12 pb-8'>
                    <h2 className='font-bold text-2xl mdd:text-3xl text-blue-600 mb-4'>Register account</h2>
                    <form onSubmit={handleSubmit(handleSignUp)}>
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
                            <label htmlFor='district' className="font-semibold text-sm">Employee district</label>
                            <input
                                {...register("district", {
                                    required: "District field is required!"
                                })}
                                placeholder="Employee district" id='district' type="text"
                                className="w-full text-base text-gray-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                            />
                            {errors.phone?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
                            {errors.phone?.type === 'minLength' && <p role="alert" className='pl-4px text-red-500 text-sm -mb-2'>{errors.phone?.message}</p>}
                        </div>
                        <div className="w-full mb-2">
                            <label htmlFor='role' className="font-semibold text-sm">Employee role</label>
                            <select
                                {...register("role", { required: "Employee role is required!" })}
                                defaultValue='data-entire' name='role' className="w-full text-base text-gray-800 bg-slate-200 py-[6px] px-3 mt-1 border focus:outline-blue-700 border-blue-500 rounded-md"
                            >
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="telemarketer">Telemarketer</option>
                                <option value="data-entire">Data entire</option>
                                <option value="field-marketer">Field Marketer</option>
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
                        <button
                            type='submit'
                            className={`w-full py-2 rounded-md mt-1 bg-blue-700 hover:bg-blue-800 active:outline outline-green-600 font-semibold text-white`}
                        >
                            {/* {isLoading ? <SmallSpinner /> : "Register"} */}Register
                        </button>
                    </form>
                </div>
            </div>
    );
};

export default Register;