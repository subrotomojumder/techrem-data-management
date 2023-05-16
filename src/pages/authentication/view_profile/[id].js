import { useGetEmployeeByIdQuery } from '@/app/features/users/userApi';
import { useRouter } from 'next/router';
import React from 'react';
import demoUser from '../../../assets/images/demo_user.jpg';
import { FiEdit, FiEdit2 } from 'react-icons/fi';
import { LargeSpinner } from '@/components/Spinner';
import Image from 'next/image';
import { RiEditLine } from 'react-icons/ri';
import Link from 'next/link';

const Profile = () => {
    const router = useRouter()
    const { data, isLoading, isError, error } = useGetEmployeeByIdQuery(router.query?.id);
    console.log(data)
    if (!router.query?.id) {
        return <LargeSpinner></LargeSpinner>
    }
    if (isLoading) {
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
    const { email, fast_name, last_name, address, country_code, userId, phone, role, userBio, updatedAt, userImage, document, _id } = data?.data;

    return (
        <div className='max-w-[1200px] mx-auto min-h-screen'>
            <div className='w-full grid grid-cols-1 mdd:grid-cols-3 gap-2 lg:p-5 mt-0 xl:mt-5'>
                <div className='col-span-1 h-fit  pt-8 pb-4 mdd:pb-10 bg-white border rounded-md px-0 xl:px-10'>
                    <div className='text-center relative'>
                        <figure className='relative'>
                            <img className='rounded-full w-[50%] max-w-[150px] mx-auto p-[2px]' src={userImage || demoUser} alt="" />
                        </figure>
                        <h5 className='font-medium text-lg md:text-md lg:text-lg my-1 capitalize'>{fast_name + " " + last_name}</h5>
                        <h6 className='capitalize text-base text-zinc-500 font-medium mb-1'>{role}</h6>
                        <p className='capitalize '>{address.city + ', ' + address.state + ', ' + address.country}</p>
                        <div className='flex justify-center gap-1 mt-5'>
                            <button className='px-4 py-1 bg-blue-700 active:text-yellow-400 font-semibold text-white rounded-md hover:bg-blue-800'>FOLLOW</button>
                            <button className='px-4 py-1 border border-yellow-400 font-semibold text-yellow-500 select-none rounded-md hover:text-white hover:bg-yellow-400'>MESSAGE</button>
                        </div>
                        {userBio && <div className='p-4 text-left'>
                            <h5 className='underline underline-offset-2'>Bio</h5>
                            <p className='text-justify'>{userBio}</p>
                        </div>}
                    </div>
                </div>
                <div className='col-span-2 border  bg-white rounded-md'>
                    <div className='flex justify-between items-center'>
                        <h3 className='text-xl xl:text-2xl text-green-600  px-0 xl:px-10 my-3 ml-4'>Account Details</h3>
                        <Link href={`/authentication/user_edit/${_id}`}>
                            <button
                                type="button"
                                className="rounded-md mr-3 bg-white px-2.5 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <RiEditLine className='inline-block -mt-1' /> Edit
                            </button>
                        </Link>
                    </div>
                    <hr />
                    <div className='mx-4 mt-3  px-0 xl:px-10 pb-3'>
                        <div className='divide-y divide-zinc-200'>
                            <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 py-3 text-zinc-500 font-medium'>
                                <p className='col-span-1'>Full Name</p>
                                <p className='col-span-2 lg:col-span-3 capitalize'>{fast_name + ' ' + last_name}</p>
                            </div>
                            <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 py-3 text-zinc-500 font-medium'>
                                <p className='col-span-1'>User Id</p>
                                <p className='col-span-2 lg:col-span-3 capitalize'>{userId}</p>
                            </div>
                            <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 py-3 text-zinc-500 font-medium'>
                                <p className='col-span-1'>Email</p>
                                <p className='col-span-2 lg:col-span-3 capitalize'>{email}</p>
                            </div>
                            <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 py-3 text-zinc-500 font-medium'>
                                <p className='col-span-1'>Phone</p>
                                <p className='col-span-2 lg:col-span-3 capitalize'>({country_code}) {phone}</p>
                            </div>
                            <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 py-3 text-zinc-500 font-medium'>
                                <p className='col-span-1'>Address</p>
                                <p className='col-span-2 lg:col-span-3 capitalize'>{address.city + ', ' + address.state + ', ' + address.country}</p>
                            </div>
                            {address.address_1 && <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 py-3 text-zinc-500 font-medium'>
                                <p className='col-span-1'>Street Address 1</p>
                                <p className='col-span-2 lg:col-span-3 capitalize'>{address.address_1}</p>
                            </div>}
                            {address.address_2 && <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 py-3 text-zinc-500 font-medium'>
                                <p className='col-span-1'>Street Address 2</p>
                                <p className='col-span-2 lg:col-span-3 capitalize'>{address.address_2}</p>
                            </div>}
                        </div>
                        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                            {['All Entry', 'Pending Data','Current Campaign', ].map((item) => (
                                <div key={item.name} className="overflow-hidden rounded-lg border bg-white px-6 py-5 shadow">
                                    <dt className="truncate text-sm font-medium text-gray-500">{item}</dt>
                                    <dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">{115} Data</dd>
                                </div>
                            ))}
                        </dl>
                        {!document?.length || <div className='mt-4 pb-8'>
                            <p>Others document:</p>
                            <div className='flex justify-start flex-wrap gap-2'>
                                {document.length > 0 && document.map((img, i) => <figure key={i}>
                                    <img src={img} className='w-36 h-24' alt='document' />
                                </figure>)
                                }
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;