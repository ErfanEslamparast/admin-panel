import React, { useEffect, useState, useRef } from 'react';
import Marquee from "react-fast-marquee";

const NewsSlider = ({ posts, loading }) => {
  const [randomIndex, setRandomIndex] = useState(0);
  const [show, setShow] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    setRandomIndex(0);
  }, [posts]);

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    
    const getRandomIndex = (prev, length) => {
      if (length <= 1) return 0;
      let rnd;
      do {
        rnd = Math.floor(Math.random() * length);
      } while (rnd === prev);
      return rnd;
    };

    if (show) {
      timerRef.current = setTimeout(() => {
        setShow(false);
      }, 9970);
    } else {
      timerRef.current = setTimeout(() => {
        setRandomIndex(prev => getRandomIndex(prev, posts.length));
        setShow(true);
      }, 4000);
    }

    return () => clearTimeout(timerRef.current);
  }, [show, posts]);

  if (loading || !posts || posts.length === 0) return "";

  const post = posts[randomIndex];

  return (
    <div className="min-h-7 overflow-hidden whitespace-nowrap bg-blue-900 text-sm py-1 px-3">
      {show ? (
        <Marquee
          gradient={false}
          speed={150}
          pauseOnHover={false}
          direction="right"
          className="inline-block"
        >
          {post ? post.title.rendered : "پستی یافت نشد"}
        </Marquee>
      ) : (
        <div>
          {post ? post.title.rendered : "پستی یافت نشد"}
        </div>
      )}
    </div>
  );
};

export default NewsSlider;