"use client";
import React, { useEffect, useState } from 'react';
import "./atom.scss";
import useActivityDetector from '@/hooks/useActorActive';
import { LargeHeading } from '../common/Typography';

const SingleAtom = () => {
  const electronBands = [
    { path: 1, electrons: 2 },
    { path: 2, electrons: 8 },
    { path: 3, electrons: 18 }, // out of 18
  ];

  const [activeElectron, setActiveElectron] = useState<{ path: number, index: number } | undefined>();
  const isActive = useActivityDetector(3000); // TODO: Consider adding this in layout and passing in global context

  useEffect(() => {
    const animationElements = document.querySelectorAll('.electron-animation');
    animationElements.forEach((element) => {
      element.classList.toggle('animation-paused', !isActive);
    })
  }, [isActive])

  return (
    <>
      <LargeHeading>Coming soon</LargeHeading>
      <div className="container">
        <div className="nucleus" />
        {electronBands.map(({ path, electrons }) => {
          return <React.Fragment key={path}>
            <div className={`path-${path}`} />
            {Array(electrons).fill(0).map((_, index) => {
              return <div
                key={`path=${path}_index=${index}`}
                onClick={() => setActiveElectron({ path, index })}
                className={`cursor-pointer electron-animation electron-${path} electron-delayed-${Math.round((index + 1) * 18 / electrons)}`}
              />
            })}
          </React.Fragment>
        })}
      </div>
      {isActive ? "Active" : "Inactive"}
      {activeElectron && <div className='mt-20'>
        Chosen electron: {activeElectron.index + 1} on path {activeElectron.path}
      </div>}
    </>
  );
};

export default SingleAtom;