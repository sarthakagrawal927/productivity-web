import React from 'react';
import CustomForm, { FORM_FIELD } from '../common/CustomForm';

const ConsumableForm = () => {
  return (
    <CustomForm formStructure={{
      postApiPath: "/api/consumable",
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
          kind: FORM_FIELD.TEXTAREA,
          componentProps: {
            placeholder: "Description",
            type: "text",
            required: true,
            key: "desc",
          },
        },
        {
          kind: FORM_FIELD.INPUT,
          componentProps: {
            placeholder: "Habit ID",
            type: "number",
            required: true,
            key: "habit_id",
          },
        },
        {
          kind: FORM_FIELD.INPUT,
          componentProps: {
            placeholder: "Small Unit Label",
            type: "text",
            required: true,
            key: "smallest_unit_label",
          },
        },
        {
          kind: FORM_FIELD.INPUT,
          componentProps: {
            placeholder: "Time Per Unit",
            type: "number",
            required: true,
            key: "time_per_unit",
          },
        },
        {
          kind: FORM_FIELD.INPUT,
          componentProps: {
            placeholder: "Num Total Unit",
            type: "number",
            required: true,
            key: "num_total_unit",
          },
        },
        {
          kind: FORM_FIELD.INPUT,
          componentProps: {
            placeholder: "Num Remaining Unit",
            type: "number",
            required: true,
            key: "num_remaining_unit",
          },
        },
      ],
      defaultInput: {
        title: "",
        desc: "",
        habit_id: "",
        small_unit_label: "",
        time_per_unit: "",
        num_total_unit: "",
        num_remaining_unit: "",
      },
      submitLabel: "Add Consumable",
    }}
    />
  );
};

export default ConsumableForm;