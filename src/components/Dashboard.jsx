import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader/Loader';
import CreatePostButton from './CreatePostButton';
import DeleteModal from './deleteModal';
import { Trash2 } from 'lucide-react';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';
import RadioButtons from './RadioButtons/RadioButtons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './PostTransition.css'; 


export default function Dashboard() {
  const [userName, setUserName] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem('token') || '');
  const [order, setOrder] = useState('desc');
  const [postsToShow, setPostsToShow] = useState([]);
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTarget, setModalTarget] = useState(null); 
  const [imagedPosts, setImagedPosts] = useState([]);

  // this function just gets the userID from the server
  const fetchUserId = async () => {
    setLoading(true);
    const res = await fetch('https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/users/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUserName(data.name);
    return data.id;
  };

  const fetchPosts = async (userId) => {
    const res = await fetch(`https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts?author=${userId}&_embed`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setPosts(data);
  };
 //get the posts that user posted by userID
  useEffect(() => {
    if (!token) return;
    (async () => {
      try {
        const userId = await fetchUserId();
        await fetchPosts(userId);
      } catch (err) {
        console.error('خطا در دریافت پست‌ها:', err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    })();
  }, [token]);

  // for posts sorting
  useEffect(() => {
  const sorted = [...posts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
  setPostsToShow(sorted);
}, [order, posts]);

 // checking all posts selecting for checkmarking the checkbox
  useEffect(() => {
    if (selectedPosts.length === postsToShow.length && postsToShow.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedPosts, postsToShow]);

  const toggleSelect = (id) => {
    setSelectedPosts(prev =>
      prev.includes(id) ? prev.filter(prevId => prevId !== id) : [...prev, id]
    );
  };

  //  the function that selects all posts
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedPosts([]);
    } else {
      const allPostIds = postsToShow.map(post => post.id);
      setSelectedPosts(allPostIds);
    }
    setSelectAll(!selectAll);
  };

  // the function that deletes posts from the servers
  const handleDelete = async () => {
    try {
      const idsToDelete = modalTarget === 'bulk' ? selectedPosts : [modalTarget];

      for (let id of idsToDelete) {
        await fetch(`https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setPosts(prev => prev.filter(p => !idsToDelete.includes(p.id)));
      setSelectedPosts([]);
      setMultiSelectMode(false);
      setSelectAll(false);
      setShowModal(false);
      setModalTarget(null);
    } catch (err) {
      alert('خطا در حذف پست‌ها: ' + err.message);
    }
  };

  if (loading) return <p className="text-center mt-10"><Loader /></p>;

  return (
    <div className="p-4 max-w-5xl mx-auto min-h-120 transition-all duration-300 ease-in-out">
      <h1 className="text-2xl font-bold mb-6">پست‌های شما</h1>

      <div className="mb-4 flex items-center gap-4 justify-between">

      {postsToShow.length > 0 &&
      (
        <>
        <div className='flex items-center gap-3'>
          <button
          onClick={() => {
            if (multiSelectMode && selectedPosts.length > 0) {
              setModalTarget('bulk');
              setShowModal(true);
            } else {
              setMultiSelectMode(prev => !prev);
              setSelectedPosts([]);
              setSelectAll(false);
            }
            // selectedPosts.length !== posts.length && setSelectAll(false);
          }}
          className={`px-4 py-2 rounded  text-white ${multiSelectMode ? 'bg-red-600' : 'bg-blue-600'} cursor-pointer`}
        >
          {multiSelectMode ? 'حذف موارد انتخاب شده' : 'حذف چندتایی'}
        </button>
        {multiSelectMode && (
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
            انتخاب همه
          </label>
        )}
        </div>

        <div className='flex items-center gap-8'>
        <RadioButtons  {...{ order, setOrder }}/>
        <ToggleSwitch checked={imagedPosts} onChange={setImagedPosts}/>
        </div>
        </>
        )

      }
      </div>

      {postsToShow.length === 0 ? (
        <CreatePostButton />
      ) : (
        <div className="grid gap-2">
          
          {
          (
      imagedPosts
        ? postsToShow.filter(post => post._embedded?.['wp:featuredmedia']?.[0]?.source_url)
        : postsToShow
    ).map( post => {
            const image =
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'src/assets/images/default.png';
            const category =
              post._embedded?.['wp:term']?.[0]?.[0]?.name || 'دسته‌بندی نشده';
            const isSelected = selectedPosts.includes(post.id);

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
          })}
        </div>
      )}

      {showModal && (<DeleteModal handleDelete={handleDelete} setShowModal={setShowModal} modalTarget={modalTarget} setModalTarget={setModalTarget} />)}
    </div>
  );
}

