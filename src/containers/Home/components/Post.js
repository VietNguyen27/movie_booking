import React, { useState, useEffect } from 'react';
import PostItem from 'components/PostItem/PostItem';
import About from 'components/About/About';
import axios from 'axios';

const Post = () => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/posts')
        .then((res) => {
          const postData = res.data;
          const randomPost = postData.sort(() => Math.random() - 0.5);
          setPost(randomPost);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const handlePost = () => {
    return post.slice(0, 2).map((postItem, index) => {
      const category = postItem.category;
      return <PostItem key={index} postItem={postItem} category={category} />;
    });
  };

  return (
    <div className='post py-8'>
      <div className='flex flex-wrap gap-5 md:flex-nowrap'>
        <div className='w-full flex flex-col gap-8 md:w-2/3 md:gap-4'>
          <h2 className='text-2xl font-bold text-center uppercase'>Tin tức</h2>
          {handlePost()}
        </div>
        <About />
      </div>
    </div>
  );
};

export default Post;
