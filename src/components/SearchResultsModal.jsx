import { CircleX } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const SearchResultsModal = ({searchResults,setShowModal}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);


    const handleEsc = (event) => {
      if (event.key === 'Escape') setShowModal(false);
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [setShowModal]);

    return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div ref={modalRef} className="h-170 overflow-y-scroll bg-white rounded shadow-lg w-full max-w-lg relative">
      <div className="w-full flex justify-between items-center p-4 shadow-2xs bg-white sticky top-0 right-0 mb-4">
        <span className="text-lg text-black">نتایج جستجو</span>
        <button onClick={() => setShowModal(false)} className="text-red-500 text-xl cursor-pointer"><CircleX/></button>
      </div>
      {searchResults.length === 0 ? (
        <div className="text-center text-gray-600">هیچ خبری یافت نشد.</div>
      ) : (
        <ul className="space-y-3 px-6 pb-6">
          {searchResults.map(post => (
            <li key={post.id} className="border-b-2 border-b-gray-200 shadow-sm p-2 px-3">
              <Link to={`/post/${post.id}`} className='block w-full'>
              <span className="block text-gray-800 mb-1.5">{post.title?.rendered}</span>
              <div className="block w-full text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">{post.excerpt?.rendered.replace(/<[^>]+>/g, '')}</div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
    );
}

export default SearchResultsModal;
