import React, { useState, useEffect } from 'react';
import { convertDate } from 'utils/Convert';
import RelatedItem from 'components/RelatedItem/RelatedItem';
import About from 'components/About/About';
import axios from 'axios';

const DetailEventPage = (props) => {
  const postId = props.match.params.id;
  const [postDetail, setPostDetail] = useState([]);
  const [post, setPost] = useState([]);
  const { title, content, date, image_url } = postDetail;

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/posts/${postId}`)
        .then((res) => {
          const postData = res.data;
          setPostDetail(postData);
        })
        .catch((error) => {
          console.log(error);
        });

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

  return (
    <div className='detail-post'>
      <div className='flex flex-wrap gap-5 md:flex-nowrap'>
        <div className='w-full flex flex-col md:w-2/3'>
          <h2 className='text-xl text-secondary pb-1 sm:text-2xl'>{title}</h2>
          <small className='text-sm font-medium sm:text-base'>
            <span>
              <i className='far fa-clock'></i>
            </span>{' '}
            {convertDate(date)}
          </small>
          <img src={image_url} alt='' className='py-2' />
          <div>
            {content
              ? content.split(/\n/).map((sentence, index) => {
                  return (
                    <p
                      key={index}
                      className='text-justify text-sm pb-2 sm:text-base'
                    >
                      {sentence}
                    </p>
                  );
                })
              : null}
          </div>
        </div>
        <About />
      </div>
      <h2 className='text-xl text-secondary py-3 sm:text-2xl'>Tin liên quan</h2>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {post
          .filter((e) => e.id !== postDetail.id)
          .slice(0, 8)
          .map((relateItem, index) => {
            const category = relateItem.category;
            return (
              <RelatedItem
                key={index}
                relateItem={relateItem}
                category={category}
              />
            );
          })}
      </div>
    </div>
  );
};

export default DetailEventPage;
