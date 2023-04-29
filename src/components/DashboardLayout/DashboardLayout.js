import React, { useState } from 'react';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboardCustomize, MdOutlineReportOff } from "react-icons/md";
import { FaUsersCog, FaCashRegister, FaUsers, FaHome } from "react-icons/fa";
import { TbActivity } from "react-icons/tb";
import { BsPencilSquare } from "react-icons/bs";
import { SlNotebook } from "react-icons/sl";
import { FcSalesPerformance, FcVoicePresentation } from "react-icons/fc";
import { AiOutlineComment, AiFillHdd } from "react-icons/ai";
import { SiAdobeacrobatreader } from "react-icons/si";
import { MdPreview } from "react-icons/md";
import { ImUpload2 } from "react-icons/im";
import DashboardItem from './DashboardItem';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
    const { user, isLoading, isError, error } = useSelector((state) => state.auth);
    const menus = [
        {
            name: "New Form",
            link: "/dashboard/new_form",
            icon: BsPencilSquare,
            margin: true
        },
        {
            name: "Group Entire",
            subMenu: [
                { subName: "Entire Group", subLink: "/dashboard/group_entire", subIcon: SiAdobeacrobatreader },
                { subName: "Group Data List", subLink: "/dashboard/group_data_list", subIcon: ImUpload2 },
            ],
            icon: AiFillHdd
        },
        {
            name: "Employee Enquiry",
            subMenu: [
                { subName: "Create Employee", subLink: "/authentication/ac_register", subIcon: SiAdobeacrobatreader },
                { subName: "Employee List", subLink: "/authentication/employee_list", subIcon: ImUpload2 },
            ],
            icon: FaUsersCog
        },
        {
            name: "Send Email",
            link: "/dashboard/email-send",
            icon: FcVoicePresentation
        },
        {
            name: "Staff Activity log",
            link: "/dashboard/activity-log/all",
            icon: TbActivity
        },

    ];
    const [openDrawer, setOpenDrawer] = useState(true);
    const [subItemShow, setSubItemShow] = useState("");
    const [toggle, setToggle] = useState({});
    // console.log(openDrawer)
    if (user?.role) {
        return (
            <section className='min-h-screen pl-12 md:pl-0 mx-auto sticky top-12 md:top-14 left-0 z-10'>
                {/* main content overlay */}
                {/* {!openDrawer &&
                    <div
                        onClick={() => setOpenDrawer(!openDrawer)}
                        style={{ background: "rgba(80, 21, 76, 0.30)" }}
                        className='block md:hidden absolute bg-slate-900 top-0 left-0 w-[100%] h-[100%] z-40'
                    >
                    </div>} */}
                <div className={`bg-indigo-300 z-20 h-full absolute left-0 top-0 md:sticky md:min-h-screen ${openDrawer ? "w-14 md:w-72 xl:w-96" : "w-64 smm:w-68 md:w-16"} duration-300 md:duration-500`}>
                    <div className='px-3 md:px-4 text-gray-100 sticky top-0 left-0'>
                        <div className='pt-3 flex justify-end'>
                            <HiMenuAlt3 className="cursor-pointer active:bg-gray-600 rounded-full text-xl md:text-2xl xl:text-4xl" onClick={() => setOpenDrawer(!openDrawer)} />
                        </div>
                        <div className='flex flex-col gap-2 mt-4 relative'>
                            {
                                menus?.map((item, index) => <DashboardItem
                                    item={item}
                                    index={index}
                                    openDrawer={openDrawer}
                                    key={index}
                                    subItemShow={subItemShow}
                                    setSubItemShow={setSubItemShow}
                                    toggle={toggle}
                                    setToggle={setToggle}
                                />)
                            }
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

export default DashboardLayout;