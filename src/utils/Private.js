import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Private = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const [token, setToken] = useState(false);
    const [login, setLogin] = useState(true);
    const navigate = (url) => {
      router.push(url);
    }
    // Check if user is authenticated, e.g. by checking a token in local storage
    const { user } = props;
    useEffect(() => {
      if (user.username) {
        setToken(true)
      }else{
        setToken(false)
      }
      setLogin(false)
    }, [user, router]);

    console.log(user);
    console.log('token', token);

    if (login) {
      return <p>Loading......</p>
    }
    if (token) {
      return <Component {...props} />
    } else {
      navigate(`/login?redirect=${router.asPath}`);
    }
  };

  return Auth;
};

export default Private;