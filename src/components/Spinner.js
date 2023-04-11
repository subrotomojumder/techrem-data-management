import React from 'react';

export const LargeSpinner = () => {
    return (
        <div className='w-full h-[70vh] flex justify-center items-center '>
            <div className='mx-auto mb-20 animate-spin border-t-4 border-t-blue-500 border-r-4 border-r-blue-500  border-b-4 border-b-blue-500 border-l-4 border-l-white rounded-full w-8 h-8'>
                {/* jfksajfkl  */}
            </div>
        </div>
    );
};
export const SmallSpinner = () => {
    return (
        <div className='mx-auto animate-spin border-t-4 border-t-green-400 border-r-4 border-r-green-400  border-b-4 border-b-green-400 border-l-4 border-l-white rounded-full w-[22px] h-[22px] inline-block my-[1px]'>
            {/* jfksajfkl  */}
        </div>
    );
};

export const EmptyLoader = ({ isLoading, otherText }) => {
    return (
        <div className='h-full bg-indigo-50 animate-pulse min-h-[300px] relative'>
            <nav className='h-[15%] bg-indigo-100 animate-pulse shadow-sm'></nav>
            <h1 className='text-lg font-medium text-gray-400 duration-500 absolute top-1/2 text-center w-full select-none'>{isLoading ? <span>Loading.....!</span> : ""} {otherText ? <span>{otherText}</span> : ""} </h1>
            <nav className='h-[15%] bg-indigo-100 w-[80%] animate-pulse mt-8 shadow-sm'></nav>
            <div className='bg-blue-100 h-[50%] w-1/2 mt-5'></div>
        </div>
    );
};