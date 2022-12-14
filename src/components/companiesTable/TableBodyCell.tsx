import React, { useState } from 'react';
import { useAppDispatch } from '../../lib/hooks';
import { editCell } from '../../store/companiesSlice';

interface ITableCell {
  rowId: number;
  value: string;
  isEditable: boolean;
  cellName: string;
}

const CompaniesTableBodyCell: React.FC<ITableCell> = ({
  rowId,
  value,
  isEditable,
  cellName,
}) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (checked) {
      dispatch(
        editCell({ newValue: target.value, rowId: rowId, cellName: cellName })
      );
    }
  };
  return (
    <td className="body__cell cell">
      {checked ? (
        <input
          type="text"
          className="cell__value"
          value={value}
          onChange={handleInputChange}
        />
      ) : (
        <span className="cell__value">{value}</span>
      )}
      {isEditable ? (
        <>
          <input
            className="cell__button"
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            id={`${value}${rowId}`}
          />
          <label htmlFor={`${value}${rowId}`} className="input-lable"></label>
        </>
      ) : null}
    </td>
  );
};

export default CompaniesTableBodyCell;
