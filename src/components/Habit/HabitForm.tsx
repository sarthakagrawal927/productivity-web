import { Habit } from '@/types';
import { HABIT_DROPDOWN_MODE, HABIT_DROPDOWN_MODE_VALUES, HABIT_FREQUENCY_TYPE, HABIT_MODE, HABIT_STATUS } from '@/utils/constants';
import React from 'react';
import CustomForm, { FORM_FIELD, TitleDescriptionFormStructure } from '../common/CustomForm';

const defaultHabitInput = {
  title: "",
  desc: "",
  // target: 0,
  frequency_type: HABIT_FREQUENCY_TYPE.WEEKLY,
  status: HABIT_STATUS.ACTIVE,
  mode: HABIT_MODE.COUNT,
  anti: 0,
  // approx_time_needed: 20,
}

const HabitForm: React.FC<HabitFormProps> = ({ addNewHabit }) => {
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
                placeholder: "Approx Time Needed per unit",
                type: "number",
                required: true,
                key: "approx_time_needed",
              },
            },
            {
              kind: FORM_FIELD.CHECKBOX,
              componentProps: {
                placeholder: "Anti",
                key: "anti",
              },
            }
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