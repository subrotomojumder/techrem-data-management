import React from 'react';
import { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { useGetMainCtgQuery, useGetSubCtg1Query, useGetSubCtg2Query, usePostCategoryMutation } from '../../app/features/others/categoriesApi';

const AddressAddForm = ({addressValue, setAddressValue}) => {
    const [openAddress, setOpenAddress] = useState({ country: false, state: false, subdistrict: false });
    const [addressAdd, setAddressAdd] = useState({ country: false, state: false, subdistrict: false });
    const { data: mainCategories, isLoading, isError, error } = useGetMainCtgQuery();
    // console.log(mainCategories);
    const { data: subCategories1, } = useGetSubCtg1Query({ mainCategory: addressValue?.country });
    const { data: subCategories2, } = useGetSubCtg2Query({ mainCategory: addressValue?.country, subCategory1: addressValue?.state });
    // const [postCategory, { isLoading: postLoading, }] = usePostCategoryMutation();

    // const handlePostCategory = async () => {
    //     const result = await postCategory(addressValue);
    //     console.log(result)
    // }

    let categories;
    if (isLoading) {
        categories = [];
        return;
    };
    if (isError) {
        categories = []
        if (error.error) {
            return console.log(error);
        } else {
            return console.log(error.data.massage)
        }
    };
    if (!isLoading && mainCategories?.success) {
        categories = mainCategories.data;
    };
    return (
        <div className='h-fit w-full rounded-lg '>
            <div className='w-full grid smm:grid-cols-2 mdd:grid-cols-3 gap-4'>
                <div className="w-full pb-2 relative">
                    <label htmlFor='serviceman' className="">Main Category</label>
                    <div className='w-full select-none mt-1 relative flex justify-start items-center gap-1'>
                        {addressAdd.country ?
                            <div className='w-full'>
                                <input
                                    onChange={(e) => setAddressValue({ ...addressValue, country: e.target.value })}
                                    placeholder={`Main Category`}
                                    className="w-full text-gray-800 bg-slate-200 py-[6px] px-3 border focus:outline-gray-600 border-blue-500 rounded-md"
                                />
                                {/* {errors.category?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.category?.message}</p>} */}
                            </div>
                            : <div className='w-full'>
                                <div
                                    onClick={() => {
                                        setOpenAddress({ country: !openAddress.country })
                                    }}
                                    className={`w-full font-semibold border border-blue-500 px-3 py-[6px] ${openAddress.country && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-200 px-3 py-[6px] rounded-md flex justify-between whitespace-pre`}>
                                    <p>{addressValue.country ? addressValue.country : "Main Category"}</p>
                                    <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${openAddress.country || "-rotate-90"}`} />
                                </div>
                                {openAddress.country &&
                                    <div
                                        onMouseLeave={() => {
                                            setOpenAddress({ ...openAddress, country: false })
                                        }}
                                        className='border border-gray-400 bg-slate-100 py-1 w-full absolute z-40 top-10 left-0 h-[150px] overflow-y-scroll'
                                    >
                                        {categories.map((main, i) => <div key={i} >
                                            <p
                                                onClick={() => {
                                                    setAddressValue({ country: main.name })
                                                    setOpenAddress({ ...openAddress, country: false })
                                                }}
                                                className={`font-medium hover:bg-blue-500 px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                            >{main.name}</p>
                                        </div>)}
                                    </div>}
                            </div>
                        }
                        <div
                            onClick={() => setAddressAdd({ addressAdd, country: !addressAdd.country })}
                            className='mt-1 text-2xl cursor-pointer text-gray-500 hover:text-white active:text-blue-500 hover:bg-gray-300 border border-gray-300 active:border-white duration-75 select-none rounded-full'
                        >
                            {React.createElement(addressAdd.country ? BiMinus : BiPlus, { size: "20" })}
                        </div>
                    </div>
                </div>
                <div className="w-full pb-2 relative">
                    <label htmlFor='serviceman' className=""> Sub Category</label>
                    <div className='select-none mt-1 relative w-full flex justify-start items-center gap-1'>
                        {addressAdd.state ?
                            <div className='w-full'>
                                <input
                                    onChange={(e) => setAddressValue({ ...addressValue, state: e.target.value })}
                                    placeholder={`Sub Category`}
                                    className="w-full text-gray-800 bg-slate-200 py-[6px] px-3 border focus:outline-gray-600 border-blue-500 rounded-md"
                                />
                                {/* {errors.category?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.category?.message}</p>} */}
                            </div>
                            : <div className='w-full'>
                                <div
                                    onClick={() => {
                                        setOpenAddress({ state: !openAddress.state })
                                    }}
                                    className={`w-full font-semibold border border-blue-500 px-3 py-[6px] ${openAddress.state && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-200 px-3 py-[6px] rounded-md flex justify-between whitespace-pre`}>
                                    <p>{addressValue.state ? addressValue.state : "Sub Category"}</p>
                                    <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${!openAddress.state && "-rotate-90"}`} />
                                </div>
                                {addressValue.country && openAddress.state &&
                                    <div
                                        onMouseLeave={() => {
                                            setOpenAddress({ ...openAddress, state: false })
                                        }}
                                        className='border border-gray-400 bg-slate-100 py-1 w-full absolute z-40 top-10 left-0 h-[150px] overflow-y-scroll'
                                    >
                                        {subCategories1?.data?.map((sub1, i) => <div key={i} >
                                            <p
                                                onClick={() => {
                                                    setAddressValue({ ...addressValue, state: sub1.name, subdistrict: "" })
                                                    setOpenAddress({ ...openAddress, state: false })
                                                }}
                                                className={`font-medium hover:bg-blue-500 px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                            >{sub1.name}</p>
                                        </div>)}
                                    </div>}
                            </div>}
                        <div
                            onClick={() => setAddressAdd({ addressAdd, state: !addressAdd.state })}
                            className='mt-1 text-2xl cursor-pointer text-gray-500 hover:text-white active:text-blue-500 hover:bg-gray-300 border border-gray-300 active:border-white duration-75 select-none rounded-full'
                        >
                            {React.createElement(addressAdd.state ? BiMinus : BiPlus, { size: "20" })}
                        </div>
                    </div>
                    {/* {bookManSlotPhone.slotError && <p role="alert" className='pl-4px text-sm'>{bookManSlotPhone.slotError}</p>} */}
                </div>
                <div className="w-full pb-2 relative">
                    <label htmlFor='serviceman' className=""> Extra Category</label>
                    <div className='select-none mt-1 relative w-full flex justify-start items-center gap-1'>
                        {addressAdd.subdistrict ?
                            <div className='w-full'>
                                <input
                                    onChange={(e) => setAddressValue({ ...addressValue, subdistrict: e.target.value })}
                                    placeholder={`Sub Category`}
                                    className="w-full text-gray-800 bg-slate-200 py-[6px] px-3 border focus:outline-gray-600 border-blue-500 rounded-md" 
                                />
                                {/* {errors.category?.type === 'required' && <p role="alert" className='pl-4px text-sm -mb-4'>{errors.category?.message}</p>} */}
                            </div>
                            : <div className='w-full'>
                                <div
                                    onClick={() => {
                                        setOpenAddress({ subdistrict: !openAddress.subdistrict })
                                    }}
                                    className={`w-full font-semibold border border-blue-500 px-3 py-[6px] ${openAddress.subdistrict && "text-gray-500 outline outline-1 outline-blue-700 px-2 py-[4.8px]"} bg-slate-200 px-3 py-[6px] rounded-md flex justify-between whitespace-pre`}>
                                    <p>{addressValue.subdistrict ? addressValue.subdistrict : "Extra Category"}</p>
                                    <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${!openAddress.subdistrict && "-rotate-90"}`} />
                                </div>
                                {addressValue.state && openAddress.subdistrict &&
                                    <div
                                        onMouseLeave={() => {
                                            setOpenAddress({ ...openAddress, subdistrict: false })
                                        }}
                                        className='border border-gray-400 bg-slate-100 py-1 w-full absolute z-40 top-10 left-0 h-[150px] overflow-y-scroll'
                                    >
                                        {subCategories2?.data?.map((sub2, i) => <div key={i} >
                                            <p
                                                onClick={() => {
                                                    setAddressValue({ ...addressValue, subdistrict: sub2.name })
                                                    setOpenAddress({ ...openAddress, subdistrict: false })
                                                }}
                                                className={`font-medium hover:bg-blue-500 px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                                            >{sub2.name}</p>
                                        </div>)}
                                    </div>}
                            </div>}
                        <div
                            onClick={() => setAddressAdd({ addressAdd, subdistrict: !addressAdd.subdistrict })}
                            className='mt-1 text-2xl cursor-pointer text-gray-500 hover:text-white active:text-blue-500 hover:bg-gray-300 border border-gray-300 active:border-white duration-75 select-none rounded-full'
                        >
                            {React.createElement(addressAdd.subdistrict ? BiMinus : BiPlus, { size: "20" })}
                        </div>
                    </div>
                </div>
                {addressValue.error && <p role="alert" className='pl-4px text-sm -mt-6'>{addressValue.error}</p>}
            </div>
        </div>
    );
};

export default AddressAddForm;