import BusinessDataShowByCondition from "@/components/BusinessDataShowByCondition";
import { Private } from "@/utils/ProtectRoute";
import { useSelector } from "react-redux";


const My_entry_data_list = () => {
    const { user } = useSelector((state) => state.auth);
    return <BusinessDataShowByCondition dynamicData={{ type: "My Entry data list", onlyMyData: user._id }} />
};

export default Private(My_entry_data_list);