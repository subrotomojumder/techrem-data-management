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
        <div className='mx-auto animate-spin border-t-4 border-t-green-400 border-r-4 border-r-green-400  border-b-4 border-b-green-400 border-l-4 border-l-white rounded-full w-5 h-5'>
           {/* jfksajfkl  */}
        </div>
    );
};
