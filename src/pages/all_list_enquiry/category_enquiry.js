import { useGetAllCategoryQuery } from '@/app/features/others/othersApi';
import { LargeSpinner } from '@/components/Spinner';
import React, { useState } from 'react';
import { Disclosure, Transition } from '@headlessui/react'
import { PlusSmallIcon, TrashIcon } from '@heroicons/react/24/outline'
import { BiEditAlt } from 'react-icons/bi';
import { SlLock, SlLockOpen } from 'react-icons/sl';
import CategoryAddForm from '@/components/Forms/CategoyAddForm';

const Category_enquiry = () => {
    const [currentCategory, setCurrentCategory] = useState(null);
    const { data, isLoading, isError, error } = useGetAllCategoryQuery(`/catagory`);
    console.log(data);
    if (isLoading) {
        return <LargeSpinner />;
    };
    if (isError) {
        if (error.message) {
            return <div className='text-center my-10 md:my-40'>
                <p className="text-2xl text-red-500">{error.message}</p>
            </div>
        } else if (error.error) {
            return <div className='text-center my-10 md:my-40'>
                <p className="text-2xl text-red-500">{error.error}</p>
            </div>
        } else if (error.data.message) {
            return <div className='text-center my-10 md:my-40'>
                <p className="text-2xl text-red-500">{error.data.dev_err || error.data.message}</p>
            </div>
        }
    };
    if (data.success) {
        if (!currentCategory?.openInput) {
            return (
                <div className="w-full min-h-screen ">
                    <div className="mx-auto max-w-7xl px-6 py-4 sm:py-8 lg:px-8 lg:py-12">
                        <div className="mx-auto max-w-2xl divide-y divide-gray-900/10">
                            <div className='md:flex justify-between items-center'>
                                <h2 className="text-xl md:text-2xl xl:text-3xl font-medium smm:font-bold leading-5 lg:leading-10 tracking-tight text-gray-900">Category of Business data</h2>
                                <div className='space-x-2 flex justify-end'>
                                    <input
                                        type="text" placeholder='Filters'
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    />
                                    <button
                                        onClick={() => setCurrentCategory({openInput: true})}
                                        type="button"
                                        className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Add New
                                    </button>
                                </div>
                            </div>
                            <dl className="mt-6 lg:mt-10 space-y-4 divide-y divide-gray-900/10">
                                {data?.data?.map((category, idxMain) => (
                                    <Disclosure as="div" key={idxMain} className="pt-4">
                                        {({ open }) => (
                                            <>
                                                <dt className='flex w-full items-start justify-between text-left text-gray-900'>
                                                    <div className='flex justify-start items-center pl-8 pr-14'>
                                                        <Disclosure.Button className="flex justify-start items-center">
                                                            <span className="mr-4 flex h-7 items-center">
                                                                {open ? (
                                                                    <SlLockOpen className="h-5 w-5" aria-hidden="true" />
                                                                ) : (
                                                                    <SlLock className="h-5 w-5" aria-hidden="true" />
                                                                )}
                                                            </span>
                                                            <span className="text-base font-semibold leading-7  capitalize">{category.main}</span>
                                                        </Disclosure.Button>
                                                    </div>
                                                    <div className='space-x-1'>
                                                        <button
                                                            type="button"
                                                            className="rounded-full px-1.5 py-1 text-sm font-semibold text-gray-900 hover:shadow hover:bg-gray-50"
                                                        >
                                                            <PlusSmallIcon className='w-5 h-5'></PlusSmallIcon>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="rounded-full px-2 py-1.5 text-sm font-semibold text-gray-900 hover:shadow hover:bg-gray-50"
                                                        >
                                                            <BiEditAlt className='w-4 h-4'></BiEditAlt>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="rounded-full px-2 py-1.5 text-sm font-semibold text-gray-900 hover:shadow hover:bg-gray-50"
                                                        >
                                                            <TrashIcon className='w-4 h-4'></TrashIcon>
                                                        </button>
                                                    </div>
                                                </dt>
                                                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                                                    {!category.sub1.length || category.sub1.length < 0 ? <p className='text-center'>Empty sub category!</p> :
                                                        category.sub1.map((sub, idx) => (<div key={idx} className='flex justify-between items-center px-16'>
                                                            <p className='capitalize'>{++idx}. {sub.name}</p>
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-full px-2 py-1.5 text-sm font-semibold text-gray-900 hover:shadow hover:bg-gray-50"
                                                                >
                                                                    <BiEditAlt className='w-4 h-4'></BiEditAlt>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="rounded-full px-2 py-1.5 text-sm font-semibold text-gray-900 hover:shadow hover:bg-gray-50"
                                                                >
                                                                    <TrashIcon className='w-4 h-4'></TrashIcon>
                                                                </button>
                                                            </div>
                                                        </div>))
                                                    }
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <CategoryAddForm currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}></CategoryAddForm>
        }
    };
};

export default Category_enquiry;

