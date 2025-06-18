import { Task } from "@/types";
import { DROPDOWN_MODE_VALUES, MODAL_IDS, TODO_DROPDOWN_MODE } from "@/utils/constants";
import React from "react";
import CustomForm, { FORM_FIELD, TitleDescriptionFormStructure } from "../common/CustomForm";
import CustomModal from "../common/CustomModal";
import { closeHtmlDialog } from "@/utils/helpers";

const defaultTaskInput = {
  title: "",
  description: "",
}

const TodoForm: React.FC<TodoFormProps> = ({ addNewTask }) => {
  return (
    <CustomModal modalId={MODAL_IDS.TODO_FORM_MODAL}>
      <CustomForm
        formStructure={{
          defaultInput: defaultTaskInput,
          submitLabel: "Add To-Do",
          heading: "Add New To-Do",
          apiPath: "/api/todo",
          onSubmit: (e) => {
            addNewTask(e);
            closeHtmlDialog(MODAL_IDS.TODO_FORM_MODAL);
          },
          fields: [
            ...TitleDescriptionFormStructure,
            {
              kind: FORM_FIELD.INPUT,
              componentProps: {
                placeholder: "Time To Spend",
                type: "number",
                required: true,
                key: "time_to_spend",
              },
            },
            ...Object.values(TODO_DROPDOWN_MODE).map((mode) => ({
              kind: FORM_FIELD.DROPDOWN,
              componentProps: {
                key: mode.toLocaleLowerCase(),
              },
              additionalProps: DROPDOWN_MODE_VALUES[mode],
            })),
            {
              kind: FORM_FIELD.DROPDOWN,
              componentProps: {
                key: "deadline",
              },
              additionalProps: {
                defaultOption: {
                  label: "No Deadline",
                  value: "",
                },
                // one week of options
                optionList: Array.from({ length: 7 }, (_, i) => {
                  const date = new Date();
                  date.setDate(date.getDate() + i);
                  return {
                    label: date.toDateString(),
                    value: date.toLocaleDateString('en-US'),
                  };
                })
              }
            }
          ]
        }}
      />
    </CustomModal>
  );
};

type TodoFormProps = {
  addNewTask: (task: Task) => void,
};

export default TodoForm;
