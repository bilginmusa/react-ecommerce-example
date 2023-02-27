import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ component: Component, admin, ...rest }) => {
  const { loggedIn, user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (admin && user.role !== 'admin') {
          return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
        }

        if (loggedIn) {
          return <Component {...props} />;
        }

        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }}
    />
  );
};

export default ProtectedRoute;
