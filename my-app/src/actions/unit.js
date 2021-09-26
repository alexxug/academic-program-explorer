import api from '../utils/api'
import { UNITS_LOADED } from "./types";
import { isEmpty, mapKeys } from 'lodash'

// Load User
export const loadUnits = () => async dispatch => {
  try {
    const res = await api.post('/course');
    const units = res.data.filter(unit => !isEmpty(unit.role))
    dispatch({
      type: UNITS_LOADED,
      payload: mapKeys(units, '_id')
    });
  } catch (err) {
    // dispatch({
    //   type: AUTH_ERROR
    // });
    alert(err)
  }
};