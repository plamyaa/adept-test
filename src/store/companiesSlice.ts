import { createSlice } from '@reduxjs/toolkit';
import { fakeData } from '../lib/fakeData';

export type IContituents = string[];

const companieConstituents: IContituents = [
  'Чекбокс',
  'Название компании',
  'Кол-во сотрудников',
  'Адресс',
];

export interface IcompanyData {
  id: number;
  name: string;
  headcount: number;
  adress: string;
}

function getHeadcount(companyId: number) {
  return fakeData.filter((employee) => {
    if (employee.companyId === companyId) return employee;
    return null;
  }).length;
}

const companiesData: IcompanyData[] = [
  {
    id: 1,
    name: 'Газпром',
    headcount: getHeadcount(1),
    adress: 'г. Санкт-Петербург, Лахтинский проспект, д. 2, корп. 3, стр. 1',
  },
  {
    id: 2,
    name: 'Лукойл',
    headcount: getHeadcount(2),
    adress: ' г. Москва, Сретенский бульвар, д. 11',
  },
  {
    id: 3,
    name: 'Роснефть',
    headcount: getHeadcount(3),
    adress: 'г. Москва, Софийская набережная, д. 26/1',
  },
  {
    id: 4,
    name: 'Сбербанк',
    headcount: getHeadcount(4),
    adress: 'г. Москва, ул. Вавилова, д. 19 ',
  },
  {
    id: 5,
    name: 'РЖД',
    headcount: getHeadcount(5),
    adress: 'г. Москва, ул Новая Басманная, д. 2/1, стр. 1',
  },
];

type TeditCell = {
  type: string;
  payload: { rowId: number; newValue: string; cellId: number };
};

const pickedCompanies: number[] = [];

const companies = createSlice({
  name: 'companies',
  initialState: {
    data: companiesData,
    constituents: companieConstituents,
    pickedCompanies: pickedCompanies,
  },
  reducers: {
    selectAllCompanies: (state, action) => {
      if (action.payload === true)
        state.pickedCompanies = state.data.map((company) => company.id);
      else state.pickedCompanies = pickedCompanies;
    },
    selectCompany: (state, action) => {
      state.pickedCompanies.push(action.payload);
    },
    unSelectCompany: (state, action) => {
      state.pickedCompanies = state.pickedCompanies.filter(
        (companyId) => companyId !== action.payload
      );
    },
    editCell: (state, { payload }) => {
      const { rowId, newValue, cellName } = payload;
      state.data = state.data.map((company: IcompanyData) => {
        if (company.id === rowId) {
          if ('name' === cellName) company['name'] = newValue;
          if ('adress' === cellName) company['adress'] = newValue;
        }
        return company;
      });
    },
    addCompany: (state, action) => {
      const lastId = state.data.at(-1)?.id;
      if (lastId !== undefined)
        state.data.push({ id: lastId + 1, ...action.payload });
    },
    deleteCompany: (state, action) => {
      state.pickedCompanies = state.pickedCompanies.filter(
        (companyId) => companyId !== action.payload
      );
      state.data = state.data.filter(
        (company) => company.id !== action.payload
      );
    },
    incrementHeadcount: (state, action) => {
      state.data = state.data.map((company) => {
        if (company.id === action.payload) company.headcount++;
        return company;
      });
    },
    decrementHeadcount: (state, action) => {
      state.data = state.data.map((company) => {
        if (company.id === action.payload) company.headcount--;
        return company;
      });
    },
  },
});

export const {
  editCell,
  selectAllCompanies,
  selectCompany,
  unSelectCompany,
  addCompany,
  deleteCompany,
  incrementHeadcount,
  decrementHeadcount,
} = companies.actions;

export default companies.reducer;
