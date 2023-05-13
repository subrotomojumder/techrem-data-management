import { usePostCategoryMutation } from "@/app/features/others/othersApi"
import categoryImage from '../../assets/images/category.png'
import Image from "next/image";
import { SmallSpinner } from "../Spinner";
import { errorToast, successToast } from "@/utils/neededFun";

export default function CategoryAddForm(currentCategory, setCurrentCategory) {

    const [postNewCategory, { isLoading, }] = usePostCategoryMutation();
    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const data = {
            main: form.main?.value,
            sub1: form.sub1?.value
        }
        postNewCategory(data)
        .then(res => {
            console.log(res);
            if (res.data?.success) {
                successToast("New category add successful!")
                form.reset();
            } else {
                errorToast("Something went wrong!")
            }
        });
    }

    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-start px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        src={categoryImage}
                        className="mx-auto h-10 w-auto"
                        width={300} height={100}
                        alt="Your category"
                    />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Business Data Category
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-3" action="#" method="POST">
                        <div>
                            <label htmlFor="main" className="block text-sm font-medium leading-6 text-gray-900">
                                Main Category
                            </label>
                            <div className="mt-2">
                                <input
                                    id="main" name="main" type="main" required
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="sub1" className="block text-sm font-medium leading-6 text-gray-900">
                                    Sub Category
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="sub1" name="sub1" type="text"
                                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isLoading ? <SmallSpinner /> : " Added"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
