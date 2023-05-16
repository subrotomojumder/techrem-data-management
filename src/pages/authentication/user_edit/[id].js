import { useGetEmployeeByIdQuery, useUserUpdateMutation } from '@/app/features/users/userApi';
import { LargeSpinner, SmallSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute';
import { ADMIN, BILLING_TEAM, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { multipartHeaders } from '@/utils/headers';
import { errorToast, successToast } from '@/utils/neededFun';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaPenAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Countries, { countries } from 'countries-list';
import demoUser from '../../../assets/images/demo_user.jpg';
import { CityInput, CountryInput, StateInput } from '@/components/Forms/Inputs';

const UpdateProfile = () => {
    const router = useRouter();
    const [editField, setEditField] = useState({});
    const [userStatus, setUserStatus] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const { data, isLoading: isDbLoading, isError, error } = useGetEmployeeByIdQuery(router.query?.id);
    const { user: executor } = useSelector((state) => state.auth)
    const [updateUser, { isLoading }] = useUserUpdateMutation();
    useEffect(() => {
        if (data?.success) {
            setUserStatus(data.data.status.active);
            setSelectedCountry({ name: data.data.address.country })
            setSelectedState({ name: data.data.address.state })
            setSelectedCity({ name: data.data.address.city })
        }
    }, [data])
    const handleUpdate = async (event) => {
        event.preventDefault();
        const form = event.target;
        const updateData = {
            _id: data.data._id,
            fast_name: form.fast_name?.value,
            last_name: form.last_name?.value,
            phone: form.phone?.value,
            role: form.role?.value,
            'status.active': userStatus,
            userBio: form.userBio?.value,
            country_code: form.country_code.value,
            address: {
                country: selectedCountry.name,
                state: selectedState.name,
                city: selectedCity.name
            }
        }
        //    return console.log(updateData)
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
    const generatePassword = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't resend new password!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Resend'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV}/user/update_password`, {
                        method: "PUT",
                        body: JSON.stringify({
                            reset_password: true,
                            id: data?.data?._id
                        }),
                        headers: {
                            'content-type': 'application/json',
                            authorization: localStorage.getItem("tech_token"),
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data?.data?.success) {
                                successToast("Password send successful!")
                            } else {
                                errorToast(data.data.message || "Password resend error!")
                            }
                        })
                } catch (error) {
                    console.log(error)
                    errorToast("Password resend error!")
                }

            }
        })
    };
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
            return <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    };
    if (!data?.success) {
        return <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
            <p className="text-2xl text-red-500">Something went wrong!</p>
        </div>
    }
    // এই কনস্ট্যান্ট এখানে থাকতে হবে না হলে লোডিং হওয়ার আগের ডাটা রিড করতে গেলে এরর আসবে
    const { email, fast_name, last_name, status, address, country_code, userId, phone, role, userBio, updatedAt, userImage, document, _id } = data?.data;

    return (
        <div className='max-w-[1200px] mx-auto'>
            <form
                onSubmit={handleUpdate}
            >
                <div className='w-full grid grid-cols-1 mdd:grid-cols-3 gap-2 lg:p-5 mt-0 xl:mt-5'>
                    <div className='col-span-1 h-fit  pt-8 pb-4 mdd:pb-10 bg-gray-200 border rounded-md px-0 xl:px-10'>
                        <div className='text-center'>
                            <figure className='relative'>
                                <img className='rounded-full w-[50%] max-w-[150px] mx-auto p-[2px]' src={previewImage || userImage || demoUser} alt="" />
                                <input
                                    onChange={(e) => setPreviewImage(window.URL.createObjectURL(e.target.files[0]))}
                                    onClick={() => setEditField({ ...editField, upBtn: true })}
                                    type="file" className='hidden' name="image" accept='image/*' id="image"
                                />
                                <label htmlFor="image">
                                    <div className='absolute right-1/4 bottom-2 bg-gray-200 rounded-full p-2 border border-red-300 hover:bg-green-200 group'><FaPenAlt className='text-gray-600 group-hover:text-gray-700' /></div>
                                </label>
                            </figure>
                            <h5 className='font-medium text-lg md:text-sm lg:text-lg mb-1 capitalize'>{fast_name + ' ' + last_name}</h5>
                            <div className=' py-2 w-fit mx-auto text-start'>
                                <h5 className='font-semibold text-sm mb-1'>Status : {status?.active ? "Active" : "Inactive"}</h5>
                                <h5 className='font-semibold text-sm mb-1'>User Id : {userId}</h5>
                                <h4 className='font-semibold text-sm mb-1 capitalize'>Position: {role}</h4>
                            </div>
                            <h5 className='text-sm mb-1'>Last updated: {new Date(updatedAt).toLocaleString()}</h5>
                        </div>
                    </div>
                    <div className='col-span-2 border  bg-white rounded-md'>
                        <div className='flex justify-between items-center'>
                            <h3 className='text-xl xl:text-2xl text-green-600  px-0 xl:px-10 my-3 ml-4'>Edit Account</h3>
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
                                        disabled={!editField.fast_name}
                                        defaultValue={fast_name}
                                        type="text" name='fast_name'
                                        className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-indigo-400 border-blue-500 rounded-sm"
                                    />
                                    {!editField.fast_name && <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, fast_name: true, upBtn: true })} /></p>}
                                </div>
                                <div className="w-full relative">
                                    <label htmlFor='full-name' className="">Last name</label>
                                    <input
                                        disabled={!editField.last_name}
                                        defaultValue={last_name}
                                        type="text" name='last_name'
                                        className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-indigo-400 border-blue-500 rounded-sm"
                                    />
                                    {!editField.last_name && <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, last_name: true, upBtn: true })} /></p>}
                                </div>
                                <div className="w-full relative">
                                    <label htmlFor='email' className="">Email</label>
                                    <input
                                        defaultValue={email} disabled
                                        type="text" name="email"
                                        className="w-full text-gray-800 font-medium py-2 px-3 mt-2 border focus:outline-indigo-400 border-blue-500 rounded-sm"
                                    />
                                </div>
                                <div className="w-full relative">
                                    <label htmlFor='phone' className="">Phone</label>
                                    <div className='grid grid-cols-4'>
                                        <select
                                            disabled={!editField.phone}
                                            defaultValue={country_code}
                                            type="text" name="country_code"
                                            className="col-span-1 w-full text-gray-900 font-medium py-2 text-center mt-2 border focus:outline-indigo-400 border-blue-500 rounded-sm"
                                        >
                                            {Object.keys(countries).map((key, i) => (
                                                <option className='w-10' key={i} value={countries[key].phone}> {key + ' ' + countries[key].phone}</option>
                                            ))}
                                        </select>
                                        <input
                                            disabled={!editField.phone}
                                            defaultValue={phone}
                                            type="number" name="phone"
                                            className="col-span-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-indigo-400 border-blue-500 rounded-sm"
                                        />
                                    </div>
                                    {!editField.phone && <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, phone: true, upBtn: true })} /></p>}
                                </div>
                                <div className='col-span-2 w-full grid grid-cols-3 gap-2 gap-y-4'>
                                    <div className="w-full relative">
                                        <label htmlFor='country' className="">County</label>
                                        <CountryInput disabled={!editField.country} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} wornClass={{ input: "w-full text-gray-800 font-medium py-2 pl-3 pr-7 border border-blue-500 rounded-sm focus:outline-indigo-400" }}></CountryInput>
                                        {!editField.country && <p className='absolute top-11 right-2'><FiEdit className='bg-white' onClick={() => setEditField({ ...editField, country: true, upBtn: true })} /></p>}
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor='state' className="">State</label>
                                        <StateInput country={selectedCountry?.name || ""} selectedState={selectedState} setSelectedState={setSelectedState} wornClass={{ input: "w-full text-gray-800 font-medium py-2 pl-3 pr-7 border border-blue-500 rounded-sm focus:outline-indigo-400" }} />
                                        {/* <input
                                            disabled={!editField.state}
                                            defaultValue={address?.state}
                                            type="text" name="state"
                                            className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-indigo-400 border-blue-500 rounded-sm"
                                        /> */}
                                        {!editField.state && <p className='absolute top-11 right-2'><FiEdit className='bg-white' onClick={() => setEditField({ ...editField, state: true, upBtn: true })} /></p>}
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor='city' className="">City</label>
                                        <CityInput country={selectedCountry?.name || ""} state={selectedState?.name || ""} selectedCity={selectedCity} setSelectedCity={setSelectedCity} wornClass={{ input: "w-full text-gray-800 font-medium py-2 pl-3 pr-7 border border-blue-500 rounded-sm focus:outline-indigo-400" }} />
                                        {/* <input
                                            disabled={!editField.city}
                                            defaultValue={address?.city}
                                            type="text" name="city"
                                            className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-indigo-400 border-blue-500 rounded-sm"
                                        /> */}
                                        {!editField.city && <p className='absolute top-11 right-2'><FiEdit className='bg-white' onClick={() => setEditField({ ...editField, city: true, upBtn: true })} /></p>}
                                    </div>
                                </div>
                                {executor.role === ADMIN && <div className='col-span-2 w-full grid grid-cols-3 gap-2 gap-y-4'>
                                    <div className="w-full relative">
                                        <label htmlFor='password' className="">Password</label>
                                        <p onClick={() => generatePassword()} className="w-full mb-4 py-2 rounded-sm mt-2 cursor-pointer select-none bg-orange-300 hover:bg-orange-400 active:outline outline-2 outline-indigo-400 font-semibold text-white flex justify-center items-center duration-75">
                                            Reset Password
                                        </p>
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor='role' className="">Change Role</label>
                                        <select
                                            disabled={!editField.role}
                                            defaultValue={role}
                                            name='role' className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-indigo-400 border-blue-500 rounded-sm"
                                        >
                                            <option value={ADMIN}>Admin</option>
                                            <option value={MARKETER}>Marketing Manager</option>
                                            <option value={TELE_MARKETER}>Telemarketer</option>
                                            <option value={DATA_ENTRY_OPERATOR}>Data Entire</option>
                                            <option value={ON_FIELD_MARKETER}>Field Marketer</option>
                                            <option value={BILLING_TEAM}>Billing Team</option>
                                        </select>
                                        {!editField.role && <p className='absolute top-11 right-2'><FiEdit className='bg-white' onClick={() => setEditField({ ...editField, role: true, upBtn: true })} /></p>}
                                    </div>
                                    <div className="w-full relative">
                                        <label htmlFor='status' className="">Status</label>
                                        {userStatus ?
                                            <p onClick={() => {
                                                setEditField({ ...editField, status: true, upBtn: true })
                                                setUserStatus(c => (!c))
                                            }} className='px-4  mt-2 py-2 text-center select-none bg-green-400 font-semibold text-white rounded-md'>Active</p>
                                            : <p onClick={() => {
                                                setEditField({ ...editField, status: true, upBtn: true })
                                                setUserStatus(c => (!c))
                                            }} className='px-4 py-2 mt-2 text-center select-none bg-red-400 font-semibold text-white rounded-md'>Inactive</p>
                                        }

                                        {/* <select
                                            // disabled={!editField.status}
                                            defaultValue={status?.active}
                                            name='role' className="w-full text-gray-800 font-medium py-2 pl-3 pr-7 mt-2 border focus:outline-indigo-400 border-blue-500 rounded-sm"
                                        >
                                            <option className='bg-green-400 text-white' value={true}>Active</option>
                                            <option className='bg-red-500 text-white' value={false}>Inactive</option>
                                        </select>
                                        {!editField.status && <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, status: true, upBtn: true })} /></p>} */}
                                    </div>
                                </div>}
                                <div className="w-full relative col-span-2">
                                    <label htmlFor='' className="">Additional Bio data</label>
                                    <textarea
                                        disabled={!editField.userBio}
                                        defaultValue={userBio}
                                        type="text" name="userBio"
                                        className="w-full min-h-[100px] text-gray-800 py-2 pl-3 pr-7 mt-2 border focus:outline-indigo-400 border-blue-500 rounded-md"
                                    />
                                    {!editField.userBio && <p className='absolute top-11 right-2'><FiEdit onClick={() => setEditField({ ...editField, userBio: true, upBtn: true })} /></p>}
                                </div>
                            </div>
                            <div className='mt-2 pb-8 relative'>
                                <p>Other documents:</p>
                                <div className='grid grid-cols-3 gap-3'>
                                    {document.length > 0 && document.map((img, i) => <Image key={i} width={1000} height={1000} src={img} alt=''></Image>)}
                                </div>
                                <input
                                    onClick={() => setEditField({ ...editField, upBtn: true })}
                                    className='hidden' type="file" accept='image/*' multiple name="document" id="document"
                                />
                                <label className='absolute bottom-2 left-[43%] bg-blue-400 rounded-2xl border-2 border-gray-200 px-3 py-1 cursor-pointer drop-shadow-lg' htmlFor="document">
                                    Upload document
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    );
};

export default Private(UpdateProfile);