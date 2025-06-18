import { Habit, HabitLog } from '@/types';
import React from 'react';
import CustomForm, { FORM_FIELD } from '../common/CustomForm';
import { HABIT_MODE_TO_LABEL, MODAL_IDS, MOOD_RATING, MOOD_RATING_TO_LABEL } from '@/utils/constants';
import { closeHtmlDialog } from '@/utils/helpers';
import CustomModal from '../common/CustomModal';

const LogFields = {
  LOGGED_FOR_DATE: 'logged_for_date',
  COUNT: 'count',
  HABIT_ID: 'habit_id',
  COMMENT: 'comment',
  MOOD_RATING: 'mood_rating',
}

const ONE_DAY_MS = 86400000;

const LogModal = ({ habit, onLog }: { habit?: Habit, onLog?: (log: HabitLog) => void }) => {
  const todayTimeString = new Date().toLocaleDateString('en-US');
  const yesterdayTimeString = new Date(Date.now() - ONE_DAY_MS).toLocaleDateString('en-US');
  return (
    <CustomModal modalId={MODAL_IDS.LOG_MODAL} >
      {habit ? <CustomForm
        key={habit.ID}
        formStructure={{
          fields: [
            {
              kind: FORM_FIELD.INPUT,
              componentProps: {
                placeholder: HABIT_MODE_TO_LABEL[habit.mode],
                type: "number",
                required: true,
                key: LogFields.COUNT,
              },
            },
            {
              kind: FORM_FIELD.TEXTAREA,
              componentProps: {
                placeholder: 'What did you do? How did it go?',
                required: true,
                key: LogFields.COMMENT,
              },
            },
            {
              kind: FORM_FIELD.DROPDOWN,
              componentProps: {
                key: LogFields.LOGGED_FOR_DATE,
              },
              additionalProps: {
                optionList: [
                  {
                    label: 'Today',
                    value: todayTimeString,
                  },
                  {
                    label: 'Yesterday',
                    value: yesterdayTimeString,
                  },
                ]
              }
            },
            {
              kind: FORM_FIELD.DROPDOWN,
              componentProps: {
                key: LogFields.MOOD_RATING,
              },
              additionalProps: {
                defaultOption: {
                  value: MOOD_RATING.NEUTRAL,
                  label: "Select mood"
                },
                optionList: [
                  { label: MOOD_RATING_TO_LABEL[MOOD_RATING.VERY_BAD], value: MOOD_RATING.VERY_BAD },
                  { label: MOOD_RATING_TO_LABEL[MOOD_RATING.BAD], value: MOOD_RATING.BAD },
                  { label: MOOD_RATING_TO_LABEL[MOOD_RATING.NEUTRAL], value: MOOD_RATING.NEUTRAL },
                  { label: MOOD_RATING_TO_LABEL[MOOD_RATING.GOOD], value: MOOD_RATING.GOOD },
                  { label: MOOD_RATING_TO_LABEL[MOOD_RATING.VERY_GOOD], value: MOOD_RATING.VERY_GOOD },
                ]
              }
            }
          ],
          defaultInput: {
            [LogFields.HABIT_ID]: habit.ID,
            [LogFields.LOGGED_FOR_DATE]: todayTimeString,
            [LogFields.MOOD_RATING]: MOOD_RATING.NEUTRAL,
          },
          heading: `Log Habit: ${habit.title}`,
          onSubmit: (e: HabitLog) => {
            if (onLog) onLog(e);
            closeHtmlDialog(MODAL_IDS.LOG_MODAL);
          },
          submitLabel: 'Log',
          apiPath: `/api/habit/log`,
        }}
      /> : null}
    </CustomModal>
  );
};

export default LogModal;