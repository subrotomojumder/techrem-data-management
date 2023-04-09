import React from 'react';

const AssignTask = () => {
    return (
        <div className='max-w-lg md:max-w-2xl lg:max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-2 md:py-2 lg:py-4 md:my-2'>
            <h2 className="text-gray-900 text-lg md:text-xl mb-1 font-medium title-font uppercase">Assign task</h2>
            <p className="leading-relaxed mb-2 text-gray-600 w-80 md:w-full">Help us with your valuable information so that we can benefit you.</p>
            <div className='grid grid-cols-1 lg:grid-cols-2  divide-x-2 gap-3'>
                <div className='col-span-1 lg:grid grid-cols-2 gap-x-3 h-fit'>
                    <hr className='col-span-full' />
                    <div className="relative my-4 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Select task type *</label>
                        <select name='busiCategory' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out" >
                            <option selected disabled >Select task type</option>
                            <option value="E-Commerce">Field marketing</option>
                            <option value="E-Commerce">Telemarketing</option>
                            <option value="E-Commerce">Grocery</option>
                            <option value="Agency">Agency</option>
                            <option value="Add New">Add New</option>
                        </select>
                    </div>
                    <div className="relative my-4 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Choose worker *</label>
                        <select name='busiSize' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-2 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out" >
                            <option selected disabled >Select name</option>
                            <option value="Large">Rohim Ulla</option>
                            <option value="Medium">Monir Khan</option>
                            <option value="Small">Small</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="relative mb-4 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Task address *</label>
                        <div className='flex justify-center'>
                            <input
                                value={'Bangladesh'} type="text" disabled
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            <input
                                value={'Noakhali'} type="text" disabled
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>
                    </div>
                    <div className="relative mb-4 w-full">
                        <label className="leading-7 font-[600] text-gray-700">Location *</label>
                        <input
                            type="text" placeholder='Other address'
                            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 py-1 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                    <div className='col-span-full bg-slate-200 py-1 flex justify-between h-fit'>
                        <input
                            // value={inputData?.branchQty} onChange={(e) => setInputData({ ...inputData, branchQty: e.target.value < 0 ? 0 : parseFloat(e.target.value) })}
                            name='quantity' type="number" id='qty' placeholder='QTY'
                            className="max-w-[80px] text-center placeholder:text-gray-800 w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm font-medium outline-none text-gray-700 pl-2 pr-1 ml-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                        <div className='flex justify-end gap-1'>
                            <input
                                type="date"
                                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-800 px-3 mt-1 leading-8 transition-colors duration-200 ease-in-out"
                            />
                            <p className='text-sm font-medium border px-1 rounded'>Task <br /> <span className='text-green-500 drop-shadow-md'>2050</span></p>
                        </div>
                    </div>
                </div>
                <main className='col-span-1 px-4'>
                    <section class="text-gray-600 body-font">
                        <table class="table-auto w-full text-left whitespace-no-wrap">
                            <thead>
                                <tr>
                                    <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Business</th>
                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">address</th>
                                    <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="w-10 text-center">
                                        <input name="plan" type="checkbox" />
                                    </td>
                                    <td class="px-4 py-3">Start</td>
                                    <td class="px-4 py-3">5 Mb/s</td>
                                    <td class="px-4 py-3 text-lg text-gray-900">Free</td>
                                </tr>
                                <tr>
                                    <td class="w-10 text-center">
                                        <input name="plan" type="checkbox" />
                                    </td>
                                    <td class="px-4 py-3">Start</td>
                                    <td class="px-4 py-3">5 Mb/s</td>
                                    <td class="px-4 py-3 text-lg text-gray-900">Free</td>
                                </tr>
                                <tr>
                                    <td class="w-10 text-center">
                                        <input name="plan" type="checkbox" />
                                    </td>
                                    <td class="px-4 py-3">Start</td>
                                    <td class="px-4 py-3">5 Mb/s</td>
                                    <td class="px-4 py-3 text-lg text-gray-900">Free</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AssignTask;