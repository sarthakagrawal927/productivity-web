import { Habit, HabitLog } from '@/types';
import React from 'react';
import CustomForm, { FORM_FIELD } from '../common/CustomForm';
import { HABIT_MODE_TO_LABEL, MODAL_IDS } from '@/utils/constants';
import { closeHtmlDialog } from '@/utils/helpers';
import CustomModal from '../common/CustomModal';

const LogFields = {
  RESULT_DATE: 'result_date',
  COUNT: 'count',
  HABIT_ID: 'habit_id',
  COMMENT: 'comment',
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
                placeholder: habit.anti ? 'What triggered this? What did you do?' : 'What did you do? How did it go?',
                required: true,
                key: LogFields.COMMENT,
              },
            },
            {
              kind: FORM_FIELD.DROPDOWN,
              componentProps: {
                key: LogFields.RESULT_DATE,
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
            }
          ],
          defaultInput: {
            [LogFields.HABIT_ID]: habit.ID,
            [LogFields.RESULT_DATE]: todayTimeString,
          },
          heading: `Log Habit: ${habit.title}`,
          onSubmit: (e: HabitLog) => {
            if (onLog) onLog(e);
            closeHtmlDialog(MODAL_IDS.LOG_MODAL);
          },
          submitLabel: 'Log',
          postApiPath: `/api/habit/log`,
        }}
      /> : null}
    </CustomModal>
  );
};

export default LogModal;