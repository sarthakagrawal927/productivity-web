import { Habit, NumORStr } from '@/types';
import { callApi } from '@/utils/api';
import { HABIT_DROPDOWN_MODE, HABIT_DROPDOWN_MODE_VALUES } from '@/utils/constants';
import React from 'react';
import CustomForm, { FORM_FIELD, TitleDescriptionFormStructure } from '../common/CustomForm';

type HabitInput = {
  title: string,
  desc: string,
  status?: number,
  anti?: boolean,
  target?: number,
  frequency_type?: number,
  mode?: number,
  approx_time_needed?: number,
}

const defaultHabitInput = {
  title: "",
  desc: "",
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
    <>
      <CustomForm
        formStructure={{
          defaultInput: defaultHabitInput,
          submitLabel: "Add Habit",
          heading: "Add New Habit",
          postApiPath: "/api/habit",
          onSubmit: (e) => {
            addNewHabit(e);
          },
          fields: [
            ...TitleDescriptionFormStructure,
            {
              kind: FORM_FIELD.INPUT,
              componentProps: {
                placeholder: "Target",
                type: "number",
                required: true,
                key: "target",
              },
            },
            ...Object.values(HABIT_DROPDOWN_MODE).map((mode) => ({
              kind: FORM_FIELD.DROPDOWN,
              componentProps: {
                key: mode.toLocaleLowerCase(),
              },
              additionalProps: HABIT_DROPDOWN_MODE_VALUES[mode],
            })),
            {
              kind: FORM_FIELD.INPUT,
              componentProps: {
                placeholder: "Approx Time Needed",
                type: "number",
                required: true,
                key: "approx_time_needed",
              },
            },
          ],
        }}
      />
    </>
  );
};

type HabitFormProps = {
  addNewHabit: (habit: Habit) => void,
}

export default HabitForm;