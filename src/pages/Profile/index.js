import { Button } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

function Profile({ history }) {
  const { user, logout, loggedIn } = useAuth();

  console.log(loggedIn);

  const handleLogout = () => {
    logout(() => {
      history.push('/');
    });
  };

  return (
    <div>
      <h1>Profile</h1>
      {JSON.stringify(user)}

      <br />
      <br />

      <Button colorScheme="pink" variant="solid" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

export default Profile;
