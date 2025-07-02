import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";


export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

    const navigate=useNavigate()

  const handleRegister = async () => {
    setLoading(true);
    setIsError(false)
    setMessage('');

    try {
      const response = await fetch('https://api.eeslamparast.host.webr.ir/wp-json/custom-api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name,username, password, email, roles: ["author"] }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setIsError(true);
        throw new Error(data.message || 'خطایی رخ داده است');
      }
      setIsError(false)
      setMessage(` کاربر "${data.username}" با موفقیت ثبت شد`);
      setTimeout(() => {
        navigate("/login")
      }, 1500);
    } catch (err) {
      setIsError(true);
      setMessage(` ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">ثبت‌نام</h2>
        <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       <div className="relative w-full mb-4">
         <input
           type={showPassword ? "text" : "password"}
           placeholder="رمز عبور"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           className="w-full px-4 py-2 pl-10 border border-gray-300 text-[rgb(72,72,72)] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
         />
         <button
           type="button"
           className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 cursor-pointer"
           onClick={() => setShowPassword((prev) => !prev)}
           tabIndex={-1}
         >
           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
         </button>
       </div>
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 font-semibold rounded-lg hover:bg-green-700 transition-all disabled:opacity-60 cursor-pointer"
        >
          {loading ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
        </button>
         <div className="login">
          <span className="text-[rgb(72,72,72)] text-center flex justify-center mt-4 gap-1">
          اگر عضو سایت هستید 
          <Link to={"/login"}>وارد شوید</Link>
          </span>
        </div>
        {message && (
          <p dir='rtl' className={`mt-4 text-center text-sm text-gray-700 whitespace-pre-wrap ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
