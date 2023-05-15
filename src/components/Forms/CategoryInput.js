import { useGetAllCategoryQuery } from '@/app/features/others/othersApi';
import React from 'react';
import { useState } from "react";
import { IoMdArrowDropdown } from 'react-icons/io';


const CategoryInput = ({ selectedValue, setSelectedValue, ownClass }) => {
    const [open, setOpen] = useState(false);
    const [openMainChild, setOpenMainChild] = useState({})
    const { data: cateData, isLoading, isError } = useGetAllCategoryQuery(`/category`);
    const data = cateData || { success: true, data: [] };

    if (isError) {
        return <div className='text-center align-middle'>
            <p className="text-sm mt-1 text-red-500">Something went wrong in category!</p>
        </div>
    }
    if (data.success) {
        return (
            <div
                onMouseLeave={() => {
                    setOpen(false);
                    setOpenMainChild({})
                }}
                className='select-none relative'
            >
                <div onClick={() => {
                    setOpen(!open)
                }} className={`capitalize ${ownClass.input} ${open && ownClass.focus}`}>
                    <p>{!data?.data?.length ? "Please Add" : selectedValue?.sub1 ? selectedValue.sub1 : selectedValue?.main ? selectedValue.main : "Select category"}</p>
                    <IoMdArrowDropdown size={20} className={`ml-auto mt-[2px] ${!open && "-rotate-90"} duration-100`} />
                </div>
                {open &&
                    <div
                        className={`border border-gray-400 bg-slate-100 py-1 w-full ${ownClass.position} max-h-[160px] md:max-h-[300px] overflow-y-scroll overflow-x-hidden`}
                    >
                        {data?.data?.length && data?.data?.map((main, i) => <div key={i} >
                            <p
                                onClick={() => {
                                    setSelectedValue({ main: main.main })
                                    setOpenMainChild({ [main.main]: !openMainChild[main.main] ? main.main : "" })
                                }}
                                className={`font-medium capitalize hover:bg-blue-500 ${openMainChild[main.main] && "bg-blue-500 text-white"} px-3 hover:text-white duration-100 cursor-pointer border-b pb-[2px]`}
                            >{main.main}</p>

                            {openMainChild[main.main] &&
                                <div className='py-2 bg-green-100 w-full shadow-sm border'>
                                    {
                                        !main?.sub1?.length || main?.sub1?.map((sub, i) => <li
                                            onClick={() => {
                                                setSelectedValue({ ...selectedValue, sub1: sub.name });
                                                setOpen(false);
                                            }}
                                            key={i}
                                            className="list-none capitalize pl-6 hover:text-white hover:bg-blue-500 hover:font-semibold active:bg-orange-500 active:text-white cursor-pointer"
                                        >
                                            {sub.name}
                                        </li>)
                                    }
                                </div>
                            }
                        </div>)}
                    </div>}
            </div>
        )
    }
};

export default CategoryInput;