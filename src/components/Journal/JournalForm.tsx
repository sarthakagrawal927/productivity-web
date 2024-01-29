import { callApi } from '@/utils/api';
import React, { useCallback, useState } from 'react';
import TitleDescriptionInput, { SetEntityDispatch } from '../common/TitleDescriptionInput';
import SelectDropdown from '../common/SelectDropdown';
import { DROPDOWN_MODE_VALUES, JOURNAL_DROPDOWN_MODE } from '@/utils/constants';
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

  const handleJournalFieldChange = useCallback((key: string, newValue: NumORStr) => {
    setJournalInput({ ...journalInput, [key]: newValue });
  }, [journalInput])


  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callApi("/api/journal", journalInput).then(({ data }) => {
      addNewEntry(data.data);
    })
    setJournalInput({ ...journalInput, ...defaultJournalInput });
  }, [journalInput, addNewEntry])

  return (
    <form onSubmit={handleSubmit} className='w-full'>
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
        className="btn btn-primary ml-4"
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