import { ADMIN, INTERESTED, MARKETER, NOTINTERESTED, NOTSURE } from '@/utils/constant';
import Image from 'next/image';
import React, { useState } from 'react';
import companyLogo from '../assets/images/company_logo.jpg';
import { HiGlobeAsiaAustralia } from 'react-icons/hi2';
import { RiDirectionLine } from 'react-icons/ri';
import { MdLocationPin, MdOutlineDirections } from 'react-icons/md';
import { IoMdCall } from 'react-icons/io';
import { CgMail } from 'react-icons/cg';
import { useSelector } from 'react-redux';

const Entire_show = ({ data }) => {
    const [showData, setShowData] = useState('overview');
    const { user } = useSelector((state) => state.auth);
    console.log(data)
    if (data?.success) {
        const {
            businessDetails: { businessName, category, businessPhone, country_code, businessEmail, businessLogo },
            onProcess, final_process, we_offer_service, they_offer_service, suggestions, other_information, createdAt, updatedAt, data_entry_info,
            address: { country, state, city, street_address, postCode, location_link },
            have_website: { website_urls },
        } = data.data;
        console.log(data);
         /* md:ml-0 */
          /* md:justify-start */
        return (
            <div className='w-full'>
                <div className='w-full px-4 pb-4 mb-4 border-gray-100'>
                    <h1 className='text-2xl lgg:text-3xl font-semibold capitalize'>{businessName}</h1>
                    <h4 className='text-base lgg:text-lg font-thin text-gray-900 capitalize'>{category.main}</h4>
                    <img className='rounded my-4 w-fit mx-auto h-44 ' src={businessLogo || "https://www.logodesign.net/logo/needle-with-wings-flying-5675ld.png"} alt='Company Logo' />
                    <div className='flex justify-center items-center gap-3'>
                        {<a href={website_urls[0] || ""} target='_blank'> <button
                            type="button"
                            className="text-xs md:text-sm md:w-[110px] flex justify-center items-center gap-3 rounded-full text-gray-500 bg-white px-3 py-1.5 font-semibold hover:text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-300 active:ring-indigo-500 active:outline outline-2 outline-indigo-200 underline-offset-4 hover:bg-gray-50  transition-colors duration-200 ease-in-out"
                        >
                            <HiGlobeAsiaAustralia className='md:text-lg text-blue-400' />  Website
                        </button>
                        </a>}
                        {<a href={location_link} target='_blank'> <button
                            type="button"
                            className="text-xs md:text-sm md:w-[110px] hidden sm:flex justify-center items-center gap-1 rounded-full text-gray-500 bg-white px-3 py-1.5 font-semibold hover:text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-300 active:ring-indigo-500 active:outline outline-2 outline-indigo-200 underline-offset-4 hover:bg-gray-50  transition-colors duration-200 ease-in-out"
                        >
                            <MdOutlineDirections className='md:text-lg text-blue-400' />  Directions
                        </button>
                        </a>}
                        {/* <a href={`mailto:${businessEmail}`}>
                            <button
                                type="button"
                                className="text-xs md:text-sm md:w-[110px] flex justify-center items-center gap-4 rounded-full text-gray-500 bg-white px-3 py-1.5 font-semibold hover:text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-300 active:ring-indigo-500 active:outline outline-2 outline-indigo-200 underline-offset-4 hover:bg-gray-50  transition-colors duration-200 ease-in-out"
                            >
                                <CgMail className='md:text-lg text-blue-400' />  Gmail
                            </button>
                        </a> */}
                        <a href={`tel:${country_code + businessPhone}`}>
                            <button
                                type="button"
                                className="text-xs md:text-sm md:w-[110px] flex justify-center items-center gap-2 rounded-full text-gray-500 bg-white px-3 py-1.5 font-semibold hover:text-gray-900 shadow-sm ring-1 ring-inset ring-indigo-300 active:ring-indigo-500 active:outline outline-2 outline-indigo-200 underline-offset-4 hover:bg-gray-50  transition-colors duration-200 ease-in-out"
                            >
                                <IoMdCall

                                    className='md:text-lg text-blue-400' />  Contact
                            </button>
                        </a>
                    </div>
                </div>
                <div className="flex justify-evenly">
                    <button
                        onClick={() => setShowData('overview')}
                        className={`font-medium px-3 mb-1  hover:border-b-4 ${showData === "overview" && " border-b-4  text-blue-500"} border-blue-400 `}
                    >Overview</button>
                    <button
                        onClick={() => setShowData('service')}
                        className={`font-medium px-3 mb-1  hover:border-b-4 ${showData === "service" && "border-b-4  text-blue-500"} border-blue-400 `}
                    >Service</button>
                    <button
                        onClick={() => setShowData('other')}
                        className={`font-medium px-3 mb-1  hover:border-b-4 ${showData === "other" && " border-b-4  text-blue-500"} border-blue-400 `}
                    >Entry By</button>
                    <button
                        onClick={() => setShowData('status')}
                        className={`font-medium px-3 mb-1  hover:border-b-4 ${showData === "status" && "border-b-4  text-blue-500"} border-blue-400 `}
                    >Status</button>
                </div>
                <hr className='mb-2' />
                <div className='w-full min-h-screen'>
                    {
                        showData === "overview"
                            ? <div className='h-full px-4 pb-4 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
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
                                        <img className='rounded mt-2 w-[180px] h-[120px]' src={businessLogo} alt='Company Logo' />
                                    </h5>
                                </div>
                            </div>
                            : showData === "service"
                                ? <div className='h-full space-y-2 px-4  pb-8 pt-3 font-medium'>
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
                                : showData === "other" ?
                                    <div className='h-full px-4 pb-4 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
                                        <h4 className='text-lg font-serif text-indigo-700 mb-1'>Entry operator Info</h4>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Entire By</h5>
                                            <h5 className='flex-1 capitalize'>: {data_entry_info[0].fast_name} {data_entry_info[0].last_name}</h5>
                                        </div>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Position</h5>
                                            <h5 className='flex-1 capitalize'>: {data_entry_info[0].role}</h5>
                                        </div>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Email</h5>
                                            <h5 className='flex-1 lowercase'>: {data_entry_info[0].email}</h5>
                                        </div>
                                        <div className='flex justify-start'>
                                            <h5 className='w-32'>Phone</h5>
                                            <h5 className='flex-1 '>: +{data_entry_info[0].country_code} {data_entry_info[0].phone}</h5>
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
                                    : showData === "status" && <>
                                        {onProcess?.length ?
                                            <div className='space-y-2 p-4 text-base font-medium'>
                                                <h4 className='text-lg font-serif text-indigo-700 mb-2'>Marketing Works process status</h4>
                                                {onProcess.map((status, i) =>
                                                    <div key={i} className='space-y-1 border-b pb-3'>
                                                        <div className='flex justify-start'>
                                                            <h5 className='w-36'>Marketer</h5>
                                                            <h5 className='flex-1'>: {status.executor?.name}({status.executor.role})</h5>
                                                        </div>
                                                        <div className='flex justify-start'>
                                                            <h5 className='w-36'>Work process</h5>
                                                            <h5 className='flex-1'>:
                                                                <span
                                                                    className={`mx-auto ml-1 gap-2 ${status?.process === 'interested' ? "text-green-500 " : status?.process === NOTINTERESTED ? "text-[#efaf47]" : status?.process === NOTSURE ? "text-[#5ac0de]" : "text-gray-700"} rounded-md my-1.5 text-md font-semibold capitalize`}
                                                                >
                                                                    {status?.process === INTERESTED ? "Interested" : status?.process === NOTINTERESTED ? "Not Interested" : status?.process === NOTSURE ? "Not Sure" : "Pending"}
                                                                </span>
                                                            </h5>
                                                        </div>
                                                        <div className='flex justify-start'>
                                                            <h5 className='w-36'>Update Date</h5>
                                                            <h5 className='flex-1'>: {new Date(status.createdAt).toLocaleString()}</h5>
                                                        </div>
                                                        <h5 className='w-full '><span className='underline'>Communicate Note</span> : <br /> <span className='font-normal'>{status?.communication_note}</span></h5>
                                                    </div>
                                                )}
                                            </div>
                                            : <div className='my-40 text-center'><p>Marketing Status Empty!</p></div>
                                        }
                                    </>
                    }
                </div>
            </div >
        )
    }
};

export default Entire_show;