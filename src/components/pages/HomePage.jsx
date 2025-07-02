import { Link } from "react-router-dom";
import NewsSlider from "../NewsSlider";
import { useState,useEffect } from "react";
import Navbar from "../Navbar";
import MainNews from "../MainNews";
import RecentNews from "../RecentNews";
import Advertisings from "../Advertisings";
import StatusBar from "../StatusBar";
import SocialMedias from "./SocialMedias";
import Footer from "../Footer";
import SearchResultsModal from "../SearchResultsModal";

export default function HomePage() {

      const [posts, setPosts] = useState([]);
      const [loading, setLoading] = useState(false);
      const [name, setName] = useState('');
      const [page, setPage] = useState(1);
      const [hasMore, setHasMore] = useState(true);
      const [searchValue, setSearchValue] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [showModal, setShowModal] = useState(false);
      const token = localStorage.getItem("token")

      
      const fetchPosts = async (pageNum = 1) => {
          setLoading(true)
        try {
          const res = await fetch(`https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts?_embed&per_page=6&page=${pageNum}`);
          const data = await res.json();
          if (pageNum === 1) {
            setPosts(data);
          } else {
            setPosts(prev => [...prev, ...data]);
          }
            setHasMore(data.length === 6);
            setLoading(false)
        } catch (error) {
          console.error("خطا در دریافت پست‌ها:", error);
          setLoading(false)
        }
      };


      const fetchUser = async() => {
        try {
          fetch("https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
      })
        } catch (error) {
          console.log("user not found");
          
        }

      }

  useEffect(() => {
    fetchUser()
    fetchPosts(1);
  }, []);

  const handleShowMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage);
  };


    const handleSearch = async (e)=>{
        e.preventDefault();
        if (!searchValue.trim()) return;
          setLoading(true);
        try {
          const res = await fetch(`https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts?search=${encodeURIComponent(searchValue)}&_embed`);
          const data = await res.json();
          setSearchResults(data);
          setShowModal(true);
        } catch (error) {
          setSearchResults([]);
          setShowModal(true);
        } finally {
          setLoading(false);
        }




        // const results = posts.filter(post =>
        //   (post.title?.rendered && post.title.rendered.includes(searchValue)) ||
        //   (post.excerpt?.rendered && post.excerpt.rendered.includes(searchValue))
        // );
        // setSearchResults(results);
        // setShowModal(true);
    }



  return (
    <div dir="rtl" className=" w-full">

      <Navbar handleSearch={handleSearch} name={name}
       searchValue={searchValue} setSearchValue={setSearchValue}/>
     
     <NewsSlider {...{posts,loading}}/>

      <div className="flex flex-col md:flex-row gap-4 p-4 items-start">
       <div className="w-full flex flex-col">
        <MainNews {...{posts}}/>
       {hasMore && (
            <button
              onClick={handleShowMore}
              className={`w-fit mx-auto mt-4 bg-blue-600 border-2 border-blue-600 text-white p-1.5 text-sm rounded hover:bg-transparent hover:text-blue-600 hover:border-blue-600 cursor-pointer transition ${loading ? 'hidden' : ''}`}
              disabled={loading}
            >
              {loading ? "در حال بارگذاری..." : "نمایش بیشتر"}
            </button>
          )}
       </div>
       <div className="w-1/4">
       <StatusBar/>
       <Advertisings/>
       <SocialMedias/>
       </div>
      </div>
        <Footer/>  
        {showModal && <SearchResultsModal searchResults={searchResults} setShowModal={setShowModal}/>}       
    </div>
  );
}
