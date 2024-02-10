import React from 'react';

type HeadingProps = {
  text: string;
};

export const LargeHeading = ({ text }: HeadingProps) => {
  return <h1 className="text-2xl font-bold py-4">{text}</h1>;
};

export const DescriptionText = ({ text }: HeadingProps) => {
  return <p className="text-lg text-slate-400 py-3">{text}</p>;
}

export const StrongText = ({ text }: HeadingProps) => {
  return <p className="text-lg font-bold py-3">{text}</p>;
}

export const RegularText = ({ text }: HeadingProps) => {
  return <p className="text-lg py-3">{text}</p>;
}