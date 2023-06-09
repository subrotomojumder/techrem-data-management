import { useDeleteOurServiceMutation, useGetOurServiceQuery } from "@/app/features/others/othersApi"
import { LargeSpinner } from "@/components/Spinner"
import { Private } from "@/utils/ProtectRoute"
import { errorToast, successToast } from "@/utils/neededFun"
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid"
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { useState } from "react"
import Swal from "sweetalert2"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function ServiceList() {
    const [search, setsearch] = useState('')
    const { data, isLoading, isError, error } = useGetOurServiceQuery(`/service_we_offer?active=all`);
    const [deleteService] = useDeleteOurServiceMutation();
    console.log(data);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't to delete service!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteService(id)
                    .then(res => {
                        console.log(res);
                        if (res.data?.success) {
                            successToast("Service delete successful!");
                        } else {
                            errorToast("Something went wrong!")
                        }
                    });
            }
        })
    };

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
        return (
            <section className="max-w-[1900px] min-h-screen mx-auto p-5">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex sm:items-center max-w-[74rem] justify-between ">
                        <div className=" flex justify-start items-center">
                            <h1 className="text-base md:text-lg font-semibold leading-6 text-gray-900 -ml-5 ">Our services</h1>
                            {/* <p className="mt-2 text-sm text-gray-700">
                                A list of all the users in your account including their name, title, email and role.
                            </p> */}

                        </div>
                        <div className=" sm:ml-16 sm:mt-0 sm:flex-none -mr-5 lgg:-mr-0 flex gap-2">
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center pl-3">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <input
                                    onChange={(e) => setsearch(e.target.value)}
                                    className="block w-full max-w-sm rounded-md border-0 bg-white py-1.5 pl-3 pr-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus:outline-none sm:text-sm sm:leading-6"
                                    type="search" id="search" placeholder="Search"
                                />
                            </div>
                            <Link href={`/all_list_enquiry/our_service/create-service`}>
                                <button
                                    type="button"
                                    className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                                >
                                    Add service
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 flow-root max-w-6xl">
                        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle">
                                <table className="min-w-full border-separate border-spacing-0 border-2">
                                    <thead className="">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell "
                                            >
                                                Actions
                                            </th>

                                            {/*  <th
                                                scope="col"
                                                className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                                            >
                                                <span className="sr-only">Edit</span>
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {data.data.filter(weOffer => !!search.toLowerCase() ? weOffer.name.toLowerCase().includes(search.toLowerCase()) : weOffer).map((service, serviceIdx) => (
                                            <tr key={serviceIdx} >
                                                <td
                                                    className={classNames(
                                                        serviceIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                                                    )}
                                                >
                                                    {service.name}
                                                </td>
                                                <td
                                                    className={classNames(
                                                        serviceIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                                                    )}
                                                >
                                                    {service.active ? 'Active' : "Deactive"}
                                                </td>

                                                <td
                                                    className={classNames(
                                                        serviceIdx !== data.data.length - 1 ? 'border-b border-gray-200' : '',
                                                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                                                    )}
                                                >
                                                    <div className="flex items-center justify-center ml-6">
                                                        <Link
                                                            href={`/all_list_enquiry/our_service/${service._id}`}
                                                            className=" transition-colors duration-200 dark:hover:text-indigo-500 hover:text-indigo-500 focus:outline-none"
                                                        >
                                                            <PencilSquareIcon
                                                                className="h-6 w-6"
                                                                aria-hidden="true"
                                                            />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(service._id)}
                                                            className="text-red-600 ml-6 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                                                        >
                                                            <TrashIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Private(ServiceList)