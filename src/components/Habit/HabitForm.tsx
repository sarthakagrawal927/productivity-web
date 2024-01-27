import { Habit, NumORStr } from '@/types';
import { callApi } from '@/utils/api';
import React from 'react';
import TitleDescriptionInput, { SetEntityDispatch } from '../common/TitleDescriptionInput';
import { HABIT_DROPDOWN_MODE, HABIT_DROPDOWN_MODE_VALUES } from '@/utils/constants';
import SelectDropdown from '../common/SelectDropdown';

type HabitInput = {
  title: string,
  desc: string,
  status?: number,
  anti: boolean,
  target?: number,
  frequency_type?: number,
  mode?: number,
}

const defaultHabitInput = {
  title: "",
  desc: "",
  anti: false,
}

const HabitForm: React.FC<HabitFormProps> = ({ addNewHabit }) => {
  const [habit, setHabit] = React.useState<HabitInput>(defaultHabitInput);

  const handleHabitFieldChange = (key: string, newValue: NumORStr) => {
    setHabit({ ...habit, [key]: newValue });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callApi("/api/habit", habit).then(({ data }) => {
      addNewHabit(data.data);
    })
    setHabit({ ...habit, ...defaultHabitInput });
  }

  return (
    <form onSubmit={handleSubmit}>
      <TitleDescriptionInput
        {...habit}
        setEntity={setHabit as SetEntityDispatch}
      />
      <input type='number' name='target' placeholder='target' onChange={
        (e) => handleHabitFieldChange('target', e.target.value)
      }>
      </input>
      {Object.values(HABIT_DROPDOWN_MODE).map((mode) =>
        <SelectDropdown
          key={mode}
          enableDefault
          containerClassName="w-full"
          handleValueChange={(newVal: number) => handleHabitFieldChange(mode.toLocaleLowerCase(), newVal)}
          {...HABIT_DROPDOWN_MODE_VALUES[mode]}
        />
      )}
      <button
        type="submit"
        className="btn btn-primary"
      >
        Add Habit
      </button>
    </form>
  );
};

type HabitFormProps = {
  addNewHabit: (habit: Habit) => void,
}

export default HabitForm;