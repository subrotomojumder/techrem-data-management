import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useGetAllAddressQuery } from '@/app/features/address/addressApi';

export default function AddressInput({ selectedValue, setSelectedValue, ownClass }) {
    const [openMainChild, setOpenMainChild] = useState({});
    const [openCity, setOpenCity] = useState({});
    const { data, isLoading, isError } = useGetAllAddressQuery(`/address`);
    const addressData = data?.data || { success: true, data: [] };

    return (
        <div className={ownClass?.container || "z-20 w-fit text-right"}>
            <Menu as="div" className={ownClass?.menu || "relative inline-block text-left"}>
                <div className={ownClass?.container || ''}>
                    <Menu.Button
                        onBlur={() => {
                            setOpenMainChild({})
                            setOpenCity({})
                        }}
                        className={ownClass?.button || "text-sm bg-white rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  outline-none text-gray-800 pl-3  px-2 leading-8 transition-colors duration-200 ease-in-out flex justify-between items-center"}>
                        {selectedValue.country ? `${selectedValue.country}${selectedValue.state && '>' + selectedValue.state}${selectedValue.city && '>' + selectedValue.city}` : "Location"}
                        <ChevronDownIcon
                            className="ml-2 -mr-1 h-5 w-5 text-gray-500"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className={`absolute right-0  select-non mt-2 ${ownClass?.menuWidth || "w-56"} max-h-[400px] z-50 overflow-y-auto p-1 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                        {addressData?.length && addressData?.map((country, i) => <div key={i} className=''>
                            <Menu.Item>
                                {({ active }) => (
                                    <>
                                        <div
                                            onClick={() => {
                                                setSelectedValue({ country: country.country, state: '', city: '' })
                                                setOpenMainChild({ [country.country]: !openMainChild[country.country] ? country.country : "" })
                                            }}
                                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                                } group flex w-full items-center rounded-md  hover:bg-slate-100 px-2 py-2 capitalize`}
                                        >
                                            {country.country}
                                        </div>
                                        {openMainChild[country.country] &&
                                            <div className='ml-2 divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" '>
                                                {
                                                    !country?.state?.length || country?.state?.map((state, i) =>
                                                        <div
                                                            onClick={() => {
                                                                setSelectedValue({ ...selectedValue, state: state.name, city: '' });
                                                                setOpenCity({ [state.name]: !openCity[state.name] ? state.name : "" })
                                                            }}
                                                            key={i}
                                                            // hover:text-white hover:bg-blue-500 hover:font-semibold active:bg-orange-500 active:text-white
                                                            className="list-none capitalize pl-6 py-1 hover:bg-slate-100  cursor-pointer"
                                                        >
                                                            {state.name}
                                                            <div>
                                                                {openCity[state.name] &&
                                                                    <div className='ml-2 divide-y divide-gray-100 rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" '>
                                                                        {
                                                                            !state?.city?.length || state?.city?.map((city, i) =>
                                                                                <div
                                                                                    onClick={(e) => {
                                                                                        e.stopPropagation()
                                                                                        // console.log({ ...selectedValue, city: city.name })
                                                                                        setSelectedValue({ ...selectedValue, city: city.name });
                                                                                    }}
                                                                                    key={i}
                                                                                    // hover:text-white hover:bg-blue-500 hover:font-semibold active:bg-orange-500 active:text-white
                                                                                    className="list-none capitalize pl-6 hover:bg-slate-100 py-1 cursor-pointer"
                                                                                >
                                                                                    {city.name}
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>)
                                                }
                                            </div>
                                        }
                                    </>
                                )}
                            </Menu.Item>
                        </div>)}
                    </Menu.Items>

                </Transition>
            </Menu>
        </div >
    )
}

// function EditInactiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M4 13V16H7L16 7L13 4L4 13Z"
//                 fill="#EDE9FE"
//                 stroke="#A78BFA"
//                 strokeWidth="2"
//             />
//         </svg>
//     )
// }

// function EditActiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M4 13V16H7L16 7L13 4L4 13Z"
//                 fill="#8B5CF6"
//                 stroke="#C4B5FD"
//                 strokeWidth="2"
//             />
//         </svg>
//     )
// }

// function DuplicateInactiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M4 4H12V12H4V4Z"
//                 fill="#EDE9FE"
//                 stroke="#A78BFA"
//                 strokeWidth="2"
//             />
//             <path
//                 d="M8 8H16V16H8V8Z"
//                 fill="#EDE9FE"
//                 stroke="#A78BFA"
//                 strokeWidth="2"
//             />
//         </svg>
//     )
// }

// function DuplicateActiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path
//                 d="M4 4H12V12H4V4Z"
//                 fill="#8B5CF6"
//                 stroke="#C4B5FD"
//                 strokeWidth="2"
//             />
//             <path
//                 d="M8 8H16V16H8V8Z"
//                 fill="#8B5CF6"
//                 stroke="#C4B5FD"
//                 strokeWidth="2"
//             />
//         </svg>
//     )
// }

// function ArchiveInactiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <rect
//                 x="5"
//                 y="8"
//                 width="10"
//                 height="8"
//                 fill="#EDE9FE"
//                 stroke="#A78BFA"
//                 strokeWidth="2"
//             />
//             <rect
//                 x="4"
//                 y="4"
//                 width="12"
//                 height="4"
//                 fill="#EDE9FE"
//                 stroke="#A78BFA"
//                 strokeWidth="2"
//             />
//             <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
//         </svg>
//     )
// }

// function ArchiveActiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <rect
//                 x="5"
//                 y="8"
//                 width="10"
//                 height="8"
//                 fill="#8B5CF6"
//                 stroke="#C4B5FD"
//                 strokeWidth="2"
//             />
//             <rect
//                 x="4"
//                 y="4"
//                 width="12"
//                 height="4"
//                 fill="#8B5CF6"
//                 stroke="#C4B5FD"
//                 strokeWidth="2"
//             />
//             <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
//         </svg>
//     )
// }

// function MoveInactiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
//             <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
//             <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
//         </svg>
//     )
// }

// function MoveActiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
//             <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
//             <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
//         </svg>
//     )
// }

// function DeleteInactiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <rect
//                 x="5"
//                 y="6"
//                 width="10"
//                 height="10"
//                 fill="#EDE9FE"
//                 stroke="#A78BFA"
//                 strokeWidth="2"
//             />
//             <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
//             <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
//         </svg>
//     )
// }

// function DeleteActiveIcon(props) {
//     return (
//         <svg
//             {...props}
//             viewBox="0 0 20 20"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//         >
//             <rect
//                 x="5"
//                 y="6"
//                 width="10"
//                 height="10"
//                 fill="#8B5CF6"
//                 stroke="#C4B5FD"
//                 strokeWidth="2"
//             />
//             <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
//             <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
//         </svg>
//     )
// }
