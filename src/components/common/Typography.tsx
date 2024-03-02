import React from 'react';

type HeadingProps = {
  children: React.ReactNode;
};

export const LargeHeading = ({ children }: HeadingProps) => {
  return <h1 className="text-2xl font-bold py-4">{children}</h1>;
};

export const DescriptionText = ({ children }: HeadingProps) => {
  return <p className="text-lg text-slate-400 py-3">{children}</p>;
}

export const StrongText = ({ children }: HeadingProps) => {
  return <p className="text-lg font-bold py-3">{children}</p>;
}

export const RegularText = ({ children }: HeadingProps) => {
  return <p className="text-lg py-3">{children}</p>;
}