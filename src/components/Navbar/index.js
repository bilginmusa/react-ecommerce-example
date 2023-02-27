import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import { useBasket } from '../../contexts/BasketContext';

function Navbar() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();

  return (
    <nav>
      <div className="left">
        <div className="logo">
          <Link to="/">eCommerce</Link>
        </div>

        <ul className="menu">
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>

      <div className="right">
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="/basket">
                <Button colorScheme="pink" variant="outline">
                  Basket ({items.length})
                </Button>
              </Link>
            )}

            {user?.role === 'admin' && (
              <Link to="/admin">
                <Button colorScheme="pink" variant="ghost">
                  Admin
                </Button>
              </Link>
            )}

            <Link to="/profile">
              <Button colorScheme="pink" variant="ghost">
                Profile
              </Button>
            </Link>
          </>
        )}

        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="pink" variant="ghost">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="pink" variant="solid">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
