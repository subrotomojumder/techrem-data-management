import BusinessDataShowByCondition from '@/components/BusinessDataShowByCondition';
import { MarketerProtect } from '@/utils/ProtectRoute';
import { ORDER_COMPLETED } from '@/utils/constant';
import React from 'react';

const Completed_order = () => {
    return <BusinessDataShowByCondition  dynamicData={{finalProcess: ORDER_COMPLETED, type: "Order completed business data"}}/>
};
export default MarketerProtect(Completed_order);