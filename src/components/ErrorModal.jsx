import React from 'react';

export default function ErrorModal({ visible, onClose }) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/60 transition-opacity duration-300 z-50 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white rounded-lg p-6 w-full max-w-sm text-center transform transition-all duration-300
          ${visible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-6 opacity-0 scale-95'}`}
      >
        <div className="flex items-center justify-center w-20 h-20 mx-auto bg-red-100 rounded-full mb-4">
          <svg
            className="w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-gray-800">
          نام کاربری یا رمز عبور اشتباه است
        </h2>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          بستن
        </button>
      </div>
    </div>
  );
}
