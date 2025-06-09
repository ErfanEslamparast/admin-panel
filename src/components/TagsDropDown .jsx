// TagsDropDown.jsx
import React, { useState, useRef, useEffect } from 'react';

export default function TagsDropDown({ tags = [], onTagSelect,selected }) {
  const [isOpen, setIsOpen] = useState(false);
 const [selectedState, setSelected] = useState(selected || (tags.length > 0 ? tags[0] : ''));
   const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
  setSelected(selected || (tags.length > 0 ? tags[0] : ''));
}, [selected, tags]);


function handleSelect(tag) {
    setSelected(tag);
    setIsOpen(false);
    if (onTagSelect) onTagSelect(tag);
  }
   const allTags = ['همه', ...tags.filter(tag => tag !== 'همه')];

  return (
    <div className="w-72 relative text-black" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 flex justify-between items-center"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedState || 'Select a tag'}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <ul
        className={`absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none transition-all duration-150
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        tabIndex={-1}
        role="listbox"
        aria-labelledby="listbox-label"
      >
        
        {allTags.map((tag, index) => (
          <li
            key={index}
            className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-600 hover:text-white ${
              selectedState === tag ? 'font-semibold bg-blue-100 text-blue-900' : 'text-gray-900'
            }`}
            onClick={() => handleSelect(tag)}
            role="option"
            aria-selected={selectedState === tag}
          >
            <span className="block truncate">{tag}</span>

            {selectedState === tag && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
