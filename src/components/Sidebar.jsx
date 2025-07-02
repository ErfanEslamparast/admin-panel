import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, PlusCircle, LayoutDashboard, CircleX, LogOut, House } from "lucide-react";
import LogOutModal from "./LogOutModal";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logOutModal, setLogOutModal] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // checking client Login
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  // get client name if is loggedIn
  useEffect(() => {
    if (!isLoggedIn) {
      setName("");
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    fetch("https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
      })
      .catch(() => setName(""))
      .finally(() => setIsLoading(false));
  }, [isLoggedIn, isOpen, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsOpen(false);
    setTimeout(() => navigate("/login"), 500);
  };

  // sidebar conditional rendering
  const renderContent = () => {

    if (isLoggedIn) {
      return (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="mb-4 px-4 pt-3">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-bold text-gray-800">{name || "کاربر"}</h2>
                <div
                  className="close-sidebar text-gray-800 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <CircleX size={20} />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">به پنل خوش اومدی!</p>
            </div>
            <nav className="space-y-4">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-black/3 font-medium p-2 ps-4"
                onClick={() => setIsOpen(false)}
              >
                <House size={20} />
                صفحه اصلی
              </Link>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-black/3 font-medium p-2 ps-4"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard size={20} />
                داشبورد
              </Link>
              <Link
                to="/new-post"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-black/3 font-medium p-2 ps-4"
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle size={20} />
                پست جدید
              </Link>
            </nav>
          </div>
          <button
            onClick={() => setLogOutModal(true)}
            className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium cursor-pointer p-4"
          >
            <LogOut size={20} />
            خروج
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="mb-4 px-4 pt-3">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-bold text-gray-800">ورود به پنل</h2>
                <div
                  className="close-sidebar text-gray-800 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  <CircleX size={20} />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                برای دسترسی به پنل ابتدا وارد شوید!
              </p>
            </div>
            <nav className="flex flex-col justify-center items-center gap-4 mt-15">
              <Link
                to="/login"
                className="w-40 flex items-center justify-center text-gray-600 bg-white shadow-sm border border-2 border-gray-200 rounded hover:text-blue-600 hover:bg-black/3 font-medium text-[18px] p-2"
                onClick={() => setIsOpen(false)}
              >
                ورود
              </Link>
              <Link
                to="/register"
                className="w-40 flex items-center justify-center text-gray-600 bg-white shadow-sm border border-2 border-gray-200 rounded hover:text-blue-600 hover:bg-black/3 font-medium text-[18px] p-2"
                onClick={() => setIsOpen(false)}
              >
                ثبت نام
              </Link>
            </nav>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <button
        className="flex fixed top-3 right-4 z-0 bg-white p-2 cursor-pointer rounded-lg shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-5 h-5 text-gray-700" />
      </button>

      <aside
        className={`fixed top-0 z-10 right-0 w-1/6 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {renderContent()}
      </aside>
      {logOutModal && (
        <LogOutModal handleLogout={handleLogout} setLogOutModal={setLogOutModal} />
      )}
    </>
  );
}
