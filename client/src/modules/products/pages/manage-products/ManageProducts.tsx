import React, { useEffect } from "react";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import * as productActions from "../../../../redux/products/product.action"
import * as productReducer from "../../../../redux/products/product.reducer"
import { AppDispatch, RootState, useAppDispatch } from "../../../../redux/store";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import { useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ManageProduct: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch()

  //get product state from redux
  const productReduxState: productReducer.InitialState = useSelector((state: RootState) => {
    return state[productReducer.productFeatureKey]
  })

  const { loading, products } = productReduxState

  useEffect(() => {
    dispatch(productActions.getAllProductsAction())
  }, [])

  const clickDeliteProduct = (productId: string | undefined) => {
    if (productId) {
      dispatch(productActions.deleteProductAction({ productId: productId })).then((response: any) => {
        if (response && !response.error) {
          dispatch(productActions.getAllProductsAction())
        }
      })
    }
  }

  return (
    <>
      {loading && <SpinnerUI />}
      <MainNavBar />
      <LayoutHeading heading={"Manage Product"} />
      {
        products && products.length > 0 &&
        <Container>
          <Row>
            <Col>
              <Table striped hover className="text-center shadow">
                <thead className="bg-success text-white">
                  <tr>
                    <th>SNO</th>
                    <th>product Id</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    products.map((product, index) => {
                      return (
                        <tr key={product._id}>
                          <td> {index + 1} </td>
                          <td> {product._id.substring(product._id.length - 5).toUpperCase()} </td>
                          <td><img src={product.imageUrl} alt="" width={50} height={50} /></td>
                          <td> {product.title} </td>
                          <td> {product.brand} </td>
                          <td> &#8377; {Number(product.price).toFixed(2)} </td>
                          <td> {product.quantity} </td>
                          <td>
                            <Link to={`/products/edit/${product._id}`}>
                              <Button variant={'primary'}>
                                <i className="bi bi-pencil-square"></i>
                              </Button>
                            </Link>
                            <Button
                              onClick={() => clickDeliteProduct(product._id)}
                              variant={"danger"}
                              className="ms-2"
                            ><i className="bi bi-trash-fill"></i></Button>
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
      }
    </>
  );
};

export default ManageProduct;
