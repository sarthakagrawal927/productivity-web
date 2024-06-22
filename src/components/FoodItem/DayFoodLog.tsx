import { FoodItem } from '@/types';
import { HTTP_METHOD, callApi } from '@/utils/api';
import React from 'react';
import { StrongText } from '../common/Typography';
import { FoodItemTable } from './FoodItemList';
import { formatDateString } from '@/utils/helpers';

const FOOD_REQUIREMENTS = {
  kcal: 1650,
  fiber: 33,
  protein: 135,
  carbs: 200,
  fat: 50
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

const getDateForBackend = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
    date.getDate().toString().padStart(2, '0') + '/' +
    date.getFullYear();
  return formattedDate;
}

export const DayFoodSummary = ({ total_food_consumed, headingLabel, showList }: { total_food_consumed: FoodItem, headingLabel: string, showList: boolean }) => {
  const [foodConsumed, setFoodConsumed] = React.useState<FoodItem[]>([]);

  const handleViewConsumedFood = async () => {
    const { err, data: { data } } = await callApi(`/api/consumable/food/consumption_items?date=${getDateForBackend(total_food_consumed.date)}`, {}, HTTP_METHOD.GET);
    if (err || !data) {
      console.log({ err })
      return;
    }
    setFoodConsumed(data.food_consumed);
  }

  return <div>
    <StrongText>{headingLabel}</StrongText>
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
      <CoolProgressBar
        ratio={total_food_consumed.carbs * 100 / FOOD_REQUIREMENTS.carbs}
        label={`${total_food_consumed.carbs} carbs (gms)`}
        positive
      />
      <CoolProgressBar
        ratio={total_food_consumed.fat * 100 / FOOD_REQUIREMENTS.fat}
        label={`${total_food_consumed.fat} fat (gms)`}
        positive
      />
    </div>
    {showList && <>
      {foodConsumed.length > 0 ? <div className='pt-4'>
        <FoodItemTable foodItems={foodConsumed} />
      </div> : <button className='mt-4 btn btn-sm' onClick={handleViewConsumedFood}
      >View consumed food</button>}
    </>}
  </div>
}
