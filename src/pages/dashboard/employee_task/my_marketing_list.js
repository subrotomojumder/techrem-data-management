import BusinessDataShowByCondition from "@/components/BusinessDataShowByCondition";
import { Private } from "@/utils/ProtectRoute";
import { useSelector } from "react-redux";


const My_marketing_list = () => {
    const { user } = useSelector((state) => state.auth);
    return <BusinessDataShowByCondition dynamicData={{ type: "My Marketing data list", onlyMyData: user._id }} />
};

export default Private(My_marketing_list);