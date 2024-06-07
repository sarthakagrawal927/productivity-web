import { DayFoodLogType } from '@/types';
import React from 'react';
import { LargeHeading, StrongText } from '../common/Typography';
import { FoodItemTable } from './FoodItemList';

const FOOD_REQUIREMENTS = {
  kcal: 2000,
  fiber: 30,
  protein: 100
}

const getProgressBarColor = (ratio: number, positive: boolean) => {
  if (positive) {
    return ratio > 80 ? 'text-success' : (ratio > 60 ? 'text-warning' : 'text-error');
  } else {
    return ratio > 80 ? 'text-error' : (ratio > 60 ? 'text-warning' : 'text-success');
  }
}

const CoolProgressBar = ({ ratio, label, positive }: { ratio: number, label: string, positive?: boolean }) => {
  const colorClass = getProgressBarColor(ratio, positive || false);
  return <div className={colorClass}>
    <div
      className="radial-progress"
      style={{ "--value": ratio } as React.CSSProperties}
      role="progressbar"
    >
      {ratio.toFixed(2)}%
    </div>
    <p className='pt-4'>{label}</p>
  </div>
}

const DayFoodLog: React.FC<DayFoodLogType> = ({ food_consumed, total_food_consumed }) => {
  return (
    <div className='pb-20'>
      <LargeHeading>Day Food Log</LargeHeading>
      <StrongText>Today </StrongText>
      <div className='flex flex-row space-x-12 pt-4'>
        <CoolProgressBar
          ratio={total_food_consumed.kcal * 100 / FOOD_REQUIREMENTS.kcal}
          label={`${total_food_consumed.kcal} kcal`}
        />
        <CoolProgressBar
          ratio={total_food_consumed.fiber * 100 / FOOD_REQUIREMENTS.fiber}
          label={`${total_food_consumed.fiber} fiber (gms)`}
          positive
        />
        <CoolProgressBar
          ratio={total_food_consumed.protein * 100 / FOOD_REQUIREMENTS.protein}
          label={`${total_food_consumed.protein} protein (gms)`}
          positive
        />
      </div>
      {food_consumed.length > 0 && <div className='w-1/3 pt-4'>
        <FoodItemTable foodItems={food_consumed} />
      </div>}
    </div>
  );
};



export default DayFoodLog;