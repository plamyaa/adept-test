import React from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectEmployee, unSelectEmployee } from '../../store/employeesSlice';
import EmployeesTableBodyCell from './EmployeesTableBodyCell';

interface ITableRow {
  values: string[];
  keys: string[];
  rowId: number;
}

const EmployeesTableBodyRow: React.FC<ITableRow> = ({
  values,
  keys,
  rowId,
}) => {
  const pickedEmployees = useAppSelector(
    (state) => state.employees.pickedEmployees
  );

  const dispatch = useAppDispatch();
  const checked = pickedEmployees.includes(Number(values[0]));
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (checked === false)
      dispatch(selectEmployee(Number(target.parentElement?.id)));
    else dispatch(unSelectEmployee(Number(target.parentElement?.id)));
  };
  return (
    <tr className={checked ? 'body__row body__row-selected' : 'body__row'}>
      {values.map((value: string, index: number) => {
        switch (keys[index]) {
          case 'companyId':
            return null;
          case 'id':
            return (
              <td className="body__cell" key={index} id={value}>
                <input
                  className="body__checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={handleInputChange}
                />
              </td>
            );
          default:
            return (
              <EmployeesTableBodyCell key={index} value={value} rowId={rowId} />
            );
        }
      })}
    </tr>
  );
};

export default EmployeesTableBodyRow;
