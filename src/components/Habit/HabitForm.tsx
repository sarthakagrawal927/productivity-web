import { Habit } from '@/types';
import { HABIT_DROPDOWN_MODE, HABIT_DROPDOWN_MODE_VALUES, HABIT_FREQUENCY_TYPE, HABIT_MODE, HABIT_STATUS, MODAL_IDS, PRIORITY } from '@/utils/constants';
import React from 'react';
import CustomForm, { FORM_FIELD, TitleDescriptionFormStructure } from '../common/CustomForm';
import CustomModal from '../common/CustomModal';
import { closeHtmlDialog } from '@/utils/helpers';

const defaultHabitInput = {
  title: "",
  description: "",
  frequency_type: HABIT_FREQUENCY_TYPE.DAILY,
  upper_limit: undefined,
  lower_limit: undefined,
  priority: PRIORITY.MEDIUM,
  mode: HABIT_MODE.TIME,
}

const HabitForm: React.FC<HabitFormProps> = ({ addNewHabit }) => {
  return (
    <>
      <CustomModal modalId={MODAL_IDS.HABIT_FORM_MODAL} >
        <CustomForm
          formStructure={{
            defaultInput: defaultHabitInput,
            submitLabel: "Add Habit",
            heading: "Add New Habit",
            apiPath: "/api/habit",
            onSubmit: (e) => {
              addNewHabit(e);
              closeHtmlDialog(MODAL_IDS.HABIT_FORM_MODAL);
            },
            fields: [
              ...TitleDescriptionFormStructure,
              {
                kind: FORM_FIELD.INPUT,
                componentProps: {
                  placeholder: "Upper Limit",
                  type: "number",
                  required: false,
                  key: "upper_limit",
                },
              },
              {
                kind: FORM_FIELD.INPUT,
                componentProps: {
                  placeholder: "Lower Limit",
                  type: "number",
                  required: false,
                  key: "lower_limit",
                },
              },
              ...Object.values(HABIT_DROPDOWN_MODE).map((mode) => ({
                kind: FORM_FIELD.DROPDOWN,
                componentProps: {
                  key: mode.toLocaleLowerCase(),
                },
                additionalProps: HABIT_DROPDOWN_MODE_VALUES[mode],
              })),
            ],
          }}
        />
      </CustomModal>
    </>
  );
};

type HabitFormProps = {
  addNewHabit: (habit: Habit) => void,
}

export default HabitForm;