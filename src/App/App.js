import React from 'react';
import firebase from 'firebase';
import 'firebase/auth';
import {
  BrowserRouter, Route, Redirect, Switch,
} from 'react-router-dom';
import connection from '../helpers/data/connection';
import Auth from '../components/pages/Auth/auth';
import Friends from '../components/pages/Friends/friends';
import NewFriend from '../components/pages/NewFriend/newFriend';
import EditFriend from '../components/pages/EditFriend/editFriend';
import Holidays from '../components/pages/Holidays/holidays';
import NewHoliday from '../components/pages/NewHoliday/newHoliday';
import EditHoliday from '../components/pages/EditHoliday/editHoliday';
import Home from '../components/pages/Home/home';
import MyNavbar from '../components/MyNavbar/myNavbar';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import authRequests from '../helpers/data/authRequests';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === false
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route { ...rest } render={props => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = props => (authed === true
    ? (<Component { ...props } />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route { ...rest } render={props => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    connection();
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false });
    };

    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
            <div className="row">
              <Switch>
                <PrivateRoute
                path="/"
                exact component={Home}
                authed={this.state.authed}
                />
                <PrivateRoute
                path="/friends/new"
                exact component={NewFriend}
                authed={this.state.authed}
                />
                <PrivateRoute
                path="/friends/:id/edit"
                exact component={EditFriend}
                authed={this.state.authed}
                />
                <PrivateRoute
                path="/friends"
                component={Friends}
                authed={this.state.authed}
                />
                <PrivateRoute
                path="/holidays/new"
                exact component={NewHoliday}
                authed={this.state.authed}
                />
                <PrivateRoute
                path="/holidays"
                component={Holidays}
                authed={this.state.authed}
                />
                <PrivateRoute
                path="/holidays/:id/edit"
                exact component={EditHoliday}
                authed={this.state.authed}
                />
                <PublicRoute
                path='/auth'
                component={Auth}
                authed={this.state.authed}
                />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
