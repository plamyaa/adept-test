import React from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { selectEmployee, unSelectEmployee } from '../../store/employeesSlice';

const EmployeesTableHeader = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  const allEmpoloyees = state.employees.data;
  const pickedCompanies = state.companies.pickedCompanies;
  const pickedEmployees = state.employees.pickedEmployees;

  const pickedCompaniesEmployees = allEmpoloyees.filter((employee) =>
    pickedCompanies.includes(employee.companyId)
  );
  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (target.checked === true) {
      const unSelectedEmployees = allEmpoloyees.filter((employee) => {
        if (
          pickedCompanies.includes(employee.companyId) &&
          !pickedEmployees.includes(employee.id)
        )
          return employee.id;
        return null;
      });
      unSelectedEmployees.map((employee) =>
        dispatch(selectEmployee(employee.id))
      );
    } else {
      pickedEmployees.map((employeeId) =>
        dispatch(unSelectEmployee(employeeId))
      );
    }
  };
  return (
    <thead className="table__hader header">
      <tr className="header__row">
        <th className="header__cell">
          <input
            className="header__checkbox"
            type="checkbox"
            checked={pickedEmployees.length === pickedCompaniesEmployees.length}
            onChange={handleInputChange}
          />
          <span className="header__paragraph">Выделить все</span>
        </th>
      </tr>
    </thead>
  );
};

export default EmployeesTableHeader;
