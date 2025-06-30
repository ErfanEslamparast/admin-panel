import { Link } from "react-router-dom";
import NewsSlider from "../NewsSlider";
import { useState,useEffect } from "react";
import Navbar from "../Navbar";
import MainNews from "../MainNews";
import RecentNews from "../RecentNews";
import Advertisings from "../Advertisings";

export default function HomePage() {

      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
        setLoading(true)
      try {
        const res = await fetch("https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts?_embed");
        const data = await res.json();
        setPosts(data);
        setLoading(false)
      } catch (error) {
        console.error("خطا در دریافت پست‌ها:", error);
        setLoading(false)
      }
    };

    fetchPosts();
  }, []);



    const handleSearch = ()=>{

        console.log('search');
        
    }



  return (
    <div dir="rtl" className=" w-full">

      <Navbar handleSearch={handleSearch}/>
     
     <NewsSlider {...{posts,loading}}/>

      <div className="flex flex-col md:flex-row gap-4 p-4 items-start">
       <MainNews {...{posts}}/>
       <div className="w-1/4">
      <RecentNews {...{posts}}/>  
       <Advertisings/>
       </div>
      </div>

    </div>
  );
}
