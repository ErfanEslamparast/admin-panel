import { UserPen } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const MainNews = ({posts}) => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            
            <Link to={`/post/${post.id}`} key={post.id} className="relative h-60 bg-gray-300 rounded overflow-hidden shadow group">
              <span className='absolute inset-0  ms-2 mt-2 z-30 text-[12px] bg-blue-100 text-blue-700 px-1.5 py-1 rounded inline-block h-fit w-fit'>{post._embedded?.['wp:term']?.[0]?.[0]?.name || 'دسته‌بندی نشده'}</span>
              <img
                src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'src/assets/images/default.png'}
                alt="خبر"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 transition-all duration-200 group-hover:bg-black/0"></div>
                <div className="absolute bottom-9 right-0 left-0 px-5 z-10">
                  <b className="block w-full text-white/80 text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-200 group-hover:text-white drop-shadow">
                    {post.title?.rendered || "عنوان خبر"}
                  </b>
                </div>
              {/* <div className="absolute text-white w-full px-3 py-2 text-sm z-10 transition-all duration-200 group-hover:bg-black/70">
                {post.excerpt?.rendered
                  ? <span dangerouslySetInnerHTML={{__html: post.excerpt.rendered}} />
                  : "اینجا متن کوتاهی از خبر نوشته می‌شود..."}
              </div> */}
              <div className="flex items-basline absolute bottom-0 bg-black/90 text-white/80 w-full px-2 py-1 text-sm gap-1">
                <UserPen size={20} />
                <span className='leading-6'>
                 {post._embedded?.author?.[0]?.name || "نویسنده نامشخص"}
                </span>
              </div>
            </Link>
          ))}
        </div>
    );
}

export default MainNews;
