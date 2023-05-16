import { usePostCategoryMutation, useUpdateCategoryMutation } from "@/app/features/others/othersApi"
import categoryImage from '../../assets/images/category.png'
import Image from "next/image";
import { SmallSpinner } from "../Spinner";
import { errorToast, successToast } from "@/utils/neededFun";

export default function AddressAddForm({ selectedData, setSelectedData }) {
    const [updateExCategory, { isLoading: updateLoading, }] = useUpdateCategoryMutation();
    const [postNewCategory, { isLoading, }] = usePostCategoryMutation();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        // return console.log({ main: { id: currentCategory.mainCtg.id, name: form.main?.value, } });
        if (selectedData?.method === "Update main category") {
            updateExCategory({ main: { id: selectedData.mainCtg.id, name: form.main?.value, } })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Main category update successful!")
                        setSelectedData(null)
                        form.reset();
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        } else if (selectedData?.method === "Update Sub category") {
            updateExCategory({ sub1: { id: selectedData.subCtg, name: form.sub1.value } })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Category update successful!")
                        setSelectedData(null)
                        form.reset();
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        } else if (selectedData?.method === "Add new sub category") {
            postNewCategory({ main: form.main?.value, sub1: form.sub1?.value })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("New category add successful!")
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
            <div className="flex min-h-screen flex-1 flex-col justify-start items-center px-6 py-12 lg:px-8">
                <div className="w-full max-w-2xl h-fit py-6 mdd:py-10 bg-white rounded-lg drop-shadow-sm relative">
                    <button
                        onClick={() => setSelectedData(null)} type="button"
                        className="absolute top-8 right-8 rounded-full bg-indigo-50 px-3.5 py-2 text-sm font-semibold text-red-500 shadow-sm hover:bg-indigo-200"
                    >X</button>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <Image
                            src={categoryImage}
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
                                <label htmlFor="main" className="block text-md font-medium leading-6 text-gray-900">
                                    Main Category *
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={selectedData.mainCtg?.main || ''} disabled={selectedData.mainDis}
                                        id="main" name="main" type="main" required placeholder="Enter main category..."
                                        className="block w-full rounded-md border-0 disabled:cursor-not-allowed py-1.5 px-2 capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                    />
                                </div>
                            </div>
                            {selectedData?.method !== "Update main category" && <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="sub1" className="block text-md font-medium leading-6 text-gray-900">
                                        Sub Category
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        defaultValue={selectedData.subCtg?.name || ''}
                                        id="sub1" name="sub1" type="text" placeholder="Enter sub category..."
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
