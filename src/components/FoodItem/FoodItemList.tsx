import { FoodItem } from '@/types';
import { callApi } from '@/utils/api';
import { MODAL_IDS } from '@/utils/constants';
import { openHtmlDialog, roundToTwoDecimals } from '@/utils/helpers';
import { useRef } from 'react';
import CustomTable, { CELL_TYPE } from '../common/CustomTable';
import { LargeHeading } from '../common/Typography';

export const FoodItemTable = ({ foodItems, logMode = false }: { foodItems: FoodItem[], logMode?: boolean }) => {
  const quantityInputRef = useRef<(HTMLInputElement | null)[]>([]);
  return <CustomTable
    headers={[
      "name", "protein (gms)", "fiber (gms)", "carbs", "fat", "kcal",
      ...(logMode ? ["protein/kcal", "fiber/kcal", "carbs/kcal"]
        : ["quantity (units)"])]}
    rows={
      foodItems.map((consumable, idx) => ({
        cells: [
          { kind: CELL_TYPE.TEXT, widthPercent: 20, text: `${consumable.name}`, additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 8, text: `${consumable.protein}`, additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 8, text: `${consumable.fiber}`, additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 8, text: `${consumable.carbs}`, additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 8, text: `${consumable.fat}`, additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 8, text: `${consumable.kcal}`, additionalProps: {} },
          ...(logMode ? [
            { kind: CELL_TYPE.TEXT, widthPercent: 8, text: `${roundToTwoDecimals(consumable.protein / consumable.kcal)}`, additionalProps: {} },
            { kind: CELL_TYPE.TEXT, widthPercent: 8, text: `${roundToTwoDecimals(consumable.fiber / consumable.kcal)}`, additionalProps: {} },
            { kind: CELL_TYPE.TEXT, widthPercent: 8, text: `${roundToTwoDecimals(consumable.carbs / consumable.kcal)}`, additionalProps: {} },
            {
              kind: CELL_TYPE.CUSTOM, widthPercent: 10, text: '', additionalProps: {
                // input field for quantity
                element: <>
                  <input ref={el => { quantityInputRef.current[idx] = el; }} key={consumable.ID} className="input input-primary mr-4" type="number" placeholder="Quantity" />
                  <button className="btn btn-sm btn-accent" onClick={async () => {
                    if (quantityInputRef.current[idx]?.value) {
                      await callApi('/api/consumable/food/log', {
                        food_item_id: consumable.ID,
                        quantity: quantityInputRef.current[idx]!.value
                      });
                      quantityInputRef.current[idx]!.value = '';
                    }
                  }}>Log</button>
                </>
              }
            }] : [
            { kind: CELL_TYPE.TEXT, widthPercent: 10, text: `${consumable.quantity}`, additionalProps: {} },
            // { kind: CELL_TYPE.TEXT, widthPercent: 20, text: `${formatDateString(consumable.CreatedAt)}`, additionalProps: {} }
          ]),
        ]
      }))
    }
  />
}

const FoodItemList = ({ foodItems }: { foodItems: FoodItem[] }) => {
  return (
    <>
      <div className='flex flex-row justify-between'>
        <LargeHeading>Food Items</LargeHeading>
        <button className="btn btn-circle text-xl font-bold" onClick={() => openHtmlDialog(MODAL_IDS.FOOD_ITEM_FORM_MODAL)}>+</button>
      </div>
      {foodItems.length > 0 ?
        <FoodItemTable foodItems={foodItems} logMode /> : <div>No food items available</div>
      }
    </>
  );
};

export default FoodItemList;