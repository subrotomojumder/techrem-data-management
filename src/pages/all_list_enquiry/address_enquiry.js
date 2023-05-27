import { LargeSpinner } from '@/components/Spinner';
import React, { useEffect, useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { TbCircleChevronDown } from 'react-icons/tb';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Private } from '@/utils/ProtectRoute';
import { useDeleteAddressMutation, useGetAllAddressQuery } from '@/app/features/address/addressApi';
import AddressAddForm from '@/components/Forms/AddressAddFrom';
import { errorToast, successToast } from '@/utils/neededFun';
import { CgArrowsExchangeV } from 'react-icons/cg';

const Address_enquiry = () => {
    const [selectedData, setSelectedData] = useState(null);
    const [toggleState, setToggleState] = useState({});
    const [queryData, setQueryData] = useState({});
    const [items, setItems] = useState([]);
    const [sortAscending, setSortAscending] = useState(true);
    const { data, isLoading, isError, error } = useGetAllAddressQuery(`/address?keyword=${queryData.keyword || ''}`);
    const [addressDeleteApi] = useDeleteAddressMutation();
    useEffect(() => {
        if (data?.success) {
            setItems(data.data)
        }
    }, [data]);
    useEffect(() => {
        const sortedItems = [...items].sort((a, b) => {
            const nameA = a.country.toLowerCase();
            const nameB = b.country.toLowerCase();

            if (nameA < nameB) {
                return sortAscending ? -1 : 1;
            }
            if (nameA > nameB) {
                return sortAscending ? 1 : -1;
            }
            return 0;
        });
        setItems(sortedItems);
    }, [sortAscending]);

    const addressDelete = (id, property) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't delete category!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                addressDeleteApi({ [property]: id })
                    .then(res => {
                        console.log(res);
                        if (res.data?.success) {
                            successToast("Delete successful!");
                        } else {
                            errorToast("Something went wrong!")
                        }
                    });
            }
        })
    }
    if (isLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.message) {
            return <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.message}</p>
            </div>
        } else if (error.error) {
            return <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else if (error.data.message) {
            return <div className='w-full min-h-screen flex justify-center items-center -pt-20'>
                <p className="text-2xl text-red-500">{error.data.dev_err || error.data.message}</p>
            </div>
        }
    };
    if (data.success) {
        if (!selectedData?.openInput) {
            return (
                <div className="w-full overflow-x-auto">
                    <div className="w-full shadow ring-1 ring-gray-200 bg-white sm:rounded-lg">
                        <div className='flex justify-between items-center mx-auto py-3 md:py-4 px-2 md:px-4'>
                            <h2 className="text-xl md:text-2xl  font-medium smm:font-semibold leading-5 lg:leading-10 tracking-tight text-gray-900">Address</h2>
                            <div className='w-full flex justify-end items-center gap-3'>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center pl-3">
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        onChange={(e) => setQueryData(c => ({ ...c, keyword: e.target.value }))}
                                        className="block w-full max-w-sm rounded-md border-0 bg-white py-1.5 pl-3 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                                        type="search" id="search" placeholder="Search"
                                    />
                                </div>
                                <button
                                    onClick={() => setSelectedData({ openInput: true, method: "Add new country" })}
                                    type="button"
                                    className="rounded-md bg-indigo-600 whitespace-pre px-2.5 py-1.5 text-md md:text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    + New Country
                                </button>
                            </div>
                        </div>
                        <div className="min-w-full divide-y divide-gray-200">
                            <div className='flex justify-between bg-gray-100'>
                                <h5 className="flex-1 py-3.5 pl-8 pr-3 w-full text-left text-md font-semibold text-gray-900">
                                    Country <button onClick={() => setSortAscending(!sortAscending)}><CgArrowsExchangeV className={`inline-block ${sortAscending && "rotate-180"} text-2xl hover:bg-slate-50 rounded-md  text-green-500 duration-500`} /></button>
                                </h5>
                                <h5 className="w-56 px-3 md:px-5 py-3.5 text-center text-md font-semibold text-gray-900">
                                    Action
                                </h5>
                            </div>
                            <div className="bg-white h-[80vh] overflow-y-auto">
                                {data.data.length < 1 ? <div className='mt-10 md:mt-40 text-red-500 text-lg text-center'><p>Empty Address!</p></div>
                                    : items.filter(country => !!queryData?.keyword ? country.country.toLowerCase().includes(queryData.keyword.toLowerCase()) : country)
                                        .map((country, i) => (
                                            <div key={i} className={`${toggleState.country === country.country && "bg-[#f4f7f7] "}`}>
                                                <div className={`hover:bg-slate-50 flex justify-between items-center border-b border-gray-200 `}>
                                                    <p onClick={() => setToggleState(c => ({ country: c.country !== country.country ? country.country : null, state: '' }))} className=" flex-1 py-3 pl-4 pr-3 text-md md:text-base font-medium text-gray-900 capitalize cursor-default">
                                                        <TbCircleChevronDown className={`inline-block -mt-1 mr-2 text-gray-400 ${toggleState.country !== country.country ? " -rotate-90" : "text-gray-600 "}`} />{country.country}
                                                        {/*  <a href={`#country${i}`}>
                                                            </a> */}
                                                    </p>
                                                    <div className='w-52 grid grid-cols-3'>
                                                        <div className="col-span-1 whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                                                            <button
                                                                onClick={() => setSelectedData({ openInput: true, country: country, countryDis: true, method: "Add new state" })}
                                                                className="flex justify-center items-center gap-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-md border px-2 py-1 text-sm font-medium text-gray-500 active:text-gray-700 duration-75"
                                                            >
                                                                + New
                                                            </button>
                                                        </div>
                                                        <div className="col-span-1 whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                                                            <button
                                                                onClick={() => setSelectedData({ openInput: true, country: country, method: "Update country" })}
                                                                className="flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-md border px-2 py-1 text-sm font-medium text-gray-500 active:text-gray-700 duration-75">
                                                                <FaEdit /> Edit
                                                            </button>
                                                        </div>
                                                        <div className="col-span-1 whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                                                            <button
                                                                onClick={() => addressDelete(country.id, "country")} type="button"
                                                                className="rounded px-2 py-1.5 text-sm font-semibold text-gray-900 hover:shadow bg-slate-100 hover:bg-slate-200"
                                                            >
                                                                <TrashIcon className='w-4 h-4'></TrashIcon>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                {toggleState.country === country.country && country.state?.length > 0 && <div className='ml-6 md:ml-8 border border-t-0 border-r-0 rounded-bl-lg border-gray-200'>
                                                    {country?.state?.map((state, i) =>
                                                        <div key={i} className={i !== 0 && 'border-t border-gray-200'}>
                                                            <div className={`flex justify-between items-center hover:bg-slate-50 ${i + 1 < country.state.length && "border-b"} border-gray-200`}>
                                                                <p onClick={() => setToggleState(c => ({ ...c, state: c.state !== state.name ? state.name : null }))} className=" flex-1 py-3 pl-4 pr-3 text-md md:text-base font-medium text-gray-900 capitalize cursor-default">
                                                                    <TbCircleChevronDown className={`inline-block -mt-1 mr-2 text-gray-400 ${toggleState.state !== state.name ? " -rotate-90" : "text-gray-600 "}`} />{state.name}
                                                                </p>
                                                                <div className='w-52 grid grid-cols-3'>
                                                                    <div className="col-span-1 whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                                                                        <button
                                                                            onClick={() => setSelectedData({ openInput: true, country: country, state: state, countryDis: true, stateDis: true, method: "Add new city" })}
                                                                            className="flex justify-center items-center gap-2 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 rounded-md border px-2 py-1 text-sm font-medium text-gray-500 active:text-gray-700 duration-75"
                                                                        >
                                                                            + New
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-span-1 whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                                                                        <button
                                                                            onClick={() => setSelectedData({ openInput: true, state: state, country: country, countryDis: true, method: "Update state" })}
                                                                            className="flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-md border px-2 py-1 text-sm font-medium text-gray-500 active:text-gray-700 duration-75">
                                                                            <FaEdit /> Edit
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-span-1 whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                                                                        <button
                                                                            onClick={() => addressDelete(state.id, "state")} type="button"
                                                                            className="rounded px-2 py-1.5 text-sm font-semibold text-gray-900 hover:shadow bg-slate-100 hover:bg-slate-200"
                                                                        >
                                                                            <TrashIcon className='w-4 h-4'></TrashIcon>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {toggleState.country === country.country && toggleState.state === state.name && state?.city?.length > 0 && <div className='ml-6 md:ml-8 border border-t-0 border-r-0 rounded-bl-lg border-gray-200'>
                                                                {state?.city?.map((city, i) =>
                                                                    <div key={i} className={i !== 0 && 'border-t border-gray-200'}>
                                                                        <div className='flex justify-between items-center hover:bg-slate-50'>
                                                                            <p className=" flex-1 py-3 pl-4 pr-3 text-md md:text-base font-medium text-gray-900 capitalize cursor-default">
                                                                                {city.name}
                                                                            </p>
                                                                            <div className='w-52 grid grid-cols-3'>
                                                                                <div className="col-span-1 whitespace-nowrap px-3 py-3 text-sm text-gray-500">

                                                                                </div>
                                                                                <div className="col-span-1 whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                                                                                    <button
                                                                                        onClick={() => setSelectedData({ openInput: true, state: state, city: city, country: country, countryDis: true, stateDis: true, method: "Update City" })}
                                                                                        className="flex justify-center items-center gap-2 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-md border px-2 py-1 text-sm font-medium text-gray-500 active:text-gray-700 duration-75">
                                                                                        <FaEdit /> Edit
                                                                                    </button>
                                                                                </div>
                                                                                <div className="col-span-1 whitespace-nowrap px-3 py-3 text-sm text-gray-500">
                                                                                    <button
                                                                                        onClick={() => addressDelete(city.id, "city")} type="button"
                                                                                        className="rounded px-2 py-1.5 text-sm font-semibold text-gray-900 hover:shadow bg-slate-100 hover:bg-slate-200"
                                                                                    >
                                                                                        <TrashIcon className='w-4 h-4'></TrashIcon>
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                )}
                                                            </div>}
                                                        </div>
                                                    )}
                                                </div>}
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <AddressAddForm selectedData={selectedData} setSelectedData={setSelectedData}></AddressAddForm>
        }
    };
};

export default Private(Address_enquiry);