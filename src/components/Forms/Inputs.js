import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react'
import DatePicker from "react-datepicker";
// import Countries from 'countries-list';
import { useGetAllAddressQuery } from '@/app/features/address/addressApi';

export const DateRangeInput = ({ dateRange, setDateRange }) => {
  const [startDate, endDate] = dateRange;
  return (
    <div className="">
      <DatePicker
        className="rounded-md placeholder:text-gray-600 bg-white pl-3 pr-5 py-[7px] text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
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



export function CountryInput({ wornClass, selectedCountry, setSelectedCountry, disabled = false, placeHolder = '' }) {
  const [query, setQuery] = useState('')
  const { data, isLoading, isError, error } = useGetAllAddressQuery(`/address/country`);

  // console.log(selectedCountry);
  const countries = data?.data || [];
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
          }}
          displayValue={(country) => country?.name}
          autoComplete="off"
          placeholder={placeHolder}
          required={selectedCountry?.name ? false : true}
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
                    active ? 'bg-indigo-600 text-white capitalize ' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span className={classNames('truncate', selected && 'font-semibold')}>{country.name}</span>
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

export function StateInput({ wornClass, selectedState, setSelectedState, country, disabled = false, placeHolder = '' }) {
  const [query, setQuery] = useState('')
  const { data, isLoading, isError, error } = useGetAllAddressQuery(`/address/state?country=${country}`);
  const states = data?.data || [];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const filteredState =
    query === ''
      ? states
      : states.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Combobox as="div" value={selectedState} onChange={setSelectedState}>
      <div className="relative mt-2">
        <Combobox.Input
          className={wornClass.input || "w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!event.target.value) setSelectedState(null);
          }}
          displayValue={(country) => country?.name}
          autoComplete="off"
          placeholder={placeHolder}
          required={selectedState?.name ? false : true}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredState.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredState.map((state) => (
              <Combobox.Option
                key={state.name}
                value={state}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white capitalize' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span className={classNames('truncate', selected && 'font-semibold')}>{state.name}</span>
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
export function CityInput({ wornClass, selectedCity, setSelectedCity, country, state, disabled = false, placeHolder = '' }) {
  const [query, setQuery] = useState('')
  const { data, isLoading, isError, error } = useGetAllAddressQuery(`/address/city?country=${country}&state=${state}`);
  const cities = data?.data || [];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const filteredCities =
    query === ''
      ? cities
      : cities.filter((person) => {
        return person.name.toLowerCase().includes(query.toLowerCase())
      })

  return (
    <Combobox as="div" value={selectedCity} onChange={setSelectedCity}>
      <div className="relative mt-2">
        <Combobox.Input
          className={wornClass.input || "w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
          onChange={(event) => {
            setQuery(event.target.value);
            if (!event.target.value) setSelectedCity(null);
          }}
          displayValue={(country) => country?.name}
          autoComplete="off"
          placeholder={placeHolder}
          required={selectedCity?.name ? false : true}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredCities.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredCities.map((city) => (
              <Combobox.Option
                key={city.name}
                value={city}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white capitalize' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex">
                      <span className={classNames('truncate', selected && 'font-semibold')}>{city.name}</span>
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
