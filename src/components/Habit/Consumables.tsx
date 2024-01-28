import React from 'react';
import CustomForm, { FORM_FIELD } from '../common/CustomForm';
import { TODO_DROPDOWN_MODE, DROPDOWN_MODE_VALUES } from '@/utils/constants';

const Consumables = () => {
  return (
    <CustomForm formStructure={{
      onSubmit: async (e) => {
        console.log(e)
      },
      fields: [
        {
          kind: FORM_FIELD.INPUT,
          componentProps: {
            placeholder: "Title",
            type: "text",
            required: true,
            key: "title",
          },
        },
        {
          kind: FORM_FIELD.INPUT,
          componentProps: {
            placeholder: "Description",
            type: "text",
            required: true,
            key: "desc",
          },
        },
        {
          kind: FORM_FIELD.DROPDOWN,
          componentProps: {
            key: "mode",
          },
          additionalProps: { ...DROPDOWN_MODE_VALUES[TODO_DROPDOWN_MODE.STATUS] }
        },
      ],
      defaultInput: {
        title: "",
        desc: "",
      },
      submitLabel: "Add Consumable",
    }
    } />
  );
};

export default Consumables;