import React from 'react';
import { Rate } from 'antd';

import {
  Cookie, PiggyBank, Flame, LucideProps,
} from 'lucide-react';
import { Label } from './ui/label';

type MarkerPopupIconProps = {
  value: string;
  IconType: string;
};
export default function MarkerPopupIcons ({
  value,
  IconType,
}: MarkerPopupIconProps) {
  let Icon: React.ElementType<LucideProps> = Cookie;
  let Gap: number = 0;

  if (IconType === 'Food') {
    Icon = Cookie;
    Gap = 2;
  }
  if (IconType === 'Value') {
    Icon = PiggyBank;
    Gap = 2;
  }
  if (IconType === 'Vibe') {
    Icon = Flame;
    Gap = 1;
  }
  return (
    <div className='flex flex-col items-center'>
      <div className={`flex h-12 gap-${Gap}`}>
        <Icon size={45} strokeWidth={1.5} className='shrink-0' />
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <Rate
            count={1}
            defaultValue={1}
            style={{ color: 'black' }}
            disabled
          />
          <Label className='text-xs font-bold'>{value}</Label>
        </div>
      </div>
      <Label className='text-sm font-bold'>{IconType}</Label>
    </div>
  );
}
