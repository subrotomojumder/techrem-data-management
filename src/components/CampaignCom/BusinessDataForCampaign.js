import React, { useState } from 'react';
import { EmptyLoader, LargeSpinner } from '../Spinner';
import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';

const BusinessDataForCampaign = ({ setTogglePage, campaignData }) => {
    const [selectedData, setSelectedData] = useState([]);
    const [autoSelect, setAutoSelect] = useState(0);
    const [inputData, setInputData] = useState({ start: '', end: '', keyword: "" });

    let url_query = ''
    // `fild_marketer_data=true&tele_marketer_data=true&process=${dataStatus?.value || ""}&keyword=${inputData.keyword}&country=${addressQuery?.country || ""}&state=${addressQuery?.state || ''}&city=${addressQuery?.city || ""}`;
    // if (employee.role === TELE_MARKETER) {
        url_query = `tele_marketer_data=true&keyword=${inputData.keyword}`;
    // };
    const { data, isLoading, isError, error } = useGetAllDataQuery(url_query);
    // const [postField_TeleTasks, { isLoading: postLoading }] = usePostField_TelemarketerTaskMutation();
    // useEffect(() => {
    //     if (data?.success) {
    //         for (let i = 0; i < autoSelect; i++) {
    //             const newId = data.data[i]._id;
    //             if (!selectedData.includes(newId)) {
    //                 setSelectedData(current => [...current, newId])
    //             }
    //         }
    //     }
    // }, [autoSelect]);
    const handleChecked = (entireId) => {
        if (selectedData.includes(entireId)) {
            setSelectedData(current => [...current.filter(id => id !== entireId)])
        } else {
            setSelectedData(current => [...current, entireId])
        }
    };
    const submit = () => {
        if (selectedData.length < 1) {
            return errorToast("Please select assign task names!")
        }
        // if (new Date(inputData.end).getTime() - new Date(inputData.start).getTime() < 1) {
        //     return errorToast("Task submission date must be after the start date!")
        // }
        // let task_data = {
        //     [`${employee.role === TELE_MARKETER ? "teleMarketer" : "onfieldMarketer"}`]: {
        //         name: employee.name,
        //         account_id: employee._id
        //     },
        //     dataIds: selectedData,
        //     assign_date: {
        //         start: inputData.start,
        //         end: inputData.end
        //     }
        // }
        // let postUrl = `/divide_work/${employee.role === TELE_MARKETER ? "tele_divide" : "onField_divide"}`;
        // // return console.log(postUrl);
        // postField_TeleTasks({ task_data, postUrl }).then(res => {
        //     // console.log(res);
        //     if (res.error) errorToast("Some thing went wrong!");
        //     if (res.data?.success) {
        //         successToast("Successfully submited task!");
        //         setInputData({ keyword: "" });
        //         setSelectedData([]);
        //         setAutoSelect(0);
        //     }
        //     if (res.data?.success === false) errorToast(res.data.message);
        // }).catch(e => console.log(e));
    };
    if (isLoading) {
        return <LargeSpinner></LargeSpinner>
    }
    if (isError) {
        // console.log(error);
        if (error?.error) {
            return errorToast(error.error);
        } else if (error.data.message) {
            return errorToast(error.data.message);
        }
    }
    return (
        <div className="w-full max-w-2xl h-fit py-6 mdd:py-10 bg-white rounded-lg drop-shadow-sm relative">
            <button
                onClick={() => setTogglePage(1)} type="button"
                className="absolute top-8 right-8 rounded-full bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-red-500 shadow-sm hover:bg-indigo-200"
            >X</button>
            <div className="my-6 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-3" action="#" method="POST">
                    <div>
                        <label htmlFor="main" className="block text-md font-medium leading-6 text-gray-900">
                            Main Category *
                        </label>
                        <div className="mt-2">
                            <input

                                id="main" name="main" type="main" required placeholder="Enter main category..."
                                className="block w-full rounded-md border-0 disabled:cursor-not-allowed py-1.5 px-2 capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center pt-5">
                        <button
                            type="submit"
                            className="w-40 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                        >
                            {"Continue"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BusinessDataForCampaign;