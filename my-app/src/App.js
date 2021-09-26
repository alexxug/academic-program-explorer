import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Drawer from './components/Drawer/index';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUnits } from './actions/unit'


const App = () => {

  useEffect(() => {
    // check for token in LS
    // if (localStorage.token) {
    //   setAuthToken(localStorage.token);
    // }
    // store.dispatch(loadUser());
    store.dispatch(loadUnits());

    // log user out from all tabs if they log out in one tab
    //   window.addEventListener('storage', () => {
    //     if (!localStorage.token) store.dispatch({ type: LOGOUT });
    //   });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Drawer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;