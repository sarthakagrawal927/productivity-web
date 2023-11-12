import React, { FC } from 'react';
import { TASK_STATUS, TASK_STATUS_TO_LABEL, DROP_DOWN_MODE, PRIORITY, PRIORITY_TO_LABEL, COMPLEXITY_TO_LABEL, COMPLEXITY } from '@/utils/constants';
import cn from 'classnames';
import useOptimisticResult from '@/hooks/useOptimisticResult';

type SelectStatusDropdownProps = {
  handleStatusChange: ((value: number, mode: keyof typeof DROP_DOWN_MODE) => Promise<{ data: any, err: any }>);
  dropdownViewMode?: 'create' | 'edit' | 'view';
  value?: number;
  dropdownMode: keyof typeof DROP_DOWN_MODE;
}

const DROPDOWN_MODE_VALUES = {
  [DROP_DOWN_MODE.STATUS]: {
    labelMap: TASK_STATUS_TO_LABEL,
    valueMap: TASK_STATUS,
    defaultLabel: "Select status",
  },
  [DROP_DOWN_MODE.PRIORITY]: {
    labelMap: PRIORITY_TO_LABEL,
    valueMap: PRIORITY,
    defaultLabel: "Select priority",
  },
  [DROP_DOWN_MODE.COMPLEXITY]: {
    labelMap: COMPLEXITY_TO_LABEL,
    valueMap: COMPLEXITY,
    defaultLabel: "Select complexity",
  }
}

const SelectStatusDropdown: FC<SelectStatusDropdownProps> = ({ handleStatusChange, dropdownViewMode = 'create', value, dropdownMode = DROP_DOWN_MODE.STATUS }) => {
  const [dropdownValue, setDropdownValue] = useOptimisticResult(value || 0, (value) => handleStatusChange(value, dropdownMode as keyof typeof DROP_DOWN_MODE));

  const handleFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(parseInt(e.target.value));
  }

  const { labelMap, valueMap, defaultLabel } = DROPDOWN_MODE_VALUES[dropdownMode];

  return (
    <>
      <select
        id="status_screen_view"
        className={cn("p-2 bg-gray-800 text-white border rounded focus:outline-none focus:ring focus:border-blue-300", { "w-full": dropdownViewMode === "create" })}
        value={dropdownValue}
        onChange={handleFilterChange}
      >
        <option value={0} disabled={dropdownViewMode !== "view"}>
          {defaultLabel}
        </option>
        {Object.values(valueMap).map((status) => (
          <option key={status} value={status}>
            {labelMap[status]}
          </option>
        ))
        }
      </select>
      {dropdownViewMode === "view" && <div onClick={() => { setDropdownValue(0) }}>Clear</div>}
    </>
  );
};

export default SelectStatusDropdown;