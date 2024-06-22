import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { Rate } from 'antd';
import {
  MapPin, Plus, Milestone, Clock, Globe, Phone,
} from 'lucide-react';
import { ReviewWithUser } from 'src/types/ReviewWithUser';
import { Button } from 'src/components/ui/button';
import { DrawerClose, DrawerContent } from 'src/components/ui/drawer';
import { Label } from 'src/components/ui/label';
import { Separator } from 'src/components/ui/separator';
import RestaurantDrawerButton from 'src/components/restaurantDrawerButtons';
import MarkerPopupIcons from 'src/components/markerPopupRatingIcons';
import DetailCard from 'src/components/detailsCard';
import ReviewsCard from 'src/components/reviewsCard';

export default function MarkerPopupContents ({
  locationMarker,
}: {
  locationMarker: any;
}) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const { id: restaurantId } = locationMarker;
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReviews () {
      try {
        const res = await fetch(`/api/restaurant/${restaurantId}/reviews`);
        if (!res.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await res.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [restaurantId]);

  function scrollName () {
    if (nameRef.current) {
      const container: HTMLElement | null = nameRef.current;
      if (container) {
        if (
          container.scrollLeft + container.offsetWidth + 5
          > container.scrollWidth
        ) {
          container.style.scrollBehavior = 'smooth';
          setTimeout(() => {
            container.scrollLeft = 0;
          }, 500);
        } else {
          container.style.scrollBehavior = 'smooth';
          container.scrollLeft += 5;
          setTimeout(() => scrollName(), 0);
        }
      }
    }
  }
  function scrollToDetails () {
    if (detailsRef.current) {
      const container: HTMLElement | null = detailsRef.current.parentElement;
      if (container) {
        container.style.scrollBehavior = 'smooth';
        container.scrollTop = container?.offsetHeight;
      }
    }
  }

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <p>
        Error:
        {error}
      </p>
    );
  }

  function average (name: string): string {
    const ratingTypeArray: number[] = reviews.map(
      (review: any) => review[name],
    );

    if (ratingTypeArray.length === 0) {
      return '0.0';
    }

    const result = Math.round(
      (ratingTypeArray.reduce((a, b) => a + b, 0) / ratingTypeArray.length)
          * 10,
    ) / 10;

    return Number.isInteger(result) ? `${result}.0` : `${result}`;
  }

  function mainAverage (): number {
    return (
      Math.round(
        ((Number(average('rating_food'))
          + Number(average('rating_atmosphere'))
          + Number(average('rating_value')))
          / 3)
          * 10,
      ) / 10
    );
  }

  return (
    <DrawerContent className='h-[90vh] overflow-hidden focus:outline-none '>
      <div className='flex h-full w-full flex-col items-center gap-4'>
        <DrawerClose asChild>
          <Button className='absolute right-1 top-1' variant='ghost'>
            X
          </Button>
        </DrawerClose>
        <div
          className='mt-[-6%] h-[40%] w-full shrink-0 bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${locationMarker.image_url})` }}
        />
        <div className='flex h-full w-[90%] flex-col gap-4'>
          <div className='flex w-full shrink-0 gap-2 overflow-scroll scrollbar-none'>
            <DrawerClose asChild>
              <Link
                href={{
                  pathname: '/dashboard/add',
                  query: {
                    restaurant: JSON.stringify(locationMarker),
                    imgSource: JSON.stringify(locationMarker.image_url),
                  },
                }}
              >
                <RestaurantDrawerButton
                  Icon={Plus}
                  Title='Review'
                  // TODO: Add onClick function
                  handleClick={() => console.log('')}
                />
              </Link>
            </DrawerClose>
            <RestaurantDrawerButton
              Icon={Milestone}
              Title='Directions'
              handleClick={() => scrollToDetails()}
            />
            <RestaurantDrawerButton
              Icon={Clock}
              Title='Hours'
              handleClick={() => scrollToDetails()}
            />
            <RestaurantDrawerButton
              Icon={Phone}
              Title='Call'
              handleClick={() => scrollToDetails()}
            />
            <RestaurantDrawerButton
              Icon={Globe}
              Title='Website'
              handleClick={() => scrollToDetails()}
            />
          </div>
          <div className='flex w-full items-center justify-between gap-4'>
            <div
              className='w-full overflow-scroll scrollbar-none'
              ref={nameRef}
            >
              <Label
                className='flex w-full flex-row whitespace-nowrap text-3xl font-extrabold'
                onClick={() => scrollName()}
              >
                {locationMarker.name}
              </Label>
            </div>
            <Rate
              defaultValue={mainAverage()}
              disabled
              style={{ color: 'black', fontSize: 14, flexShrink: 0 }}
              tooltips={[
                'Avoid At All Cost',
                'Maybe Another Try',
                'Not My First Option',
                'Would Go Again',
                'Definite Yes',
              ]}
              allowHalf
            />
          </div>
          <div className='relative flex h-[80%] w-full flex-col gap-3 overflow-scroll pb-[80%] scrollbar-none'>
            <div className='flex w-full items-center justify-around'>
              <MarkerPopupIcons
                value={average('rating_food')}
                IconType='Food'
                isReview={false}
              />
              <Separator orientation='vertical' />
              <MarkerPopupIcons
                value={average('rating_value')}
                IconType='Value'
                isReview={false}
              />
              <Separator orientation='vertical' />
              <MarkerPopupIcons
                value={average('rating_atmosphere')}
                IconType='Vibe'
                isReview={false}
              />
            </div>
            <Separator />
            <p className='text-sm text-gray-500'>
              {locationMarker.summary}
              {' '}
            </p>
            <p className='flex items-center gap-3 text-sm text-gray-500'>
              <MapPin size={14} />
              {locationMarker.address}
            </p>
            <Separator />
            <Label className='pr-[10%] text-lg font-bold'>
              Reviews (
              {reviews.length}
              )
            </Label>
            <ReviewsCard reviews={reviews} />
            <div>
              <Label className='pr-[10%] text-lg font-bold'>Details</Label>
            </div>
            <DetailCard
              phone={locationMarker.phone}
              hours={locationMarker.opening_hours}
              detailsRef={detailsRef}
              directions={locationMarker.address}
              mapUri={locationMarker.google_maps_uri}
            />
          </div>
        </div>
      </div>
    </DrawerContent>
  );
}
