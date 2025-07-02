import React, { useState } from 'react';
import { Search,LayoutDashboard,CircleUserRound,LogOut } from "lucide-react";
import { Link,useNavigate } from "react-router-dom";
import LogOutModal from './LogOutModal';

const Navbar = ({handleSearch,name,setSearchValue}) => {
  const [logOutModal, setLogOutModal] = useState(false);
  

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setTimeout(() => navigate("/login"), 500);
  };

  const navbarBtnRendering = () => {
     const token = localStorage.getItem("token");
    const isLoggedIn = Boolean(token);
    if (isLoggedIn) {
      return (
        <div className='relative pb-0.5 mt-0.5 drop-down group'>
        <div className='cursor-pointer '>
           <CircleUserRound size={26} />
        </div>
        <div className="drop-down-menu overflow-hidden absolute right-0 top-full min-w-[120px] bg-white shadow rounded z-50
                  h-0 group-hover:h-30 transition-all duration-300 space-y-0.5">

          <span className='block text-[rgb(72,72,72)] mb-1 p-2 ps-1.5'>{name}</span>

          <Link
          to="/dashboard"
          className="flex items-center gap-1 bg-white text-blue-600 text-[14px] px-1.5 py-2 hover:bg-blue-900 hover:text-white transition"
        >
          <LayoutDashboard size={14} />
          داشبورد
        </Link>
        <button
            onClick={() => setLogOutModal(true)}
            className="w-full flex items-center gap-1 cursor-pointer  px-1.5 py-2 text-[14px] text-red-600 hover:text-white hover:bg-red-600   transition"
          >
            <LogOut size={14} />
            خروج
          </button>
        </div>
       </div>
      );
    } else {
      return (
        <div className="flex ">
          <Link
            to="/login"
            className="w-[50.88px] text-center bg-white text-blue-600 text-[13px] px-1.5 py-1 rounded-s hover:bg-blue-100 transition"
          >
            ورود
          </Link>

          <Link
            to="/register"
            className="bg-blue-900 text-white text-[13px] text-nowrap px-1.5 py-1 rounded-e hover:bg-blue-700 transition"
          >
            ثبت نام
          </Link>
        </div>
      );
    }
  }


    return (
      <>
        <nav className="bg-blue-600 text-white flex justify-between items-center p-5 px-15">

        <div>{navbarBtnRendering()}</div>
        {/* <ul className="flex text-[14px]">
          <Link to={"/"} className="cursor-pointer text-white/90 hover:bg-white/90 hover:text-black p-5">خانه</Link>
          <li className="cursor-pointer text-white/90 hover:bg-white/90 hover:text-black p-5 transition-all">اخبار</li>
          <li className="cursor-pointer text-white/90 hover:bg-white/90 hover:text-black p-5 transition-all">ویدیو</li>
          <li className="cursor-pointer text-white/90 hover:bg-white/90 hover:text-black p-5 transition-all">تحلیل</li>
          <li className="cursor-pointer text-white/90 hover:bg-white/90 hover:text-black p-5 transition-all">دیدگاه</li>
          <li className="cursor-pointer text-white/90 hover:bg-white/90 hover:text-black p-5 transition-all">شبکه‌های اجتماعی</li>
          <li className="cursor-pointer text-white/90 hover:bg-white/90 hover:text-black p-5 transition-all">درباره ما</li>
          <li className="cursor-pointer text-white/90 hover:bg-white/90 hover:text-black p-5 transition-all">تماس با ما</li>
        </ul> */}
        <div className="w-full text-xl flex justify-center">
        سایت خبری عرفان نیوز
        </div>

        <div className="search-box relative">
        <form onSubmit={handleSearch} >
          <input
          type="text"
          placeholder="جستجو..."
          
          onChange={e => setSearchValue(e.target.value)}
          className="rounded px-3 py-1 bg-white/80 focus:bg-white text-black/80 text-sm transition-all duration-150 outline-0"
        />
        <button 
        className="absolute top-0 left-0 bg-black/10 text-black/40 p-1 cursor-pointer hover:bg-black/15"
        type="submit"
        ><Search size={22}/></button>
        </form>
        </div>
      </nav>
    {logOutModal && (
        <LogOutModal handleLogout={handleLogout} setLogOutModal={setLogOutModal} />
    )}
    </>
    );
    
}
export default Navbar;
