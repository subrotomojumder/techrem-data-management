import { useGetCampaignQuery } from '@/app/features/campaignManage/campaignManageApi';
import { LargeSpinner } from '@/components/Spinner';
import { Private } from '@/utils/ProtectRoute'
import { ADMIN, MARKETER } from '@/utils/constant';
import { PaperClipIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import { useSelector } from 'react-redux';

function Campaign_entry({ campaign_id }) {
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading, isError, error } = useGetCampaignQuery(`/${campaign_id}`);
    // const { user } = useSelector((state) => state.auth);
    console.log(data)

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
    } else if (data?.success) {
        const { campaign_objective, campaign_name, area, createdAt, assign_date, _id } = data.data;
        return (
            <div>
                <div className='lg:max-w-4xl lggg:max-w-5xl xl:max-w-7xl  xxl:max-w-[1300px] min-h-screen bg-white rounded shadow-md  md:mx-4 lgg:mx-auto md:my-4 px-4 py-4 lgg:px-6 '>
                    <div className="px-4 sm:px-0 flex justify-between ">
                        <h3 className="text-lg lg:text-xl font-semibold leading-7 text-gray-900">Campaign Information</h3>
                        {!(user.role === ADMIN || user.role === MARKETER) &&
                            <Link href={`/dashboard/employee_task/employee_entry/${_id}`}>
                                <button
                                    type="button"
                                    className="rounded-md bg-indigo-600 whitespace-pre px-2.5 py-1.5 text-md md:text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    + Entry Form
                                </button>
                            </Link>
                        }
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm lg:text-md font-medium leading-6 text-gray-900">Campaign Objective</dt>
                                <dd className="mt-1 text-sm lg:text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{campaign_objective}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm lg:text-md font-medium leading-6 text-gray-900">Campaign name</dt>
                                <dd className="mt-1 text-sm lg:text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{campaign_name}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm lg:text-md font-medium leading-6 text-gray-900">Campaign Area</dt>
                                <dd className="mt-1 text-sm lg:text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize"><span>{area.city && area.city + ', '}{area.state && area.state + ', '}{area.country}</span></dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm lg:text-md font-medium leading-6 text-gray-900">Assign Date</dt>
                                <dd className="mt-1 text-sm lg:text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(createdAt).toLocaleString()}</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm lg:text-md font-medium leading-6 text-gray-900">Campaign Duration</dt>
                                <dd className="mt-1 text-sm lg:text-md leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{new Date(assign_date?.start).toLocaleDateString()} To {new Date(assign_date?.end).toLocaleDateString()} </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm lg:text-md font-medium leading-6 text-gray-900">Campaign Status</dt>
                                <dd className="mt-2 text-sm lg:text-md text-gray-900 sm:col-span-2 sm:mt-0">

                                </dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm lg:text-md font-medium leading-6 text-gray-900">Entry data</dt>
                                <dd className="mt-2 text-sm lg:text-md text-gray-900 sm:col-span-2 sm:mt-0">

                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        )
    }
}
export async function getServerSideProps(context) {
    return {
        props: { campaign_id: context.query.id }
    }
}

export default Private(Campaign_entry)