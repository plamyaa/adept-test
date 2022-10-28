import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCompany } from '../../store/companiesSlice';

interface ICompaniesModalWindow {
  closeModal: Function;
}

const CompaniesModalWindow: React.FC<ICompaniesModalWindow> = ({
  closeModal,
}) => {
  const [name, setName] = useState('');
  const [headcount, setHeacount] = useState('');
  const [adress, setAdress] = useState('');
  const dispatch = useDispatch();

  const handleHeadcount = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    if (Number(value) < 0 || value[0] === '0') return;
    setHeacount(value);
  };
  const handleDispatchButton = () => {
    dispatch(
      addCompany({
        name: name,
        headcount: headcount,
        adress: adress,
      })
    );
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
                placeholder="Введите имя копании"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="modal-input"
                placeholder="Введите число сотрудников"
                type="number"
                value={headcount}
                onChange={handleHeadcount}
              />
              <input
                className="modal-input"
                placeholder="Введите адресс копании"
                type="text"
                value={adress}
                onChange={(e) => setAdress(e.target.value)}
              />
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

export default CompaniesModalWindow;
