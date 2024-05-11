'use client';

import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import React from 'react';
import mockData from './mockData';

const images = [
  'https://london-shoreditch.nobuhotels.com/wp-content/uploads/2022/05/london-shoreditch-restaurant.jpg',
  'https://media-cdn.tripadvisor.com/media/photo-s/1b/03/a6/85/ground-floor-at-gymkhana.jpg',
  'https://cdn.squaremeal.co.uk/restaurants/760/duck-and-rice-2015-web.jpg?w=800',
  'https://flavourvenuesearch.com/wp-content/uploads/2019/08/Yauatcha.jpg',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
  'https://london-shoreditch.nobuhotels.com/wp-content/uploads/2022/05/london-shoreditch-restaurant.jpg',
  'https://qtxasset.com/quartz/qcloud1/media/image/2017-05/NobuShoreditch.jpg?VersionId=ZwtVBvrdNNORhrjqFdkhuZ0FHGkYkFhh',
  'https://flavourvenuesearch.com/wp-content/uploads/2019/08/Yauatcha.jpg',
  'https://london-shoreditch.nobuhotels.com/wp-content/uploads/2022/05/london-shoreditch-restaurant.jpg',
  'https://london-shoreditch.nobuhotels.com/wp-content/uploads/2022/05/london-shoreditch-restaurant.jpg',
  'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
  'https://www.restaurantonline.co.uk/var/wrbm_gb_hospitality/storage/images/publications/hospitality/bighospitality.co.uk/article/2020/02/06/nobu-berkeley-street-is-reportedly-closing/3275387-7-eng-GB/Nobu-Berkeley-Street-is-reportedly-closing.jpg',
  'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80',
  'https://media-cdn.tripadvisor.com/media/photo-s/1b/03/a6/85/ground-floor-at-gymkhana.jpg',
];

function Page () {
  return (
    <div className='flex w-full justify-center pt-[10%]'>
      <div className='w-[90%] flex-col'>
        <div className='mb-4 text-2xl font-extrabold'>
          <h1>For You</h1>
        </div>
        <div className=''>
          <ParallaxScroll images={images} data={mockData} />
        </div>
      </div>
    </div>
  );
}

export default Page;
