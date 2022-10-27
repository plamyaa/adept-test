import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import EmployeesTableBody from './EmployeesTableBody';
import EmployeesTableHeader from './EmployeesTableHeader';
import EmployeesTableButtons from './EmpoloyeesTableButtons';
import { increaseLength } from '../../store/employeesSlice';
const Table = () => {
  const state = useAppSelector((state) => state.employees);
  const dispatch = useAppDispatch();
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return function () {
      document.removeEventListener('scroll', scrollHandler)
    };
  }, [])
  
  const scrollHandler = (event: any) => {
    if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 5) {
      dispatch(increaseLength());
    }
  }
  
  return (
    <div className="employees-table" >
      <table className="employees-table__table table" border={1}>
        <EmployeesTableHeader />
        <EmployeesTableBody
          data={state.data.slice(0, state.dataLength)}
          constituents={state.constituents}
        />
      </table>
      <EmployeesTableButtons />
    </div>
  );
};



export default Table;
