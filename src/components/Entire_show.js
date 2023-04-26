import React, { useEffect } from 'react';
import { useGetEntireDataByIdQuery } from '@/app/features/dataEntire/dataEntireApi';
import { EmptyLoader, LargeSpinner } from './Spinner';
import Image from 'next/image';

const Entire_show = ({ inputData, slug, setAlreadyProcessed }) => {
    const { data, isLoading, isError, error } = useGetEntireDataByIdQuery(slug);
    useEffect(() => {
        if (data?.data?.onProcess?.teleMarketer?.communicationId) {
            setAlreadyProcessed(c => ({ ...c, id: data.data.onProcess.teleMarketer.communicationId }))
        }
    }, [data])
    if (isLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.message) {
            return <div className='text-center mt-10 md:mt-40'>
                <p className="text-2xl text-red-500">{error.message}</p>
            </div>
        } else if (error.error) {
            return <div className='text-center mt-10 md:mt-40'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else if (error.data.message) {
            return <div className='text-center mt-10 md:mt-40'>
                <p className="text-2xl text-red-500">{error.data.dev_err || error.data.message}</p>
            </div>
        }
    };

    // console.log(data, isLoading, isError, error);
    if (data?.success) {
        const { businessDetails: { businessName, category, businessSize, businessLogo, images }, tag, other_information, have_branchs: { branch_detalis }, createdAt, updatedAt, address: { country, state, city, street_address, postCode }, have_website: { website_urls }, ownerDetails: { name, email, phone, country_code } } = data.data;
        return inputData.left_side === "overview"
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
            : inputData.left_side === "menu"
                ? <div className='bg-yellow-100 px-6 pb-8 pt-3 font-medium'>
                    <h4 className='text-lg font-serif text-indigo-700 mb-2'>They Service offers</h4>
                    {tag.length ? <div className='grid grid-cols-1 gap-y-2'>
                        {tag.map((item, i) => <p key={i}>{++i}. {item}</p>)}
                    </div> : <div className='text-center mt-10 md:mt-40'>
                        <p className="text-2xl text-red-500">Entire Tag Empty!</p>
                    </div>}
                </div>
                : inputData.left_side === "contact"
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
                    : <div className='bg-gray-100 px-6 pb-8 pt-3 grid grid-cols-1 gap-y-3 font-medium'>
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
                        </div>
                        }
                    </div>
    }
};

export default Entire_show;