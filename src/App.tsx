import React from 'react';
import CompaniesTable from './components/companiesTable/Table';
import EmployeesTable from './components/employeesTable/Table';
import { useAppSelector } from './lib/hooks';

function App() {
  const pickedCompanies = useAppSelector(
    (state) => state.companies.pickedCompanies
  );
  const allEmpoloyees = useAppSelector((state) => state.employees.data);
  const pickedCompaniesEmployees = allEmpoloyees.filter((employee) =>
    pickedCompanies.includes(employee.companyId)
  );
  return (
    <div className="App">
      <CompaniesTable/>
      {pickedCompanies.length > 0 && pickedCompaniesEmployees.length > 0? <EmployeesTable /> : null}
    </div>
  );
}

export default App;
