import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader/Loader';
import EditPostModal from './EditPostModal';


export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts/${id}?_embed`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error('خطا در دریافت پست:', err);
      } finally {
        setTimeout(() => {setLoading(false)}, 1000);;
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center mt-10"><Loader/></p>;
  if (!post) return <p className="text-center mt-10 text-red-500">پست پیدا نشد!</p>;

  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/src/assets/images/no-image.jpg';
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'دسته‌بندی نشده';

  return (
    <div className="max-w-3xl mx-auto p-4">
      <img src={image} alt={post.title.rendered} className="w-full h-64 object-cover rounded-lg mb-4" />
      <div className="title-and-ctg flex justify-between items-center">
        <h1 className="text-2xl font-bold my-4 mb-8" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded mb-4 inline-block h-fit">{category}</span>
      </div>
      <div
        className="mt-4 text-rgb(225, 225, 225) text-xl underline leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <div
        className="mt-4 text-rgb(225, 225, 225) leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <div className='flex justify-end'>
        <button
      onClick={() => setShowEditModal(true)}
      className="flex justify-start bg-blue-600 text-white text-[13px] px-3 py-1.5 rounded hover:bg-blue-700 my-6 cursor-pointer"
      >
     ویرایش
      </button>
      </div>
      {showEditModal && (
  <EditPostModal
    post={post}
    onClose={() => setShowEditModal(false)}
    onUpdate={() => navigate(0) }
  />
)}
    </div>
  );
}
