import React, { FC } from 'react';
import { TASK_STATUS, TASK_STATUS_TO_LABEL } from '@/utils/constants';
import cn from 'classnames';

type SelectStatusDropdownProps = {
  handleStatusChange: (status: number) => void;
  mode?: 'create' | 'edit' | 'view';
  value?: number;
}

const SelectStatusDropdown: FC<SelectStatusDropdownProps> = ({ handleStatusChange, mode = 'create', value }) => {
  const [filterStatus, setFilterStatus] = React.useState<number>(value || 0);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(Number(e.target.value));
    handleStatusChange(Number(e.target.value));
  }

  return (
    <select
      id="status_screen_view"
      className={cn("p-2 bg-gray-800 text-white border rounded focus:outline-none focus:ring focus:border-blue-300", { "w-full": mode === "create" })}
      value={filterStatus}
      onChange={handleFilterChange}
    >
      <option value="" disabled={mode === "create"}>
        Select status
      </option>
      {Object.values(TASK_STATUS).map((status) => (
        <option key={status} value={status}>
          {TASK_STATUS_TO_LABEL[status]}
        </option>
      ))
      }
    </select>
  );
};

export default SelectStatusDropdown;