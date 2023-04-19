import { useGetAllAddressQuery, usePostAddressMutation } from '@/app/features/address/addressApi';
import { errorToast } from '@/utils/neededFun';
import React from 'react';
import { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { LargeSpinner } from '../Spinner';

const AddressAddForm = ({ addressValue, setAddressValue, classes }) => {
    // const [addressValue, setAddressValue] = useState({ country: "", state: "", city: "" })
    const [openAddress, setOpenAddress] = useState({ country: false, state: false, city: false });
    const [addressAdd, setAddressAdd] = useState({ country: false, state: false, city: false });
    const [currentAddress, setCurrentAddress] = useState({ states: [], cities: [] });
    const { data, isLoading, isError, error } = useGetAllAddressQuery('');
    // const [postAddress, { isLoading: postLoading, }] = usePostAddressMutation();

    // const handlePost = async () => {
    //     const result = await postAddress(addressValue);
    //     console.log(result)
    // }

    let countryData = [];
    if (isLoading) {
        return <LargeSpinner />
    };
    if (isError) {
        if (error.error) {
            return errorToast(error);
        } else {
            return errorToast(error.data.massage)
        }
    };
    if (!isLoading && data?.success) {
        countryData = data.data
    };
    // console.log(countryData);
    return (
        <div className='w-full'>
            <div className="w-full pb-2 relative">
                <label htmlFor='serviceman' className={classes.label}>Country *</label>
                <div className='w-full select-none mt-1 relative flex justify-start items-center gap-1'>
                    {addressAdd.country ?
                        <div className='w-full'>
                            <input
                                onChange={(e) => setAddressValue({ ...addressValue, country: e.target.value })}
                                placeholder={`Add new country`}
                                className="w-full text-gray-800 py-[6px] px-3 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                        </div>
                        : <div className='w-full'>
                            <div
                                onClick={() => {
                                    setOpenAddress({ country: !openAddress.country })
                                }}
                                className={`w-full border border-blue-500 px-3 py-[6px] ${openAddress.country && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-50 px-3 py-[6px] rounded-md flex justify-between whitespace-pre`}>
                                <p>{addressValue.country ? addressValue.country : "Select country"}</p>
                                <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${openAddress.country || "-rotate-90"} duration-100`} />
                            </div>
                            {openAddress.country && countryData.length > 0 &&
                                <div
                                    onMouseLeave={() => {
                                        setOpenAddress({ ...openAddress, country: false })
                                    }}
                                    className='border border-gray-400 bg-slate-100 py-2 w-[95%] absolute z-40 top-10 left-0 max-h-[150px] overflow-y-scroll'
                                >
                                    {countryData.map((country, i) => <div key={i} >
                                        <p
                                            onClick={() => {
                                                setAddressValue({ country: country.country })
                                                setCurrentAddress({ ...currentAddress, states: country.state })
                                                setOpenAddress({ ...openAddress, country: false })
                                            }}
                                            className={`font-medium hover:bg-blue-500 px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                        >{country.country}</p>
                                    </div>)}
                                </div>}
                        </div>
                    }
                    <div
                        onClick={() => setAddressAdd({ addressAdd, country: !addressAdd.country })}
                        className='mt-1 text-2xl cursor-pointer text-gray-500 hover:text-white active:text-blue-500 hover:bg-gray-300 border border-gray-300 active:border-white duration-75 select-none rounded-full'
                    >
                        {React.createElement(addressAdd.country ? BiMinus : BiPlus, { size: "18" })}
                    </div>
                </div>
            </div>
            <div className="w-full pb-2 relative">
                <label htmlFor='serviceman' className={classes.label}> State / Province *</label>
                <div className='select-none mt-1 relative w-full flex justify-start items-center gap-1'>
                    {addressAdd.state ?
                        <div className='w-full'>
                            <input
                                onChange={(e) => setAddressValue({ ...addressValue, state: e.target.value })}
                                placeholder={`Add new state`}
                                className="w-full text-gray-800 py-[6px] px-3 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                        </div>
                        : <div className='w-full'>
                            <div
                                onClick={() => {
                                    setOpenAddress({ state: !openAddress.state })
                                }}
                                className={`w-full border border-blue-500 px-3 py-[6px] ${openAddress.state && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-50 px-3 py-[6px] rounded-md flex justify-between whitespace-pre`}>
                                <p>{addressValue.state ? addressValue.state : "Select state"}</p>
                                <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${!openAddress.state && "-rotate-90"} duration-100`} />
                            </div>
                            {addressValue.country && openAddress.state && currentAddress.states.length > 0 &&
                                <div
                                    onMouseLeave={() => {
                                        setOpenAddress({ ...openAddress, state: false })
                                    }}
                                    className='border border-gray-400 bg-slate-100 py-2 w-[95%] absolute z-40 top-10 left-0 max-h-[150px] overflow-y-scroll'
                                >
                                    {currentAddress.states.map((state, i) => <div key={i} >
                                        <p
                                            onClick={() => {
                                                setAddressValue({ ...addressValue, state: state.name, city: "" })
                                                setCurrentAddress({ ...currentAddress, cities: state.city })
                                                setOpenAddress({ ...openAddress, state: false })
                                            }}
                                            className={`font-medium hover:bg-blue-500 px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                        >{state.name}</p>
                                    </div>)}
                                </div>}
                        </div>}
                    <div
                        onClick={() => setAddressAdd({ addressAdd, state: !addressAdd.state })}
                        className='mt-1 text-2xl cursor-pointer text-gray-500 hover:text-white active:text-blue-500 hover:bg-gray-300 border border-gray-300 active:border-white duration-75 select-none rounded-full'
                    >
                        {React.createElement(addressAdd.state ? BiMinus : BiPlus, { size: "18" })}
                    </div>
                </div>
            </div>
            <div className="w-full pb-2 relative">
                <label htmlFor='serviceman' className={classes.label}>City / Suburb *</label>
                <div className='select-none mt-1 relative w-full flex justify-start items-center gap-1'>
                    {addressAdd.city ?
                        <div className='w-full'>
                            <input
                                onChange={(e) => setAddressValue({ ...addressValue, city: e.target.value })}
                                placeholder={`Add new city`}
                                className="w-full text-gray-800 py-[6px] px-3 border focus:outline-gray-600 border-blue-500 rounded-md"
                            />
                        </div>
                        : <div className='w-full'>
                            <div
                                onClick={() => {
                                    setOpenAddress({ city: !openAddress.city })
                                }}
                                className={`w-full border border-blue-500 px-3 py-[6px] ${openAddress.city && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-50 px-3 py-[6px] rounded-md flex justify-between whitespace-pre`}>
                                <p>{addressValue.city ? addressValue.city : "Select city"}</p>
                                <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${!openAddress.city && "-rotate-90"}`} />
                            </div>
                            {addressValue.state && openAddress.city && currentAddress.cities.length > 0 &&
                                <div
                                    onMouseLeave={() => {
                                        setOpenAddress({ ...openAddress, city: false })
                                    }}
                                    className='border border-gray-400 bg-slate-100 py-2 w-[95%] absolute z-40 top-10 left-0 max-h-[150px] overflow-y-scroll'
                                >
                                    {currentAddress.cities.map((city, i) => <div key={i} >
                                        <p
                                            onClick={() => {
                                                setAddressValue({ ...addressValue, city: city.name })
                                                setOpenAddress({ ...openAddress, city: false })
                                            }}
                                            className={`font-medium hover:bg-blue-500 px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                        >{city.name}</p>
                                    </div>)}
                                </div>}
                        </div>}
                    <div
                        onClick={() => setAddressAdd({ addressAdd, city: !addressAdd.city })}
                        className='mt-1 text-2xl cursor-pointer text-gray-500 hover:text-white active:text-blue-500 hover:bg-gray-300 border border-gray-300 active:border-white duration-75 select-none rounded-full'
                    >
                        {React.createElement(addressAdd.city ? BiMinus : BiPlus, { size: "18" })}
                    </div>
                </div>
            </div>
            {addressValue.error && <p role="alert" className='pl-4px text-sm -mt-6'>{addressValue.error}</p>}
        </div>
    );
};

export default AddressAddForm;


