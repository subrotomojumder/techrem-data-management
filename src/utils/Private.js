import { EmptyLoader, LargeSpinner } from "@/components/Spinner";
import Login from "@/pages/authentication/login";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Private = (Component) => {
  const Auth = (props) => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (user.role) {
        setLoading(false);
      } else {
        setLoading(false)
      }
    }, [user]);
    if (loading || isLoading) {
      return <LargeSpinner />
    }
    if (!isLoading && user.role) {
      return <Component {...props} />
    } else if (!isLoading) {
      return <Login />;
    }
  };
  return Auth;
};

export default Private;