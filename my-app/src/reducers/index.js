import { combineReducers } from 'redux';
import alert from './alert';
import fullUnits from './fullUnits'

export default combineReducers({
  alert,
  fullUnits
});
