import React, { useState } from 'react';
import { useAppDispatch } from '../../lib/hooks';
import { editCell } from '../../store/employeesSlice';

interface ITableCell {
  rowId: number;
  value: string;
}

const EmployeesTableBodyCell: React.FC<ITableCell> = ({
  rowId,
  value,
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
        <span className="cell__value">{cellValue}</span>
      )}

      <input
        className="cell__button"
        type="checkbox"
        checked={checked}
        onChange={handleInputChange}
        value={value}
        id={`${value}${rowId}`}
      />
      <label htmlFor={`${value}${rowId}`} className="input-lable"></label>
    </td>
  );
};

export default EmployeesTableBodyCell;
