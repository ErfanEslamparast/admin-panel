import { useNavigate } from "react-router-dom";

export default function CreatePostButton() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col  max-w-3xl mx-auto items-center justify-center text-center p-8 bg-white rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold text-[rgb(72,72,72)] mb-4">هیچ خبری برای نمایش وجود ندارد</h2>
      <button
        onClick={() => navigate("/new-post")}
        className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 group"
      >
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-40 group-hover:h-40 opacity-10"></span>
        <span className="relative z-10 cursor-pointer">ساخت پست جدید</span>
      </button>
    </div>
  );
}
