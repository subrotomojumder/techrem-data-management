import Footer from "../Footer";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from "../../app/store";
import { useEffect } from "react";
import { getUser } from "@/app/features/users/userSlice";
import LayoutComponent from "./LayoutComponent";

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
                <LayoutComponent>
                    <Main>{children}</Main>
                </LayoutComponent>
                {/* <Footer /> */}
            </Provider>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </>
    )
}
