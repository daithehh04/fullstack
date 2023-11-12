import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";

const LoginButton = () => {
  const {isLoading, loginWithPopup, isAuthenticated } = useAuth0();
  if(isLoading) {
    return <Loading/>
  }
  return (
    <>
      {!isAuthenticated && (
        <div className="login">
          <h3>Cảm ơn bạn đã sử dụng dịch vụ của F8</h3>
          <p>
            Nếu có bất kỳ câu hỏi hay trợ giúp nào, hãy đăng nhập và đặt
            câu hỏi tại đây!
          </p>
          <button className="btn" onClick={() => loginWithPopup()}>Sign In | Register </button>
        </div>
      )}
    </>
  );
};

export default LoginButton;