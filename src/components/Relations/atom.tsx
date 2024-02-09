"use client";
import React from 'react';
import "./atom.scss";

const SingleAtom = () => {
  const electronBands = [
    { path: 1, electrons: 2 },
    { path: 2, electrons: 8 },
    { path: 3, electrons: 18 }, // out of 18
  ];
  const [activeElectron, setActiveElectron] = React.useState<{ path: number, index: number } | undefined>();
  return (
    <>
      <div className="container">
        <div className="nucleus" />
        {electronBands.map(({ path, electrons }) => {
          return <React.Fragment key={path}>
            <div className={`path-${path}`} />
            {Array(electrons).fill(0).map((_, index) => {
              return <div
                key={`path=${path}_index=${index}`}
                onClick={() => setActiveElectron({ path, index })}
                className={`cursor-pointer electron-${path} electron-delayed-${Math.round((index + 1) * 18 / electrons)}`}
              />
            })}
          </React.Fragment>
        })}
      </div>
      {activeElectron && <div className='mt-20'>
        Chosen electron: {activeElectron.index + 1} on path {activeElectron.path}
      </div>}
    </>
  );
};

export default SingleAtom;