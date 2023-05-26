import React from 'react';
import Address_enquiry from './address_enquiry';
import Category_enquiry from './category_enquiry';
import { Private } from '@/utils/ProtectRoute';

const All_the_list = () => {
    return (
        <div className='flex w-full px-3 flex-col lgg:flex-row justify-center gap-3 my-4'>
            <Address_enquiry />
            <Category_enquiry />
        </div>
    );
};

export default Private(All_the_list);