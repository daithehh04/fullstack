import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import LogoutButton from "./LogoutButton";
import { toast } from 'react-toastify';
import emailjs from "@emailjs/browser";
import Loading from "./Loading";

const serviceId = import.meta.env.VITE_ID_SERVICE_EMAILJS
const templateId = import.meta.env.VITE_ID_TEMPLATE_EMAILJS
const apiKeys = import.meta.env.VITE_KEY_EMAILJS
const Profile = () => {
  const { isLoading, user, isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        serviceId,
        templateId,
        e.target,
        apiKeys
      )
      .then(
        (response) => {
          setLoading(false);
          console.log('SUCCESS!', response.status, response.text);
          toast.success(`Gửi thành công !`);
        },
        (err) => {
          setLoading(false);
          console.log('FAILED...', err);
          toast.error(`Gửi thất bại !`);
        }
      );
  };

  return (
    <>
    { isAuthenticated && (
      <div className="profile">
        <div className="container">
          <div className="info">
            <img src={user.picture} alt={user.name} className="avatar"/>
            <h3>Xin chào: {user.name}</h3>
            {user.locale && (
              <p className="language">
                Language: {user.locale === "vi" ? "Tiếng Việt" : user.locale}
              </p>
            )}
            {user.email && (
              <p>
                Email: <a href={`mailto:${user.email}`}>{user.email}</a>
              </p>
            )}
          </div>

          <form action="" className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="email">Email của bạn* </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Nhập email của bạn"
                defaultValue={user.email}
              />
            </div>
            <div className="field">
              <label htmlFor="message">Tin nhắn </label>
              <textarea type="text"
                name="message"
                id="message"
                required
                placeholder="Nhập tin nhắn của bạn"
                defaultValue="Tôi cần trợ giúp bài tập về nhà!" cols="40" rows="10"
                >
                </textarea>
                
            </div>
            <button type="submit" className="btn btn-support">
              Yêu cầu hỗ trợ!
            </button>
          </form>
        </div>
        <LogoutButton />
        {(isLoading || loading) && <Loading />}
      </div>
    )}</>
  )
}

export default Profile;