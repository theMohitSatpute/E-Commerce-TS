import React from "react";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import * as cartReducer from "../../../../redux/carts/cart.reducer";
import * as cartActions from "../../../../redux/carts/cart.action";
import { incrementQuantityAction, decrementQuantityAction, deleteCartItemAction } from "../../../../redux/carts/cart.reducer";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import { CartReduxHelper } from "../../../../redux/carts/cartReduxHelper";
import { useNavigate } from "react-router-dom";
import { ICartRequestView } from "../../models/ICartRequestView";
const CartPage: React.FC = () => {

  const dispatch: AppDispatch = useAppDispatch()
  const navigate = useNavigate()


  //get cart State from redux
  const cartReduxState: cartReducer.InitialState = useSelector(
    (state: RootState) => {
      return state[cartReducer.cartFeatureKey];
    }
  );
  const { loading, cart } = cartReduxState;



  const clickIncrementQty = (productId: string | undefined) => {
    if (productId) {
      dispatch({
        type: `${incrementQuantityAction}`,
        payload: {
          productId: productId
        }
      })
    }
  }

  const clickDecrementQty = (productId: string | undefined) => {
    if (productId) {
      dispatch({
        type: `${decrementQuantityAction}`,
        payload: {
          productId: productId
        }
      })
    }
  }

  const clickDeleteItem = (productId: string | undefined) => {
    if (productId) {
      dispatch({
        type: `${deleteCartItemAction}`,
        payload: {
          productId: productId
        }
      })
    }
  }

  const clickCheckOutToServer = () => {
    const cartPayload: ICartRequestView = {
      products: cart.products.map(product => {
        return {
          productObj: product._id,
          count: product.count.toString(),
          price: product.price
        }
      }),
      tax: CartReduxHelper.calculateTax(cart.products).toString(),
      total: CartReduxHelper.calculateTotal(cart.products).toString(),
      grandTotal: CartReduxHelper.calculateGrandTotal(cart.products).toString(),
    };
    dispatch(cartActions.createCartAction({ cart: cartPayload })).then((response: any) => {
      if (response && !response.error) {
        navigate("/carts/checkout");
      }
    });
  };


  return (
    <>
      {loading && <SpinnerUI />}
      <MainNavBar />
      <LayoutHeading heading={" Cart Page "} />
      <Container className="mt-3">
        <Row>
          <Col xs={8}>
            <Card className="shadow-lg ">
              <Card.Header className="bg-success text-white rounded-3">
                <p className="h4">Cart Items</p>
              </Card.Header>
              <Card.Body className="bg-light-grey ">
                <Table striped hover className="text-center ">
                  <thead className="bg-warning ">
                    <tr>
                      <th>SNO</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart &&
                      cart.products &&
                      cart.products.map((product, index) => {
                        return (
                          <tr key={product._id}>
                            <td>{index + 1}</td>
                            <td>
                              <img
                                src={product.imageUrl}
                                alt=""
                                width={50}
                                height={50}
                              />
                            </td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>
                              <i className="bi bi-dash-circle-fill text-danger me-1 hover:pointer" onClick={() => clickDecrementQty(product._id)}></i>
                              {product.count}
                              <i className="bi bi-plus-circle-fill text-success ms-1 hover-pointer" onClick={() => clickIncrementQty(product._id)}></i>
                            </td>
                            <td>
                              &#8377;{Number(product.price) * product.count}
                            </td>
                            <td>
                              <Button className="hower:pointer" variant={"danger"}
                                onClick={() => clickDeleteItem(product._id)}>
                                <i className="bi bi-trash-fill"></i>
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card className="shadow-lg">
              <Card.Header className="bg-success text-white rounded-3">
                <p className="h4">Cart Total</p>
              </Card.Header>
              <Card.Body className="bg-light-grey">
                <ListGroup>
                  <ListGroupItem>
                    Total : <span className="fw-bold">&#8377; {CartReduxHelper.calculateTotal(cart.products).toFixed(2)} </span>
                  </ListGroupItem>
                </ListGroup>
                <ListGroup>
                  <ListGroupItem>
                    Tax : <span className="fw-bold">&#8377; {CartReduxHelper.calculateTax(cart.products).toFixed(2)} </span>
                  </ListGroupItem>
                </ListGroup>
                <ListGroup>
                  <ListGroupItem>
                    Grand Total : <span className="fw-bold">&#8377; {CartReduxHelper.calculateGrandTotal(cart.products).toFixed(2)} </span>
                  </ListGroupItem>
                </ListGroup>
                <div className="d-grid gap-2 mt-3">
                  <Button variant="warning" onClick={clickCheckOutToServer}>Checkout</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default CartPage;
