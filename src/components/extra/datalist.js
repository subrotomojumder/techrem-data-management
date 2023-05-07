<table className="table-auto w-full text-left whitespace-no-wrap">
<thead>
    <tr className='border-b'>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Logo</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Category</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Owner</th>
        <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Work-Process</th>
        <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br pr-2 lg:pr-6">Action</th>
    </tr>
</thead>
<tbody>

    {data.data.map(({ businessDetails, _id, ownerDetails, onProcess }, ndx) => <tr key={_id} className={`${ndx % 2 || "bg-green-100"}`}>
        <td className=''>
            <img className='w-[80px] h-[50px]' alt='logo' src={businessDetails?.businessLogo} />
        </td>
        <td className="px-4 py-1">
            <span className='text-[14.2px] font-medium'> {businessDetails?.category}</span> <br />
            <span> Name: {businessDetails?.businessName}</span>
        </td>
        <td className="px-4 py-3 text-lg text-gray-900">{ownerDetails?.name}</td>
        <td className="px-4 py-3">
            {onProcess?.onfieldMarketer?.process || "N/A"}
        </td>
        <td className="w-10 text-center relative" onMouseLeave={() => setActionShow('')}>
            <button
                onClick={() => setActionShow(_id)}
                className='hover:bg-gray-300 active:text-blue-200 active:bg-gray-400 p-1 rounded-md'
            >
                <BsThreeDotsVertical />
            </button>
            {actionShow === _id &&
                <div
                    className="absolute top-10 right-1 z-30"
                >
                    <ul className="p-1 shadow-lg bg-blue-100 rounded-xl border border-white">
                        <button
                            className='text-sm text-gray-400 font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                        >Edit</button>
                        <button
                            // onClick={() => setDeletedBooking(book)}
                            className='text-sm text-gray-400 font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                        >Delete</button>
                        <button
                            // onClick={() => setDeletedBooking(book)}
                            className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                        >Contact-Call</button>
                        <button
                            // onClick={() => setDeletedBooking(book)}
                            className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                        >Contact-Field</button>
                        <button onClick={() => router.push(`/dashboard/entire_details/${_id}`)}
                            className='text-sm font-semibold px-4 w-full hover:bg-indigo-200 active:bg-indigo-300 cursor-pointer'
                        >Details</button>
                    </ul>
                </div>
            }
        </td>
    </tr>)}
</tbody>
</table>