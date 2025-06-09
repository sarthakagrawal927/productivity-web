import { Habit } from '@/types';
import { HABIT_CATEGORY, HABIT_DROPDOWN_MODE, HABIT_DROPDOWN_MODE_VALUES, HABIT_FREQUENCY_TYPE, HABIT_MODE, HABIT_STATUS, MODAL_IDS, PRIORITY } from '@/utils/constants';
import React from 'react';
import CustomForm, { FORM_FIELD, TitleDescriptionFormStructure } from '../common/CustomForm';
import CustomModal from '../common/CustomModal';
import { closeHtmlDialog } from '@/utils/helpers';

const defaultHabitInput = {
  title: "",
  desc: "",
  upper_limit: 0,
  lower_limit: 0,
  frequency_type: HABIT_FREQUENCY_TYPE.WEEKLY,
  status: HABIT_STATUS.ACTIVE,
  mode: HABIT_MODE.COUNT,
  category: HABIT_CATEGORY.PRODUCTIVITY,
  priority: PRIORITY.MEDIUM,
  approx_time_needed: 20,
  preferred_weekdays_mask: 0,
  score: 0
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
                  required: true,
                  key: "upper_limit",
                },
              },
              {
                kind: FORM_FIELD.INPUT,
                componentProps: {
                  placeholder: "Lower Limit",
                  type: "number",
                  required: true,
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
                kind: FORM_FIELD.TIME,
                componentProps: {
                  placeholder: "Preferred Start Time",
                  key: "preferred_start_time",
                },
              },
              {
                kind: FORM_FIELD.INPUT,
                componentProps: {
                  placeholder: "Preferred Weekdays Mask (0-127)",
                  type: "number",
                  key: "preferred_weekdays_mask",
                },
              },
              {
                kind: FORM_FIELD.INPUT,
                componentProps: {
                  placeholder: "Preferred Month Date (1-31)",
                  type: "number",
                  key: "preferred_month_date",
                },
              }
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