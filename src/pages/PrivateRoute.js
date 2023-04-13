

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '@/components/LoginForm';

function PrivateRoute({ children }) {
  // return console.log("heljlkdjfkljdsklfjdsklj");
  const router = useRouter()

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  console.log(14, user);

  useEffect(() => {
    const token = localStorage.getItem("tech_token");
    if (token) {
      setIsAuthenticated(true);
      setIsLoading(false);

    } else {
      // Redirect to login page if not authenticated
      router.push('/login?redirected=true');
    }
  }, []);


  if (isLoading) {

    return <div>Loading...</div>;

  }

  if (!isAuthenticated) {

    return <LoginForm setUser={setUser} />;

  }

  return children;

}

export default PrivateRoute;
