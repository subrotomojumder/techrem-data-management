import BusinessDataShowByCondition from '@/components/BusinessDataShowByCondition';
import { MarketerProtect } from '@/utils/ProtectRoute';
import { NOTSURE } from '@/utils/constant';
import React from 'react';

const Not_sure = () => {
    return <BusinessDataShowByCondition  dynamicData={{finalProcess: NOTSURE, type: "Not sure business data"}}/>
};
export default MarketerProtect(Not_sure);