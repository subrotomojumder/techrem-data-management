import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import DatePicker from "react-datepicker";
import Countries from 'countries-list';

export const DateRangeInput = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // console.log(dateRange)
  return (
    <div className="">
      <DatePicker
        className="text-base py-1 bg-white border border-slate-300 rounded-md pr-6 pl-2 shadow-sm focus:outline-none focus:border-sky-500 focus: focus:ring-sky-500 focus:ring-1"
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        placeholderText="From to Date . . ."
        onChange={(update) => {
          setDateRange(update);
        }}
        isClearable={true}
      />
    </div>
  );
};



export default function CountryInput({ wornClass, selectedCountry, setSelectedCountry, placeHolder='', required }) {
  const [query, setQuery] = useState('')
  const countries = Object.values(Countries.countries);
  // console.log(countries);
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const filteredCountry =
    query === ''
      ? countries
      : countries.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Combobox as="div" value={selectedCountry} onChange={setSelectedCountry}>
      {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Assigned to</Combobox.Label> */}
      <div className="relative mt-2">
        <Combobox.Input
          className={wornClass.input || "w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!event.target.value) setSelectedCountry(null);
          }
          }
          displayValue={(country) => country?.name}
          autoComplete="false"
          required={required}
        placeholder={placeHolder}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredCountry.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCountry.map((country) => (
              <Combobox.Option
                key={country.name}
                value={country}
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
                      <span className={classNames('truncate', selected && 'font-semibold')}>{country.name}</span>
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
