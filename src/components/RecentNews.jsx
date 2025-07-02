import React,{useEffect, useState} from 'react';
import Loader2 from './Loader/Loader2';
import { Link } from 'react-router-dom';

const RecentNews = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState();

   const fetchPosts = async () => { 
    setLoading(true)
        try {
          const res = await fetch(`https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts?_embed`);
          const data = await res.json();
          setPosts(data)
          setLoading(false)
        } catch (error) {
          console.error("خطا در دریافت پست‌ها:", error);
        }
        finally{
          setLoading(false)
        }
      };

useEffect(() => {
  fetchPosts()
}, []);
    const renderdContent = () => {
  if (!posts || posts.length === 0) {
    return <li>خبری یافت نشد</li>;
  }

  // sorting posts by date
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return sortedPosts.map(post => (
    
      <li key={post.id}>
        <Link to={`/post/${post.id}`}  className=" flex items-center hover:text-blue-600 ">
          <img src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '../src/assets/images/default.png'} className='w-12 h-12 object-cover ml-4' />
          <p>{post.title.rendered}</p>
        </Link>
    </li>
    
  ));
};

    return (
      
        <div className="w-full h-132 overflow-hidden bg-white shadow rounded p-3 py-2 mb-5">
          <h2 className="text-lg font-semibold text-gray-900  mb-2 border-b border-gray-400 pb-1.5">تازه‌ها</h2>
          {loading 
          ? <Loader2/>
        : 
          <ul className="space-y-3 text-sm text-[rgb(72,72,72)]">
             {
              renderdContent()
             }
          </ul>
          }
        </div>
    );
}

export default RecentNews;
