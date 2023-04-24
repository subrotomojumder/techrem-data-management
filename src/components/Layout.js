import Footer from "./Footer";
import Navbar from "./Navbar";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from "../app/store";
import { useEffect } from "react";
import { getUser } from "@/app/features/users/userSlice";

export default function Layout({ children }) {
    const Main = ({ children }) => {
        const dispatch = useDispatch();
        // const { user, isLoading, isError, error } = useSelector((state) => state.auth);
        // console.log({ user, isLoading, isError, error });
        useEffect(() => {
            dispatch(getUser({ authorization: localStorage.getItem("tech_token") }));
        }, []);
        return children;
    };
    return (
        <>
            <Provider store={store}>
                <Navbar />
                <Main>{children}</Main>
                <Footer />
            </Provider>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}
