import React from 'react';
import { Card } from 'antd';
import Autoplay from 'embla-carousel-autoplay';
import { ReviewWithUser } from 'types/ReviewWithUser';
import { Carousel, CarouselContent, CarouselItem } from '@ui/carousel';
import SingleReview from '@components/SingleReviewCard';

export default function ReviewsCard ({
  reviews,
}: {
  reviews: ReviewWithUser[];
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  return (
    <Card>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        plugins={[plugin.current]}
        className='h-[30%] w-full max-w-xs pt-2'
      >
        <CarouselContent className='-mt-1 h-[100px] w-full '>
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className='flex justify-center pt-1 md:basis-1/2'
            >
              <SingleReview review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </Card>
  );
}
