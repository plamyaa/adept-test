import { createSlice } from '@reduxjs/toolkit';
import { fakeData } from '../lib/fakeData';

const employeesConstituents = [
  'Чекбокс',
  'Фамилия',
  'Имя',
  'Должность',
]

const pickedEmployees: number[] = [];

const employees = createSlice({
  name: 'employyes',
  initialState: {
    data: fakeData,
    constituents: employeesConstituents,
    pickedEmployees: pickedEmployees,
  },
  reducers: {
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
    editCell: (state, action) => {
      const employeeId = action.payload.id;
      const newValue = action.payload.newValue;
      state.data = state.data.map((employee) => {
        if (employee.id === employeeId) employee.name = newValue;
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
  editCell,
  selectAllEmployees,
  selectEmployee,
  unSelectEmployee,
  addEmployee,
  deleteEmployee,
} = employees.actions;

export default employees.reducer;
