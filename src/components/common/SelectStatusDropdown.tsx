import React, { FC } from 'react';
import { TASK_STATUS, TASK_STATUS_TO_LABEL } from '@/utils/constants';
import cn from 'classnames';
import useOptimisticResult from '@/hooks/useOptimisticResult';

type SelectStatusDropdownProps = {
  handleStatusChange: ((status: number) => Promise<{ data: any, err: any }>);
  mode?: 'create' | 'edit' | 'view';
  value?: number;
}

const SelectStatusDropdown: FC<SelectStatusDropdownProps> = ({ handleStatusChange, mode = 'create', value }) => {
  const [filterStatus, setFilterStatus] = useOptimisticResult(value || 0, handleStatusChange);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(parseInt(e.target.value));
  }

  return (
    <select
      id="status_screen_view"
      className={cn("p-2 bg-gray-800 text-white border rounded focus:outline-none focus:ring focus:border-blue-300", { "w-full": mode === "create" })}
      value={filterStatus}
      onChange={handleFilterChange}
    >
      <option value={0} disabled={mode !== "view"}>
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