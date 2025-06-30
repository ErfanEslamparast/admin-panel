import React from 'react';

const RecentNews = ({posts}) => {

    const renderdContent = () => {
  if (!posts || posts.length === 0) {
    return <li>خبری یافت نشد</li>;
  }

  // sorting posts by date
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return sortedPosts.map(post => (
    
      <li key={post.id} className=" flex items-center hover:text-blue-600 cursor-pointer">
        <img src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'src/assets/images/default.png'} className='w-10 h-10 object-cover ml-4' />
      <p>{post.title.rendered}</p>
    </li>
    
  ));
};

    return (
        <div className="w-full h-60 overflow-hidden bg-white shadow rounded p-3 py-2 mb-5">
          <h2 className="text-lg font-semibold text-gray-900  mb-2 border-b border-gray-400 pb-1.5">تازه‌ها</h2>
          <ul className="space-y-2 text-sm text-[rgb(72,72,72)]">
           
             {renderdContent()}
           
          </ul>
        </div>
    );
}

export default RecentNews;
