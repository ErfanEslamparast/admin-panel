import React from 'react';

const LogOut = ({handleLogout,setLogOutModal}) => {
    return (
        <div>
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full text-center">
      <h2 className="text-lg font-bold mb-4 text-gray-700">آیا از خروج مطمئن هستید؟</h2>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-700"
        >
          بله، خارج شو
        </button>
        <button
          onClick={() => setLogOutModal(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-400"
        >
          انصراف
        </button>
      </div>
    </div>
  </div>
        </div>
    );
}

export default LogOut;
