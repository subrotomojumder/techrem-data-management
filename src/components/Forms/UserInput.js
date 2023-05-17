import { useGetAllUserNameQuery } from "@/app/features/users/userApi";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function CountryInput({ wornClass, selectedUser, setSelectedUser, placeHolder = '' }) {
    const { data, isError } = useGetAllUserNameQuery();
    const [query, setQuery] = useState('')
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const users = data?.data ? data.data.map(user => {
        return {
            _id: user._id,
            name: user.fast_name + " " + user.last_name,
            email: user.email
        }
    }) : [];

    const filteredCountry =
        query === ''
            ? users
            : users.filter((person) => {
                return person.name.toLowerCase().includes(query.toLowerCase())
            })
    return (
        <Combobox as="div" value={selectedUser} onChange={setSelectedUser}>
            {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Combobox.Label> */}
            <div className="relative">
                <Combobox.Input
                    className={wornClass.input || "w-full rounded-md border-0 bg-white py-[5px] pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        if (!event.target.value) setSelectedUser(null);
                    }
                    }
                    displayValue={(user) => user?.name}
                    autoComplete="off"
                    placeholder={placeHolder}
                    required={selectedUser?.name ? false : true}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>

                {filteredCountry.length > 0 && (
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {filteredCountry.map((user) => (
                            <Combobox.Option
                                key={user._id}
                                value={user}
                                title={user.email}
                                className={({ active }) =>
                                    classNames(
                                        'relative cursor-default select-none py-2 pl-3 pr-9',
                                        active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <div className="flex">
                                            <span className={classNames('truncate', selected && 'font-semibold')}>{user.name}</span>
                                            {/* <span
                          className={classNames(
                            'ml-2 truncate text-gray-500',
                            active ? 'text-indigo-200' : 'text-gray-500'
                          )}
                        >
                          {country.name}
                        </span> */}
                                        </div>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    'absolute inset-y-0 right-0 flex items-center pr-4',
                                                    active ? 'text-white' : 'text-indigo-600'
                                                )}
                                            >
                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    )
}

