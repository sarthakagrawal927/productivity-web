import { Consumable } from '@/types';
import { formatDateString } from '@/utils/helpers';
import React from 'react';

function getConsumableGoals(consumable: Consumable) {
  return `${consumable.num_remaining_unit}/${consumable.num_total_unit} ${consumable.smallest_unit_label} Remain`;
}

const ConsumablesList = ({ consumables }: { consumables: Consumable[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <tbody>
          {consumables.map((consumable: Consumable) => (
            <tr key={consumable.ID}>
              <td>
                <p className='font-bold'>{consumable.title}</p>
                <p className='text-slate-400'>{consumable.desc}</p>
              </td>
              <td>Habit: {consumable.habit_id}</td>
              <td>{getConsumableGoals(consumable)}</td>
              <td>{consumable.time_per_unit} mins/unit</td>
              <td>{formatDateString(consumable.CreatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsumablesList;