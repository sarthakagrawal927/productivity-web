import React from 'react';

export enum BadgeMode {
  SUCCESS = 1,
  DANGER,
}

const BadgeModeToClass = {
  [BadgeMode.SUCCESS]: 'bg-green-50 text-green-700',
  [BadgeMode.DANGER]: 'bg-red-50 text-red-700',
}

type BadgeProps = {
  mode: BadgeMode;
  text: string;
};

const Badge: React.FC<BadgeProps> = ({ mode, text }) => {
  return (
    <span className={`inline-flex items-center rounded-lg px-2 py-1 font-medium ${BadgeModeToClass[mode]}`}>
      {text}
    </span>
  );
};

export default Badge;