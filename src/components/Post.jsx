import React from 'react';
import { Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Post = ({post,postProps}) => {
     const {
    multiSelectMode,
    toggleSelect,
    isSelected,
    image,
    category,
    setModalTarget,
    setShowModal
  } = postProps;

    return (
        <div
                key={post.id}
                onClick={() => {
                  if (multiSelectMode) {
                    toggleSelect(post.id);
                  }
                }}
                className={`relative flex items-center bg-white text-gray-900 shadow rounded-lg overflow-hidden border group cursor-pointer transition-all  ${
                  isSelected ? 'ring-3 ring-blue-500 bg-blue-50' : ''
                }`}
              >
                {multiSelectMode ? (
                  <div className="flex-1 flex items-center">
                    <img
                      src={image}
                      alt={post.title.rendered}
                      className="w-24 h-24 object-cover ml-4"
                    />
                    <div className="flex-1 px-4 py-2">
                      <h2
                        className="text-lg font-semibold"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-l me-2.5">
                      {category}
                    </span>
                  </div>
                ) : (
                  <Link to={`/post/${post.id}`} className="flex-1 flex items-center">
                    <img
                      src={image}
                      alt={post.title.rendered}
                      className="w-24 h-24 object-cover ml-4"
                    />
                    <div className="flex-1 px-4 py-2">
                      <h2
                        className="text-lg font-semibold"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-l me-2.5">
                      {category}
                    </span>
                  </Link>
                )}

                {!multiSelectMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalTarget(post.id);
                      setShowModal(true);
                    }}
                    className="absolute left-3 top-2 hidden group-hover:flex items-center gap-0.5 text-red-400 rounded text-[14px] cursor-pointer"
                  >
                    <Trash2 size={14}/>
                    حذف
                  </button>
                )}
              </div>
    );
}

export default Post;
