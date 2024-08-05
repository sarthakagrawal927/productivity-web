import { FoodItem, FoodItemSmall } from '@/types';
import { LargeHeading } from '../common/Typography';
import { DayFoodSummary } from './DayFoodLog';
import { formatDateString } from '@/utils/helpers';

const HistoricalFoodLogs = ({ historicalFoodLogs }: { historicalFoodLogs: FoodItem[] }) => {

  let summary = historicalFoodLogs.slice(0, 7).reduce((acc, curr) => {
    return {
      kcal: acc.kcal + curr.kcal,
      fiber: acc.fiber + curr.fiber,
      protein: acc.protein + curr.protein,
      carbs: acc.carbs + curr.carbs,
      fat: acc.fat + curr.fat,
    };
  }, { kcal: 0, fiber: 0, protein: 0, carbs: 0, fat: 0, });

  // divide by 7 to get average
  const numDaysOfAvg = Math.min(historicalFoodLogs.length, 7);
  summary.kcal = Math.round(summary.kcal / numDaysOfAvg);
  summary.fiber = Math.round(summary.fiber / numDaysOfAvg);
  summary.protein = Math.round(summary.protein / numDaysOfAvg);
  summary.carbs = Math.round(summary.carbs / numDaysOfAvg);
  summary.fat = Math.round(summary.fat / numDaysOfAvg);

  return (
    <>
      <LargeHeading>Daily Food Logs</LargeHeading>
      <div className='flex flex-row space-x-20 pb-20 w-100 overflow-x-scroll'>
        {historicalFoodLogs.map((dayFoodSummary, index) => {
          return <DayFoodSummary showList key={index} total_food_consumed={dayFoodSummary} headingLabel={formatDateString(dayFoodSummary.date)} />
        })}
      </div>
      {historicalFoodLogs.length > 0 && <div className='flex flex-row space-x-20 pb-20 w-100 overflow-x-scroll'>
        <DayFoodSummary total_food_consumed={summary as FoodItemSmall} headingLabel="Last 7 days Average" showList={false} />
      </div>}
    </>
  );
};

export default HistoricalFoodLogs;