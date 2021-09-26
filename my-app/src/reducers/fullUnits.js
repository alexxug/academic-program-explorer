
import { UNITS_LOADED } from '../actions/types'
import { mapValues } from 'lodash'

const initialState = {
  tasks: {},
  loading: true,
  semesterRows: {
    "year-1-semester-1": {
      id: "year-1-semester-1",
      title: "Year 1, Semester 1",
      semester: "1",
      taskIds: [],
    },
    "year-1-semester-2": {
      id: "year-1-semester-2",
      title: "Year 1, Semester 2",
      semester: "2",
      taskIds: [],
    },
    "year-2-semester-1": {
      id: "year-2-semester-1",
      title: "Year 2, Semester 1",
      semester: "1",
      taskIds: [],
    },
    "year-2-semester-2": {
      id: "year-2-semester-2",
      title: "Year 2, Semester 2",
      semester: "2",
      taskIds: [],
    },
  },
  unitTypeColumns: {
    "unit-type-column-1": {
      id: "unit-type-column-1",
      title: "Core",
      taskIds: [],
    },
    "unit-type-column-2": {
      id: "unit-type-column-2",
      title: "Conversion",
      taskIds: [],
    },
    "unit-type-column-3": {
      id: "unit-type-column-3",
      title: "Option",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  semesterRowOrder: ["year-1-semester-1", "year-1-semester-2", "year-2-semester-1", "year-2-semester-2"],
  unitTypeColumnOrder: [
    "unit-type-column-1",
    "unit-type-column-2",
    "unit-type-column-3",
  ],
};

function fullUnitsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UNITS_LOADED:
      return {
        ...state,
        tasks: payload,
        unitTypeColumns: mapValues(state.unitTypeColumns, (value) => {
          return { ...value, taskIds: (Object.values(payload).filter(unit => unit.role === value.title)).map(unit => unit._id) }
        }),
        loading: false,
      }

    default:
      return state;
  }
}



export default fullUnitsReducer;
