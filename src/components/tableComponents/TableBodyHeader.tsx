import React from 'react';

interface ITableBodyHeader {
  data: string[];
}

const TableBodyHeader: React.FC<ITableBodyHeader> = ({ data }) => {
  return (
    <tr className="body__header header">
      {data.map((value, index) => {
        return (
          <th className="header__cell" key={index}>
            {value}
          </th>
        );
      })}
    </tr>
  );
};

export default TableBodyHeader;
