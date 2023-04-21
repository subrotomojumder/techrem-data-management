import { EmptyLoader, LargeSpinner } from "@/components/Spinner";
import Login from "@/pages/authentication/login";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Private = (Component) => {
  const Auth = (props) => {
    const [loading, setLoading] = useState(true);
    const { user } = useSelector((state) => state.auth)
    useEffect(() => {
      if (user.role) {
        setLoading(false);
      } else {
        setLoading(false)
      }
    }, [user]);
    const router = useRouter();
    // const navigate = (url) => {
    //   router.push(url);
    // }
    // Check if user is authenticated, e.g. by checking a token in local storage
    if (loading) {
      return <LargeSpinner />
    }
    if (user.role) {
      return <Component {...props} />
    } else {
      return <Login />;
    }
    // navigate(`/authentication/login`);
  };
  return Auth;
};

export default Private;