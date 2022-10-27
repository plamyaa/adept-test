import React, { useState } from 'react';
import { useAppDispatch } from '../../lib/hooks';
import { editCell } from '../../store/companiesSlice';

interface ITableCell {
  rowId: number;
  value: string;
  isEditable: boolean;
}

const CompaniesTableBodyCell: React.FC<ITableCell> = ({
  rowId,
  value,
  isEditable,
}) => {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [cellValue, setCellValue] = useState(value);

  const handleInputChange = () => {
    if (checked) {
      dispatch(editCell({ newValue: cellValue, id: rowId }));
    }
    setChecked(!checked);
  };
  return (
    <td className="body__cell cell">
      {checked ? (
        <input
          type="text"
          className="cell__value"
          value={cellValue}
          onChange={(e) => setCellValue(e.target.value)}
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
            onChange={handleInputChange}
            id="input"
          />
          <label htmlFor="input" className="input-lable"></label>
        </>
      ) : null}
    </td>
  );
};

export default CompaniesTableBodyCell;
