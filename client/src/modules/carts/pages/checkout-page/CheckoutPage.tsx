import React, { useEffect } from "react";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import * as userActions from "../../../../redux/users/user.action"
import * as userReducer from "../../../../redux/users/user.reducer"
import * as cartAction from "../../../../redux/carts/cart.action"
import * as cartReducer from "../../../../redux/carts/cart.reducer"
import * as orderActions from "../../../../redux/orders/order.action"
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import { useSelector } from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import { Card, Col, Container, ListGroup, ListGroupItem, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CartReduxHelper } from "../../../../redux/carts/cartReduxHelper";
import { IOrderRequestView } from "../../../orders/models/IOrderRequestView";
import { clearCartAction } from "../../../../redux/carts/cart.reducer";

const CheckoutPage: React.FC = () => {

  const navigate = useNavigate()

  const dispatch: AppDispatch = useAppDispatch()

  //get address info from redux
  const userReduxState: userReducer.InitialState = useSelector((state: RootState) => {
    return state[userReducer.userFeatureKey]
  })

  //get address info from redux
  const cartReduxState: cartReducer.InitialState = useSelector((state: RootState) => {
    return state[cartReducer.cartFeatureKey]
  })

  const { loading: userLoading, address } = userReduxState
  const { loading: cartLoading, cart } = cartReduxState

  useEffect(() => {
    dispatch(userActions.getMyAddressAction())
    dispatch(cartAction.getCartInfoAction())
  }, [])

  const clickPlaceOrder = () => {
    const order: IOrderRequestView = {
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
      paymentType: "COD"
    } as IOrderRequestView;
    dispatch(orderActions.placeOrderAction({ order: order })).then((response: any) => {
      if (response && !response.error) {
        navigate("/orders/placed");
        dispatch({
          type: `${clearCartAction}`
        });
      }
    });
  };

  return (
    <>
      {(userLoading || cartLoading) && <SpinnerUI />}
      <MainNavBar />
      <LayoutHeading heading={"Check Out Page"} />


      <Container>
        <Row>
          <Col xs={8}>
            <Card className="shadow-lg">
              <Card.Header className="bg-success text-white d-flex justify-content-between">
                <h4>Shipping Address</h4>
                <Link to={`/users/edit-shipping-address/${address._id}?router=checkout`}>
                  <Button variant={'primary'}>
                    <i className="bi bi-pencil"></i>
                  </Button>
                </Link>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  <ListGroupItem>Name :
                    <span className="fw-bold"> {address.name} </span>
                  </ListGroupItem>
                  <ListGroupItem>Email : <span className="fw-bold"> {address.email} </span> </ListGroupItem>
                  <ListGroupItem>Flat : <span className="fw-bold"> {address.flat} </span></ListGroupItem>
                  <ListGroupItem>Street : <span className="fw-bold"> {address.street} </span> </ListGroupItem>
                  <ListGroupItem>Landmark : <span className="fw-bold"> {address.landmark} </span> </ListGroupItem>
                  <ListGroupItem>City : <span className="fw-bold"> {address.city} </span> </ListGroupItem>
                  <ListGroupItem>State : <span className="fw-bold"> {address.state} </span> </ListGroupItem>
                  <ListGroupItem>Country : <span className="fw-bold"> {address.country} </span> </ListGroupItem>
                  <ListGroupItem>PinCode : <span className="fw-bold"> {address.pinCode} </span> </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={4}>
            <Card className="shadow-lg">
              <Card.Header className="bg-success text-white">
                <h4>Your Cart</h4>
              </Card.Header>
              <Card.Body className="bg-light-grey">
                <ListGroup>
                  {
                    cart.products && cart.products.map((item, index) => {
                      return (
                        <ListGroupItem key={item._id}>
                          <Row>
                            <Col xs={3} >
                              <img src={item.imageUrl} alt="" width={100} height={100} className="img-fluid" />
                            </Col>
                            <Col xs={9} >
                              <small>{item.title}</small><br />
                              <small> Count : {item.count}</small><br />
                              <small>price
                                : &#8377; {Number(item.price).toFixed(2)}</small>
                            </Col>
                          </Row>
                        </ListGroupItem>
                      )
                    })
                  }
                </ListGroup>
                <ListGroup className="mt-2">
                  <ListGroupItem>Total
                    : <span
                      className="fw-bold">
                      &#8377; {CartReduxHelper.calculateTotal(cart.products).toFixed(2)}</span></ListGroupItem>
                  <ListGroupItem>Tax : <span className="fw-bold">
                    &#8377; {CartReduxHelper.calculateTax(cart.products).toFixed(2)}
                  </span></ListGroupItem>
                  <ListGroupItem>Grand Total : <span className="fw-bold">
                    &#8377; {CartReduxHelper.calculateGrandTotal(cart.products).toFixed(2)}
                  </span></ListGroupItem>
                </ListGroup>

                <div className="d-grid">
                  <Button variant={'warning'} className="mt-2" onClick={clickPlaceOrder}>Place
                    Order</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default CheckoutPage;
