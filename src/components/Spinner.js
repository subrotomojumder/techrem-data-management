import React from 'react';
import { Dna } from 'react-loader-spinner';

export const CustomLoader = () => {
    return (
        <div className='h-screen flex justify-center items-center '>
            <div className="custom-loader"></div>
        </div>
    );
};
export const LargeSpinner = () => {
    return (
        <div className='w-full h-[90vh] flex justify-center items-center '>
            <div className='mx-auto mb-20 animate-spin border-t-4 border-t-blue-500 border-r-4 border-r-blue-500  border-b-4 border-b-blue-500 border-l-4 border-l-white rounded-full w-8 h-8'>
                {/* jfksajfkl  */}
            </div>
        </div>
    );
};
export const MagnifyingLoader = () => {
    return (
        <div className='w-full h-[90vh] flex justify-center items-center '>
            <div className='relative'>
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                />
            </div>
        </div>
    );
};
export const SmallSpinner = () => {
    return (
        <div className='mx-auto animate-spin border-t-4 border-t-green-400 border-r-4 border-r-green-400  border-b-4 border-b-green-400 border-l-4 border-l-white rounded-full inline-block w-[22px] h-[22px] my-[1px]'>
            {/* jfksajfkl  */}
        </div>
    );
};

export const EmptyLoader = ({ isLoading, otherText }) => {
    return (
        <div className='h-full bg-indigo-50 animate-pulse min-h-[300px] relative'>
            <nav className='h-[15%] bg-indigo-100 animate-pulse shadow-sm'></nav>
            <h1 className='text-lg font-medium text-gray-400 duration-500 absolute top-[40%] text-center w-full select-none'>{isLoading ? <span>Loading.....!</span> : ""} {otherText ? <span>{otherText}</span> : ""} </h1>
            <nav className='h-[15%] bg-indigo-100 w-[80%] animate-pulse mt-8 shadow-sm'></nav>
            <div className='bg-blue-100 h-[50%] w-1/2 mt-8'></div>
        </div>
    );
};
export const InputLoader = ({ isLoading, height }) => {
    return (
        <div className={`bg-indigo-50 animate-pulse ${height} relative pt-4`}>
            <nav className='bg-indigo-100 animate-pulse shadow-sm w-[70%] h-10'></nav>
            <h1 className='text-lg font-medium text-gray-400 duration-500 absolute top-[40%] text-center w-full select-none'>{isLoading ? <span>Loading.....!</span> : ""} </h1>
            <nav className='h-8 bg-indigo-100 w-[80%] animate-pulse mt-12 shadow-sm'></nav>
            <div className='bg-blue-100  w-10/12 mt-2 h-[20px]'></div>
        </div>
    );
};
