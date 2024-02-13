import React, { FC, useEffect } from 'react';
import useOptimisticResult from '@/hooks/useOptimisticResult';
import cn from 'classnames';
import { DropdownOption, NumORStr } from '@/types';

type SelectDropdownProps = {
  handleValueChange: ((value: NumORStr) => Promise<{ err?: Error }> | void);
  containerClassName?: string;
  initialValue?: NumORStr;
  enableDefault?: boolean;
  optionList: DropdownOption[];
  defaultOption: DropdownOption;
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  handleValueChange,
  initialValue,
  containerClassName = '',
  enableDefault = false,
  optionList,
  defaultOption = { label: 'Select', value: 0 },
}) => {

  const [dropdownValue, setDropdownValue] = useOptimisticResult<NumORStr>(initialValue || defaultOption.value, handleValueChange);

  const handleFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(!Number.isNaN(Number(e.target.value)) ? Number(e.target.value) : e.target.value);
  }

  useEffect(() => {
    setDropdownValue(initialValue || defaultOption.value);
  }, [initialValue, defaultOption.value])

  return (
    <>
      <select
        id="status_screen_view"
        className={cn("select select-bordered", containerClassName)}
        value={dropdownValue}
        onChange={handleFilterChange}
      >
        <option value={defaultOption.value} disabled={!enableDefault}>
          {defaultOption.label}
        </option>
        {
          optionList.filter(({ value }) => value !== defaultOption.value).map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))
        }
      </select>
    </>
  );
};

export default SelectDropdown;