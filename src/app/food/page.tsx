import FoodItemsComponent from '@/components/FoodItem/index';
import ErrorComponent from '@/components/common/ErrorComponent';
import { DayFoodLogType, FoodItem } from '@/types';
import { baseServerSideFetch } from '@/utils/api';

export default async function HabitServerComponent() {
  const [{ data: foodItems, err }, { data, err: err2 }] = await Promise.all([
    baseServerSideFetch<FoodItem[]>('/api/consumable/food'),
    baseServerSideFetch<DayFoodLogType>('/api/consumable/food/consumption_items')
  ]);
  if (err || !foodItems || err2 || !data) {
    return <ErrorComponent message={err?.message} />
  }
  const { food_consumed, total_food_consumed } = data;
  return (
    <FoodItemsComponent
      foodItems={foodItems}
      food_consumed={food_consumed}
      total_food_consumed={total_food_consumed}
    />
  )
}