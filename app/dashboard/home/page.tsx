import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import React from 'react';
import mockData from './mockData';

const images = [
  'https://lh3.googleusercontent.com/places/ANXAkqGycyW3SJAlr7FLgr-6HBhuiUPfyRwemeYzLndEWf6QTGOBRme-Mo0A2d4g_rKC0nKSF99m6LE6DCS5iM9eNfpImusx9UqObqk=s4800-w300-h300',
  'https://media-cdn.tripadvisor.com/media/photo-s/1b/03/a6/85/ground-floor-at-gymkhana.jpg',
  'https://cdn.squaremeal.co.uk/restaurants/760/duck-and-rice-2015-web.jpg?w=800',
  'https://flavourvenuesearch.com/wp-content/uploads/2019/08/Yauatcha.jpg',
  'https://lh3.googleusercontent.com/places/ANXAkqGycyW3SJAlr7FLgr-6HBhuiUPfyRwemeYzLndEWf6QTGOBRme-Mo0A2d4g_rKC0nKSF99m6LE6DCS5iM9eNfpImusx9UqObqk=s4800-w300-h300',
  'https://media-cdn.tripadvisor.com/media/photo-s/1b/03/a6/85/ground-floor-at-gymkhana.jpg',
  'https://cdn.squaremeal.co.uk/restaurants/760/duck-and-rice-2015-web.jpg?w=800',
  'https://flavourvenuesearch.com/wp-content/uploads/2019/08/Yauatcha.jpg',
  'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
  'https://london-shoreditch.nobuhotels.com/wp-content/uploads/2022/05/london-shoreditch-restaurant.jpg',
  'https://qtxasset.com/quartz/qcloud1/media/image/2017-05/NobuShoreditch.jpg?VersionId=ZwtVBvrdNNORhrjqFdkhuZ0FHGkYkFhh',
  'https://flavourvenuesearch.com/wp-content/uploads/2019/08/Yauatcha.jpg',
  'https://london-shoreditch.nobuhotels.com/wp-content/uploads/2022/05/london-shoreditch-restaurant.jpg',
  'https://london-shoreditch.nobuhotels.com/wp-content/uploads/2022/05/london-shoreditch-restaurant.jpg',
  'https://london-shoreditch.nobuhotels.com/wp-content/uploads/2022/05/london-shoreditch-restaurant.jpg',
];

async function Page () {
  async function getData () {
    const res = await fetch('http://localhost:3000/api/db/reviews', {
      cache: 'no-store',
    });
    const test = await res.json();
    console.log('why', test);
  }

  getData();

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
