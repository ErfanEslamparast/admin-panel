import React,{useEffect,useState} from 'react';

const NewsTags = () => {
    const [categories, setCategories] = useState([]);

     useEffect(() => {
    
        fetch('https://api.eeslamparast.host.webr.ir/wp-json/wp/v2/categories')
          .then(res => res.json())
          .then (data => setCategories(data))

      }, []);
    return (
        <div className='flex flex-wrap p-2.5 px-3.5 rounded bg-gray-50 gap-1.5'>
        {categories.map(category=> (
            <div key={categories.id} className='inline text-gray-600 text-[13px] underline-offset-7 hover:underline hover:text-blue-600 cursor-pointer'>#{category.name} </div>
        )
        )}
        </div>
    );
}

export default NewsTags;
