import { callApi } from '@/utils/api';
import React, { useState } from 'react';
import TitleDescriptionInput, { SetEntityDispatch } from '../common/TitleDescriptionInput';
import SelectDropdown from '../common/SelectDropdown';
import { DROPDOWN_MODE_VALUES, JOURNAL_DROPDOWN_MODE, JOURNAL_TYPE } from '@/utils/constants';
import { Journal, NumORStr } from '@/types';

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
  const [journalInput, setJournalInput] = useState(defaultJournalInput);

  const handleJournalFieldChange = (key: string, newValue: NumORStr) => {
    setJournalInput({ ...journalInput, [key]: newValue });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callApi("/api/journal", journalInput).then(({ data }) => {
      addNewEntry(data.data);
    })
    setJournalInput({ ...journalInput, ...defaultJournalInput });
  }

  return (
    <form onSubmit={handleSubmit}>
      <TitleDescriptionInput
        title={journalInput.title}
        desc={journalInput.desc}
        setEntity={setJournalInput as SetEntityDispatch}
      />
      <SelectDropdown
        key={"journal"}
        handleValueChange={(newVal: number) => handleJournalFieldChange("type", newVal)}
        {...DROPDOWN_MODE_VALUES[JOURNAL_DROPDOWN_MODE.TYPE]}
      />
      <button
        type="submit"
        className="btn btn-primary"
      >
        Add Journal Entry
      </button>
    </form>
  );
};

type JournalFormProps = {
  addNewEntry: (entry: Journal) => void;
}

export default JournalForm;