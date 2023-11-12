import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Loading from "./Loading";

const LogoutButton = () => {
  const {logout, isAuthenticated } = useAuth0();
  const [loading,setLoading] = useState(false)
  const handleLogOut = () => {
    setLoading(true)
    logout({ logoutParams: { returnTo: window.location.origin } })
  }
  return (
    <>
      {isAuthenticated && (
        <button className="btn" onClick={handleLogOut}>
        Sign Out
      </button>
      )}
      {loading && <Loading/>}
    </>
  );
};

export default LogoutButton;