import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "../../reducers";
import thunk from "redux-thunk";

const initialState = {};
const middleware = [thunk];

export default (props) => {
  return (
    <Provider
      store={createStore(
        reducers,
        initialState,
        applyMiddleware(...middleware)
      )}
    >
      {props.children}
    </Provider>
  );
};