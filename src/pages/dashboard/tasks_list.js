import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { LargeSpinner } from '@/components/Spinner';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import React from 'react';
import { BsSearch } from 'react-icons/bs';

const TasksList = () => {
    const router = useRouter();
    const { data, isLoading, isError, error } = useGetAllDataQuery("tele_marketer_data=true&process=pending");
    console.log(data);
    let content;
    if (isLoading) {
        content = <LargeSpinner />;
    };
    if (isError) {
        if (error.error) {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else {
            content = <div className='text-center mt-10 md:mt-52'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    } else if (!isLoading && data?.success) {
        if (data?.data?.length === 0) {
            content = <h3 className='text-2xl text-green-500 text-center mt-[20%]'>Empty submission !</h3>
        } else {
            content = <section className="text-gray-600 body-font border border-gray-400 h-full relative">
                <div className='col-span-full bg-slate-200 py-1 flex justify-between h-fit'>
                    <input

                        name='quantity' type="number" id='qty' placeholder='QTY'
                        className="max-w-[80px] text-center placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm font-medium outline-none text-gray-700 pl-2 pr-1 ml-1 leading-8 transition-colors duration-200 ease-in-out"
                    />
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
                        <input
                            type="date"
                            className="w-full text-md bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <p className='text-[13px] font-medium border px-1 rounded text-center'><span className='text-green-500 drop-shadow-md text-sm'>{data?.data?.length}</span><br />Available</p>
                    </div>
                </div>
                <table className="table-auto w-full text-left whitespace-no-wrap">
                    <thead>
                        <tr>
                            <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tr rounded-br"></th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tl rounded-bl">Business</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Address</th>
                            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.success && data.data.map((entire, i) => <tr onClick={()=> router.push('/dashboard/data_manage')} key={entire._id} className={`${i % 2 === 0 && 'bg-indigo-50'}`}>
                            <td className="w-10 text-center">
                                
                            </td>
                            <td className="px-4 py-3">{entire.businessDetails?.businessName}</td>
                            <td className="px-4 py-3">{entire.address?.country}, {entire.address?.district}</td>
                            <td className="px-4 py-3 text-base text-gray-900">{format(new Date(entire.date), 'yyyy-MM-dd')}</td>
                        </tr>)}
                    </tbody>
                </table>
            </section>
        };
    };
    return (
        <div className="text-gray-600 body-font max-w-6xl xxl:max-w-7xl min-h-[95vh] mx-auto">
            {content}
        </div>
    );
};


export default TasksList;

// content = <div className=' grid grid-cols-1 md:grid-cols-2 lggg:grid-cols-3 gap-4 lg:max-w-5xl lggg:max-w-6xl xl:max-w-7xl mx-4 smm:mx-16 md:mx-4 lg:mx-auto mt-5'>
// {data?.data?.map((data, i) => <div key={i} className='w-full  px-4 py-2 smm:py-4  md:py-2 lg:py- bg-white rounded drop-shadow'>
//     <button className='text-xs bg-slate-50 p-1 rounded-full active:text-green-400 absolute top-2 right-4'><BsThreeDotsVertical className='font-bold' /></button>
//     <h2 className="text-gray-900 font-medium text-[0.625rem] uppercase">Data No - {++i}</h2>
//     <p className="leading-relaxed text-xs -mt-1 text-gray-600">Owners :- {data?.ownerName}</p>
//     <hr />
//     <Link href={`/dashboard/data_manage`}>
//         <div className='flex justify-start items-center text-md '>
//             <img src={data.busiLogo} className='w-12 mr-1' alt="company logo" />
//             <div className="relative mt-1 grid grid-cols-7 gap-3">
//                 <p className="leading-7 text-gray-700 col-span-3">Business Name :</p>
//                 <p className='col-span-4 font-[600]'>{data.busiName}</p>
//                 <p className="leading-7 -mt-4 text-gray-700 col-span-3">Location <span className='ml-12'>:</span></p>
//                 <p className='col-span-4 -mt-4 font-[600]'>{data.district}, {data.country}</p>
//             </div>
//         </div>
//     </Link>
// </div>)}
// </div>