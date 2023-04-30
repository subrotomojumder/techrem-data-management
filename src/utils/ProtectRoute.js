import { EmptyLoader, LargeSpinner } from "@/components/Spinner";
import Login from "@/pages/authentication/login";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ADMIN, DATA_ENTRY_OPERATOR, MARKETER, ON_FIELD_MARKETER, TELE_MARKETER } from "./constant";

export const Private = (Component) => {
  const Auth = (props) => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!isLoading && user.role) {
        setLoading(false);
      } else if (!isLoading && !user.role) {
        setLoading(false)
      }
    }, [user]);
    if (loading || isLoading) {
      return <LargeSpinner />
    }
    if (!isLoading && (user.role === ADMIN || user.role === MARKETER || user.role === ON_FIELD_MARKETER || user.role === DATA_ENTRY_OPERATOR || user.role === TELE_MARKETER)) {
      return <Component {...props} />
    } else if (!isLoading) {
      return <Login />;
    }
  };
  return Auth;
};
export const AdminProtect = (Component) => {
  const Auth = (props) => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!isLoading && user.role) {
        setLoading(false);
      } else if (!isLoading && !user.role) {
        setLoading(false)
      }
    }, [user]);
    if (loading || isLoading) {
      return <LargeSpinner />
    }
    if (!isLoading && user.role === ADMIN) {
      return <Component {...props} />
    } else if (!isLoading) {
      return <Login />;
    }
  };
  return Auth;
};
export const MarketerProtect = (Component) => {
  const Auth = (props) => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!isLoading && user.role) {
        setLoading(false);
      } else if (!isLoading && !user.role) {
        setLoading(false)
      }
    }, [user]);
    if (loading || isLoading) {
      return <LargeSpinner />
    }
    if (!isLoading && (user.role === ADMIN || user.role === MARKETER)) {
      return <Component {...props} />
    } else if (!isLoading) {
      return <Login />;
    }
  };
  return Auth;
};
export const TeleAndFieldProtect = (Component) => {
  const Auth = (props) => {
    const { user, isLoading } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!isLoading && user.role) {
        setLoading(false);
      } else if (!isLoading && !user.role) {
        setLoading(false)
      }
    }, [user]);
    if (loading || isLoading) {
      return <LargeSpinner />
    }
    if (!isLoading && (user.role === ADMIN || user.role === MARKETER || user.role === ON_FIELD_MARKETER || user.role === TELE_MARKETER)) {
      return <Component {...props} />
    } else if (!isLoading) {
      return <Login />;
    }
  };
  return Auth;
};