import Image from 'next/image';
import React, { useState } from 'react';

const Entire_show = ({ data }) => {
    const [showData, setShowData] = useState('overview');
    if (data?.success) {
        const {
            businessDetails: { businessName, category, businessSize, businessLogo, images },
            onProcess, tag, other_information, createdAt, updatedAt,
            have_branchs: { branch_detalis },
            address: { country, state, city, street_address, postCode },
            have_website: { website_urls },
            ownerDetails: { name, email, phone, country_code }
        } = data.data;
        // console.log(onProcess);
        return (
            <div>
                <div className="flex justify-around mt-2">
                    <button
                        onClick={() => setShowData('overview')}
                        className={`text-orange-400 font-medium px-3 mb-1  hover:border-b-4 ${showData === "overview" && " border-b-4 "} border-blue-400 `}
                    >Overview</button>
                    <button
                        onClick={() => setShowData('menu')}
                        className={`text-orange-400 font-medium px-3 mb-1  hover:border-b-4 ${showData === "menu" && "border-b-4 "} border-blue-400 `}
                    >Menus</button>
                    <button
                        onClick={() => setShowData('other')}
                        className={`text-orange-400 font-medium px-3 mb-1  hover:border-b-4 ${showData === "other" && " border-b-4 "} border-blue-400 `}
                    >Others</button>
                    <button
                        onClick={() => setShowData('contact')}
                        className={`text-orange-400 font-medium px-3 mb-1  hover:border-b-4 ${showData === "contact" && "border-b-4 "} border-blue-400 `}
                    >Contact</button>
                    <button
                        onClick={() => setShowData('status')}
                        className={`text-orange-400 font-medium px-3 mb-1  hover:border-b-4 ${showData === "status" && "border-b-4 "} border-blue-400 `}
                    >Status</button>
                </div>
                <hr className='mb-2' />
                {showData === "overview"
                    ? <div className='h-full bg-indigo-100 px-6 pb-8 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
                        <h4 className='text-lg font-serif text-indigo-700 mb-1'>Entire data Information</h4>
                        <div className='flex justify-start'>
                            <h5 className='w-32'>Category</h5>
                            <h5 className='flex-1'>: {category}</h5>
                        </div>
                        <div className='flex justify-start'>
                            <h5 className='w-32'>Institution</h5>
                            <h5 className='flex-1'>: {businessName}</h5>
                        </div>
                        <div className='flex justify-start'>
                            <h5 className='w-32'>Size</h5>
                            <h5 className='flex-1'>: {businessSize}</h5>
                        </div>
                        <div className='flex justify-start'>
                            <h5 className='w-32'>Address</h5>
                            <h5 className='flex-1'>: {country}, {state}, {city}, {street_address && street_address} </h5>
                        </div>
                        <div className='flex justify-start'>
                            <h5 className='w-32'>Local post code</h5>
                            <h5 className='flex-1'>: {postCode || "N/A"} </h5>
                        </div>
                        {branch_detalis?.length && <div className='flex justify-start font-medium'>
                            <h5 className='w-32'>Branch</h5>
                            <div className='flex-1'>: Information
                                {branch_detalis.map((branch, i) => <div key={i}>
                                    <p className='text-xs font-medium'>Branch-{++i}</p>
                                    <p>Name- {branch.name || "N/A"}</p>
                                    <p>country- {branch.country || "N/A"}</p>
                                    <p>State- {branch.state || "N/A"}</p>
                                    <p>Street- {branch.street_address || "N/A"}</p>
                                </div>)}
                            </div>
                        </div>}
                        {website_urls?.length && <div className='flex justify-start'>
                            <h5 className='w-32'>Websites</h5>
                            <div className='flex-1'>: Details
                                {website_urls.map((site, i) => <ol key={i} >
                                    <li>{++i}. <a className='text-blue-500 hover:underline hover:text-indigo-700' href={site} target="_blank" rel="noopener noreferrer">{site}</a></li>
                                </ol>)}
                            </div>
                        </div>}
                    </div>
                    : showData === "menu"
                        ? <div className='bg-yellow-100 px-6 pb-8 pt-3 font-medium'>
                            <h4 className='text-lg font-serif text-indigo-700 mb-2'>They Service offers</h4>
                            {tag.length ? <div className='grid grid-cols-1 gap-y-2'>
                                {tag.map((item, i) => <p key={i}>{++i}. {item}</p>)}
                            </div> : <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                                <p className="text-2xl text-red-500">Entire Tag Empty!</p>
                            </div>}
                        </div>
                        : showData === "contact"
                            ? <div className='bg-yellow-50 px-6 pb-8 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
                                <h4 className='text-lg font-serif text-indigo-700 mb-1'>Contact Information</h4>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Owner Name</h5>
                                    <h5 className='flex-1'>: {name}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Owner Email</h5>
                                    <h5 className='flex-1'>: {email}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Phone</h5>
                                    <h5 className='flex-1'>: {"+" + country_code + " " + phone}</h5>
                                </div>
                                <div className='flex justify-start'>
                                    <h5 className='w-32'>Address</h5>
                                    <h5 className='flex-1'>: {country}, {state}, {city}, {street_address && street_address} </h5>
                                </div>
                            </div>
                            : showData === "other" ?
                                <div className='bg-gray-100 px-6 pb-8 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
                                    <h4 className='text-lg font-serif text-indigo-700 mb-1'>Relative Info</h4>
                                    <div className='flex justify-start'>
                                        <h5 className='w-32'>Entire Date</h5>
                                        <h5 className='flex-1'>: {new Date(createdAt).toLocaleString()}</h5>
                                    </div>
                                    <div className='flex justify-start'>
                                        <h5 className='w-32'>Last Update</h5>
                                        <h5 className='flex-1'>: {new Date(updatedAt).toLocaleString()}</h5>
                                    </div>
                                    <p><span className='font-medium'>Entire operator Note</span> : <span className='font-normal space-y-2'>{other_information}</span></p>
                                    <p>Company Logo :</p>
                                    <Image width={75} height={55} src={businessLogo} alt='Company Logo'></Image>
                                    {images?.length > 0 && <div>
                                        <p>Other Images:</p>
                                        {images.map((img, i) => <Image key={i} width={300} height={300} src={img} alt='Company Logo'></Image>)}
                                    </div>}
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
            </div>
        )
    }
};

export default Entire_show;