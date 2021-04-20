import * as React from "react"
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  },
}

const Navigation = () => {
  return (
    <div className="navigation">
      This is our navigation.
      <AuthButton />

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>
      </ul>
    </div>);
};

const Home = () => {
  return (
    <div className="page home">
      <h3>This is the Home page.</h3>
    </div>
  );
};

const Notifications = () => {
  return (
    <div className="page notifications">
      <h3>Notifications</h3>
    </div>);
};

function Login() {
  const [
    redirectToReferrer,
    setRedirectToReferrer,
  ] = React.useState(false);

  const { state } = useLocation();

  const login = () => fakeAuth.authenticate(() => {
    setRedirectToReferrer(true)
  })

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <div>
      <p>You must log in to view the page</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route {...rest} render={({ location }) => {
      return fakeAuth.isAuthenticated === true
        ? children
        : <Redirect to={{
          pathname: '/login',
          state: { from: location }
        }} />
    }} />
  )
}

function AuthButton () {
  const history = useHistory()

  return fakeAuth.isAuthenticated === true
    ? <p>
      Welcome! <button onClick={() => {
      fakeAuth.signout(() => history.push('/'))
    }}>Sign out</button>
    </p>
    : <p>You are not logged in.</p>
}

export default function App() {
  return (
    <Router>
      <div>


        <Route exact path="/">
          <Navigation />
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/notifications">
          <Navigation />
          <Notifications />
        </PrivateRoute>
      </div>
    </Router>
  )
}
