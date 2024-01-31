import React from 'react';
import CustomForm, { FORM_FIELD, TitleDescriptionFormStructure } from '../common/CustomForm';
import { Consumable } from '@/types';

const ConsumableForm: React.FC<ConsumablesFormProps> = ({ addNewConsumable }) => {
  return (
    <CustomForm formStructure={{
      heading: "Add New Consumable",
      postApiPath: "/api/consumable",
      onSubmit: (e) => {
        addNewConsumable(e);
      },
      fields: [
        ...TitleDescriptionFormStructure,
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
        smallest_unit_label: "",
        time_per_unit: "",
        num_total_unit: "",
        num_remaining_unit: "",
      },
      submitLabel: "Add Consumable",
    }}
    />
  );
};

type ConsumablesFormProps = {
  addNewConsumable: (consumable: Consumable) => void,
}

export default ConsumableForm;