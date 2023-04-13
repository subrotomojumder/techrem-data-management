import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import React, { useEffect, useState } from 'react';
import { EmptyLoader } from './Spinner';
import { errorToast } from '@/utils/neededFun';
import { format } from 'date-fns'
import { BsSearch } from 'react-icons/bs';

const TeleAndFieldAssignForm = ({ employee, userQuery }) => {
    const [selectedData, setSelectedData] = useState([]);
    const [autoSelect, setAutoSelect] = useState(0);
    const { data, isLoading, isError, error } = useGetAllDataQuery(``);
    useEffect(() => {
        setTimeout(() => {
            if (data?.success) {
                for (let i = 0; i < autoSelect; i++) {
                    const newId = data.data[i]._id;
                    if (!selectedData.includes(newId)) {
                        setSelectedData(current => [...current, newId])
                    }
                }
            }
        }, 500)
    }, [autoSelect]);
    const handleChecked = (entireId) => {
        if (selectedData.includes(entireId)) {
            setSelectedData(current => [...current.filter(id => id !== entireId)])
        } else {
            setSelectedData(current => [...current, entireId])
        }
    }
    console.log(selectedData);
    if (!employee?.role) {
        return <EmptyLoader otherText={`Please select ${userQuery?.role} name!`}></EmptyLoader>
    }
    if (isLoading) {
        return <EmptyLoader isLoading={isLoading}></EmptyLoader>
    }
    if (isError) {
        // console.log(error);
        if (error?.error) {
            return errorToast(error.error);
        } else if (error.data.message) {
            return errorToast(error.data.message);
        }
    }
    if (!isLoading && !data?.success) {
        return errorToast(data.message);
    }
    return (
        <section className="text-gray-600 body-font border border-gray-400 h-full">
            <div className='col-span-full bg-slate-200 py-1 flex justify-between h-fit'>
                <input
                    value={autoSelect}
                    onChange={(e) => setAutoSelect(e.target.value < 0 ? 0 : e.target.value < data?.data?.length ? e.target.value : data?.data?.length)}
                    name='quantity' type="number" id='qty' placeholder='QTY'
                    className="max-w-[80px] text-center placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm font-medium outline-none text-gray-700 pl-2 pr-1 ml-1 leading-8 transition-colors duration-200 ease-in-out"
                />
                <p className='font-semibold text-lg  mt-1'>{selectedData?.length}</p>
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
                    {data?.success && data.data.map((entire, i) => <tr key={entire._id} className={`${i % 2 === 0 && 'bg-indigo-50'}`}>
                        <td className="w-10 text-center">
                            {/* <input onClick={()=>  setSelectedData([...selectedData, entire._id])} name="plan" type="checkbox" /> */}
                            <input checked={selectedData.includes(entire._id)} onClick={() => handleChecked(entire._id)} name="plan" type="checkbox" />
                        </td>
                        <td className="px-4 py-3">{entire.businessDetails?.businessName}</td>
                        <td className="px-4 py-3">{entire.address?.country}, {entire.address?.district}</td>
                        <td className="px-4 py-3 text-base text-gray-900">{format(new Date(entire.date), 'yyyy-MM-dd')}</td>
                    </tr>)}
                </tbody>
            </table>
        </section>
    );
};

export default TeleAndFieldAssignForm;