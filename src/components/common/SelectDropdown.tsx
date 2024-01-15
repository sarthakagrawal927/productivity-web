import React, { FC } from 'react';
import useOptimisticResult from '@/hooks/useOptimisticResult';
import cn from 'classnames';

type SelectDropdownProps = {
  handleValueChange: ((value: number) => Promise<{ err: any }> | void);
  containerClassName?: string;
  clearable?: boolean;
  initialValue?: number;
  enableDefault?: boolean;
  valueMap: { [key: string]: number };
  labelMap: { [key: string]: string };
  defaultLabel: string;
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  handleValueChange,
  initialValue,
  clearable = false,
  containerClassName = '',
  enableDefault = false,
  valueMap,
  labelMap,
  defaultLabel = 'Select',
}) => {

  const [dropdownValue, setDropdownValue] = useOptimisticResult(initialValue || 0, handleValueChange);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(parseInt(e.target.value));
  }

  return (
    <>
      <select
        id="status_screen_view"
        className={cn("select select-bordered max-w-xs", containerClassName)}
        value={dropdownValue}
        onChange={handleFilterChange}
      >
        <option value={0} disabled={!enableDefault}>
          {defaultLabel}
        </option>
        {Object.values(valueMap).map((status) => (
          <option key={status} value={status}>
            {labelMap[status]}
          </option>
        ))
        }
      </select>
      {clearable && <div onClick={() => { setDropdownValue(0) }}>Clear</div>}
    </>
  );
};

export default SelectDropdown;