import React from 'react';
import PostItem from 'components/PostItem/PostItem';

const PostList = ({ post, category }) => {
  return (
    <div className='post-list w-full flex flex-col order-2 gap-8 md:w-2/3 md:order-1 sm:gap-4'>
      {post.map((postItem, index) => {
        return <PostItem key={index} postItem={postItem} category={category} />;
      })}
    </div>
  );
};

export default PostList;
