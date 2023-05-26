import countryImage from '../../assets/images/world.png'
import Image from "next/image";
import { SmallSpinner } from "../Spinner";
import { errorToast, successToast } from "@/utils/neededFun";
import { usePostAddressMutation, useUpdateAddressMutation } from "@/app/features/address/addressApi";

export default function AddressAddForm({ selectedData, setSelectedData }) {
    const [updateExAddress, { isLoading: updateLoading, }] = useUpdateAddressMutation();
    const [postNewAddress, { isLoading, }] = usePostAddressMutation();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        // return console.log({ country: { id: selectedData.country.id, name: form.country?.value} });
        if (selectedData?.method === "Update country") {
            updateExAddress({ country: { id: selectedData.country.id, name: form.country?.value, } })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Update successful!")
                        setSelectedData(null)
                        form.reset();
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        } else if (selectedData?.method === "Update state") {
            updateExAddress({ state: { id: selectedData.state?.id, name: form.state.value } })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Update successful!")
                        setSelectedData(null)
                        form.reset();
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        } else if (selectedData?.method === "Update city") {
            updateExAddress({ city: { id: selectedData.city?.id, name: form.city.value } })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Update successful!")
                        setSelectedData(null)
                        form.reset();
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        } else {
            postNewAddress({ country: form.country?.value, state: form.state?.value, city: form.city.value })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("New add successful!")
                        setSelectedData(null)
                        form.reset();
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        }
    }

    return (
        <>
            <div className='w-full'>
                <div className="w-full max-w-2xl h-fit py-6 mx-auto mdd:py-10 bg-white rounded-lg shadow-sm relative">
                    <button
                        onClick={() => setSelectedData(null)} type="button"
                        className="absolute top-8 right-8 rounded-full bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-red-500 shadow hover:bg-indigo-200"
                    >X</button>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image
                            src={countryImage}
                            className="mx-auto h-10 w-auto"
                            width={300} height={100}
                            alt="Your category"
                        />
                        <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            {selectedData.method}
                        </h2>
                    </div>
                    <div className="my-6 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleSubmit} className="space-y-3" action="#" method="POST">
                            <div>
                                <label htmlFor="country" className="block text-md font-medium leading-6 text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={selectedData.country?.country || ''} disabled={selectedData.countryDis}
                                        id="country" name="country" type="text" required placeholder="Enter country category..."
                                        className="block w-full rounded-md border-0 disabled:cursor-not-allowed py-1.5 px-2 capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                    />
                                </div>
                            </div>
                            {selectedData?.method !== "Update country" && <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="state" className="block text-md font-medium leading-6 text-gray-900">
                                        State
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        defaultValue={selectedData.state?.name || ''} disabled={selectedData.stateDis}
                                        id="state" name="state" type="text" placeholder="Enter sub category..."
                                        className="block w-full rounded-md border-0 disabled:cursor-not-allowed py-1.5 px-2 capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                    />
                                </div>
                            </div>}
                            {!(selectedData?.method === "Update country" || selectedData.method === 'Update state') &&<div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="city" className="block text-md font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        defaultValue={selectedData.city?.name || ''}
                                        id="city" name="city" type="text" placeholder="Enter sub category..."
                                        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                    />
                                </div>
                            </div>}
                            <div className="flex justify-center pt-5">
                                <button
                                    type="submit" disabled={isLoading || updateLoading}
                                    className="w-40 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
                                >
                                    {(isLoading || updateLoading) ? <SmallSpinner /> : "Continue"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
