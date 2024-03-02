import React from 'react';
import { DropdownOption, NumORStr } from '@/types';
import SelectDropdown from '../common/SelectDropdown';
import { callApi } from '@/utils/api';
import { LargeHeading } from './Typography';

export enum FORM_FIELD {
  DROPDOWN = "DROPDOWN",
  INPUT = "INPUT",
  TEXTAREA = "TEXTAREA",
  POWERED_TEXTAREA = "POWERED_TEXTAREA", // markdown
  CHECKBOX = "CHECKBOX",
}

type ComponentProps = {
  key: string,
  placeholder?: string,
  type?: string,
  required?: boolean,
}

type AdditionalPropsMap = {
  [FORM_FIELD.DROPDOWN]: {
    defaultOption: DropdownOption,
    optionList: DropdownOption[],
  };
  [FORM_FIELD.INPUT]: {
    // maxLength: number;
  };
  [FORM_FIELD.TEXTAREA]: {
    // rows: number;
  };
  [FORM_FIELD.POWERED_TEXTAREA]: {
    // markdownOptions: any;
  };
  [FORM_FIELD.CHECKBOX]: {
    // label: string;
  };
};

type FormField<T extends FORM_FIELD> = {
  kind: T,
  componentProps: ComponentProps,
  additionalProps?: AdditionalPropsMap[T],
};

type FormStructureType<T> = {
  heading: string,
  onSubmit: (entity: T) => void,
  fields: FormField<FORM_FIELD>[],
  defaultInput: { [key: string]: NumORStr }
  submitLabel: string,
  apiPath: string,
}

export const TitleDescriptionFormStructure: FormField<FORM_FIELD>[] = [{
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
},]

// can probably replace any with all possible options of the form
const CustomForm: React.FC<{ formStructure: FormStructureType<any> }> = ({ formStructure }) => {

  const handleEntityFieldChange = (key: string, newValue: NumORStr) => {
    setEntity({ ...entity, [key]: newValue });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callApi(formStructure.apiPath, entity).then(({ data }) =>
      formStructure.onSubmit(data.data)
    );
    setEntity((entity) => ({ ...entity, ...formStructure.defaultInput }));
  }

  const [entity, setEntity] = React.useState(formStructure.defaultInput);

  return (
    <form onSubmit={handleSubmit}>
      <LargeHeading>{formStructure.heading}</LargeHeading>
      {formStructure.fields.map((field) => {
        switch (field.kind) {
          case FORM_FIELD.INPUT:
            return (
              <input
                key={field.componentProps.key}
                placeholder={field.componentProps.placeholder || "Enter"}
                type={field.componentProps.type || "text"}
                required={field.componentProps.required || false}
                onChange={(e) => handleEntityFieldChange(field.componentProps.key, e.target.value)}
                value={entity[field.componentProps.key]}
                className="input input-bordered input-primary w-full mb-4"
              />
            )
          case FORM_FIELD.DROPDOWN:
            return (
              <SelectDropdown
                key={field.componentProps.key}
                containerClassName='w-full mb-4'
                handleValueChange={(newVal) => handleEntityFieldChange(field.componentProps.key, newVal)}
                initialValue={entity[field.componentProps.key]}
                {...field.additionalProps as AdditionalPropsMap[FORM_FIELD.DROPDOWN]}
              />
            )
          case FORM_FIELD.TEXTAREA:
            return (
              <textarea
                className="textarea textarea-primary w-full mb-3"
                key={field.componentProps.key}
                placeholder={field.componentProps.placeholder || "Enter"}
                required={field.componentProps.required || false}
                onChange={(e) => handleEntityFieldChange(field.componentProps.key, e.target.value)}
                value={entity[field.componentProps.key]}
              />
            )
          case FORM_FIELD.CHECKBOX:
            return (
              <div className="form-control w-20" key={field.componentProps.key}>
                <label className="label cursor-pointer">
                  <span className="label-text">{field.componentProps.placeholder}</span>
                  <input type="checkbox" onChange={(e) => handleEntityFieldChange(field.componentProps.key, e.target.checked ? 1 : 0)}
                    checked={!!entity[field.componentProps.key]} className="checkbox checkbox-primary" />
                </label>
              </div>
            )
          default:
            return null;
        }
      })}
      <div className='flex justify-end pt-4 pb-8'>
        <button
          type="submit"
          className="btn btn-primary"
        >
          {formStructure.submitLabel}
        </button>
      </div>
    </form>
  );
};



export default CustomForm;