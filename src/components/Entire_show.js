import Image from 'next/image';
import React, { useState } from 'react';

const Entire_show = ({ data }) => {
    const [showData, setShowData] = useState('overview');
    if (data?.success) {
        const {
            businessDetails: { businessName, category, businessPhone, country_code, businessEmail, businessLogo },
            onProcess, we_offer_service, they_offer_service, suggestions, other_information, createdAt, updatedAt,data_entry_operator,
            address: { country, state, city, street_address, postCode, location_link },
            have_website: { website_urls },
        } = data.data;
        // console.log(onProcess);
        return (
            <div>
                <div className="flex justify-around mt-2">
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
                {showData === "overview"
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
                                <img className='rounded mt-2 w-[180px] h-[120px]' src={businessLogo} alt='Company Logo' /></h5>
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
                        : showData === "contact"
                            ? <div className='bg-yellow-50 px-6 pb-4 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
                                <h4 className='text-lg font-serif text-indigo-700 mb-1'>Contact Information</h4>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Owner Name</h5>
                                    <h5 className='flex-1'>: {"name"}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Owner Email</h5>
                                    <h5 className='flex-1'>: {"email"}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Phone</h5>
                                    {/* <h5 className='flex-1'>: {"+" + country_code + " " + phone}</h5> */}
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Address</h5>
                                    <h5 className='flex-1'>: {country}, {state}, {city}, {street_address && street_address} </h5>
                                </div>
                            </div>
                            : showData === "other" ?
                                <div className='h-full px-4 pb-4 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
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
                                : showData === "status" && <>
                                    {onProcess?.teleMarketer?.communicationId &&
                                        <div className='col-span-12 lg:col-span-6 space-y-1 bg-indigo-100 p-4 text-[14px] font-medium'>
                                            <h4 className='text-lg font-serif text-indigo-700 mb-2'> Telemarketing work process status</h4>
                                            <div className='flex justify-start'>
                                                <h5 className='w-36'>Telemarketer</h5>
                                                <h5 className='flex-1'>: {onProcess?.teleMarketer?.account_id?.name}({onProcess?.teleMarketer?.account_id?.role})</h5>
                                            </div>
                                            <div className='flex justify-start'>
                                                <h5 className='w-36'>Phone</h5>
                                                <h5 className='flex-1'>: + {onProcess?.teleMarketer?.account_id?.country_code} {onProcess?.teleMarketer?.account_id?.phone}</h5>
                                            </div>
                                            <div className='flex justify-start'>
                                                <h5 className='w-36'>Work process</h5>
                                                <h5 className='flex-1'>: {onProcess.teleMarketer?.communicationId?.process}</h5>
                                            </div>
                                            {onProcess?.teleMarketer?.communicationId?.needWebsite && <div className='flex justify-start'>
                                                <h5 className='w-36'>Need A Website</h5>
                                                <h5 className='flex-1'>: {onProcess?.teleMarketer?.communicationId?.needWebsite && "Yes!"}</h5>
                                            </div>}
                                            {onProcess?.teleMarketer?.communicationId?.website_category?.category && <div className='flex justify-start'>
                                                <h5 className='w-36'>Web Category</h5>
                                                <h5 className='flex-1'>: {onProcess?.teleMarketer?.communicationId?.website_category?.category}</h5>
                                            </div>}
                                            {onProcess?.teleMarketer?.communicationId?.website_category?.include_app && <div className='flex justify-start'>
                                                <h5 className='w-36'>Include App</h5>
                                                <h5 className='flex-1'>: {onProcess?.teleMarketer?.communicationId?.website_category?.include_app && "Yes!"}</h5>
                                            </div>}
                                            {onProcess?.teleMarketer?.communicationId?.website_category?.demo_site?.length > 0 && <div className='flex justify-start'>
                                                <h5 className='w-36'>Demo Site</h5>
                                                <h5 className='flex-1'> {onProcess?.teleMarketer?.communicationId?.website_category?.demo_site.map((site, i) => <p key={i}>{++i}. <a href={site} className='text-blue-600 hover:underline mr-2'>{site}</a></p>)}</h5>
                                            </div>}
                                            {onProcess?.teleMarketer?.communicationId?.talk_later_time && <div className='flex justify-start'>
                                                <h5 className='w-36'>Talk Later Time</h5>
                                                <h5 className='flex-1'>: {onProcess?.teleMarketer?.communicationId?.talk_later_time}</h5>
                                            </div>}
                                            {onProcess?.teleMarketer?.communicationId?.communication_note && <div className='flex justify-start'>
                                                <h5 className='w-36'>Contact Note</h5>
                                                <h5 className='flex-1'>: {onProcess?.teleMarketer?.communicationId?.communication_note}</h5>
                                            </div>}
                                            {onProcess?.teleMarketer?.communicationId?.createdAt && <div className='flex justify-start'>
                                                <h5 className='w-36'>Submit Date</h5>
                                                <h5 className='flex-1'>: {new Date(onProcess?.teleMarketer?.communicationId?.createdAt).toLocaleString()}</h5>
                                            </div>}
                                            {onProcess?.teleMarketer?.communicationId?.updatedAt && <div className='flex justify-start'>
                                                <h5 className='w-36'>Last update</h5>
                                                <h5 className='flex-1'>: {new Date(onProcess?.teleMarketer?.communicationId?.updatedAt).toLocaleString()}</h5>
                                            </div>}
                                            {onProcess?.teleMarketer?.communicationId?.requirement?.length > 0 && <div className=''>
                                                <h5 className='w-36 underline'>New Requirement</h5>
                                                {onProcess?.teleMarketer?.communicationId?.requirement.map((require, i) => <p key={i} className=''>{++i}. <span className='font-medium text-blue-500'>{require}</span></p>)}
                                            </div>}
                                        </div>
                                    }
                                    {onProcess?.onfieldMarketer?.communicationId &&
                                        <div className='col-span-12 lg:col-span-6 space-y-1 bg-indigo-100 p-4 text-[14px] font-medium'>
                                            <h4 className='text-lg font-serif text-indigo-700 mb-2'> Field Marketer work process status</h4>
                                            <div className='flex justify-start'>
                                                <h5 className='w-36'>Field Marketer</h5>
                                                <h5 className='flex-1'>: {onProcess?.onfieldMarketer?.account_id?.name}({onProcess?.onfieldMarketer?.account_id?.role})</h5>
                                            </div>
                                            <div className='flex justify-start'>
                                                <h5 className='w-36'>Phone</h5>
                                                <h5 className='flex-1'>: + {onProcess?.onfieldMarketer?.account_id?.country_code} {onProcess?.onfieldMarketer?.account_id?.phone}</h5>
                                            </div>
                                            <div className='flex justify-start'>
                                                <h5 className='w-36'>Work process</h5>
                                                <h5 className='flex-1'>: {onProcess.onfieldMarketer?.communicationId?.process}</h5>
                                            </div>
                                            {onProcess?.teleMarketer?.communicationId?.needWebsite && <div className='flex justify-start'>
                                                <h5 className='w-36'>Need A Website</h5>
                                                <h5 className='flex-1'>: {onProcess?.onfieldMarketer?.communicationId?.needWebsite && "Yes!"}</h5>
                                            </div>}
                                            {onProcess?.onfieldMarketer?.communicationId?.website_category?.category && <div className='flex justify-start'>
                                                <h5 className='w-36'>Web Category</h5>
                                                <h5 className='flex-1'>: {onProcess?.onfieldMarketer?.communicationId?.website_category?.category}</h5>
                                            </div>}
                                            {onProcess?.onfieldMarketer?.communicationId?.website_category?.include_app && <div className='flex justify-start'>
                                                <h5 className='w-36'>Include App</h5>
                                                <h5 className='flex-1'>: {onProcess?.onfieldMarketer?.communicationId?.website_category?.include_app && "Yes!"}</h5>
                                            </div>}
                                            {onProcess?.onfieldMarketer?.communicationId?.website_category?.demo_site?.length > 0 && <div className='flex justify-start'>
                                                <h5 className='w-36'>Demo Site</h5>
                                                <h5 className='flex-1'> {onProcess?.onfieldMarketer?.communicationId?.website_category?.demo_site.map((site, i) => <p key={i}>{++i}. <a href={site} className='text-blue-600 hover:underline mr-2'>{site}</a></p>)}</h5>
                                            </div>}
                                            {onProcess?.onfieldMarketer?.communicationId?.talk_later_time && <div className='flex justify-start'>
                                                <h5 className='w-36'>Talk Later Time</h5>
                                                <h5 className='flex-1'>: {onProcess?.onfieldMarketer?.communicationId?.talk_later_time}</h5>
                                            </div>}
                                            {onProcess?.onfieldMarketer?.communicationId?.communication_note && <div className='flex justify-start'>
                                                <h5 className='w-36'>Contact Note</h5>
                                                <h5 className='flex-1'>: {onProcess?.onfieldMarketer?.communicationId?.communication_note}</h5>
                                            </div>}
                                            {onProcess?.onfieldMarketer?.communicationId?.createdAt && <div className='flex justify-start'>
                                                <h5 className='w-36'>Submit Date</h5>
                                                <h5 className='flex-1'>: {new Date(onProcess?.onfieldMarketer?.communicationId?.createdAt).toLocaleString()}</h5>
                                            </div>}
                                            {onProcess?.onfieldMarketer?.communicationId?.updatedAt && <div className='flex justify-start'>
                                                <h5 className='w-36'>Last update</h5>
                                                <h5 className='flex-1'>: {new Date(onProcess?.onfieldMarketer?.communicationId?.updatedAt).toLocaleString()}</h5>
                                            </div>}
                                            {onProcess?.onfieldMarketer?.communicationId?.requirement?.length > 0 && <div className=''>
                                                <h5 className='w-36 underline'>New Requirement</h5>
                                                {onProcess?.onfieldMarketer?.communicationId?.requirement.map((require, i) => <p key={i} className=''>{++i}. <span className='font-medium text-blue-500'>{require}</span></p>)}
                                            </div>}
                                        </div>
                                    }
                                </>
                }
            </div >
        )
    }
};

export default Entire_show;