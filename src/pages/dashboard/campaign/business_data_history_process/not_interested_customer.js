import BusinessDataShowByCondition from '@/components/BusinessDataShowByCondition';
import { MarketerProtect } from '@/utils/ProtectRoute';
import { NOTINTERESTED } from '@/utils/constant';
import React from 'react';

const Not_interested = () => {
    return <BusinessDataShowByCondition  dynamicData={{finalProcess: NOTINTERESTED , type: "Not interested business data"}}/>
};
export default MarketerProtect(Not_interested);