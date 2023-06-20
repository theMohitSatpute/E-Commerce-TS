import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as userReducer from "../../../../redux/users/user.reducer";
import * as cartReducer from "../../../../redux/carts/cart.reducer";
import * as cartActions from "../../../../redux/carts/cart.action"
import { logOffAction } from "../../../../redux/users/user.reducer";
import { useSelector } from "react-redux";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from "../../../../redux/store";

const MainNavBar: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  //get user data from store
  const userReduxState: userReducer.InitialState = useSelector(
    (state: RootState) => {
      return state[userReducer.userFeatureKey];
    }
  );

  //get cart State from redux

  const cartReduxState: cartReducer.InitialState = useSelector(
    (state: RootState) => {
      return state[cartReducer.cartFeatureKey];
    }
  );

  const { user } = userReduxState;
  const { cart } = cartReduxState;

  //Logout
  const clickLogOff = () => {
    navigate("/");
    dispatch({
      type: `${logOffAction}`,
    });
  };

  useEffect(() => {
    dispatch(cartActions.getCartInfoAction())
  }, [])

  return (
    <>
      <Navbar bg="success" expand="lg" variant={"dark"}>
        <Container>
          <Navbar.Brand>
            <Link to={"/"} className="text-white text-decoration-none">
              React E-Commerce
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="">
              <Link to={"/products/fashion"} className="nav-link">
                Fashion
              </Link>
            </Nav>
            <Nav className="">
              <Link to={"/products/electronics"} className="nav-link">
                Electronics
              </Link>
            </Nav>
            <Nav className="">
              <Link to={"/products/household"} className="nav-link">
                Household
              </Link>
            </Nav>
            {
              user.isAdmin && <Nav>
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => navigate("/categories/add")}>
                    Add Categories
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/products/upload")}>
                    Upload Products
                  </NavDropdown.Item>
                  {
                    user.isAdmin && user.isSuperAdmin &&
                    <> <NavDropdown.Divider />
                      <NavDropdown.Item onClick={() => navigate("/products/admin")}>
                        Manage Products
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => navigate("/orders/admin")}>
                        Manage Orders
                      </NavDropdown.Item></>
                  }
                </NavDropdown>
              </Nav>
            }
            <div className="d-flex ms-auto">
              <Nav className="">
                {cart && (
                  <Link to={"/carts/list"} className="nav-link pe-3">
                    <i className="bi bi-cart-fill"></i>
                    <span className="cart-count">{cart.products.length}</span>
                  </Link>
                )}
              </Nav>
              {user && Object.keys(user).length > 0 && (
                <>
                  <Nav className="">
                    <Link to={"/products/fashion"} className="nav-link">
                      <img
                        src={user.imageUrl}
                        alt=""
                        className="rounded-circle"
                        width={25}
                        height={25}
                      />
                    </Link>
                  </Nav>

                  <Nav>
                    <NavDropdown title={user.username} id="basic-nav-dropdown">
                      <NavDropdown.Item
                        onClick={() => navigate("/users/profile")}
                      >
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => navigate("/users/change-password")}
                      >
                        Change Password
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        onClick={() => navigate("/users/orders/me")}
                      >
                        Your Orders
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={clickLogOff}>
                        <i className="bi bi-power"></i> LogOut
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default MainNavBar;
