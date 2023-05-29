import React, { useEffect, useState } from 'react';
import { EmptyLoader, LargeSpinner } from '../Spinner';
import { useGetAllDataQuery } from '@/app/features/dataEntire/dataEntireApi';
import { BsArrowLeftShort, BsArrowRightShort, BsSearch } from 'react-icons/bs';
import { useGetOurServiceQuery } from '@/app/features/others/othersApi';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { TbFilter, TbFilterOff } from 'react-icons/tb';
import CategoryInput from '../Forms/CategoryInput';
import AddressInput from '../Forms/AddressInput';
import { DateRangeInput } from '../Forms/Inputs';
import UserInput from '../../components/Forms/UserInput';
import { CgArrowsExchangeV } from 'react-icons/cg';
import PaginationBar from '../PaginationBar';
import { errorToast } from '@/utils/neededFun';
import { INTERESTED, NOTINTERESTED, NOTSURE } from '@/utils/constant';

const BusinessDataForCampaign = ({ setTogglePage, setCampaignData }) => {
    const [selectedData, setSelectedData] = useState([]);
    const [autoSelect, setAutoSelect] = useState(0);
    const [openFilter, setOpenFilter] = useState(false);
    const [queryData, setQueryData] = useState({});
    const [selectedAddress, setSelectedAddress] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedUser, setSelectedUser] = useState({});
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [stockLimit, setStockLimit] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);
    const searchQuery = `skip=${(currentPage - 1) * stockLimit}&limit=${stockLimit}&main=${selectedCategory?.main || ''}&sub1=${selectedCategory?.sub1 || ''}&country=${selectedAddress?.country || ''}&state=${selectedAddress?.state || ""}&city=${selectedAddress?.city || ""}&keyword=${queryData?.keyword || ''}&account_id=${selectedUser?._id || ''}&we_offer=${queryData.we_offer || ''}&they_offer=${queryData.they_offer || ''}&campaign=${queryData.process_status ? "true" : "false"}&create_date=${queryData?.createDate || ''}&dataRange_start=${startDate && endDate ? startDate : ""}&dataRange_end=${startDate && endDate ? endDate : ""}&sort=${queryData?.sort || ''}&final_process=${queryData.process_status || ""}`;
    const { data, isLoading, isError, error } = useGetAllDataQuery(searchQuery, { refetchOnMountOrArgChange: true });
    console.log(searchQuery)
    useEffect(() => {
        // setSelectedData([]);
        if (data?.success) {
            for (let i = 0; i < autoSelect; i++) {
                const newId = data.data[i]._id;
                if (!selectedData.includes(newId)) {
                    setSelectedData(current => ([...current, newId]))
                }
            }
        }
    }, [autoSelect]);
    const submit = () => {
        if (selectedData.length < 1) {
            return errorToast('Assign data list empty!')
        }
        setCampaignData(c => ({ ...c, dataIds: selectedData }));
        setTogglePage(3);
    };
    const handleChecked = (entireId) => {
        if (selectedData.includes(entireId)) {
            setSelectedData(current => [...current.filter(id => id !== entireId)])
        } else {
            setSelectedData(current => [...current, entireId])
        }
    };
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    if (isLoading) {
        return <LargeSpinner></LargeSpinner>
    }
    if (isError) {
        if (error.error) {
            return <div className='text-center w-full min-h-[50vh] flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else if (error?.data?.message) {
            return <div className='text-center w-full min-h-[50vh] flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.data.message}</p>
            </div>
        }
    }
    return (
        <div className='w-full'>
            <div className='overflow-x-auto'>
                <div className="min-w-fit min-h-[80vh]  ring-1 ring-black ring-opacity-20 sm:mx-0 sm:rounded-lg">
                    <div className='bg-indigo-100 rounded-t shadow-md w-full py-2 px-4 ml-auto flex justify-between items-center gap-2'>
                        <div className='flex justify-start items-center gap-2'>
                            <button
                                onClick={() => setTogglePage(1)}
                                className="rounded-md bg-blue-500 pl-3 pr-3 py-1.5 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                            >
                                <BsArrowLeftShort size={18} className='inline-block -mt-1' /> Previews
                            </button>
                            <input
                                min={0}
                                onChange={(e) => setAutoSelect(e.target.value < data?.data?.length ? e.target.value : data?.data?.length)}
                                name='quantity' type="number" id='qty' placeholder='QTY'
                                className="max-w-[80px] text-center placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm h-9 font-medium outline-none text-gray-700 pl-2 pr-1 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            <p className='text-[13px] font-medium px-1 rounded text-center'><span className='text-green-500 drop-shadow-md text-sm'>{selectedData?.length}/{data?.data?.length || 0}</span><br />Selected Data</p>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    onChange={(e) => setQueryData(c => ({ ...c, keyword: e.target.value }))}
                                    className="block w-full xl:min-w-[300px] max-w-sm rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                                    type="search" id="search" placeholder="Search"
                                />
                            </div>
                            <button
                                onClick={() => setOpenFilter(c => (!c))} type="button"
                                className="rounded-md bg-white pl-4 pr-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                            >
                                Filters {openFilter ? <TbFilterOff className={`inline-block ml-4`} /> : <TbFilter className={`inline ml-4`} />}
                            </button>
                            <button
                                onClick={submit} type="button"
                                className="rounded-md bg-blue-500 pl-4 pr-4 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                            >
                                Next <BsArrowRightShort size={18} className='inline-block -mt-1 ml-1' />
                            </button>
                        </div>
                    </div>
                    <div className={`w-full flex justify-end items-center gap-2 ${openFilter ? "block" : "hidden"} duration-300 bg-gray-50 shadow-md px-3 py-2`}>
                        <CategoryInput selectedValue={selectedCategory} setSelectedValue={setSelectedCategory} ownClass={{ position: " absolute z-40 top-[34px] left-0 ", input: "bg-white rounded-md border border-gray-300 pl-3 py-1 min-w-[200px] flex justify-between items-center text-base outline-none text-gray-700 px-3 transition-colors duration-200 ease-in-out", focus: "border-indigo-500 ring-2 text-gray-700" }}></CategoryInput>
                        <AddressInput selectedValue={selectedAddress} setSelectedValue={setSelectedAddress}></AddressInput>
                        <UserInput usersData={data?.uniqueFilter?.entryBy} selectedUser={selectedUser} setSelectedUser={setSelectedUser} placeHolder={"Entry By"} wornClass={{ input: "placeholder:text-gray-600 rounded-md bg-white pl-4 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" }}></UserInput>
                        <DateRangeInput dateRange={dateRange} setDateRange={setDateRange}></DateRangeInput>
                        <select
                            onChange={(e) => setQueryData(c => ({ ...c, we_offer: e.target.value }))}
                            value={queryData.we_offer || ""}
                            className="rounded-md bg-white pl-2 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        >
                            <option value='' selected >We can offer</option>
                            {data?.uniqueFilter?.weOffer.map((service, i) => <option key={i} value={service} title={service}>{service.length > 15 ? service.slice(0, 15) + "..." : service}</option>)}
                        </select>
                        {/* <select
                            onChange={(e) => setQueryData(c => ({ ...c, they_offer: e.target.value }))}
                            value={queryData.they_offer || ""}
                            className="rounded-md bg-white pl-2 pr-3 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        >
                            <option value='' selected >They offer</option>
                            {data?.uniqueFilter?.theyOffer.map((service, i) => <option key={i} value={service} title={service}>{service.length > 15 ? service.slice(0, 15) + "..." : service}</option>)}
                        </select> */}
                        <select
                            onChange={(e) => setQueryData(c => ({ ...c, process_status: e.target.value }))}
                            value={queryData.process_status || ""}
                            className="rounded-md bg-white pl-2 pr-2 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        >
                            <option value='' selected >Campaign Status</option>
                            <option value={INTERESTED}>Interested Customer</option>
                            <option value={NOTINTERESTED}>Not Interested Customer</option>
                            <option value={NOTSURE}>Not Sure Customer</option>
                        </select>
                        <button
                            onClick={() => {
                                setQueryData({});
                                setSelectedCategory({});
                                setSelectedAddress({});
                                setSelectedUser(null);
                                setDateRange([null, null])
                            }} type="button"
                            className="rounded-md h-fit bg-white px-5 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 hover:bg-gray-50"
                        >
                            Reset
                        </button>
                    </div>
                    <table className="min-w-full divide-y divide-gray-300 lg:px-4">
                        <thead>
                            <tr className='bg-gray-50 smm:rounded-t-xl'>
                                <th scope="col" className="pl-5 py-3.5 text-left text-md font-semibold text-gray-900">
                                    Business
                                </th>
                                <th scope="col" className="py-3.5 px-1 min-w-[150px] text-md font-semibold text-gray-900 sm:pl-6">
                                    Category <button onClick={() => setQueryData(c => ({ ...c, sort: c.sort !== "category1" ? "category1" : "category-1" }))}><CgArrowsExchangeV className={`inline-block ${queryData.sort === "fast" && "rotate-180"} text-2xl hover:bg-slate-50 rounded-md  text-green-500 duration-500`} /></button>
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 hidden lg:table-cell"
                                >
                                    Entry {/* <button onClick={() => setQueryData(c => ({ ...c, sort: c.sort !== "entryby1" ? "entryby1" : "entryby-1" }))}><CgArrowsExchangeV className={`inline-block ${queryData.sort === "fast" && "rotate-180"} text-2xl hover:bg-slate-50 rounded-md  text-green-500 duration-500`} /></button> */}
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-md font-semibold text-gray-900 hidden xl:table-cell whitespace-pre"
                                >
                                    Entry Date <button onClick={() => setQueryData(c => ({ ...c, sort: c.sort !== "date1" ? "date1" : "date-1" }))}><CgArrowsExchangeV className={`inline-block ${queryData.sort === "fast" && "rotate-180"} text-2xl hover:bg-slate-50 rounded-md  text-green-500 duration-500`} /></button>
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-md font-semibold text-gray-900 lg:table-cell text-center"
                                >
                                    Address
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-center text-md font-semibold text-gray-900 whitespace-pre hidden lg:table-cell"
                                >
                                    We-can-offer
                                </th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {data?.data?.length === 0 ?
                                <tr className='w-full text-center'><div className='w-full text-center mt-11 text-2xl text-green-500'>Empty Entire data !</div></tr>
                                : data?.data.map(({ businessDetails, _id, createdAt, address, data_entry_operator, we_offer_service, }, planIdx) => (
                                    <tr key={_id} className='px-4 hover:bg-green-100'>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                                'pl-3 pr-1 py-3.5 text-sm text-gray-700 lg:table-cell'
                                            )}
                                        >
                                            <div className='flex justify-start gap-2 items-center'>
                                                <input checked={selectedData.includes(_id)} onClick={() => handleChecked(_id)} name="plan" type="checkbox" readOnly />
                                                <p className="font-bold text-base text-gray-900 whitespace-pre truncate">{businessDetails?.businessName.length > 20 ? businessDetails?.businessName.slice(0, 20) + '...' : businessDetails?.businessName}</p>
                                            </div>
                                        </td>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                                'px-1 py-3.5 text-sm lg:table-cell font-medium text-center whitespace-pre capitalize'
                                            )}
                                        >
                                            {businessDetails?.category.main} <br />
                                            <span className=''>{businessDetails?.category.sub1 || ''}</span>
                                        </td>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                                'px-2 py-3.5 text-sm text-gray-700 hidden lg:table-cell'
                                            )}
                                        >
                                            <span className="text-gray-900 capitalize whitespace-pre">{data_entry_operator?.name}</span> <br />
                                            {/* <span className="text-gray-900 capitalize whitespace-pre">{data_entry_operator?.account_id?.email}</span> */}
                                        </td>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                                'px-3 py-3.5 text-center text-sm text-gray-700  hidden xl:table-cell'
                                            )}
                                        >
                                            <div className="text-gray-900">{new Date(createdAt).toLocaleDateString()}</div>
                                        </td>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                                'px-3 py-3.5 text-sm text-gray-700 lg:table-cell text-center'
                                            )}
                                        >
                                            <span className="text-gray-900 whitespace-pre">{address?.street_address.length > 20 ? address?.street_address.slice(0, 20) + '...' : address?.street_address}</span> <br />
                                            <span className="inline-block text-gray-900 capitalize whitespace-pre truncate hover:text-clip max-w-[190px]">{address?.city}, {address.state}, {address?.country}</span>
                                        </td>
                                        <td
                                            className={classNames(
                                                planIdx === 0 ? '' : 'border-t border-gray-200',
                                                'px-3 py-3.5 text-sm text-center text-gray-700 hidden lg:table-cell'
                                            )}
                                        >
                                            <div className="text-gray-900 w-40">{!we_offer_service?.length ? "Empty" : <span>{we_offer_service.join(', ').length < 20 ? we_offer_service.join(', ') : we_offer_service.join(', ').slice(0, 20) + '...'} </span>}</div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div >
            <div className='w-full px-4 lg:px-6 py-2'>
                <PaginationBar totalDataLength={data.totalData} stockLimit={stockLimit} setStockLimit={setStockLimit} currentPage={currentPage} setCurrentPage={setCurrentPage}></PaginationBar>
            </div>
        </div>
    );
};

export default BusinessDataForCampaign;