import Link from 'next/link';
import React, { useState } from 'react';
import { IoMdArrowDropdown } from 'react-icons/io';

const DashboardItem = ({ item, openDrawer, index, subItemShow, setSubItemShow, toggle, setToggle }) => {
    const { margin, subMenu, name, icon, link } = item;
    // console.log(openDrawer)
    return (
        <div
            className={`${margin && "mb-2"} text-sm rounded select-none group relative`}
        >
            {link ? <div
                onClick={() => {
                    setSubItemShow(name)
                    setToggle({})
                }} 
                className={`${subItemShow === name && "border-2 border-indigo-500"}`}
                >
                <Link
                    href={link}
                >
                    <div
                        className='font-semibold  flex items-center gap-3 p-2 hover:bg-gray-600 group'
                    >
                        <div>{React.createElement(icon, { size: "20" })}</div>
                        <h2
                            style={{
                                transitionDelay: `${index + 1}00ms`,
                            }}
                            className={`whitespace-pre drop-shadow-lg duration-500 ${openDrawer ? "opacity-0 md:opacity-100 translate-x-10 md:translate-x-0 overflow-hidden" : "md:opacity-0 md:translate-x-28 overflow-hidden"} `}
                        >{name}</h2>
                        <h2
                            className={`${!openDrawer ? "hidden md:block" : "block md:hidden"}
                     absolute left-48 bg-gray-200 font-sans whitespace-pre z-30
                   text-gray-900 rounded-md drop-shadow-md px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                    group-hover:py-1 group-hover:left-12 md:group-hover:left-14 group-hover:w-fit group-hover:duration-500`}
                        >
                            {name}
                        </h2>
                    </div>
                </Link>
            </div>
                : <div
                    onClick={() => {
                        setSubItemShow(name)
                        setToggle({ [name]: toggle[name] === name ? "" : name })
                        // setToggle(c => c === name ? "" : name)

                    }}
                >
                    <div
                        className={`font-semibold  flex items-center gap-3 p-2 hover:bg-gray-600 group ${subItemShow === name && "border-2 border-indigo-500"}`}
                    >
                        <div>{React.createElement(icon, { size: "20" })}</div>
                        <h2
                            style={{
                                transitionDelay: `${index + 1}20ms`,
                            }}
                            className={`whitespace-pre duration-500 drop-shadow-lg ${openDrawer ? "opacity-0 md:opacity-100 translate-x-10 md:translate-x-0 overflow-hidden" : "md:opacity-0 md:translate-x-28 overflow-hidden"} `}
                        >{name}</h2>
                        {subMenu && <IoMdArrowDropdown className={`ml-auto text-lg mt-[2px] ${toggle[name] === name && "-rotate-90"} text-white group-hover:text-yellow-200`} />}
                        <h2
                            className={`${!openDrawer ? "hidden md:block" : "block md:hidden"}
                     absolute left-48 bg-gray-200 font-sans whitespace-pre z-30
                   text-gray-900 rounded-md drop-shadow-md px-0 py-0 w-0 overflow-hidden group-hover:px-2 
                    group-hover:py-1 group-hover:left-12 md:group-hover:left-14 group-hover:w-fit group-hover:duration-500`}
                        >
                            {name}
                        </h2>
                    </div>
                </div>
            }
            {
                subMenu &&
                subItemShow === name && toggle[name] &&
                <div
                    className={`bg-blue-200 m-3 text-gray-700 py-2  ${openDrawer ? "absolute left-8 top-0 md:relative md:left-0" : "drop-shadow-xl relative left-0 md:absolute top-0 md:left-8 "}`}
                >
                    {subMenu.map((menu, i) => (
                        <Link
                            key={i}
                            href={menu.subLink}
                            className={ "font-semibold  flex items-center hover:bg-green-600 gap-3 pl-2 pr-4 hover:text-white py-1 my-2"}
                        >
                            <div>{React.createElement(menu.subIcon, { size: "18" })}</div>
                            <h2
                                style={{
                                    // transitionDelay: `${0 + 0}20ms`,
                                }}
                                className={`whitespace-pre -ml-1`}
                            >{menu.subName}</h2>
                        </Link>
                    ))
                    }
                </div>
            }
        </div>
    );
};

export default DashboardItem;
