import { CheckCircleIcon, PaperClipIcon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import { SmallSpinner } from './Spinner';

export default function EntrySubPreview({ isLoading, previewData, setPreviewData, handleSubmission }) {
    const { address, businessDetails, have_branchs, have_website, other_information, they_offer_service, we_offer_service } = previewData;
    return (
        <div className='relative max-w-full smm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-6 md:px-8 lg:px-16 xl:px-20 py-4 md:py-6 lg:py-8 md:my-5 bg-white rounded drop-shadow-md'>
            <button
                onClick={() => setPreviewData(null)} type="button"
                className="absolute top-8 right-8 rounded-full bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-red-500 shadow-sm hover:bg-indigo-200"
            >X</button>
            <div className="px-4 py-6 sm:px-6">
                <p className="mt-1 max-w-2xl text-md leading-6 text-gray-800">Business data preview.</p>
                <h3 className="text-xl md:text-2xl font-semibold leading-7 text-gray-900">Check your collected information</h3>
            </div>
            <div className="border-t border-gray-100 capitalize">
                <dl className="divide-y divide-indigo-200">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-md md:text-base text-gray-900">Business name</dt>
                        <dd className="mt-1 text-md md:text-base font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {businessDetails.businessName}</dd>
                        <dt className="text-md md:text-base text-gray-900">Category</dt>
                        <dd className="mt-1 text-md md:text-base font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {businessDetails.category.main}</dd>
                        <dt className="text-md md:text-base text-gray-900">Sub category</dt>
                        <dd className="mt-1 text-md md:text-base font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {businessDetails.category.sub1 || "N/A"}</dd>
                        <dt className="text-md md:text-base text-gray-900">Business Email</dt>
                        <dd className="mt-1 text-md md:text-base font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {businessDetails.businessEmail || "N/A"}</dd>
                        <dt className="text-md md:text-base text-gray-900">Business phone</dt>
                        <dd className="mt-1 text-md md:text-base font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {"+" + businessDetails.country_code + ' ' + businessDetails.businessPhone}</dd>
                        <dt className="text-md md:text-base text-gray-900">Business Logo</dt>
                        <dd className="mt-1 text-md md:text-base font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <img src={businessDetails?.businessLogo} className='max-w-40 max-h-16 rounded-md' alt='logo' ></img>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 items-center sm:gap-4 sm:px-6">
                        <dt className="text-md md:text-base text-gray-900">Address</dt>
                        <dd className="mt-1 text-md md:text-base font-medium leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {address.postCode},  {address.street_address || "street N/A"}
                            <br />
                            {address.city}, {address.state}, {address.country}
                        </dd>
                        <dt className="text-md md:text-base text-gray-900">Google map</dt>
                        <dd className="mt-1 text-md md:text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">: {address.location_link ? <a className='text-blue-500 hover:text-blue-700 underline-offset-2 underline' href={address.location_link} target='_blank'>{'Address map location link'}</a> : " N/A"}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Their Websites</dt>
                        <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {!have_website?.website_urls?.length ? " They-don't-have-a-website" : have_website?.website_urls?.map((site, i) => <p key={i} >
                                {++i}. <a href={site} target='_blank' className="text-blue-500 hover:underline hover:text-blue-700">
                                    {site.slice(0, 60)}
                                </a>
                            </p>)}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Their branch</dt>
                        <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-wrap justify-start gap-2">:
                            {!we_offer_service.length ? " We can offer service empty!" : we_offer_service.map((service, i) => <span key={i} className="inline-flex items-center rounded-md bg-[#FCF4F4] px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/80">
                                {service}
                            </span>)}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Their Services</dt>
                        <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-wrap justify-start gap-2">:
                            {!they_offer_service.length ? " Their offer services N/A " : they_offer_service.map((service, i) => <span key={i} className="inline-flex items-center rounded-md bg-[#FCF4F4] px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                                {service}
                            </span>)}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">We offered service</dt>
                        <dd className="mt-1 text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex flex-wrap justify-start gap-2">:
                            {!we_offer_service.length ? " We can offer service empty!" : we_offer_service.map((service, i) => <span key={i} className="inline-flex items-center rounded-md bg-[#FCF4F4] px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-600/80">
                                {service}
                            </span>)}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">Important Comment</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {other_information}
                        </dd>
                    </div>
                </dl>
            </div>
            <div className='flex justify-end my-3'>
                <button
                    onClick={handleSubmission} type="button" disabled={isLoading}
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-5 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:outline-none disabled:cursor-not-allowed"
                >
                    {isLoading ? <SmallSpinner /> : <CheckCircleIcon className="-ml-0.5 h-[22px] w-[22px]" aria-hidden="true" />}
                    Submit
                </button>
            </div>
        </div>
    )
}
