import React from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectCompany, unSelectCompany } from '../../store/companiesSlice';
import { unSelectEmployee } from '../../store/employeesSlice';
import CompaniesTableBodyCell from './CompaniesTableBodyCell';

interface ITableRow {
  rowId: number
  values: string[];
  keys: string[];
}

const CompaniesTableBodyRow: React.FC<ITableRow> = ({ values, keys, rowId }) => {
  const pickedCompanies = useAppSelector(
    (state) => state.companies.pickedCompanies
  );
  const stateEmployees = useAppSelector(state => state.employees)
  const dispatch = useAppDispatch();
  const checked = pickedCompanies.includes(Number(values[0]));

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const id = Number(target.parentElement?.id);
    if (checked === false)
      dispatch(selectCompany(id));
    else {
      dispatch(unSelectCompany(id))
      const showedEmployees = stateEmployees.data.filter((employee) => {
        if (stateEmployees.pickedEmployees.includes(employee.id) && employee.companyId === id)
          return employee;
        return null
      })
      showedEmployees.map(employee => dispatch(unSelectEmployee(employee.id)))
    };
  };
  
  return (
    <tr className={checked ? "body__row body__row-selected" :"body__row"} >
      {values.map((value: string, index: number) => {
        switch (keys[index]) {
          case 'id':
            return (
              <td className="body__cell cell" key={index} id={value}>
                <input
                  className="body__checkbox"
                  type="checkbox"
                  checked={checked}
                  onChange={handleInputChange}
                />
              </td>
            );
          case 'headcount':
            return (
              <CompaniesTableBodyCell
                key={index}
                value={value}
                rowId={rowId}
                isEditable={false}
              />
            );
          default:
            return (
              <CompaniesTableBodyCell
                key={index}
                value={value}
                rowId={rowId}
                isEditable={true}
              />
            );
        }
      })}
    </tr>
  );
};

export default CompaniesTableBodyRow;
