import BusinessDataShowByCondition from '@/components/BusinessDataShowByCondition';
import { MarketerProtect } from '@/utils/ProtectRoute';
import { INTERESTED } from '@/utils/constant';
import React from 'react';

const Interested = () => {
    return <BusinessDataShowByCondition dynamicData={{ finalProcess: INTERESTED, type: "Interested Business data" }} />
};
export default MarketerProtect(Interested);