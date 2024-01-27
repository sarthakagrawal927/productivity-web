import React, { FC } from 'react';
import useOptimisticResult from '@/hooks/useOptimisticResult';
import cn from 'classnames';
import { DropdownOption } from '@/types';

type SelectDropdownProps = {
  handleValueChange: ((value: number) => Promise<{ err: Error }> | void);
  containerClassName?: string;
  clearable?: boolean;
  initialValue?: number;
  enableDefault?: boolean;
  optionList: DropdownOption[];
  defaultOption: DropdownOption;
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  handleValueChange,
  initialValue,
  clearable = false,
  containerClassName = '',
  enableDefault = false,
  optionList,
  defaultOption = { label: 'Select', value: 0 },
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
        <option value={defaultOption.label} disabled={!enableDefault}>
          {defaultOption.label}
        </option>
        {
          optionList.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))
        }
      </select>
      {clearable && <div onClick={() => { setDropdownValue(0) }}>Clear</div>}
    </>
  );
};

export default SelectDropdown;