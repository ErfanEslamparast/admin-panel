import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader/Loader';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategoies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  setTimeout(() => setFirstLoading(false), 700);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch("https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/categories")
      .then((res) => res.json())
      .then((data) => setCategoies(data))
      .catch((err) => console.error("خطا در دریافت تگ‌ها:", err));
  }, []);

  // آپلود عکس و دریافت mediaId
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', image);

    const res = await fetch("https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/media", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();
    if (res.ok) return data.id;
    else throw new Error(data.message || "خطا در آپلود تصویر");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let mediaId = null;
      if (image) {
        mediaId = await uploadImage();
      }

      const postBody = {
        title,
        content,
        excerpt:summary,
        status: "publish",
        featured_media: mediaId || undefined,
        categories: selectedCategory ? [selectedCategory] : [],
      };

      const res = await fetch("https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postBody)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "خطا در ارسال پست");

      setMessage("پست با موفقیت منتشر شد!");
        setIsError(false)
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
        setIsError(true)
      setMessage(err.message);
    } finally {
    setLoading(false);
    }
  };

  if(firstLoading)  return <p className="text-center mt-10"><Loader/></p>

  return (
     <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-6 text-gray-700 text-center">ساخت پست جدید</h2>

      <input
        type="text"
        placeholder="تیتر پست"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="خلاصه پست"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="متن پست"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="6"
        className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <div className="mb-4">
        <label
          htmlFor="fileUpload"
          className="block w-full px-4 py-2 bg-gray-100 text-[rgb(72,72,72)] rounded cursor-pointer text-center hover:bg-gray-200"
        >
         عکس موردنظر را انتخاب کنید
        </label>
        <input
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
         />
        </div>


      <select
        className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded"
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
      >
        <option className='text-[rgb(72,72,72)]' value="">انتخاب تگ</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "در حال ارسال..." : "ارسال پست"}
      </button>

      {message && (
        <p className={`mt-4 text-center text-sm ${isError ? 'text-red-600' : 'text-green-600'} `}>{message}</p>
      )}
    </form>
  );
}
