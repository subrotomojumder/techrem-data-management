import { usePostGroupDataMutation } from '@/app/features/dataEntire/groupDataApi';
import { SmallSpinner } from '@/components/Spinner';
import { errorToast, successToast } from '@/utils/neededFun';
import React, { useState } from 'react';
import { useForm} from 'react-hook-form';

const GroupEntire = () => {
    const [adminsData, setAdminsData] = useState({});
    const [adminQty, setAdminQty] = useState(1);
    const [postData, { isLoading, isError, error }] = usePostGroupDataMutation();
    const { register, handleSubmit,  reset, formState: { errors } } = useForm();
    
    const submitFun = data => {
        let admins = [];
        for (const key in adminsData) {
            let item = adminsData[key];
            item.serialNo = key;
            admins.push(item);
        }
        if (Object.keys(adminsData).length === admins.length) {
            data.admins = admins;
            postData(data).then(res => {
                if(res.data?.success){
                    reset();
                    return successToast("Successfully group data submited!");
                }
                if(!res.data?.success){
                    return errorToast(res.data.message);
                }
                console.log(res);
                if (res.error?.data?.message) {
                    return errorToast(res.error?.data.message)
                }
            })
        }
    }
    const clearForm = () => {
        reset();
    }
    // console.log(adminsData);
    return (
        <div className='min-h-screen'>
            <form onSubmit={handleSubmit(submitFun)} className='max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto px-6 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 md:my-5 bg-white rounded drop-shadow'>
                <h1 className='text-lg my-2 font-medium uppercase'>Group data collection form</h1>
                <hr />
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label className="leading-7 font-[600] text-gray-700 col-span-3">Group Category *</label>
                    <select
                        {...register("category", { required: "category field is required!" })}
                        className="col-span-7 md:col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    >
                        <option value='' selected disabled >Select category</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Salon">Salon</option>
                        <option value="Grocery">Grocery</option>
                        <option value="E-Commerce">E-Commerce</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Barber Shop">Barber Shop</option>
                        <option value="Agency">Agency</option>
                        <option value="Add New">Add New</option>
                    </select>
                    {errors.category?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm col-span-6 text-right'>{errors.category?.message}</p>}
                </div>
                <div className="relative mb-4 mt-0 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='group_followers' className="leading-7 font-[600] text-gray-700 col-span-3">Group followers *</label>
                    <input
                        {...register("followers", { required: "Followers field is required!" })}
                        min="0" type="number" id='group_followers' placeholder='Group followers....'
                        className="col-span-7 md:col-span-3 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    {errors.followers?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm text-end col-span-6'>{errors.followers?.message}</p>}
                </div>
                <div className="relative mb-4 mt-0 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='group_name' className="leading-7 font-[600] text-gray-700 col-span-3">Group name *</label>
                    <input
                        {...register("name", { required: "Name field is required!" })}
                        type="text" id='group_name' placeholder='Enter group name....'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                {errors.name?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mt-3 text-end'>{errors.name?.message}</p>}
                <div className="relative mb-4 mt-2 md:mt-8 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                    <label htmlFor='group_link' className="leading-7 font-[600] text-gray-700 col-span-3">Group link *</label>
                    <input
                    // {...register("link", { required: "Group link is required!", pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, message: 'Password must be strong!' }})}
                    {...register("link", { required: "Group link is required!", pattern: { value: /^(ftp|http|https):\/\/[^ "]+$/, message: 'Link must be valid url!' }})}
                        type="text" id='group_link' placeholder='Enter group link....'
                        className="col-span-4 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                {errors.link?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mt-3 text-end'>{errors.link?.message}</p>}
                {errors.link?.type === 'pattern' && <p role="alert" className='pl-4px text-red-500 text-sm -mt-3 text-end'>{errors.link?.message}</p>}
                {/* <div className={`${!inputData.other_business?.isOther_business ? 'h-7' : 'h-24 md:h-20'} overflow-y-hidden duration-300`}> */}
                <div className={``}>
                    <div>
                        <label className='leading-7 font-[600] text-gray-700 col-span-3'>Admin details of the group *</label>
                    </div>
                    {[...Array(adminQty)].map((admin, i) => <div key={i}>
                        <h4 className='text-center text-sm font-medium text-orange-400 underline'>Admin - {++i}</h4>
                        <div className="relative mb-2 mt-1 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                            <label htmlFor='' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                            <input
                                onChange={(e) => setAdminsData({ ...adminsData, [`admin-${i}`]: { ...adminsData[`admin-${i}`], name: e.target.value } })}
                                type="text" placeholder='Admin name'
                                className="col-span-4 placeholder:text-gray-900 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-2 mt-1 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                            <label htmlFor='' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                            <input
                                onChange={(e) => setAdminsData({ ...adminsData, [`admin-${i}`]: { ...adminsData[`admin-${i}`], phone: e.target.value } })}
                                type="text" placeholder='Enter phone number'
                                className="col-span-4 placeholder:text-gray-900 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                        <div className="relative mb-2 mt-1 grid grid-cols-1 md:grid-cols-7 gap-x-3">
                            <label htmlFor='' className="leading-7 font-[600] text-gray-700 col-span-3"></label>
                            <input
                                onChange={(e) => setAdminsData({ ...adminsData, [`admin-${i}`]: { ...adminsData[`admin-${i}`], email: e.target.value } })}
                                type="email" placeholder='Enter email address...'
                                className="col-span-4 placeholder:text-gray-900 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>)}
                    <div className='flex justify-end'> <p onClick={() => setAdminQty(c => c + 1)} className="text-white bg-red-400 border-0 h-8  whitespace-pre text-sm py-[6px] px-4 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded font-semibold select-none inline cursor-pointer">+ New Admin</p></div>
                </div>
                <div className="relative mb-4 mt-2 md:mt-4">
                    <label htmlFor='information' className="leading-7 font-[600] text-gray-700">Write another information</label>
                    <textarea
                        {...register("note", { required: "Note field is required!" })}
                        type="text" id='information' placeholder='Text.......'
                        className="w-full bg-white rounded-sm min-h-[100px] border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-md outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                </div>
                {errors.note?.type === 'required' && <p role="alert" className='pl-4px text-red-500 text-sm -mt-3 text-end'>{errors.note?.message}</p>}
                <div className='flex  item-center justify-start'>
                    <button type='reset' onClick={clearForm} className="text-white bg-red-400 border-0  h-10 w-[90px] py-2 px-6 mr-2 focus:outline-none hover:bg-red-500 active:bg-red-600 rounded font-semibold select-none inline cursor-pointer">Clear</button>
                    <button
                        type='submit' disabled={isLoading}
                        className={`h-10 w-[90px] py-2 rounded-md disabled:bg-blue-500 disabled:cursor-not-allowed bg-blue-700 hover:bg-blue-800 active:outline outline-green-600  disabled:outline-none font-semibold text-white flex justify-center items-center`}
                    > {isLoading ? <SmallSpinner /> : "Submit"}</button>
                </div>
            </form>
        </div>
    );
};

export default GroupEntire;