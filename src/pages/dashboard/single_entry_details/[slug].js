import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useGetEntireDataByIdQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute';
import { useSelector } from 'react-redux';
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER } from '@/utils/constant';

const Single_Entry_show = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [showData, setShowData] = useState('overview');
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading, isError, error } = useGetEntireDataByIdQuery(slug);
    // console.log(data, isLoading, isError, error);
    if (isLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.message) {
            return <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.message}</p>
            </div>
        } else if (error.error) {
            return <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else if (error.data.message) {
            return <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.data.dev_err || error.data.message}</p>
            </div>
        }
    };

    if (data?.success) {
        const { businessDetails: { businessName, businessEmail, businessPhone, country_code, category, businessLogo },
            we_offer_service, they_offer_service, onProcess, other_information, createdAt, updatedAt, suggestions, data_entry_operator,
            address: { country, state, city, street_address, postCode, location_link }, have_website: { website_urls } } = data.data;
        return (
            <div className='capitalize w-full min-h-screen'>
                <div className="w-full bg-indigo-100">
                    <div className='w-full flex justify-around py-2 px-2 md:px-4 max-w-6xl mx-auto'>
                        <button
                            onClick={() => setShowData("overview")}
                            className={`text-sm md:text-lg font-medium px-2 md:px-3 mb-1  hover:border-b-4 ${showData === "overview" && " border-b-4 "} border-blue-500 `}
                        >Overview</button>
                        <button
                            onClick={() => setShowData("service")}
                            className={`text-sm md:text-lg font-medium px-2 md:px-3 mb-1  hover:border-b-4 ${showData === "service" && "border-b-4 "} border-blue-500`}
                        >Services</button>
                        <button
                            onClick={() => setShowData("other")}
                            className={`text-sm md:text-lg font-medium px-2 md:px-3 mb-1  hover:border-b-4 ${showData === "other" && " border-b-4 "} border-blue-500 `}
                        >Entry By</button>
                        {user.role !== DATA_ENTRY_OPERATOR && <button
                            onClick={() => setShowData("status")}
                            className={`text-sm md:text-lg font-medium px-2 md:px-3 mb-1  hover:border-b-4 ${showData === "status" && "border-b-4 "} border-blue-500`}
                        >Status</button>}
                    </div>
                </div>
                <div className='my-4 w-full px-3 md:px-10 xl:px-0'>
                    <div className='w-full lg:max-w-4xl lggg:max-w-5xl xl:max-w-7xl  xxl:max-w-[1300px] min-h-[90vh] mx-auto bg-white rounded-lg shadow py-2'>
                        {showData === "overview"
                            ? <div className='h-full px-6 lg:px-10 pb-8 pt-3 grid grid-cols-1 gap-y-2 lg:gap-y-4 font-medium'>
                                <h4 className='text-lg xl:text-xl font-serif text-indigo-700 mb-1'>Entire data Information</h4>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Business name</h5>
                                    <h5 className='flex-1'>: {businessName}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Category</h5>
                                    <h5 className='flex-1 capitalize'>: {category.main}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Sub Category</h5>
                                    <h5 className='flex-1 capitalize'>: {category.sub1 || "N/A"}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Email</h5>
                                    <h5 className='flex-1 lowercase'>: {businessEmail || "N/A"}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Phone</h5>
                                    <h5 className='flex-1 capitalize'>: + {country_code || "N/A"} {businessPhone || "N/A"}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Local post code</h5>
                                    <h5 className='flex-1'>: {postCode || "N/A"} </h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Address </h5>
                                    <h5 className='flex-1'>: {city}, {state}, {country}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Street address</h5>
                                    <h5 className='flex-1'>: {street_address || "N/A"} </h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Map Link</h5>
                                    <h5 className='flex-1'>: {location_link ? <a className='font-normal text-blue-500 hover:underline hover:text-indigo-700' href={location_link} target='_blank'>Google map location link</a> : "N/A"} </h5>
                                </div>
                                {website_urls?.length > 0 && <div className='flex justify-start'>
                                    <h5 className='w-32'>Websites</h5>
                                    <div className='flex-1'>: Site link
                                        {website_urls.map((site, i) => <ol key={i} >
                                            <li>{++i}. <a className='font-normal text-blue-500 hover:underline hover:text-indigo-700' href={site} target="_blank" rel="noopener noreferrer">{site}</a></li>
                                        </ol>)}
                                    </div>
                                </div>}
                                <div className='flex justify-start mt-2'>
                                    <h5 className='w-32'>Business Logo</h5>
                                    <h5 className='flex-1'>
                                        <img className='rounded mt-2 w-[180px] h-[120px]' src={businessLogo} alt='Company Logo'/></h5>
                                </div>
                            </div>
                            : showData === "service"
                                ? <div className='h-full space-y-2 px-6  pb-8 pt-3 font-medium'>
                                    <div className=' bg-gray-100 py-5 px-5 rounded'>
                                        <h5 className='font-[400] mb-2 underline underline-offset-4'>We offer Service :</h5>
                                        <div className='flex-1 capitalize'>
                                            {we_offer_service?.length ?
                                                <div className='grid grid-cols-1 gap-y-2 text-md'>
                                                    {we_offer_service.map((item, i) => <p className='' key={i}>{++i}. {item}</p>)}
                                                </div>
                                                : <p className="text-md text-red-500">Service Empty!</p>
                                            }</div>
                                    </div>
                                    <div className='bg-gray-100 py-5 px-5 rounded'>
                                        <h5 className='font-[400] mb-2 underline underline-offset-4'>They offer Service :</h5>
                                        <div className='flex-1 capitalize'>
                                            {they_offer_service?.length ?
                                                <div className='grid grid-cols-1 gap-y-2 text-md'>
                                                    {they_offer_service.map((item, i) => <p className='' key={i}>{++i}. {item}</p>)}
                                                </div>
                                                : <p className="text-md text-red-500">Service Empty!</p>
                                            }</div>
                                    </div>
                                    <div className=' bg-gray-100 py-5  px-5 rounded'>
                                        <h5 className='font-[400] mb-2 underline underline-offset-4'>Add more Service :</h5>
                                        <div className='flex-1 capitalize'>
                                            {suggestions?.length ?
                                                <div className='grid grid-cols-1 gap-y-2 text-md'>
                                                    {suggestions.map((item, i) => <p className='' key={i}>{++i}. {item}</p>)}
                                                </div>
                                                : <p className="text-md text-red-500">Service Empty!</p>
                                            }</div>
                                    </div>

                                </div>
                                : showData === "status"
                                    ? <div className='h-full bg-yellow-100 px-6 pb-8 pt-3 font-medium'>
                                        <h4 className='text-xl text-center font-serif text-indigo-700 mb-2 underline underline-offset-4'>Work info details</h4>
                                        {/* {onProcess ? <div className='grid grid-cols-12 gap-y-6 divide-y-2 lg:divide-y-0 lg:divide-x-2'>
                                        {onProcess.teleMarketer &&
                                            <div className='col-span-12 lg:col-span-6 space-y-3'>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>Telemarketer </h5>
                                                    <h5 className='flex-1'>: {onProcess.teleMarketer?.name}</h5>
                                                </div>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>Work process</h5>
                                                    <h5 className='flex-1'>: {onProcess.teleMarketer?.process}</h5>
                                                </div>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>Employee Email</h5>
                                                    <h5 className='flex-1 lowercase'>: {onProcess.teleMarketer?.account_id?.email}</h5>
                                                </div>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>Employee Phone</h5>
                                                    <h5 className='flex-1'>: {"+" + " " + onProcess.teleMarketer?.account_id?.country_code + " " + onProcess.teleMarketer?.account_id?.phone} </h5>
                                                </div>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>Address</h5>
                                                    <h5 className='flex-1'>: {onProcess.teleMarketer?.account_id?.address?.country + "," + " " + onProcess.teleMarketer?.account_id?.address?.state + "," + " " + onProcess.teleMarketer?.account_id?.address?.city} </h5>
                                                </div>
                                            </div>
                                        }
                                        {onProcess.onfieldMarketer &&
                                            <div className='col-span-12 lg:col-span-6 space-y-3 pt-4 lg:pt-0 lg:pl-6'>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>On Field Marketer </h5>
                                                    <h5 className='flex-1'>: {onProcess.onfieldMarketer?.name}</h5>
                                                </div>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>Work process</h5>
                                                    <h5 className='flex-1'>: {onProcess.onfieldMarketer?.process}</h5>
                                                </div>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>Employee Email</h5>
                                                    <h5 className='flex-1 lowercase'>: {onProcess.onfieldMarketer?.account_id?.email}</h5>
                                                </div>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>Employee Phone</h5>
                                                    <h5 className='flex-1'>: {"+" + " " + onProcess.onfieldMarketer?.account_id?.country_code + " " + onProcess.teleMarketer?.account_id?.phone} </h5>
                                                </div>
                                                <div className='flex justify-start'>
                                                    <h5 className='w-32'>Address</h5>
                                                    <h5 className='flex-1'>: {onProcess.onfieldMarketer?.account_id?.address?.country + "," + " " + onProcess.teleMarketer?.account_id?.address?.state + "," + " " + onProcess.teleMarketer?.account_id?.address?.city} </h5>
                                                </div>
                                            </div>
                                        }
                                    </div> : <div className='text-center my-20 md:my-52'>
                                        <p className="text-2xl text-red-500">New Entire!</p>
                                    </div>} */}
                                    </div>
                                    : <div className='h-full px-6 pb-8 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
                                        <h4 className='text-lg font-serif text-indigo-700 mb-1'>Entry operator Info</h4>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Entire By</h5>
                                            <h5 className='flex-1 capitalize'>: {data_entry_operator?.account_id?.fast_name} {data_entry_operator?.account_id?.last_name}</h5>
                                        </div>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Position</h5>
                                            <h5 className='flex-1 capitalize'>: {data_entry_operator?.account_id?.role}</h5>
                                        </div>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Email</h5>
                                            <h5 className='flex-1 lowercase'>: {data_entry_operator?.account_id?.email}</h5>
                                        </div>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Phone</h5>
                                            <h5 className='flex-1 '>: +{data_entry_operator?.account_id?.country_code} {data_entry_operator?.account_id?.phone}</h5>
                                        </div>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Entire Date</h5>
                                            <h5 className='flex-1'>: {new Date(createdAt).toLocaleString()}</h5>
                                        </div>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Last Update</h5>
                                            <h5 className='flex-1'>: {new Date(updatedAt).toLocaleString()}</h5>
                                        </div>
                                        <div className='bg-gray-50 p-2 space-y-1'>
                                            <p><span className='font-medium'>Entire operator Note</span> : </p>
                                            <p className='font-normal space-y-2'>{other_information}</p>
                                        </div>
                                    </div>
                        }
                    </div>
                </div>
            </ div >
        )
    }
};

export default Private(Single_Entry_show);