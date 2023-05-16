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
    console.log(data, isLoading, isError, error);
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
        const { businessDetails: { businessName, businessEmail, businessPhone, category, businessSize, businessLogo, images }, onProcess, tag, other_information, have_branchs: { branch_detalis }, createdAt, updatedAt, address: { country, state, city, street_address, postCode }, have_website: { website_urls } } = data.data;
        return (
            <div className='capitalize w-full min-h-screen'>
                <div className="flex justify-around mt-2">
                    <button
                        onClick={() => setShowData("overview")}
                        className={`text-sm md:text-lg text-orange-400 font-medium px-2 md:px-3 mb-1  hover:border-b-4 ${showData === "overview" && " border-b-4 "} border-blue-400 `}
                    >Overview</button>
                    <button
                        onClick={() => setShowData("menu")}
                        className={`text-sm md:text-lg text-orange-400 font-medium px-2 md:px-3 mb-1  hover:border-b-4 ${showData === "menu" && "border-b-4 "} border-blue-400 `}
                    >Menus</button>
                    <button
                        onClick={() => setShowData("other")}
                        className={`text-sm md:text-lg text-orange-400 font-medium px-2 md:px-3 mb-1  hover:border-b-4 ${showData === "other" && " border-b-4 "} border-blue-400 `}
                    >Others</button>
                    <button
                        onClick={() => setShowData("owners")}
                        className={`text-sm md:text-lg text-orange-400 font-medium px-2 md:px-3 mb-1  hover:border-b-4 ${showData === "owners" && "border-b-4 "} border-blue-400 `}
                    >Owners</button>
                    {user.role !== DATA_ENTRY_OPERATOR && <button
                        onClick={() => setShowData("status")}
                        className={`text-sm md:text-lg text-orange-400 font-medium px-2 md:px-3 mb-1  hover:border-b-4 ${showData === "status" && "border-b-4 "} border-blue-400 `}
                    >Status</button>}
                </div>
                {showData === "overview"
                    // ? <div className='h-full bg-indigo-100 px-6 pb-8 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
                    //     <h4 className='text-lg font-serif text-indigo-700 mb-1'>Entire data Information</h4>
                    //     <div className='flex justify-start'>
                    //         <h5 className='w-32'>Category</h5>
                    //         <h5 className='flex-1'>: {category}</h5>
                    //     </div>
                    //     <div className='flex justify-start'>
                    //         <h5 className='w-32'>Institution</h5>
                    //         <h5 className='flex-1'>: {businessName}</h5>
                    //     </div>
                    //     <div className='flex justify-start'>
                    //         <h5 className='w-32'>Size</h5>
                    //         <h5 className='flex-1'>: {businessSize}</h5>
                    //     </div>
                    //     <div className='flex justify-start'>
                    //         <h5 className='w-32'>Address</h5>
                    //         <h5 className='flex-1'>: {country}, {state}, {city}, {street_address && street_address} </h5>
                    //     </div>
                    //     <div className='flex justify-start'>
                    //         <h5 className='w-32'>Local post code</h5>
                    //         <h5 className='flex-1'>: {postCode || "N/A"} </h5>
                    //     </div>
                    //     {branch_detalis?.length && <div className='flex justify-start font-medium'>
                    //         <h5 className='w-32'>Branch</h5>
                    //         <div className='flex-1'>: Information
                    //             {branch_detalis.map((branch, i) => <div key={i}>
                    //                 <p className='text-xs font-medium'>Branch-{++i}</p>
                    //                 <p>Name- {branch.name || "N/A"}</p>
                    //                 <p>country- {branch.country || "N/A"}</p>
                    //                 <p>State- {branch.state || "N/A"}</p>
                    //                 <p>Street- {branch.street_address || "N/A"}</p>
                    //             </div>)}
                    //         </div>
                    //     </div>}
                    //     {website_urls?.length && <div className='flex justify-start'>
                    //         <h5 className='w-32'>Websites</h5>
                    //         <div className='flex-1'>: Details
                    //             {website_urls.map((site, i) => <ol key={i} >
                    //                 <li>{++i}. <a className='text-blue-500 hover:underline hover:text-indigo-700' href={site} target="_blank" rel="noopener noreferrer">{site}</a></li>
                    //             </ol>)}
                    //         </div>
                    //     </div>}
                    // </div>
                    // : showData === "status"
                    //     ? <div className='h-full bg-yellow-100 px-6 pb-8 pt-3 font-medium'>
                    //         <h4 className='text-xl text-center font-serif text-indigo-700 mb-2 underline underline-offset-4'>Work info details</h4>
                    //         {onProcess ? <div className='grid grid-cols-12 gap-y-6 divide-y-2 lg:divide-y-0 lg:divide-x-2'>
                    //             {onProcess.teleMarketer &&
                    //                 <div className='col-span-12 lg:col-span-6 space-y-3'>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>Telemarketer </h5>
                    //                         <h5 className='flex-1'>: {onProcess.teleMarketer?.name}</h5>
                    //                     </div>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>Work process</h5>
                    //                         <h5 className='flex-1'>: {onProcess.teleMarketer?.process}</h5>
                    //                     </div>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>Employee Email</h5>
                    //                         <h5 className='flex-1 lowercase'>: {onProcess.teleMarketer?.account_id?.email}</h5>
                    //                     </div>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>Employee Phone</h5>
                    //                         <h5 className='flex-1'>: {"+" + " " + onProcess.teleMarketer?.account_id?.country_code + " " + onProcess.teleMarketer?.account_id?.phone} </h5>
                    //                     </div>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>Address</h5>
                    //                         <h5 className='flex-1'>: {onProcess.teleMarketer?.account_id?.address?.country + "," + " " + onProcess.teleMarketer?.account_id?.address?.state + "," + " " + onProcess.teleMarketer?.account_id?.address?.city} </h5>
                    //                     </div>
                    //                 </div>
                    //             }
                    //             {onProcess.onfieldMarketer &&
                    //                 <div className='col-span-12 lg:col-span-6 space-y-3 pt-4 lg:pt-0 lg:pl-6'>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>On Field Marketer </h5>
                    //                         <h5 className='flex-1'>: {onProcess.onfieldMarketer?.name}</h5>
                    //                     </div>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>Work process</h5>
                    //                         <h5 className='flex-1'>: {onProcess.onfieldMarketer?.process}</h5>
                    //                     </div>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>Employee Email</h5>
                    //                         <h5 className='flex-1 lowercase'>: {onProcess.onfieldMarketer?.account_id?.email}</h5>
                    //                     </div>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>Employee Phone</h5>
                    //                         <h5 className='flex-1'>: {"+" + " " + onProcess.onfieldMarketer?.account_id?.country_code + " " + onProcess.teleMarketer?.account_id?.phone} </h5>
                    //                     </div>
                    //                     <div className='flex justify-start'>
                    //                         <h5 className='w-32'>Address</h5>
                    //                         <h5 className='flex-1'>: {onProcess.onfieldMarketer?.account_id?.address?.country + "," + " " + onProcess.teleMarketer?.account_id?.address?.state + "," + " " + onProcess.teleMarketer?.account_id?.address?.city} </h5>
                    //                     </div>
                    //                 </div>
                    //             }
                    //         </div> : <div className='text-center my-20 md:my-52'>
                    //             <p className="text-2xl text-red-500">New Entire!</p>
                    //         </div>}
                    //     </div>
                    //     : showData === "menu"
                    //         ? <div className='h-full bg-yellow-100 px-6 pb-8 pt-3 font-medium'>
                    //             <h4 className='text-lg font-serif text-indigo-700 mb-2'>They Service offers</h4>
                    //             {tag.length ? <div className='grid grid-cols-1 gap-y-2'>
                    //                 {tag.map((item, i) => <p key={i}>{++i}. {item}</p>)}
                    //             </div> : <div className='text-center my-20 md:my-52'>
                    //                 <p className="text-2xl text-red-500">Entire Tag Empty!</p>
                    //             </div>}
                    //         </div>
                    //         : showData === "owners"
                    //             ? <div className='h-full bg-yellow-50 px-6 pb-8 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
                    //                 <h4 className='text-lg font-serif text-indigo-700 mb-1'>Owners Information</h4>
                    //                 <div className='flex justify-start'>
                    //                     <h5 className='w-32'>Owner Name</h5>
                    //                     <h5 className='flex-1'>: {name}</h5>
                    //                 </div>
                    //                 <div className='flex justify-start'>
                    //                     <h5 className='w-32'>Owner Email</h5>
                    //                     <h5 className='flex-1'>: {email}</h5>
                    //                 </div>
                    //                 <div className='flex justify-start'>
                    //                     <h5 className='w-32'>Phone</h5>
                    //                     <h5 className='flex-1'>: {"+" + country_code + " " + phone}</h5>
                    //                 </div>
                    //                 <div className='flex justify-start'>
                    //                     <h5 className='w-32'>Address</h5>
                    //                     <h5 className='flex-1'>: {country}, {state}, {city}, {street_address && street_address} </h5>
                    //                 </div>
                    //             </div>
                    //             : <div className='h-full bg-gray-100 px-6 pb-8 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
                    //                 <h4 className='text-lg font-serif text-indigo-700 mb-1'>Relative Info</h4>
                    //                 <div className='flex justify-start'>
                    //                     <h5 className='w-32'>Entire Date</h5>
                    //                     <h5 className='flex-1'>: {new Date(createdAt).toLocaleString()}</h5>
                    //                 </div>
                    //                 <div className='flex justify-start'>
                    //                     <h5 className='w-32'>Last Update</h5>
                    //                     <h5 className='flex-1'>: {new Date(updatedAt).toLocaleString()}</h5>
                    //                 </div>
                    //                 <p><span className='font-medium'>Entire operator Note</span> : <span className='font-normal space-y-2'>{other_information}</span></p>
                    //                 <p>Company Logo :</p>
                    //                 <Image width={75} height={55} src={businessLogo} alt='Company Logo'></Image>
                    //                 {images?.length > 0 && <div>
                    //                     <p>Other Images:</p>
                    //                     {images.map((img, i) => <Image key={i} width={300} height={300} src={img} alt='Company Logo'></Image>)}
                    //                 </div>
                    //                 }
                    //             </div>
                }
            </ div>
        )
    }
};

export default Private(Single_Entry_show);