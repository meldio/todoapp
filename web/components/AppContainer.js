import {createHashHistory} from 'history';
import { IndexRoute, Route } from 'react-router';
import React from 'react';
import { RelayRouter } from 'react-router-relay';
import TodoApp from './TodoApp';
import TodoList from './TodoList';
import Login from './Login';
import ViewerQueries from '../queries/ViewerQueries';
import meldio from '../meldio';

class AppContainer extends React.Component {
  state = {
    isLoggedIn: meldio.isLoggedIn()
  };

  componentWillMount() {
    this.loginListener = meldio.addListener('login', () =>
      this.setState({ isLoggedIn: true }));
    this.logoutListener = meldio.addListener('logout', () =>
      this.setState({ isLoggedIn: false }));
  }

  componentWillUnmount() {
    this.loginListener.remove();
    this.logoutListener.remove();
  }

  render() {
    if (!this.state.isLoggedIn) {
      return <Login/>;
    }

    return (
      <RelayRouter history={createHashHistory({queryKey: false})}>
        <Route
          path="/" component={TodoApp}
          queries={ViewerQueries}>
          <IndexRoute
            component={TodoList}
            queries={ViewerQueries}
            prepareParams={() => ({status: 'any'})}
          />
          <Route
            path=":status" component={TodoList}
            queries={ViewerQueries}
          />
        </Route>
      </RelayRouter>
    );
  }
}

export default AppContainer;
