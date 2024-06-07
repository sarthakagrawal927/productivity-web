import { FoodItem } from '@/types';
import { MODAL_IDS } from '@/utils/constants';
import React from 'react';
import CustomForm, { FORM_FIELD } from '../common/CustomForm';
import CustomModal from '../common/CustomModal';

const FoodItemForm: React.FC<ConsumablesFormProps> = ({ addNewConsumable }) => {
  return (
    <CustomModal modalId={MODAL_IDS.FOOD_ITEM_FORM_MODAL} >
      <CustomForm formStructure={{
        heading: "Add New Food Item",
        apiPath: "/api/consumable/food",
        onSubmit: (e) => {
          addNewConsumable(e);
        },
        fields: [
          {
            kind: FORM_FIELD.INPUT,
            componentProps: { placeholder: "Name", type: "text", required: true, key: "name" },
          },
          {
            kind: FORM_FIELD.INPUT,
            componentProps: { placeholder: "Protein (g)", type: "number", required: true, key: "protein" },
          },
          {
            kind: FORM_FIELD.INPUT,
            componentProps: { placeholder: "Fiber (g)", type: "number", required: true, key: "fiber" },
          },
          {
            kind: FORM_FIELD.INPUT,
            componentProps: { placeholder: "Kcal", type: "number", required: true, key: "kcal" },
          },
        ],
        defaultInput: {
          name: "",
          protein: 0,
          fiber: 0,
          kcal: 0,
        },
        submitLabel: "Add Food Item",
      }}
      />
    </CustomModal>
  );
};

type ConsumablesFormProps = {
  addNewConsumable: (consumable: FoodItem) => void,
}

export default FoodItemForm;