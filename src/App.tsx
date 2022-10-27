import React from 'react';
import CompaniesTable from './components/companiesTable/CompaniesTable';
import EmployeesTable from './components/employeesTable/EmployeesTable';
import { useAppSelector } from './lib/hooks';

function App() {
  const pickedCompanies = useAppSelector(
    (state) => state.companies.pickedCompanies
  );

  return (
    <div className="App">
      <CompaniesTable/>
      {pickedCompanies.length > 0 ? <EmployeesTable /> : null}
    </div>
  );
}

export default App;
