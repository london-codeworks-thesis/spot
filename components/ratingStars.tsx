import React from 'react';
import { Rate } from 'antd';
import { Label } from '@/ui/label';

type StarRatingSystemProps = {
  Icon: React.ElementType;
  Title: string;
  valueType: number;
  setValueType: (value: number) => void;
};
export default function StarRatingSystem ({
  Icon,
  Title,
  valueType,
  setValueType,
}: StarRatingSystemProps) {
  return (
    <>
      <Label className='text-md flex w-20 items-center justify-between'>
        {Title}
        {' '}
        <Icon size={20} className='mb-1' />
      </Label>
      <Rate
        value={valueType}
        onChange={(v) => {
          setValueType(v);
        }}
        allowHalf
        style={{ color: 'black' }}
      />
    </>
  );
}
