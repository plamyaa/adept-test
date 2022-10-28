import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../lib/hooks';
import { incrementHeadcount } from '../../store/companiesSlice';
import { addEmployee } from '../../store/employeesSlice';

interface IEmployeesModalWindow {
  closeModal: Function;
}

const EmployeesModalWindow: React.FC<IEmployeesModalWindow> = ({
  closeModal,
}) => {
  const [companyId, setCompanyId] = useState(1);
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const dispatch = useDispatch();
  const companiesData = useAppSelector((state) => state.companies.data);

  const handleDispatchButton = () => {
    dispatch(
      addEmployee({
        surname: surname,
        name: name,
        companyId: companyId,
        position: position,
      })
    );
    dispatch(incrementHeadcount(companyId))
    closeModal();
  };

  return (
    <div>
      <div className="modal-mask" onClick={() => closeModal()}>
        <div className="modal-wrapper">
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-exit" onClick={() => closeModal()}>
              X
            </button>
            <form className="modal-form">
              <input
                className="modal-input"
                placeholder="Введите фамилию"
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <input
                className="modal-input"
                placeholder="Введите имя"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="modal-input"
                placeholder="Введите должность"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              <select
                className="modal-input"
                placeholder="Выберите компанию"
                value={companyId}
                onChange={(e) => setCompanyId(Number(e.target.value))}
              >
                {companiesData.map((company) => (
                  <option value={company.id} key={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </form>
            <button className="modal-button" onClick={handleDispatchButton}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesModalWindow;
