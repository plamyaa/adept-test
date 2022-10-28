import React from 'react';
import { IContituents, IcompanyData } from '../../store/companiesSlice';
import TableBodyHeader from '../tableComponents/TableBodyHeader';
import CompaniesTableBodyRow from './TableBodyRow';

interface ICompaniesTableBody {
  data: IcompanyData[];
  constituents: IContituents;
}

const TableBodyCompanies: React.FC<ICompaniesTableBody> = ({
  data,
  constituents,
}) => {
  return (
    <tbody className="company-table__body body">
      <TableBodyHeader data={constituents} />
      {data.map((item) => {
        const values = Object.values(item);
        const keys = Object.keys(item);
        return (
          <CompaniesTableBodyRow
            key={item.id}
            rowId={item.id}
            values={values}
            keys={keys}
          />
        );
      })}
    </tbody>
  );
};

export default TableBodyCompanies;
