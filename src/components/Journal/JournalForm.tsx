import { Journal } from '@/types';
import { DROPDOWN_MODE_VALUES, JOURNAL_DROPDOWN_MODE } from '@/utils/constants';
import React from 'react';
import CustomForm, { FORM_FIELD, TitleDescriptionFormStructure } from '../common/CustomForm';

type JournalInput = {
  title: string;
  desc: string;
  type?: number;
}

const defaultJournalInput: JournalInput = {
  title: '',
  desc: '',
}

const JournalForm: React.FC<JournalFormProps> = ({ addNewEntry }) => {
  return (
    <CustomForm
      formStructure={{
        apiPath: "/api/journal",
        onSubmit: (e) => addNewEntry(e),
        defaultInput: defaultJournalInput,
        submitLabel: "Add Journal Entry",
        heading: "Add New Journal Entry",
        fields: [
          ...TitleDescriptionFormStructure,
          {
            kind: FORM_FIELD.DROPDOWN,
            componentProps: {
              key: "type",
            },
            additionalProps: DROPDOWN_MODE_VALUES[JOURNAL_DROPDOWN_MODE.TYPE],
          }
        ]
      }}
    />
  );
};

type JournalFormProps = {
  addNewEntry: (entry: Journal) => void;
}

export default JournalForm;