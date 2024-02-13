import { Habit, HabitLog } from '@/types';
import React from 'react';
import CustomForm, { FORM_FIELD } from '../common/CustomForm';
import { HABIT_MODE_TO_LABEL } from '@/utils/constants';

const LogFields = {
  RESULT_DATE: 'result_date',
  COUNT: 'count',
  HABIT_ID: 'habit_id',
}

const ONE_DAY_MS = 86400000;

const LogModal = ({ habit, onLog }: { habit?: Habit, onLog?: (log: HabitLog) => void }) => {
  const todayTimeString = new Date().toLocaleDateString('en-US');
  const yesterdayTimeString = new Date(Date.now() - ONE_DAY_MS).toLocaleDateString('en-US');
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
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
            },
            submitLabel: 'Log',
            postApiPath: `/api/habit/log`,
          }}
        /> : null}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LogModal;