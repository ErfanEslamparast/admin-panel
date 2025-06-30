import React from 'react';
import { Search,LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({handleSearch}) => {

  const navbarBtnRendering = ()=>{
     const token = localStorage.getItem("token");
    const isLoggedIn = Boolean(token);
    if (isLoggedIn) {
      return (
        <Link
          to="/dashboard"
          className="flex items-center gap-1 bg-white text-blue-600 text-[14px] px-1.5 py-1 rounded hover:bg-blue-900 hover:text-white transition"
        >
          <LayoutDashboard size={14} />
          داشبورد
        </Link>
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
          {/* <span className='text-[20px]'>/</span> */}
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
        <input
          type="text"
          placeholder="جستجو..."
          className="rounded px-3 py-1 bg-white/80 focus:bg-white text-black/80 text-sm transition-all duration-150 outline-0"
        />
        <button 
        className="absolute top-0 left-0 bg-black/10 text-black/40 p-1 cursor-pointer hover:bg-black/15"
        onClick={handleSearch}
        ><Search size={22}/></button>
        </div>
      </nav>
    );
}

export default Navbar;
