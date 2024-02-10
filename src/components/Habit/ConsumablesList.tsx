import { Consumable } from '@/types';
import { formatDateString } from '@/utils/helpers';
import React from 'react';
import CustomTable, { CELL_TYPE } from '../common/CustomTable';

function getConsumableGoals(consumable: Consumable) {
  return `${consumable.num_remaining_unit}/${consumable.num_total_unit} ${consumable.smallest_unit_label} Remain`;
}

const ConsumablesList = ({ consumables }: { consumables: Consumable[] }) => {
  return (
    <div className="overflow-x-auto">
      <CustomTable
        rows={consumables.map(consumable => ({
          cells: [
            { kind: CELL_TYPE.TEXT_WITH_SUBTEXT, widthPercent: 30, text: consumable.title, additionalProps: { subText: consumable.desc } },
            { kind: CELL_TYPE.TEXT, widthPercent: 10, text: `Habit: ${consumable.habit_id}`, additionalProps: {} },
            { kind: CELL_TYPE.TEXT, widthPercent: 20, text: getConsumableGoals(consumable), additionalProps: {} },
            { kind: CELL_TYPE.TEXT, widthPercent: 20, text: `${consumable.time_per_unit} mins/unit`, additionalProps: {} },
            { kind: CELL_TYPE.TEXT, widthPercent: 20, text: formatDateString(consumable.CreatedAt), additionalProps: {} },
          ]
        }))}
      />
    </div>
  );
};

export default ConsumablesList;