import React from 'react';
import { useDispatch } from 'react-redux';
import MainCard from '@/app/components/meal/MainCard';
import Related from '@/app/components/meal/Related';
import { meals } from '@/app/data/meals';
import { addItem } from '@/app/redux/slices/KartSlice';

export default function MealDetail({ params }: any) {

  return (
    <div className=" md:px-[6%] md:py-[2%] p-2">
      <MainCard  />
    </div>
  );
}
