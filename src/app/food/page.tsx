import FoodItemsComponent from '@/components/FoodItem/index';
import ErrorComponent from '@/components/common/ErrorComponent';
import { FoodItem } from '@/types';
import { baseServerSideFetch } from '@/utils/api';

export default async function HabitServerComponent() {
  const [{ data: foodItems, err }, { data: historicalFoodLogs, err: err3 }] = await Promise.all([
    baseServerSideFetch<FoodItem[]>('/api/consumable/food'),
    baseServerSideFetch<FoodItem[]>('/api/consumable/food/log')
  ]);
  if (err || !foodItems || err3 || !historicalFoodLogs) {
    return <ErrorComponent message={err?.message} />
  }
  return (
    <FoodItemsComponent
      foodItems={foodItems}
      historicalFoodLogs={historicalFoodLogs}
    />
  )
}