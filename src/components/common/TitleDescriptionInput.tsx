import React, { Dispatch } from 'react';

export type SetEntityDispatch = Dispatch<React.SetStateAction<{
  title: string;
  desc: string;
} & { [key: string]: any }>>

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
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="task"
          className="w-full p-2 bg-gray-800 text-white border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          className="w-full p-2 bg-gray-800 text-white border rounded focus:outline-none focus:ring focus:border-blue-300"
          value={desc}
          onChange={handleDescChange}
          required
        />
      </div>
    </>
  );
};

export default TitleDescriptionInput;