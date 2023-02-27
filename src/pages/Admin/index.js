import "./styles.css";
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";

// pages
import Home from "./Home";
import Orders from "./Orders";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import NewProduct from "./NewProduct";

function Admin() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to={`${url}`}>Home</Link>
          </li>
          <li>
            <Link to={`${url}/orders`}>Orders</Link>
          </li>
          <li>
            <Link to={`${url}/products`}>Products</Link>
          </li>
        </ul>
      </nav>

      <div style={{ padding: 10 }}>
        <Switch>
          <Route exact path={path} component={Home} />
          <Route path={`${path}/orders`} component={Orders} />
          <Route path={`${path}/products`} exact component={Products} />
          <Route path={`${path}/products/new`} component={NewProduct} />
          <Route
            path={`${path}/products/:product_id`}
            component={ProductDetail}
          />
        </Switch>
      </div>
    </div>
  );
}

export default Admin;
