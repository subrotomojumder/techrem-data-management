import { useGetEmployeeTaskQuery } from '@/app/features/dataEntire/assignTaskApi';
import { LargeSpinner } from '@/components/Spinner';
import { TeleAndFieldProtect } from '@/utils/ProtectRoute';
import { DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsPersonCircle, BsSearch } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const Details = () => {
    const [role, setRole] = useState('');
    const [queryData, setQueryData] = useState({ status: 'fresh' });
    const router = useRouter();
    const { slug } = router.query;
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        if (user.role === MARKETER) {
            setRole("marketer_divide")
        } else if (user.role === TELE_MARKETER) {
            setRole("tele_divide")
        } else if (user.role === ON_FIELD_MARKETER) {
            setRole("onField_divide")
        } else if (user.role === DATA_ENTRY_OPERATOR) {
            setRole("dataEntry_divide")
        }
    }, [user]);
    const { data, isLoading, isError, error } = useGetEmployeeTaskQuery(`/divide_work/${role}/${slug}?data=true`);

    let content;
    if (!slug) {
        content = <LargeSpinner></LargeSpinner>
    }
    if (isLoading) {
        content = <LargeSpinner />;
    };
    if (!user.role) {
        content = <LargeSpinner></LargeSpinner>
    }
    // console.log(data, isLoading, isError, error);
    if (isError) {
        if (error.message) {
            content = <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.message}</p>
            </div>
        } else if (error.error) {
            content = <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            content = <div className='text-center w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    } else if (!isLoading && data?.success) {
        console.log(data.data)
        content = <section className="text-gray-600 body-font">
            <div className="w-full flex flex-col mdd:flex-row px-4">
                <div className=" text-center sm:pr-8 sm:py-8">
                    <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                        <BsPersonCircle className='text-6xl' />
                    </div>
                    <div className="">
                        <h2 className="text-left font-medium title-font mt-2 text-gray-900 text-sm md:text-md">Task assign by</h2>
                        <h2 className="text-left font-medium title-font text-gray-900 text-base md:text-lg">{data.data?.executor?.name}({data.data?.executor?.role})</h2>
                        <div className="w-[220px] max-w-[500px] h-1 bg-indigo-500 rounded mb-4"></div>
                        <div className='text-left font-[500] text-md sm:text-base grid gap-2'>
                            <p><span className='inline-block w-[90px]'>In-Total</span>: {data.data?.dataIds?.length} Segments</p>
                            <p><span className='inline-block w-[90px]'>Task Start</span>: {new Date(data.data?.assign_date?.start).toDateString()}</p>
                            <p><span className='inline-block w-[90px]'>Task end</span>: {new Date(data.data?.assign_date?.end).toDateString()}</p>
                            <p><span className='inline-block w-[90px]'>Assign Date</span>: {new Date(data.data?.createdAt).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex-1 sm:py-8 mdd:border-l border-gray-300 mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                    <section className="text-gray-600 body-font h-full relative">
                        <div className='col-span-full bg-slate-200 py-1 flex justify-end h-fit'>
                            <div className='flex justify-end items-center gap-1'>
                                <label className="relative block rounded-md">
                                    <span className="sr-only">Search</span>
                                    <span className="absolute top-[14px] right-0 flex items-center pr-2">
                                        <BsSearch className='active:text-green-300 text-sm' />
                                    </span>
                                    <input
                                        className="w-full text-md placeholder:italic bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 pr-6 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                        placeholder="Search for anything..." type="text" name="search" autoComplete="off"
                                    />
                                </label>
                                <select
                                    onChange={(e) => setQueryData(c => ({ ...c, status: e.target.value }))}
                                    className="text-md bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 py-[5px] pl-1 pr-6 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                >
                                    <option value=''  >All-Status</option>
                                    <option value="fresh" selected>Fresh</option>
                                    <option value="pending">Pending</option>
                                    <option value="complete">Complete</option>
                                    <option value="cancel-call">Cancel-call</option>
                                </select>
                                <input
                                    type="date"
                                    className="text-md bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                                />
                                <p className='text-[13px] font-medium border px-1 rounded text-center'>Unacquit<br /><span className='text-green-500 drop-shadow-md text-sm'>{data?.data?.dataIds?.length}</span></p>
                            </div>
                        </div>
                        <table className="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr className='border-b'>
                                    {/* <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100"></th> */}
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tl rounded-bl">Category</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Address</th>
                                    <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Status</th>
                                    <th className="w-4 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tr rounded-br"></th>
                                </tr>
                            </thead>
                            <tbody>
                            {/* এই কন্ডিশনটা শুধু টেলি মার্কেটের জন্য কাজ করবে যেখানে ফিল্টারটা দেয়া হয়েছে টেলি মার্কেটের কোনদিন নির্দিষ্ট প্রসেসের ডাটা */}
                                {user.role === TELE_MARKETER ?
                                    data?.data?.dataIds?.filter((idData) => queryData.status ? idData.onProcess?.teleMarketer?.process === queryData.status : idData).map(({ businessDetails, onProcess, address, _id }, i) => <tr key={_id} className={`${i % 2 === 0 && 'bg-gray-50'} border-b capitalize`}>
                                        <td className="px-4 py-3 font-medium">
                                            <p className='text-sm border-b inline-block'>{businessDetails?.category}</p> <br />
                                            Name:<span className='text-indigo-500'> {businessDetails?.businessName}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className='text-indigo-500'> {address?.state}, {address?.country} </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className='font-medium text-gray-500'> {onProcess?.teleMarketer?.process ? onProcess?.teleMarketer?.process : "Fresh"}</span>
                                        </td>
                                        <td className="px-4 pl-0 pr-3">
                                            <Link href={`/dashboard/contact_manage/${_id}`}><button className='border border-yellow-200 hover:border-white px-2 rounded-lg font-medium text-md py-1 text-yellow-400 hover:text-white hover:bg-orange-400 active:bg-orange-500 duration-75'>Contact</button></Link>
                                        </td>
                                    </tr>)
                                    :user.role === ON_FIELD_MARKETER &&
                                    data?.data?.dataIds?.filter((idData) => queryData.status ? idData.onProcess?.onfieldMarketer?.process === queryData.status : idData).map(({ businessDetails, onProcess, address, _id }, i) => <tr key={_id} className={`${i % 2 === 0 && 'bg-gray-50'} border-b capitalize`}>
                                        <td className="px-4 py-3 font-medium">
                                            <p className='text-sm border-b inline-block'>{businessDetails?.category}</p> <br />
                                            Name:<span className='text-indigo-500'> {businessDetails?.businessName}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className='text-indigo-500'> {address?.state}, {address?.country} </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className='font-medium text-gray-500'> {onProcess?.onfieldMarketer?.process ? onProcess?.onfieldMarketer?.process : "Fresh"}</span>
                                        </td>
                                        <td className="px-4 pl-0 pr-3">
                                            <Link href={`/dashboard/contact_manage/${_id}`}><button className='border border-yellow-200 hover:border-white px-2 rounded-lg font-medium text-md py-1 text-yellow-400 hover:text-white hover:bg-orange-400 active:bg-orange-500 duration-75'>Contact</button></Link>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </section>
    }
    return (
        <div className='min-h-[95vh] body-font max-w-6xl xxl:max-w-7xl my-4 mx-auto'>
            <h1 className='text-xl md:text-2xl text-center font-serif font-medium'>Your tasks details</h1>
            {content}
        </div>
    );
};

export default TeleAndFieldProtect(Details) ;