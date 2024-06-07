import React from 'react';

export enum CELL_TYPE {
  TEXT = 'TEXT',
  TEXT_WITH_SUBTEXT = 'TEXT_WITH_SUBTEXT',
  BUTTON = 'BUTTON',
  LINK = 'LINK',
  AVATAR = 'AVATAR',
  CUSTOM = 'CUSTOM',
}

// need to define all for this to work
type AdditionalPropsMap = {
  [CELL_TYPE.TEXT]: {}
  [CELL_TYPE.BUTTON]: {
    onClick: () => void | Promise<void>,
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
  [CELL_TYPE.CUSTOM]: {
    element: React.ReactNode,
  };
}

export type Cell<T extends CELL_TYPE> = {
  kind: T,
  widthPercent: number, // will be repeated for each cell in a row

  text: string,
  additionalProps: AdditionalPropsMap[T],
}

export type Row = {
  onClick?: () => void,
  cells: Cell<CELL_TYPE>[],
  id?: string,
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
          <tr key={`${index}_${row.id}`} onClick={row.onClick} className={row.onClick ? 'cursor-pointer' : ''}>
            {row.cells.map((cell, index) => (
              <td key={index} style={{ width: `${cell.widthPercent}%` }}>
                {cell.kind === CELL_TYPE.TEXT && <span className='font-bold	'>{cell.text}</span>}
                {cell.kind === CELL_TYPE.TEXT_WITH_SUBTEXT && <span>
                  <div className='font-bold'>{cell.text}</div>
                  <div className='text-slate-400'>
                    {(cell as Cell<CELL_TYPE.TEXT_WITH_SUBTEXT>).additionalProps.subText}
                  </div>
                </span>}
                {cell.kind === CELL_TYPE.BUTTON && <button
                  className="btn btn-sm btn-accent"
                  onClick={(e) => {
                    (cell as Cell<CELL_TYPE.BUTTON>).additionalProps.onClick()
                    e.stopPropagation();
                  }}>
                  {cell.text}
                </button>}
                {cell.kind === CELL_TYPE.CUSTOM && (cell as Cell<CELL_TYPE.CUSTOM>).additionalProps.element}
              </td>
            ))}
          </tr>
        ))}

      </tbody>

    </table>
  );
};

export default CustomTable;