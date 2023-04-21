import Footer from "./Footer";
import Navbar from "./Navbar";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from "@/app/store";
import { useEffect } from "react";
import { autoUserSet } from "@/app/features/users/userSlice";
// import jwt from 'jwt-decode';
// import jwt from 'jsonwebtoken';

export default function Layout({ children }) {
    const Main = ({ children }) => {
        const dispatch = useDispatch();
        // const { user, isLoading, isError, error } = useSelector((state) => state.auth);
        // console.log({ user, isLoading, isError, error });
        useEffect(() => {
            if (localStorage.getItem("tech_token")) {
                fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV}/user/jwt`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ authorization: localStorage.getItem("tech_token") })
                }).then(res => res.json()).then(results => {
                    if (results.success) {
                        localStorage.setItem("tech_token", results.jwtToken);
                        dispatch(autoUserSet(results.data));
                    }
                }).catch(e => console.log(e))
            }
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
