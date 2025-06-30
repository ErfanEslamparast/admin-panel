import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [categories, setCategoies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mediaId, setMediaId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageName, setImageName] = useState('');

  const navigate = useNavigate();
  setTimeout(() => setFirstLoading(false), 700);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch("https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/categories")
      .then((res) => res.json())
      .then((data) => setCategoies(data))
      .catch((err) => console.error("خطا در دریافت تگ‌ها:", err));
  }, []);


  const uploadImage = () => {
  return new Promise((resolve, reject) => {
    if (!image) return resolve(null);

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', image);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/media');

    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setUploadProgress(percent);
      }
    });

    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      setImageName(res.title?.rendered || image.name);
      setUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(res.id);
      } else {
        reject(new Error(res.message || "خطا در آپلود تصویر"));
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      reject(new Error('خطا در آپلود تصویر'));
    };

    xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    xhr.send(formData);
  });
};
useEffect(() => {
     if (image) {
    uploadImage().then(id => setMediaId(id));
  }
    }, [image]);

//****** */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {

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
        placeholder="خلاصه پست (حداکثر ۲۵۰ کاراکتر)"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        maxLength={250}
        className="w-full mb-4 px-4 py-2 border border-gray-300 text-[rgb(72,72,72)] rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
        {summary.length === 250 && (
          <p className="text-[10px] text-red-600 -mt-2 mb-2">
            شما بیشتر از ۲۵۰ کاراکتر نمی‌توانید تایپ کنید
          </p>
        )}
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
         {!uploading && !imageName && <span>عکس موردنظر را انتخاب کنید</span>}
         {uploading && (
      <div>
        <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-2"
            style={{ width: `${uploadProgress}%`, transition: 'width 0.3s ease-in-out' }}
          />
        </div>
        <p className="text-xs text-blue-600 mt-1 text-center">{uploadProgress}%</p>
      </div>
    )}
        {!uploading && imageName && (
      <span className="text-green-600 text-sm">✅ {imageName}</span>
    )}
        </label>
        <input
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setImageName('');
              setUploadProgress(0);
            }}
            className="hidden"
            disabled={uploading}
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
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
      >
        {loading ? "در حال ارسال..." : "ارسال پست"}
      </button>

      {message && (
        <p className={`mt-4 text-center text-sm ${isError ? 'text-red-600' : 'text-green-600'} `}>{message}</p>
      )}
    </form>
  );
}
