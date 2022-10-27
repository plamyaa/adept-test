import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../lib/hooks';
import EmployeesTableBody from './EmployeesTableBody';
import EmployeesTableHeader from './EmployeesTableHeader';
import EmployeesTableButtons from './EmpoloyeesTableButtons';

const Table = () => {
  const state = useAppSelector((state) => state.employees);
  const [dataSlice, setDataSclice] = useState(state.data.slice(0, 30))
  let listLength = 30
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    };
  }, [])
  
  const scrollHandler = (event: any) => {
    if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 5) {
      listLength += 20;
      setDataSclice(state.data.slice(0, listLength))
    }
  }
  
  return (
    <div className="employees-table" >
      <table className="employees-table__table table" border={1}>
        <EmployeesTableHeader />
        <EmployeesTableBody
          data={dataSlice}
          constituents={state.constituents}
        />
      </table>
      <EmployeesTableButtons />
    </div>
  );
};



export default Table;
