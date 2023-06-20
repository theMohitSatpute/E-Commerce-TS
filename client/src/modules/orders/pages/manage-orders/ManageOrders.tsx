import React, { useEffect, useState } from "react";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import * as orderActions from "../../../../redux/orders/order.action"
import * as orderReducer from "../../../../redux/orders/order.reducer"
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import { useSelector } from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import { Badge, Col, Container, ListGroup, ListGroupItem, Row, Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { OrderReduxHelper } from "../../../../redux/orders/OrderReduxHelper";
import NoProducts from "../../../ui/components/no-product/NoProducts";

const ManageOrder: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const [orderStatus, setOrderStatus] = useState<string>("")
  const [orderId, setOrderId] = useState<string>("")

  //get order from redux
  const orderReduxState: orderReducer.InitialState = useSelector((state: RootState) => {
    return state[orderReducer.orderFeatureKey]
  })

  const { loading, orders: orderRedux } = orderReduxState

  useEffect(() => {
    dispatch(orderActions.getAllOrdersAction())
  }, [])

  const updateInput = (event: React.ChangeEvent | any, orderId: string) => {
    setOrderStatus(event.target.value)
    setOrderId(orderId)
  }

  const updateOrderStatus = (eachOrderId: string) => {
    if (eachOrderId === orderId && orderStatus !== "") {
      dispatch(orderActions.updateOrderStatusAction({ orderStatus: orderStatus, orderId: eachOrderId })).then((response: any) => {
        if (response && !response.error) {
          dispatch(orderActions.getAllOrdersAction())
        }
      })
    }
  }


  return (
    <>
      {loading && <SpinnerUI />}
      <MainNavBar />
      <LayoutHeading heading={"Manage Orders"} />
      <Container>
        <Row>
          <Col xs={12} >
            <Table striped hover className="text-center shadow-lg">
              <thead className="bg-success text-white">
                <tr>
                  <th>Order Number</th>
                  <th>OrderDetails</th>
                  <th>Order Placed On</th>
                  <th>Order By</th>
                  <th>Total Amount</th>
                  <th>Payment Type</th>
                  <th>Order Status</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  orderRedux.map(order => {
                    return (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>
                          {
                            <ListGroup>
                              {
                                order.products.map(item => {
                                  return (
                                    <ListGroupItem key={item._id}>
                                      <Row>
                                        <Col xs={2}>
                                          <img src={item?.imageUrl} alt="" width={25} height={25} />
                                        </Col>
                                        <Col xs={8} >
                                          <Link
                                            className="text-decoration-none text-success"
                                            to={`/products/view/Fashion/${item._id}`}>{item.title}</Link>
                                        </Col>
                                      </Row>
                                    </ListGroupItem>
                                  )
                                })
                              }
                            </ListGroup>
                          }
                        </td>
                        <td>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                        <td>{order.orderBy?.username}</td>
                        <td>&#8377; {Number(order.grandTotal).toFixed(2)}</td>
                        <td>{order.paymentType}</td>
                        <td className="fw-bold">
                          {
                            order.orderStatus === "Order Placed" &&
                            <Badge bg={'info'}>{order.orderStatus}</Badge>
                          }
                          {
                            order.orderStatus === "Processing" &&
                            <Badge bg={'primary'}>{order.orderStatus}</Badge>
                          }
                          {
                            order.orderStatus === "Dispatched" &&
                            <Badge bg={'success'}>{order.orderStatus}</Badge>
                          }
                          {
                            order.orderStatus === "Delivered" &&
                            <Badge bg={'warning'}>{order.orderStatus}</Badge>
                          }
                          {
                            order.orderStatus === "Cancelled" &&
                            <Badge bg={'danger'}>{order.orderStatus}</Badge>
                          }
                          {
                            order.orderStatus === "Completed" &&
                            <Badge bg={'success'}>{order.orderStatus}</Badge>
                          }
                        </td>
                        <td>
                          <Form.Select disabled={order.orderStatus === 'completed'}
                            onChange={e => updateInput(e, order._id)}
                          >
                            <option value="">Select Status</option>
                            {
                              OrderReduxHelper.getOrderStatusList().map((item, index) => {
                                return (
                                  <option key={index} value={item}> {item} </option>
                                )
                              })
                            }
                          </Form.Select>
                        </td>
                        <td>
                          <Button variant={'warning'} onClick={() => updateOrderStatus(order._id)} >Update</Button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <>:</>
      <NoProducts />
    </>
  );
};

export default ManageOrder;
