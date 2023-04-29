import Footer from "./Footer";
import Navbar from "./Navbar";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from "../app/store";
import { useEffect } from "react";
import { getUser } from "@/app/features/users/userSlice";
import DashboardLayout from "./DashboardLayout/DashboardLayout";

export default function Layout({ children }) {
    const Main = ({ children }) => {
        const { user, isLoading, isError, error } = useSelector((state) => state.auth);
        // console.log(user, isLoading, isError, error);
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(getUser({ authorization: localStorage.getItem("tech_token") }));
        }, []);
        return children;
    };
    return (
        <>
            <Provider store={store}>
                <Navbar />
                <div className="flex justify-start relative">
                    <DashboardLayout></DashboardLayout>
                    <div className="flex-1">
                        <Main>{children}</Main>
                    </div>
                </div>
                <Footer />
            </Provider>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}
