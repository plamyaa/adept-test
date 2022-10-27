import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { decrementHeadcount } from '../../store/companiesSlice';
import { deleteEmployee } from '../../store/employeesSlice';
import EmployeesModalWindow from './EmployeesModalWindow';

const EmployeesTableButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const state = useAppSelector((state) => state.employees);
  const dispatch = useAppDispatch();

  const handleDeleteButton = () => {
    state.pickedEmployees.map((employeeId) => {
      dispatch(deleteEmployee(Number(employeeId)));
      const fullData = state.data.filter((employee) => {
        if (employee.id === employeeId) return employee;
        return null;
      });
      dispatch(decrementHeadcount(fullData[0].companyId));
      return null;
    });
  };
  return (
    <>
      <button
        className="button companie-table__add-button"
        onClick={() => setShowModal(true)}
      >
        Добавить сотрудника
      </button>
      <button
        className="button companie-table__delete-button"
        onClick={handleDeleteButton}
      >
        Удалить выделенных сотрудников
      </button>
      {showModal ? (
        <EmployeesModalWindow closeModal={() => setShowModal(false)} />
      ) : null}
    </>
  );
};

export default EmployeesTableButtons;
