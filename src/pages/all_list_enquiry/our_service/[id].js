import { useUpdateOurServiceMutation } from "@/app/features/others/othersApi";
import { LargeSpinner, SmallSpinner } from "@/components/Spinner";
import { Private } from "@/utils/ProtectRoute";
import { errorSweetAlert, errorToast, successToast } from "@/utils/neededFun";
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
                const result = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_DEV}/service_we_offer/${id}`)
                if (result?.data?.success) {
                    setCategory(result.data.data)
                    setCategoryState(result.data.data.active)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    errorSweetAlert("sumthing is wrong")
                }
            }
            getCategory()
        } catch (error) {
            setIsLoading(false)
            console.log(error);
            errorSweetAlert("sumthing is wrong")
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
            <section className="flex justify-center ">

            <form onSubmit={handleSubmite} className="max-w-sm border-2 bg-slate-50 drop-shadow-xl p-10 rounded-xl h-80">
                <div className="space-y-12 ">
                    <div className="border-gray-900/10">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                            Service update
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3 space-y-4">


                                <label
                                    htmlFor="first-name"
                                    className="block font-medium leading-6 text-gray-900 text-lg"
                                >
                                    Service name
                                </label>
                                <div className="mt-2">
                                    <input
                                        defaultValue={category.name}
                                        type="text"
                                        name="name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-1.5 w-80"
                                    />

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-start">

                   

                        {categoryState ?
                            <p onClick={() => {
                                setCategoryState(c => (!c))
                            }} className='px-4 w-24 mr-2 py-1.5 text-center select-none bg-green-400 font-semibold text-white rounded-md'>Active</p>
                            : <p onClick={() => {
                                setCategoryState(c => (!c))
                            }} className='px-4 w-24 py-1.5 mr-2 text-center select-none bg-red-400 font-semibold text-white rounded-md'>Inactive</p>
                        }


                   
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-1.5 w-20 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {updateLoading ? <SmallSpinner /> : <span className="">Update</span>}
                    </button>
                </div>
            </form>
            </section>

        </section>
    );
}

export default Private(UpdateService);