import React, { useEffect } from "react";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import { useParams } from "react-router-dom";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from "../../../../redux/store";
import * as productActions from "../../../../redux/products/product.action";
import * as productReducer from "../../../../redux/products/product.reducer";
import { useSelector } from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { addToCartAction } from "../../../../redux/carts/cart.reducer";
import { IProductResponseView } from "../../models/IProductResponseView";

const ViewProduct: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const { productId, category } = useParams();

  //get product from Redux
  const productReduxState: productReducer.InitialState = useSelector(
    (state: RootState) => {
      return state[productReducer.productFeatureKey];
    }
  );
  const { loading, product } = productReduxState;

  useEffect(() => {
    if (productId) {
      dispatch(productActions.getProductAction({ productId: productId }));
    }
  }, [productId]);

  const clickAddToCart = (product: IProductResponseView) => {
    if (productId) {
      dispatch({
        type: `${addToCartAction}`,
        payload: {
          product: product
        }
      })
    }
  }

  return (
    <div>
      {loading && <SpinnerUI />}
      <MainNavBar />
      <LayoutHeading heading={"View Product"} />
      <Container>
        <Row>
          <Col xs={6}>
            <ListGroup>
              <ListGroupItem>
                Name : <span className="fw-bold">{product.title}</span>
              </ListGroupItem>
              <ListGroupItem>
                Brand : <span className="fw-bold">{product.brand}</span>
              </ListGroupItem>
              <ListGroupItem>
                Category :{" "}
                <span className="fw-bold">{product.categoryObj?.name}</span>
              </ListGroupItem>
              <ListGroupItem>
                Sub Category :{" "}
                <span className="fw-bold">{product.subCategoryObj?.name}</span>
              </ListGroupItem>
              <ListGroupItem>
                Price :{" "}
                <span className="fw-bold">&#8377; {product.price}/-</span>
              </ListGroupItem>
              <ListGroupItem>
                Description :{" "}
                <span className="fw-bold">{product.description}</span>
              </ListGroupItem>
            </ListGroup>
            <Button variant={'warning'} className="mt-2" onClick={() => clickAddToCart(product)} >Add to Cart</Button>
          </Col>
          <Col xs={4}>
            <img
              src={product.imageUrl}
              alt=""
              className="img-fluid rounded-3 shadow-lg w-75"
            />
            <div>
              <Link
                to={`/products/${category?.toLowerCase()}`}
                className="btn btn-warning mt-3"
              >
                <i className="bi bi-arrow-left-circle-fill"></i>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewProduct;

