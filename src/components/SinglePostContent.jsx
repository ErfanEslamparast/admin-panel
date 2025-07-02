import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader/Loader';
import EditPostModal from './EditPostModal';
import { SquarePen,Pencil,ThumbsUp,ThumbsDown,Share2 } from 'lucide-react';

const SinglePostContent = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const currentUsername = localStorage.getItem("username");
 
  

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

  const authorUsername = post._embedded?.author?.[0]?.slug;
   

    return (
        <div className="w-195 ms-auto p-4">
      <img src={image} alt={post.title.rendered} className="w-full h-75 object-cover rounded-lg mb-4" />
      <div className="title-and-ctg flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-950 my-4 mb-8" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded mb-4 inline-block h-fit">{category}</span>
      </div>
      <div
        className="mt-4 text-gray-500 text-xl underline leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <div
        className="mt-4 text-[rgb(72,72,72)] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      <div className='flex justify-between mt-3'>
        <div className='flex items-center gap-5'>
          <div className="flex items-center gap-0.5 text-blue-800 text-sm">
            <Pencil size={14} />
            <span>منتشر کننده:</span>
            {post._embedded.author[0]?.name}
        </div>
        </div>
      <div className='flex items-center gap-6'>
        <div title='اشتراک‌گذاری' className='text-black/65 hover:text-black -mt-1  cursor-pointer'><Share2 size={21} /></div>

        <div className='flex items-center gap-2'>
           <span className='-mt-1.5 cursor-pointer' onClick={() => {
              setLike(l => !l);
              setDislike(false);
           }}><ThumbsUp color='green' size={22} fill={like ? "green" : "none"} /></span>

           <span className='mt-2 cursor-pointer' onClick={() => {
              setDislike(d => !d);
              setLike(false);
           }}><ThumbsDown color='red' size={22} fill={dislike ? "red" : "none"}  /></span>
           
        </div>
        {currentUsername === authorUsername && (
          <button
            onClick={() => setShowEditModal(true)}
            className="flex justify-start items-center gap-1 bg-blue-600 text-white text-[13px] px-3 py-1.5 rounded hover:bg-blue-700 my-6 cursor-pointer"
          >
            <SquarePen size={15} />
            ویرایش
          </button>
        )}
      </div>
      </div>
      {showEditModal && (
        <EditPostModal
          post={post}
          onClose={() =>  setShowEditModal(false)}
          onUpdate={() => navigate(0) }
        />
       )}
    </div>
    );
}

export default SinglePostContent;
