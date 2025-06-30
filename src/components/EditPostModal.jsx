import React, { useEffect, useState } from 'react';

export default function EditPostModal({ post, onClose, onUpdate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [newFeaturedMediaId, setNewFeaturedMediaId] = useState();
  const [loading, setloading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    if (post) {
      const tmp = document.createElement('div');
      tmp.innerHTML = post.title.rendered;
      setTitle(tmp.textContent || '');

      tmp.innerHTML = post.content.rendered;
      setContent(tmp.textContent || '');

      setSelectedCategory(post.categories?.[0] || null);
    }
  }, [post]);

  const fetchCategories = async () => {
    const res = await fetch('https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/categories');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageUpload = () => {
    return new Promise((resolve, reject) => {
      if (!imageFile) return resolve(null);

      setUploading(true);
      setUploadProgress(0);

      const formData = new FormData();
      formData.append('file', imageFile);

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
        setImageName(res.title?.rendered || imageFile.name);
        setUploading(false);
        resolve(res.id);
        setNewFeaturedMediaId(res.id)
      };

      xhr.onerror = () => {
        alert('خطا در آپلود تصویر');
        setUploading(false);
        reject(null);
      };

      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
      xhr.send(formData);
    });
  };

  useEffect(() => {
    handleImageUpload()
    }, [imageFile]);



  const handleSubmit = async () => {
    setloading(true);
    const token = localStorage.getItem('token');

    let featuredMediaId = post.featured_media;

    if (imageFile) {
      try {
        featuredMediaId = await newFeaturedMediaId;
      } catch {
        setloading(false);
        return;
      }
    }
    const postBody = {
        title,
        content,
        excerpt:summary,
        categories: selectedCategory ? [selectedCategory] : [],
        featured_media: featuredMediaId,
      }


    await fetch(`https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/posts/${post.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody),
    });

    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">ویرایش پست</h2>

        <label htmlFor='title' className="block mb-2 text-[rgb(72,72,72)]">تیتر پست:</label>
        <input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 text-[rgb(72,72,72)] p-2 rounded mb-4"
        />

        <label htmlFor='title' className="block mb-2 text-[rgb(72,72,72)]">خلاصه پست:  <span className='text-[10px] text-gray-400'>(حداکثر ۲۵۰ کاراکتر)</span></label>
        <input
          id='title'
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          maxLength={250}
          className="w-full border border-gray-300 text-[rgb(72,72,72)] p-2 rounded mb-4"
        />
        {summary.length === 250 && (
          <p className="text-[10px] text-red-600 -mt-2 mb-2">
            شما بیشتر از ۲۵۰ کاراکتر نمی‌توانید تایپ کنید
          </p>
        )}
        <label htmlFor='content' className="block mb-2 text-[rgb(72,72,72)]">محتوای پست:</label>
        <textarea
          id='content'
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 text-[rgb(72,72,72)] p-2 rounded mb-4"
        />

        <label htmlFor='category' className="block mb-2 text-[rgb(72,72,72)]">دسته‌بندی:</label>
        <select
          id='category'
          value={selectedCategory || ''}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
          className="w-full border border-gray-300 text-[rgb(72,72,72)] p-2 rounded mb-4"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label
          htmlFor="img"
          className="block w-full mb-2 p-2 bg-gray-200 text-[rgb(72,72,72)] rounded cursor-pointer text-center hover:bg-gray-200"
        >
          {!uploading && !imageName && <span>عکس جدید را بارگذاری کنید (اختیاری)</span>}
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
          id='img'
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImageFile(e.target.files[0]);
            setImageName('');
          }}
          className="mb-4"
          disabled={uploading}
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'در حال بارگذاری...' : 'ذخیره تغییرات'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded cursor-pointer hover:bg-gray-300"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
}
