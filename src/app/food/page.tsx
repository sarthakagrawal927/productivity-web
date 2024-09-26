import FoodItemsComponent from '@/components/FoodItem/index';
import FetchDataSSR from '@/components/common/FetchDataSSR';
import { FoodItem } from '@/types';

export default function FoodServerComponent() {
  return (
    <FetchDataSSR<[FoodItem[], FoodItem[]]>
      fetchUrls={['/api/consumable/food', '/api/consumable/food/log']}
      onSuccess={([foodItems, historicalFoodLogs]) => (
        <FoodItemsComponent
          foodItems={foodItems}
          historicalFoodLogs={historicalFoodLogs}
        />
      )}
    />
  );
}