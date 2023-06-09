import { usePostCategoryMutation, useUpdateCategoryMutation } from "@/app/features/others/othersApi"
import categoryImage from '../../assets/images/category.png'
import Image from "next/image";
import { SmallSpinner } from "../Spinner";
import { errorToast, successToast } from "@/utils/neededFun";

export default function CategoryAddForm({ currentCategory, setCurrentCategory }) {
    const [updateExCategory, { isLoading: updateLoading, }] = useUpdateCategoryMutation();
    const [postNewCategory, { isLoading, }] = usePostCategoryMutation();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        // return console.log({ main: { id: currentCategory.mainCtg.id, name: form.main?.value, } });
        if (currentCategory?.method === "Update main category") {
            updateExCategory({ main: { id: currentCategory.mainCtg.id, name: form.main?.value, } })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Main category update successful!")
                        setCurrentCategory(null)
                        form.reset();
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        } else if (currentCategory?.method === "Update Sub category") {
            updateExCategory({ sub1: { id: currentCategory.subCtg, name: form.sub1.value } })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("Category update successful!")
                        setCurrentCategory(null)
                        form.reset();
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        } else {
            postNewCategory({ main: form.main?.value, sub1: form.sub1?.value })
                .then(res => {
                    console.log(res);
                    if (res.data?.success) {
                        successToast("New add successful!")
                        setCurrentCategory(null)
                        form.reset();
                    } else {
                        errorToast("Something went wrong!")
                    }
                });
        }
    }

    return (
        <>
            <div className="w-full">
                <div className="w-full max-w-2xl mx-auto h-fit py-6 mdd:py-10 bg-white rounded-lg shadow relative">
                    <button
                        onClick={() => setCurrentCategory(null)} type="button"
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
                            {currentCategory.method}
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
                                        defaultValue={currentCategory.mainCtg?.main || ''} disabled={currentCategory.mainDis}
                                        id="main" name="main" type="main" required placeholder="Enter main category..."
                                        className="block w-full rounded-md border-0 disabled:cursor-not-allowed py-1.5 px-2 capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-md sm:leading-6"
                                    />
                                </div>
                            </div>
                            {currentCategory?.method !== "Update main category" && <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="sub1" className="block text-md font-medium leading-6 text-gray-900">
                                        Sub Category
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        defaultValue={currentCategory.subCtg?.name || ''}
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
