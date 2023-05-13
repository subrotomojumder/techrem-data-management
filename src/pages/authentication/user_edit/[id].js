import { useGetEmployeeByIdQuery, useUserUpdateMutation } from '@/app/features/users/userApi';
import { LargeSpinner, SmallSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute';
import { multipartHeaders } from '@/utils/headers';
import { errorToast, successToast } from '@/utils/neededFun';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPenAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

const UpdateProfile = () => {
    const router = useRouter();
    const [editField, setEditField] = useState({});
    const [imageLoading, setImageLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const { data, isLoading: isDbLoading, isError, error } = useGetEmployeeByIdQuery(router.query?.id);
    const [updateUser, { isLoading }] = useUserUpdateMutation();
    const handleUpdate = async (event) => {
        event.preventDefault();
        const form = event.target;
        const updateData = {
            _id: data.data._id,
            name: form.name?.value,
            phone: form.phone?.value,
            userBio: form.userBio?.value,
            country_code: form.country_code.value,
            address: {
                country: form.country.value,
                state: form.state.value,
                city: form.city.value
            }
        }
        try {
            const formData = new FormData();
            const formData2 = new FormData();
            if (form.image?.files[0]) {
                setImageLoading(true);
                formData.append('image', form.image.files[0]);
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
                    updateData.userImage = result.data.file;
                } else {
                    setImageLoading(false);
                    return console.log(result);
                }
            }
            if (form.document?.files?.length) {
                setImageLoading(true);
                for (let i = 0; i < form.document?.files?.length; i++) {
                    formData2.append('images', form.document?.files[i]);
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
                    setImageLoading(false);
                    updateData.document = result2.data?.files;
                } else {
                    setImageLoading(false);
                    return console.log(result2);
                }
            }
            // return console.log(updateData);
            updateUser(updateData)
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Account data update success!")
                        setEditField({});
                    } else {
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
                });
        } catch (error) {
            // console.log(error);
            errorToast(error.message === "Network Error" ? "Please check your internet connection!" : error.message)
        }
    }
    if (!router.query?.id) {
        return <LargeSpinner></LargeSpinner>
    }
    if (isDbLoading) {
        return <LargeSpinner></LargeSpinner>
    }
    if (isError) {
        if (error.error) {
            return <h4 className='text-center mt-10 md:mt-20'>{error.error}</h4>
        } else if (error.data?.message) {
            return <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    };
    if (!data?.success) {
        return <div className='text-center mt-10 md:mt-52'>
            <p className="text-2xl text-red-500">Something went wrong!</p>
        </div>
    }
    // এই কনস্ট্যান্ট এখানে থাকতে হবে না হলে লোডিং হওয়ার আগের ডাটা রিড করতে গেলে এরর আসবে
    const { email, fast_name, last_name, address, country_code, userId, phone, role, userBio, updatedAt, userImage, document, _id } = data?.data;

    return (
        <div className='max-w-[1100px] xl:max-w-[1500px] mx-auto'>
            <form
                onSubmit={handleUpdate}
            >
                <div className='w-full grid grid-cols-1 mdd:grid-cols-3 gap-2 p-3 mt-0 xl:mt-5'>
                    <div className='col-span-1 h-fit bg-gray-200 border rounded-md px-0 xl:px-10'>
                        <div className='text-center relative'>
                            <figure className='pt-4 relative'>
                                <img className='rounded-full w-[50%] max-w-[150px] mx-auto border-2 border-blue-500 p-[2px]' src={previewImage || userImage || demoUser} alt="" />
                                <input
                                    onChange={(e) => setPreviewImage(window.URL.createObjectURL(e.target.files[0]))}
                                    onClick={() => setEditField({ ...editField, upBtn: true })}
                                    type="file" className='hidden' name="image" accept='image/*' id="image"
                                />
                                <label htmlFor="image">
                                    <div className='absolute right-1/4 bottom-2 bg-gray-200 rounded-full p-2 border border-red-300 hover:bg-green-200 group'><FaPenAlt className='text-gray-600 group-hover:text-gray-700' /></div>
                                </label>
                            </figure>
                            <h2 className='text-2xl mdd:text-xl lg:text-2xl mt-1 font-serif px-1 lg:px-4'>{name}</h2>
                            <h5 className='font-medium text-lg mdd:text-sm lg:text-lg mb-1'>{email}</h5>
                            <div className=' bg-blue-300 py-1'>
                                <h4 className='font-semibold text-sm mb-1 capitalize'>Position: {role}</h4>
                                <h5 className='font-bold text-xs text-gray-500'>UID: {userId}</h5>
                            </div>
                            <h5 className='text-sm mb-1'>Last updated: {new Date(updatedAt).toLocaleString()}</h5>
                        </div>
                        <hr className='bg-blue-400 h-[2px] mt-4 mx-4' />
                        {/* <div className='mx-4 mt-1'>
                            <h4 className='text-lg'>Bio</h4>
                            <p className='p-2 mb-4 border-black min-h-[60px] rounded-md bg-gray-100'>{userBio}</p>
                        </div> */}
                    </div>
                    <div className='col-span-2 border rounded-md'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-xl xl:text-2xl text-green-600  px-0 xl:px-10 my-3 ml-4'>Account Details</h3>
                            {editField.upBtn && <div className='flex justify-center gap-1 mr-3'>
                                <div onClick={() => setEditField({})} className='px-8 py-1 mx-auto block border border-yellow-400 font-semibold text-yellow-500 select-none rounded-md hover:text-white hover:bg-yellow-400'>Cancel</div>
                                <button disabled={isLoading || imageLoading} type='submit' className='px-8 py-1 w-28 mx-auto block bg-blue-700 active:outline outline-green-500 active:text-yellow-400 font-semibold text-white rounded-md hover:bg-blue-800'>{(isLoading || imageLoading) ? <SmallSpinner /> : "Update"}</button>
                            </div>}
                        </div>
                        <hr />
                        <div className='mx-4 mt-3  px-0 xl:px-10 pb-3'>
                            <div className='grid grid-cols-2 gap-4'>
                                <div className="w-full relative">
                                    <label htmlFor='full-name' className="">First name</label>
                                    <input
                                        readOnly={!editField.fast_name}
                                        defaultValue={fast_name}
                                        type="text" name='name'
                                        className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-gray-600 border-blue-500 rounded-sm"
                                    />
                                    <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, first_name: true, upBtn: true })} /></p>
                                </div>
                                <div className="w-full relative">
                                    <label htmlFor='full-name' className="">Last name</label>
                                    <input
                                        readOnly={!editField.last_name}
                                        defaultValue={last_name}
                                        type="text" name='text'
                                        className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-gray-600 border-blue-500 rounded-sm"
                                    />
                                    <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, last_name: true, upBtn: true })} /></p>
                                </div>
                                <div className="w-full relative">
                                    <label htmlFor='phone' className="">Phone</label>
                                    <div className='grid grid-cols-4'>
                                        <input
                                            readOnly={!editField.phone}
                                            defaultValue={country_code}
                                            type="text" name="country_code"
                                            className="col-span-1 w-full text-gray-800 font-medium py-2 px-2 text-center mt-2 border focus:outline-gray-600 border-blue-500 rounded-sm"
                                        />
                                        <input
                                            readOnly={!editField.phone}
                                            defaultValue={phone}
                                            type="number" name="phone"
                                            className="col-span-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-gray-600 border-blue-500 rounded-sm"
                                        />
                                    </div>
                                    <p className='absolute top-[38px] left-2 text-lg font-medium'>+</p>
                                    <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, phone: true, upBtn: true })} /></p>
                                </div>
                                <div className="w-full relative">
                                    <label htmlFor='email' className="">Your Email</label>
                                    <input
                                        defaultValue={email} readOnly
                                        type="text" name="email"
                                        className="w-full text-gray-800 font-medium py-2 px-3 mt-2 border focus:outline-gray-600 border-blue-500 rounded-sm"
                                    />
                                    {/* <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, email: true })} /></p> */}
                                </div>
                                <div className='col-span-2 w-full grid grid-cols-3 gap-2'>
                                    <div className="w-full relative">
                                        <label htmlFor='password' className="">Password</label>
                                        <div
                                            className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border border-blue-100 rounded-sm"
                                        >
                                            <p>Password change N/A</p>
                                        </div>
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor='password' className="">Password</label>
                                        <div
                                            className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border border-blue-100 rounded-sm"
                                        >
                                            <p>Password change N/A</p>
                                        </div>
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor='password' className="">Password</label>
                                        <div
                                            className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border border-blue-100 rounded-sm"
                                        >
                                            <p>Password change N/A</p>
                                        </div>
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor='country' className="">County</label>
                                        <input
                                            readOnly={!editField.country}
                                            defaultValue={address?.country}
                                            type="text" name="country"
                                            className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-gray-600 border-blue-500 rounded-sm"
                                        />
                                        <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, country: true, upBtn: true })} /></p>
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor='state' className="">State</label>
                                        <input
                                            readOnly={!editField.state}
                                            defaultValue={address?.state}
                                            type="text" name="state"
                                            className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-gray-600 border-blue-500 rounded-sm"
                                        />
                                        <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, state: true, upBtn: true })} /></p>
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor='city' className="">City</label>
                                        <input
                                            readOnly={!editField.city}
                                            defaultValue={address?.city}
                                            type="text" name="city"
                                            className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-gray-600 border-blue-500 rounded-sm"
                                        />
                                        <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, city: true, upBtn: true })} /></p>
                                    </div>
                                </div>
                                <div className="w-full relative col-span-2">
                                    <label htmlFor='' className="">Additional Bio data</label>
                                    <textarea
                                        readOnly={!editField.userBio}
                                        defaultValue={userBio}
                                        type="text" name="userBio"
                                        className="w-full min-h-[100px] text-gray-800 py-2 pl-3 pr-7 mt-2 border focus:outline-gray-600 border-blue-500 rounded-md"
                                    />
                                    <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, userBio: true, upBtn: true })} /></p>
                                </div>
                            </div>
                            <div className='mt-2 pb-8 relative'>
                                <p>Other documents:</p>
                                <div className='grid grid-cols-3 gap-3'>
                                    {document.length > 0 && document.map((img, i) => <Image key={i} width={1000} height={1000} src={img} alt='Company Logo'></Image>)}
                                </div>
                                <input
                                    onClick={() => setEditField({ ...editField, upBtn: true })}
                                    className='hidden' type="file" accept='image/*' multiple name="document" id="document"
                                />
                                <label className='absolute bottom-2 left-[43%] bg-blue-400 rounded-2xl text-white border-2 border-gray-200 px-3 py-1 font-medium cursor-pointer drop-shadow-lg' htmlFor="document">
                                    upload document
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Private(UpdateProfile);