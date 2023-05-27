
import { useGetCampaignQuery, useUpdateCampaignMutation } from '@/app/features/campaignManage/campaignManageApi';
import { useGetOurServiceQuery } from '@/app/features/others/othersApi';
import { LargeSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute';
import { ADMIN, INTERESTED, MARKETER, NOTINTERESTED, NOTSURE } from '@/utils/constant';
import { errorSweetAlert, errorToast, successToast } from '@/utils/neededFun';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BsArrowLeftShort, BsPersonCircle, BsSearch } from 'react-icons/bs';
import { MdOutlineContactless } from 'react-icons/md';
import { TbFilterOff } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Campaign_marketing = ({ campaign_id }) => {
    const { data, isLoading, isError, error } = useGetCampaignQuery(`/${campaign_id}`);
    console.log(data)
    const { user } = useSelector((state) => state.auth);
    const [campaignUpdateApi] = useUpdateCampaignMutation();
    const handleInactiveCampaign = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to inactive this campaign!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Inactive!'
        }).then((result) => {
            if (result.isConfirmed) {
                campaignUpdateApi({ data: { active: false }, url: `/campaign/${campaign_id}` })
                    .then(res => {
                        console.log(res);
                        if (res.data?.success) {
                            successToast("Has been deactivated")
                        } else {
                            errorSweetAlert("Something went wrong!")
                        }
                    });
            }
        })
    }
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    if (isLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.error) {
            return <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            return <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    }
    return (
        <div className='w-full max-w-[1400px] min-h-screen mx-auto mdd:px-8 smm:py-4'>
            <div className="bg-white shadow-sm rounded-lg">
                <div className='overflow-x-auto'>
                    <div className="min-w-fit min-h-[80vh]  ring-1 ring-black ring-opacity-20 sm:mx-0 sm:rounded-lg">
                        <div className='bg-indigo-100 rounded-t shadow-md w-full py-2 px-4 ml-auto flex justify-between items-center gap-2'>
                            <h2 className="text-lg md:text-xl  font-medium smm:font-semibold leading-5 lg:leading-10 text-gray-900">Assigned Data <span className='bg-green-200 rounded-md px-2'>{data?.data?.dataIds?.length}</span></h2>
                            <div className='flex justify-end gap-2'>
                                {(user.role === ADMIN || user.role === MARKETER) &&
                                    <button onClick={() => handleInactiveCampaign()} className="text-white font-semibold bg-red-300 border-0 py-1.5 px-4 focus:outline-none hover:bg-red-400 active:bg-red-500 rounded duration-75">Inactive</button>
                                }
                                {/* <select
                                    // onChange={(e) => setQueryData(c => ({ ...c, campaign_objective: e.target.value }))}
                                    className="rounded-md bg-white pl-2 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                >
                                    <option value='' selected >Process</option>
                                    <option value={''}>Pending</option>
                                    <option value={''}>Complete</option>
                                </select>
                                <select
                                    // onChange={(e) => setQueryData(c => ({ ...c, we_offer: e.target.value }))}
                                    // value={queryData.we_offer || ""}
                                    className="rounded-md bg-white pl-2 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                                >
                                    <option value='' selected >We can offer</option>
                                    {ourServiceData?.data?.map((service, i) => <option key={i} value={service.name}>{service.name.slice(0, 15)}</option>)}
                                </select> */}

                            </div>
                        </div>
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr className='bg-gray-100 smm:rounded-t-xl'>
                                    <th scope="col" className="pl-3 py-3.5 text-center text-md font-semibold text-gray-900">
                                        Business
                                    </th>
                                    <th scope="col" className="py-3.5 px-1 min-w-[150px] text-md font-semibold text-gray-900 sm:pl-6">
                                        Category
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-md font-semibold text-gray-900 lg:table-cell text-center"
                                    >
                                        Address
                                    </th>
                                    {(user.role === ADMIN || user.role === MARKETER) &&
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-md font-semibold text-gray-900 lg:table-cell text-center"
                                        >
                                            Process
                                        </th>
                                    }
                                    <th
                                        scope="col"
                                        className="px-3 py-3.5 text-center text-md font-semibold text-gray-900 whitespace-pre lg:table-cell"
                                    >
                                        We-can-offer
                                    </th>
                                    {!(user.role === ADMIN || user.role === MARKETER) &&
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className={"sr-only"}>option</span>
                                        </th>
                                    }
                                </tr>
                            </thead>
                            <tbody className=''>
                                {data?.data?.businessdatas?.length === 0 ?
                                    <tr className='w-full text-center'><div className='w-full text-center mt-11 text-2xl text-green-500'>Empty Entire data !</div></tr>
                                    : data?.data?.businessdatas?.map(({ businessDetails, _id, address, final_process, onProcess, we_offer_service, }, planIdx) => (
                                        <tr key={_id}>
                                            <td
                                                className={classNames(
                                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                                    'px-2 py-3.5 text-sm text-gray-700 lg:table-cell'
                                                )}
                                            >
                                                <Link href={`/dashboard/single_entry_details/${_id}`}>
                                                    <div className="flex items-center min-w-[90px]">
                                                        <div className="w-full flex flex-col justify-center mb-2">
                                                            <img className="h-11 w-14 mx-auto rounded-md" src={businessDetails?.businessLogo || "http://localhost:5000/image/no_image-1682919865051.png"} alt="" />
                                                            <div className="font-semibold text-base text-center text-gray-900 whitespace-pre truncate">{businessDetails?.businessName}{/* .length > 15 ? businessDetails?.businessName.slice(0, 15) + '...' : businessDetails?.businessName */}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td
                                                className={classNames(
                                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                                    'px-2 py-3.5 text-sm lg:table-cell font-medium text-center whitespace-pre capitalize'
                                                )}
                                            >
                                                {businessDetails?.category?.main} <br />
                                                <span className=''>{businessDetails?.category?.sub1 || ''}</span>
                                            </td>
                                            <td
                                                className={classNames(
                                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                                    'px-3 py-3.5 text-sm text-gray-700 lg:table-cell text-center'
                                                )}
                                            >
                                                <span className="text-gray-900 whitespace-pre">{address?.street_address}</span> <br />
                                                <span className="text-gray-900 capitalize whitespace-pre">{address?.city}, {address?.state}, {address?.country}</span>
                                            </td>
                                            {(user.role === ADMIN || user.role === MARKETER) && <td
                                                className={classNames(
                                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                                    'px-3 py-3.5 text-sm text-center text-gray-700 lg:table-cell'
                                                )}
                                            >
                                                <button
                                                    className={`mx-auto gap-2 ${final_process?.process === 'interested' ? "bg-green-500 text-white px-5" : final_process?.process === NOTINTERESTED ? "bg-[#efaf47] text-white" : final_process?.process === NOTSURE ? "bg-[#5ac0de] px-6 text-white" : "bg-slate-100"} rounded-md  px-2 py-1.5 text-sm font-semibold text-gray-700 capitalize`}>
                                                    {final_process?.process === INTERESTED ? "Interested" : final_process?.process === NOTINTERESTED ? "Not Interested" : final_process?.process === NOTSURE ? "Not Sure" : "Pending"}
                                                </button>
                                            </td>}
                                            <td
                                                className={classNames(
                                                    planIdx === 0 ? '' : 'border-t border-gray-200',
                                                    'px-3 py-3.5 text-sm text-center text-gray-700 lg:table-cell'
                                                )}
                                            >
                                                {!we_offer_service?.length ? "Empty" : <span>{we_offer_service.join(', ').length < 20 ? we_offer_service.join(', ') : we_offer_service.join(', ').slice(0, 20) + '...'} </span>}
                                            </td>
                                            {!(user.role === ADMIN || user.role === MARKETER) &&
                                            // onProcess.map((status, i) =>
                                                <td
                                                    className={classNames(
                                                        planIdx === 0 ? '' : 'border-t border-gray-200',
                                                        'px-3 py-3.5 text-center text-sm text-gray-700 lg:table-cell'
                                                    )}
                                                >
                                                    <Link href={`/dashboard/campaign/contact_manage/${_id}?campaign_id=${campaign_id}`}>
                                                        {final_process?.process !== "pending" ?
                                                            <button
                                                                className={`mx-auto gap-2 ${final_process?.process === 'interested' ? "bg-green-500 text-white px-5" : final_process?.process === NOTINTERESTED ? "bg-[#efaf47] text-white" : final_process?.process === NOTSURE ? "bg-[#5ac0de] px-6 text-white" : "bg-slate-100"} rounded-md  px-2 py-1.5 text-sm font-semibold text-gray-700 capitalize`}>
                                                                {final_process?.process === INTERESTED ? "Interested" : final_process?.process === NOTINTERESTED ? "Not Interested" : final_process?.process === NOTSURE ? "Not Sure" : "Pending"}
                                                            </button>
                                                            :
                                                            <button
                                                                className="mx-auto flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded border text-sm active:text-gray-700 duration-75">
                                                                Contact <MdOutlineContactless />
                                                            </button>
                                                        }
                                                    </Link>
                                                </td>
                                            }
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div >
            </div>
        </div>
    );
};
export async function getServerSideProps(context) {
    return {
        props: { campaign_id: context.query.id }
    }
}
export default Private(Campaign_marketing);