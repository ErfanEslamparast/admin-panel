import React, { useEffect, useState } from 'react';
import NewsTags from './NewsTags';

const StatusBar = () => {
     const [postCount, setPostCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
   const [now, setNow] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {

    fetch('https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts?per_page=1')
      .then(res => {

        setPostCount(Number(res.headers.get('X-WP-Total')) || 0);
      });

    fetch('https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/users?per_page=1')
      .then(res => {

        setUserCount(Number(res.headers.get('X-WP-Total')) || 0);
      });
  }, []);

  const persianizer = (num) => {
    return num.toLocaleString('fa-IR')
  }
    
    return (
    
    <div className="flex  flex-wrap gap-4 justify-center bg-white rounded mb-5 px-8 py-6 cursor-default">
      <div className="bg-black/3 rounded shadow p-4 min-w-[160px] text-center">
        <div className="text-2xl font-bold text-blue-600">{now.toLocaleTimeString('fa-IR')}</div>
        <div className="text-gray-600 text-sm mt-1">ساعت</div>
      </div>

    <div className="bg-black/3 rounded shadow p-4 min-w-[160px] text-center cursor-default">
        <div className="text-2xl font-bold text-amber-600">{now.toLocaleDateString('fa-IR')}</div>
        <div className="text-gray-600 text-sm mt-1">تاریخ</div>
    </div>

      <div className="bg-black/3 rounded shadow p-4 min-w-[160px] text-center cursor-default">
        <div className="text-2xl font-bold text-purple-600">{persianizer(postCount)}</div>
        <div className="text-gray-600 text-sm mt-1">کل اخبار</div>
      </div>

      <div className="bg-black/3 rounded shadow p-4 min-w-[160px] text-center cursor-default">
        <div className="text-2xl font-bold text-green-600">{persianizer(userCount)}</div>
        <div className="text-gray-600 text-sm mt-1">کاربر ثبت‌نام‌شده</div>
      </div>
      
      <div className=" text-center">
        <NewsTags/>
      </div>
      
    </div>
    );
}

export default StatusBar;
