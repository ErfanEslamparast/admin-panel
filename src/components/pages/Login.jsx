import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import ErrorModal from "../ErrorModal";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
    const [isFormBlocked, setIsFormBlocked] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isFormBlocked) return;
    setShowError(false);
    const res = await fetch("https://api.eeslamparast.host.webr.ir/wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.token) {
     localStorage.setItem("token", data.token);
      navigate("/")
      // alert("لاگین موفق بود!");

    } else {
       setShowError(true)
       setIsFormBlocked(true);
       setPassword('')
       setUsername('')
      // alert(data.message || "خطا در ورود");
    }
  };


  const handleModalClose = () => {
    setShowError(false);
    setIsFormBlocked(false);
  };

  return (
    <>
    <form onSubmit={handleLogin} className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">ورود به حساب</h2>

        <input
          className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="نام کاربری"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="رمز عبور"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          // onClick={handleLogin}
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all cursor-pointer"
        >
          ورود
        </button>
        <div className="register">
          <span className="text-[rgb(72,72,72)] text-center flex justify-center mt-4 gap-1">
          اگر عضو سایت نیستید 
          <Link to={"/register"}>ثبت نام کنید</Link>
          </span>
        </div>
      </div>
    </form>
      <ErrorModal visible={showError} onClose={handleModalClose} />

      </>
  );
}
