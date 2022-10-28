import React from 'react';
import { useAppSelector } from '../../lib/hooks';
import CompaniesTableBody from './CompaniesTableBody';
import CompaniesTableHeader from './CompaniesTableHeader';
import CompaniesTableButtons from './CompaniesTableButtons';

const CompaniesTable = () => {
  const state = useAppSelector((state) => state.companies);
  return (
    <div className="company-table">
      <table className="company-table__table table" border={1}>
        <CompaniesTableHeader />
        <CompaniesTableBody
          data={state.data}
          constituents={state.constituents}
        />
      </table>
      <CompaniesTableButtons />
    </div>
  );
};

export default CompaniesTable;
