import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, LogOut, PlusCircle, LayoutDashboard,CircleX } from "lucide-react";
import LogOutModal from "./LogOutModal";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(
          "https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/users/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.name) setName(data.name);
      } catch (err) {
        console.error("خطا در دریافت اطلاعات کاربر");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {  
    localStorage.removeItem("token");
    setTimeout(() => navigate("/login"), 500);
  };

  return (
    <>

      <button
        className="fixed top-4 right-4 z-0 bg-white p-2 cursor-pointer rounded-lg shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      <aside
        className={`fixed top-0 z-10 right-0 w-1/6 h-full bg-white  shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full" }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="mb-4 px-4 pt-3">
             <div className="flex items-center justify-between mb-10">
                 <h2 className="text-xl font-bold text-gray-800">{name}</h2>
                 <div className="close-sidebar text-gray-800 cursor-pointer" onClick={()=>setIsOpen(false)}><CircleX size={20} /></div>

             </div>
              <p className="text-sm text-gray-500 mt-1">به پنل خوش اومدی!</p>
            </div>
            <nav className="space-y-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-black/3 font-medium p-2 ps-4"
              >
                <LayoutDashboard size={20} />
                داشبورد
              </Link>
              <Link
                to="/new-post"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-black/3 font-medium p-2 ps-4"
              >
                <PlusCircle size={20} />
                پست جدید
              </Link>
            </nav>
          </div>

          <button
            onClick={()=>setLogOutModal(true)}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium cursor-pointer p-4"
          >
            <LogOut size={20} />
            خروج
          </button>
        </div>
      </aside>
          {logOutModal && <LogOutModal handleLogout={handleLogout} setLogOutModal={setLogOutModal}/>}
    </>
  );
}
