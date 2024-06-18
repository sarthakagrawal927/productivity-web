import { FoodItem } from '@/types';
import { LargeHeading } from '../common/Typography';
import { DayFoodSummary } from './DayFoodLog';

const HistoricalFoodLogs = ({ historicalFoodLogs }: { historicalFoodLogs: FoodItem[] }) => {
  return (
    <>
      <LargeHeading>Daily Food Logs</LargeHeading>
      <div className='flex flex-row space-x-20 pb-20 w-100 overflow-x-scroll'>
        {historicalFoodLogs.map((dayFoodSummary, index) => {
          return <DayFoodSummary key={index} total_food_consumed={dayFoodSummary} />
        })}
      </div>
    </>
  );
};

export default HistoricalFoodLogs;