import React from 'react';
import { IemployeesData } from '../../lib/fakeData';
import { useAppSelector } from '../../lib/hooks';
import { IContituents } from '../../store/companiesSlice';
import TableBodyHeader from '../tableComponents/TableBodyHeader';
import EmployeesTableBodyRow from './EmployeesTableBodyRow';

interface IEmployeesTableBody {
  data: IemployeesData[];
  constituents: IContituents;
}

const EmployeesTableBody: React.FC<IEmployeesTableBody> = ({
  data,
  constituents,
}) => {
  const pickedCompanies = useAppSelector(
    (state) => state.companies.pickedCompanies
  );
  return (
    <tbody className="employee-table__body body" >
      <TableBodyHeader data={constituents} />
      {data.map((item) => {
        const values = Object.values(item);
        const keys = Object.keys(item);
        return pickedCompanies.includes(item.companyId) ? (
          <EmployeesTableBodyRow key={item.id} values={values} keys={keys} rowId={item.id} />
        ) : null;
      })}
    </tbody>
  );
};

export default EmployeesTableBody;
