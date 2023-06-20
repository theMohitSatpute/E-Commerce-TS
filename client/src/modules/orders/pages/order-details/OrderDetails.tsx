import React, { useEffect, useState } from "react";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import * as orderReducer from "../../../../redux/orders/order.reducer"
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import { useSelector } from "react-redux";
import { Col, Container, ListGroup, Row, Button } from "react-bootstrap";
import orderImg from "../../../../assets/img/order-success.png"
import { ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderDetails: React.FC = () => {

  //get order from redux
  const orderReduxState: orderReducer.InitialState = useSelector((state: RootState) => {
    return state[orderReducer.orderFeatureKey]
  })

  const { loading, order } = orderReduxState




  return (
    <>
      {loading && <SpinnerUI />}
      <MainNavBar />
      <LayoutHeading heading={"Order Details"} />
      <Container className="mt-3 " >
        <Row >
          <Col xs={3} >
            <img src={orderImg} alt="" className="rounded-circle img-fluid" />
          </Col>
          <Col xs={8} >


            <ListGroup className="shadow-lg">
              <ListGroupItem className="text-success "><h5>Order is placed Successfully</h5></ListGroupItem>
              <ListGroupItem>Order Number : <span className="fw-bold"> {order._id.toUpperCase()} </span> </ListGroupItem>
              <ListGroupItem>Total Amount : <span className="fw-bold">{Number(order.grandTotal).toFixed(2)}</span>  </ListGroupItem>
              <ListGroupItem>Order Status : <span className="fw-bold">{order.orderStatus}</span>  </ListGroupItem>
              <ListGroupItem>Payment Mode : <span className="fw-bold">{order.paymentType}</span></ListGroupItem>
            </ListGroup>
            <Link to={'/products/fashion'}>

              <Button variant={'warning'} className=" mt-3">Continue Shopping</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderDetails;
