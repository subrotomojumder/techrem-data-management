import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import React, { useEffect, useState } from 'react';
import { EmptyLoader, SmallSpinner } from './Spinner';
import { errorToast, successToast } from '@/utils/neededFun';
import { format } from 'date-fns'
import { BsSearch } from 'react-icons/bs';
import { ON_FIELD_MARKETER, TELE_MARKETER } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { usePostField_TelemarketerTaskMutation } from '@/app/features/dataEntire/assignTaskApi';

const TeleAndFieldAssignForm = ({ employee, dataStatus, addressQuery }) => {
    const [selectedData, setSelectedData] = useState([]);
    const [autoSelect, setAutoSelect] = useState(0);
    const [inputData, setInputData] = useState({ start: '', end: '', keyword: "" });

    let url_query = `fild_marketer_data=true&tele_marketer_data=true&process=${dataStatus?.value}&keyword=${inputData.keyword}&country=${addressQuery.country}&state=${addressQuery.state}&city=${addressQuery.city}`;
    if (employee.role === TELE_MARKETER) {
        url_query = `tele_marketer_data=true&keyword=${inputData.keyword}`;
    };
    const { data, isLoading, isError, error } = useGetAllDataQuery(url_query);
    const [postField_TeleTasks, { isLoading: postLoading }] = usePostField_TelemarketerTaskMutation();
    useEffect(() => {
        if (data?.success) {
            for (let i = 0; i < autoSelect; i++) {
                const newId = data.data[i]._id;
                if (!selectedData.includes(newId)) {
                    setSelectedData(current => [...current, newId])
                }
            }
        }
    }, [autoSelect]);
    const handleChecked = (entireId) => {
        if (selectedData.includes(entireId)) {
            setSelectedData(current => [...current.filter(id => id !== entireId)])
        } else {
            setSelectedData(current => [...current, entireId])
        }
    };
    // console.log(data)
    const submit = () => {
        if (selectedData.length < 1) {
            return errorToast("Please select assign task names!")
        }
        if (!inputData.start) {
            return errorToast("Task assign start date is required!")
        } else if (!inputData.end) {
            return errorToast("Task assign end date is required!")
        }
        if (new Date(inputData.end).getTime() - new Date(inputData.start).getTime() < 1) {
            return errorToast("Task submission date must be after the start date!")
        }
        let task_data = {
            [`${employee.role === TELE_MARKETER ? "teleMarketer" : "onfieldMarketer"}`]: {
                name: employee.name,
                account_id: employee._id
            },
            dataIds: selectedData,
            assign_date: {
                start: inputData.start,
                end: inputData.end
            }
        }
        let postUrl = `/divide_work/${employee.role === TELE_MARKETER ? "tele_divide" : "onField_divide"}`;
        // return console.log(postUrl);
        postField_TeleTasks({ task_data, postUrl }).then(res => {
            // console.log(res);
            if (res.error) errorToast("Some thing went wrong!");
            if (res.data?.success) {
                successToast("Successfully submited task!");
                setInputData({keyword: ""});
                setSelectedData([]);
                setAutoSelect(0);
            }
            if (res.data?.success === false) errorToast(res.data.message);
        }).catch(e => console.log(e));
    };
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
        <section className="text-gray-600 body-font border border-gray-400 h-full relative">
            <div className='col-span-full bg-slate-200 py-1 flex justify-between h-fit'>
                <input
                    min={0}
                    onChange={(e) => setAutoSelect(e.target.value < data?.data?.length ? e.target.value : data?.data?.length)}
                    name='quantity' type="number" id='qty' placeholder='QTY'
                    className="max-w-[80px] text-center placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm h-9 mt-1 font-medium outline-none text-gray-700 pl-2 pr-1 ml-1 leading-8 transition-colors duration-200 ease-in-out"
                />
                <div className='flex justify-end items-center gap-1'>
                    <label className="relative block rounded-md">
                        <span className="sr-only">Search</span>
                        <span className="absolute top-[14px] right-0 flex items-center pr-2">
                            <BsSearch className='active:text-green-300 text-sm' />
                        </span>
                        <input
                            onChange={(e) => setInputData(c => ({ ...c, keyword: e.target.value }))}
                            className="text-md placeholder:italic bg-white rounded border border-gray-300 py-[1px] focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-1 pr-6 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                            placeholder="Search anything..." type="text" name="search" autoComplete="off"
                        />
                    </label>
                    <input
                        type="date"
                        className="text-md bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <p className='text-[13px] font-medium border px-1 rounded text-center'><span className='text-green-500 drop-shadow-md text-sm'>{selectedData?.length}/{data?.data?.length || 0}</span><br />Selected</p>
                </div>
            </div>
            <div className='sticky  top-12 md:top-14 right-0 flex justify-between items-center gap-1 bg-green-400 py-1'>
                <div className='relative ml-1'>
                    <label htmlFor="start" className='whitespace-pre font-semibold text-blue-500 cursor-pointer text-sm absolute left-1 top-2'>Start:</label>
                    <input
                        onChange={(e) => setInputData({ ...inputData, start: e.target.value })} min={format(new Date(), 'yyyy-MM-dd')}
                        type="date" id='start' className={`w-full text-md bg-white rounded border border-gray-300 focus:border-indigo-500 ${!inputData.start && "border-red-500"} focus:ring-2 focus:ring-indigo-200  outline-none text-gray-600  pr-1 pl-10 leading-8 transition-colors duration-200 ease-in-out`}
                    />
                </div>
                <div className='relative'>
                    <label htmlFor="end" className='whitespace-pre font-semibold text-green-500 cursor-pointer text-sm absolute left-1 top-2'>End:</label>
                    <input
                        onChange={(e) => setInputData({ ...inputData, end: e.target.value })} min={inputData?.start || format(new Date(), 'yyyy-MM-dd')}
                        type="date" id='end' className={`w-full text-md bg-white rounded border border-gray-300 focus:border-indigo-500 ${!inputData.end && "border-red-500"} focus:ring-2 focus:ring-indigo-200  outline-none text-gray-600  pr-1 pl-10 leading-8 transition-colors duration-200 ease-in-out`}
                    />
                </div>
                <button
                    onClick={submit} disabled={postLoading}
                    className={`w-20 mx-auto py-2 rounded-md mr-1 disabled:bg-blue-500 disabled:cursor-not-allowed disabled:outline-0 bg-blue-700 hover:bg-blue-800 active:outline outline-green-600  disabled:outline-none font-semibold text-white flex justify-center items-center`}
                >
                    {(postLoading) ? <SmallSpinner /> : "Assign"}
                </button>
            </div>
            <table className="table-auto w-full text-left whitespace-no-wrap">
                <thead>
                    <tr>
                        <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tr rounded-br"></th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100 rounded-tl rounded-bl">Business</th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Address</th>
                        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-green-100">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.success && data.data.map((entire, i) => <tr key={entire._id} className={`${i % 2 === 0 && 'bg-indigo-50'}`}>
                        <td className="w-10 text-center">
                            {/* <input onClick={()=>  setSelectedData([...selectedData, entire._id])} name="plan" type="checkbox" /> */}
                            <input checked={selectedData.includes(entire._id)} onClick={() => handleChecked(entire._id)} name="plan" type="checkbox" readOnly />
                        </td>
                        <td className="px-4 py-3">{entire.businessDetails?.businessName}</td>
                        <td className="px-4 py-3">{entire.address?.country}, {entire.address?.state}</td>
                        <td className="px-4 py-3 text-base text-gray-900">{new Date(entire.updatedAt).toLocaleString()}</td>
                    </tr>)}
                </tbody>
            </table>
        </section>
    );
};

export default TeleAndFieldAssignForm;