import { useUpdateOurServiceMutation } from "@/app/features/others/othersApi";
import { LargeSpinner, SmallSpinner } from "@/components/Spinner";
import { Private } from "@/utils/ProtectRoute";
import { errorToast, successToast } from "@/utils/neededFun";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


function UpdateService() {
    const [isLoading, setIsLoading] = useState(true)
    const [category, setCategory] = useState({})
    const [categoryState, setCategoryState] = useState(false)
    const [serviceUpdate, { isLoading: updateLoading, isSuccess }] = useUpdateOurServiceMutation();

    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        try {
            setIsLoading(true)
            const getCategory = async () => {
                const result = await axios.get(`http://localhost:5000/api/v1/service_we_offer/${id}`)
                if (result.data.success) {
                    setCategory(result.data.data)
                    setCategoryState(result.data.data.active)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                }
            }
            getCategory()
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }, [id, isSuccess]);

    const handleSubmite = async (e) => {
        e.preventDefault()
        const name = e.target.name.value
        serviceUpdate(({ id: id, name, active: categoryState }))
            .then(res => {
                console.log(res);
                if (res.data?.success) {
                    successToast("Service update successful!")
                } else {
                    errorToast("Something went wrong!")
                }
            });
    }
    if (isLoading && !id) {
        return <LargeSpinner />;
    };

    return (
        <section className="max-w-[1900px] min-h-screen mx-auto p-5 ">

            <form onSubmit={handleSubmite} className="max-w-6xl  ">
                <div className="space-y-12">
                    <div className="border-gray-900/10">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Service update
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3 ">


                                <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Service name
                                </label>
                                <div className="mt-2 flex w-full">
                                    <input
                                        defaultValue={category.name}
                                        type="text"
                                        name="name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5"
                                    />
                                    <div className="w-full ">

                                        {categoryState ?
                                            <p onClick={() => {
                                                setCategoryState(c => (!c))
                                            }} className='px-4 w-24 mx-2 py-1.5 text-center select-none bg-green-400 font-semibold text-white rounded-md'>Active</p>
                                            : <p onClick={() => {
                                                setCategoryState(c => (!c))
                                            }} className='px-4 w-24 py-1.5 mx-2 text-center select-none bg-red-400 font-semibold text-white rounded-md'>Inactive</p>
                                        }


                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-start">
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 w-20 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {updateLoading ? <SmallSpinner /> : <span className="">Save</span>}
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Private(UpdateService);