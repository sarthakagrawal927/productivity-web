import { NumORStr } from '@/types';
import React, { Dispatch } from 'react';

export type SetEntityDispatch = Dispatch<React.SetStateAction<{
  title: string;
  desc: string;
} & { [key: string]: NumORStr | boolean }>>

const TitleDescriptionInput = ({ title, desc, setEntity }: {
  title: string;
  desc: string;
  setEntity: SetEntityDispatch;
}) => {

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntity((entity) => {
      return {
        ...entity,
        title: e.target.value
      }
    })
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEntity((entity) => {
      return {
        ...entity,
        desc: e.target.value
      }
    })
  }

  return (
    <>
      <input
        type="text"
        placeholder='Title'
        id="task"
        className="input input-bordered input-primary w-full mb-4"
        value={title}
        onChange={handleTitleChange}
        required
      />
      <textarea
        id="description"
        placeholder='Description'
        className="textarea textarea-primary w-full mb-4"
        value={desc}
        onChange={handleDescChange}
        required
      />
    </>
  );
};

export default TitleDescriptionInput;