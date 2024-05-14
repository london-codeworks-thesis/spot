'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CardContent, Card } from './ui/card';
import { Label } from './ui/label';

type DetailCardProps = {
  phone: string;
  hours: string[];
  detailsRef: any;
  directions: string;
  mapUri: string;
};

export default function DetailCard ({
  detailsRef,
  phone,
  hours,
  directions,
  mapUri,
}: DetailCardProps) {
  const [open, setOpen] = useState(false);

  function findDay () {
    const d = new Date();
    const day = d.getDay() - 1 === -1 ? 6 : d.getDay() - 1;
    const openingHourArrayAfter = hours.slice(day);
    const openingHoursArrayBefore = hours.slice(0, day);
    return [...openingHourArrayAfter, ...openingHoursArrayBefore];
  }

  function scrollBottom () {
    if (detailsRef.current) {
      const container: HTMLElement | null = detailsRef.current.parentElement;
      if (container) {
        container.style.scrollBehavior = 'smooth';
        container.scrollTop = container?.scrollHeight;
      }
    }
  }

  return (
    <Card
      className={`${open ? 'h-[100%]' : ''} w-full shrink-0`}
      ref={detailsRef}
    >
      <CardContent className='flex flex-col justify-center gap-3'>
        <div className='flex flex-row gap-2 pt-6'>
          <Label className='text-sm font-bold'>Phone:</Label>
          <a href={`tel:${phone}`} className='text-sm'>
            <Label className='text-xs'>{phone}</Label>
          </a>
        </div>
        <div className='flex flex-row gap-2'>
          <Label className='text-sm font-bold'>Directions:</Label>
          <a
            href={`${mapUri}`}
            className='w-full overflow-scroll whitespace-nowrap text-sm scrollbar-none'
          >
            <Label className='text-xs'>{directions}</Label>
          </a>
        </div>
        <Accordion
          type='multiple'
          className='h-6 w-full pb-6'
          onValueChange={() => {
            setOpen(!open);
            setTimeout(() => scrollBottom(), 1);
          }}
        >
          <AccordionItem value='open'>
            <AccordionTrigger>
              <Label className='text-md font-bold'>{findDay()[0]}</Label>
            </AccordionTrigger>
            {findDay().map((day, index) => (index === 0 ? (
              <div key={day} />
            ) : (
              <AccordionContent key={day}>{day}</AccordionContent>
            )))}
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
