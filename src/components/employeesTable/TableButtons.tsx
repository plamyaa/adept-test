import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { decrementHeadcount } from '../../store/companiesSlice';
import { deleteEmployee } from '../../store/employeesSlice';
import EmployeesModalWindow from './ModalWindow';

const EmployeesTableButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const state = useAppSelector((state) => state.employees);
  const dispatch = useAppDispatch();

  const handleDeleteButton = () => {
    state.pickedEmployees.map((employeeId) => {
      dispatch(deleteEmployee(employeeId));
      const fullData = state.data.filter((employee) => {
        if (employee.id === employeeId) return employee;
        return null;
      });
      dispatch(decrementHeadcount(fullData[0].companyId));
    });
  };
  return (
    <>
      <button
        className="button employee-table__add-button"
        onClick={() => setShowModal(true)}
      >
        Добавить сотрудника
      </button>
      <button
        className="button employee-table__delete-button"
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
