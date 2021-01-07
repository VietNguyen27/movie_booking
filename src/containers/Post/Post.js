import React, { useState, useEffect } from 'react';
import Title from 'components/PageTitle/Title';
import PostList from './components/PostList';
import Category from './components/Category';
import { Route } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
  const [allPost, setAllPost] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('http://localhost:5000/posts')
        .then((res) => {
          const postData = res.data;
          setAllPost(postData);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  const filterPostByCategory = (category) => {
    return allPost.filter((e) => e.category === category);
  };

  return (
    <div>
      <Title title='Tin tức' />
      <div className='w-full flex items-start flex-wrap gap-5 py-8 md:flex-nowrap'>
        <Route path='/review'>
          <PostList post={filterPostByCategory('review')} category='review' />
        </Route>
        <Route path='/news'>
          <PostList post={filterPostByCategory('news')} category='news' />
        </Route>
        <Route path='/video'>
          <PostList post={filterPostByCategory('video')} category='video' />
        </Route>
        <Category />
      </div>
    </div>
  );
};

export default Post;
