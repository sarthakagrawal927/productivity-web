import { Habit } from '@/types';
import React from 'react';
import CustomForm, { FORM_FIELD } from '../common/CustomForm';
import { HABIT_MODE_TO_LABEL } from '@/utils/constants';

const LogModal = ({ habit }: { habit?: Habit }) => {
  if (!habit) return null;
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <CustomForm
          key={habit.ID}
          formStructure={{
            fields: [
              {
                kind: FORM_FIELD.INPUT,
                componentProps: {
                  placeholder: HABIT_MODE_TO_LABEL[habit.mode],
                  type: "number",
                  required: true,
                  key: "count",
                },
              },
            ],
            defaultInput: {
              habit_id: habit.ID,
              date: new Date().toISOString(),
            },
            heading: `Log Habit: ${habit.title}`,
            onSubmit: () => { },
            submitLabel: 'Log',
            postApiPath: `/api/habit/log`,
          }}
        />
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