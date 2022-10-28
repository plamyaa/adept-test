import { createSlice } from '@reduxjs/toolkit';
import { fakeData, IemployeesData } from '../lib/fakeData';

const employeesConstituents = ['Чекбокс', 'Фамилия', 'Имя', 'Должность'];

const pickedEmployees: number[] = [];

const employees = createSlice({
  name: 'employyes',
  initialState: {
    data: fakeData,
    constituents: employeesConstituents,
    pickedEmployees: pickedEmployees,
    dataLength: 30,
  },
  reducers: {
    increaseLength: (state) => {
      state.dataLength += 30;
    },
    selectAllEmployees: (state, action) => {
      if (action.payload === true)
        state.pickedEmployees = state.data.map((employee) => employee.id);
      else state.pickedEmployees = pickedEmployees;
    },
    selectEmployee: (state, action) => {
      state.pickedEmployees.push(action.payload);
    },
    unSelectEmployee: (state, action) => {
      state.pickedEmployees = state.pickedEmployees.filter(
        (employeeId) => employeeId !== action.payload
      );
    },
    editCell: (state, { payload }) => {
      const { rowId, newValue, cellName } = payload;
      state.data = state.data.map((employee: IemployeesData) => {
        if (employee.id === rowId) {
          const name: keyof IemployeesData = 'name';
          if (name === cellName) employee[name] = newValue;
          const surname: keyof IemployeesData = 'surname';
          if (surname === cellName) employee[surname] = newValue;
          const position: keyof IemployeesData = 'position';
          if (position === cellName) employee[position] = newValue;
        }
        return employee;
      });
    },
    addEmployee: (state, action) => {
      const lastId = state.data.at(-1)?.id;
      if (lastId !== undefined)
        state.data.push({ id: lastId + 1, ...action.payload });
    },
    deleteEmployee: (state, action) => {
      state.pickedEmployees = state.pickedEmployees.filter(
        (employeeId) => employeeId !== action.payload
      );
      state.data = state.data.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
});

export const {
  increaseLength,
  editCell,
  selectAllEmployees,
  selectEmployee,
  unSelectEmployee,
  addEmployee,
  deleteEmployee,
} = employees.actions;

export default employees.reducer;
