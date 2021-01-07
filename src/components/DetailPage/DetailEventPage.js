import React, { useState, useEffect } from 'react';
import { convertDate } from 'utils/Convert';
import RelatedItem from 'components/RelatedItem/RelatedItem';
import About from 'components/About/About';
import axios from 'axios';

const DetailEventPage = (props) => {
  const eventId = props.match.params.id;
  const [eventDetail, setEventDetail] = useState([]);
  const [events, setEvents] = useState([]);
  const { title, content, expired_date, image_url } = eventDetail;

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`http://localhost:5000/events/${eventId}`)
        .then((res) => {
          const eventData = res.data;
          setEventDetail(eventData);
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get('http://localhost:5000/events')
        .then((res) => {
          const eventData = res.data;
          const randomEvent = eventData.sort(() => Math.random() - 0.5);
          setEvents(randomEvent);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div className='detail-event'>
      <div className='flex flex-wrap gap-5 md:flex-nowrap'>
        <div className='w-full flex flex-col md:w-2/3'>
          <h2 className='text-xl text-secondary pb-1 sm:text-2xl'>{title}</h2>
          <small className='text-sm sm:text-base'>
            Ngày hết hạn:{' '}
            <span className='font-semibold'>{convertDate(expired_date)}</span>
          </small>
          <img src={image_url} alt='' className='py-2' />
          <div>
            {content
              ? content.split(/\n/).map((sentence, index) => {
                  return (
                    <p
                      key={index}
                      className='text-justify pb-2 text-sm sm:text-base'
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
      <h2 className='text-2xl text-secondary py-3'>Tin liên quan</h2>
      <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
        {events
          .filter((e) => e.id !== eventDetail.id)
          .slice(0, 8)
          .map((relateItem, index) => {
            return (
              <RelatedItem
                key={index}
                relateItem={relateItem}
                category='events'
              />
            );
          })}
      </div>
    </div>
  );
};

export default DetailEventPage;
