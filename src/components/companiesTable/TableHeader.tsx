import React from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectAllCompanies } from '../../store/companiesSlice';
import { unSelectEmployee } from '../../store/employeesSlice';

const CompaniesTableHeader = () => {
  const dispatch = useAppDispatch();

  const stateCompanies = useAppSelector((state) => state.companies);
  const pickedLength = stateCompanies.pickedCompanies.length;
  const dataLength = stateCompanies.data.length;
  const pickedEmployees = useAppSelector(state =>state.employees.pickedEmployees)

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    dispatch(selectAllCompanies(target.checked));
    if (target.checked === false)
      pickedEmployees.map(employee => dispatch(unSelectEmployee(employee)))
  };

  return (
    <thead className="table__hader header">
      <tr className="header__row">
        <th className="header__cell">
          <input
            className="header__checkbox"
            type="checkbox"
            checked={pickedLength === dataLength}
            onChange={handleInputChange}
          />
          <span className="header__paragraph">Выделить все</span>
        </th>
      </tr>
    </thead>
  );
};

export default CompaniesTableHeader;
