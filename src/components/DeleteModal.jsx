import React from 'react';

const DeleteModal = ({handleDelete,setShowModal,modalTarget,setModalTarget}) => {
    return (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4 text-gray-700">آیا مطمئن هستی؟</h2>
            <p className="mb-4 text-gray-500">
              {modalTarget === 'bulk'
                ? 'آیا می‌خواهی موارد انتخاب شده را حذف کنی؟'
                : 'آیا می‌خواهی این پست را حذف کنی؟'}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700"
              >
                بله حذف کن
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setModalTarget(null);
                }}
                className="bg-gray-200  text-gray-800 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
              >
                انصراف
              </button>
            </div>
          </div>
        </div>
    );
}

export default DeleteModal;
