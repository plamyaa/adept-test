import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { deleteCompany } from '../../store/companiesSlice';
import CompaniesModalWindow from './CompaniesModalWindow';

const CompaniesTableButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const state = useAppSelector((state) => state.companies);
  const dispatch = useAppDispatch();
  const handleDeleteButton = () => {
    state.pickedCompanies.map(companyId => dispatch(deleteCompany(Number(companyId))))
  }
  return (
    <>
      <button
        className="button company-table__add-button"
        onClick={() => setShowModal(true)}
      >
        Добавить копанию
      </button>
      <button className="button company-table__delete-button" onClick={handleDeleteButton}>
        Удалить выделенные компании
      </button>
      {showModal ? <CompaniesModalWindow closeModal={() => setShowModal(false)} /> : null}
    </>
  );
};

export default CompaniesTableButtons;
