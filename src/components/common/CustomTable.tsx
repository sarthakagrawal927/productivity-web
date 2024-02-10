import React from 'react';

export enum CELL_TYPE {
  TEXT = 'TEXT',
  TEXT_WITH_SUBTEXT = 'TEXT_WITH_SUBTEXT',
  BUTTON = 'BUTTON',
  LINK = 'LINK',
  AVATAR = 'AVATAR',
}

// need to define all for this to work
type AdditionalPropsMap = {
  [CELL_TYPE.TEXT]: {}
  [CELL_TYPE.BUTTON]: {
    onClick: () => void,
  };
  [CELL_TYPE.TEXT_WITH_SUBTEXT]: {
    subText: string,
  };
  [CELL_TYPE.LINK]: {
    href: string,
  };
  [CELL_TYPE.AVATAR]: {
    src: string,
  };
}

type Cell<T extends CELL_TYPE> = {
  kind: T,
  widthPercent: number, // will be repeated for each cell in a row

  text: string,
  additionalProps: AdditionalPropsMap[T],
}

export type Row = {
  cells: Cell<CELL_TYPE>[],
}

export type CustomTableProps = {
  headers?: string[];
  rows: Row[],
}

const CustomTable: React.FC<CustomTableProps> = (tableProps) => {
  return (
    <table className='table table-zebra'>
      {tableProps.headers && <thead>
        <tr>
          {tableProps.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>}
      <tbody>
        {tableProps.rows.map((row, index) => (
          <tr key={index}>
            {row.cells.map((cell, index) => (
              <td key={index} style={{ width: `${cell.widthPercent}%` }}>
                {cell.kind === CELL_TYPE.TEXT && <span>{cell.text}</span>}
                {cell.kind === CELL_TYPE.TEXT_WITH_SUBTEXT && <span>
                  <div className='font-bold'>{cell.text}</div>
                  <div className='text-slate-400'>
                    {(cell as Cell<CELL_TYPE.TEXT_WITH_SUBTEXT>).additionalProps.subText}
                  </div>
                </span>}
                {cell.kind === CELL_TYPE.BUTTON && <button
                  className="btn btn-sm btn-accent"
                  onClick={(cell as Cell<CELL_TYPE.BUTTON>).additionalProps.onClick}>
                  {cell.text}
                </button>}
              </td>
            ))}
          </tr>
        ))}

      </tbody>

    </table>
  );
};

export default CustomTable;