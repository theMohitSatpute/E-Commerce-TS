import React, { useEffect, useState } from "react";
import MainNavBar from "../../../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../../../layout/components/LayoutHeading";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from "../../../../../redux/store";
import * as categoryActions from "../../../../../redux/categories/category.action";
import * as categoryReducer from "../../../../../redux/categories/category.reducer";
import * as productActions from "../../../../../redux/products/product.action";
import * as productReducer from "../../../../../redux/products/product.reducer";
import { useSelector } from "react-redux";
import SpinnerUI from "../../../../ui/components/spinner/SpinnerUI";
import { ICategoryView } from "../../../../categories/models/ICategoriesView";
import { IProductResponseView } from "../../../models/IProductResponseView";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ISubCategoryView } from "../../../../categories/models/ISubCategoryView";
import ProductSideBar from "../../../components/ProductSidebar";
import { addToCartAction } from "../../../../../redux/carts/cart.reducer";

const HouseholdCatalogue: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const [category, setCategory] = useState<ICategoryView>({} as ICategoryView);
  const [subCategories, setSubCategories] = useState<ISubCategoryView[]>(
    [] as ISubCategoryView[]
  );
  const [products, setProducts] = useState<IProductResponseView[]>(
    [] as IProductResponseView[]
  );
  const [filteredProducts, setFilteredProducts] = useState<
    IProductResponseView[]
  >([] as IProductResponseView[]);
  const [filterLoading, setFilterLoading] = useState<boolean>(false);

  //get all category from Redux
  const categoryReduxState: categoryReducer.InitialState = useSelector(
    (state: RootState) => {
      return state[categoryReducer.categoryFeatureKey];
    }
  );
  //get all products from Redux
  const productReduxState: productReducer.InitialState = useSelector(
    (state: RootState) => {
      return state[productReducer.productFeatureKey];
    }
  );

  const { loading: categoryLoading, categories: categoryRedux } =
    categoryReduxState;
  const { loading: productLoading, products: productsRedux } =
    productReduxState;

  useEffect(() => {
    dispatch(categoryActions.getAllCategoriesAction());
  }, []);

  //Get only fashion Category
  useEffect(() => {
    if (categoryRedux.length > 0) {
      const category: ICategoryView | undefined = categoryRedux.find((item) =>
        item.name.toLocaleLowerCase().trim().includes("household")
      );
      if (category) {
        if (category.subCategories) {
          setSubCategories(
            category.subCategories.map((sub) => {
              return {
                ...sub,
                isChecked: true,
              };
            })
          );
        }
        setCategory(category);
      }
    }
  }, [categoryRedux]);

  useEffect(() => {
    if (category && Object.keys(category).length > 0) {
      dispatch(
        productActions.getAllProductsWithCategoryIdAction({
          categoryId: category._id,
        })
      );
    }
  }, [category]);

  useEffect(() => {
    if (productsRedux && productsRedux.length > 0) {
      setProducts(productsRedux);
      setFilteredProducts(productsRedux);
    }
  }, [productsRedux]);

  const filterTheProducts = (subCategories: ISubCategoryView[]) => {
    let subs = subCategories
      .map((item) => {
        if (item.isChecked) {
          return item._id;
        }
      })
      .filter((item) => item !== undefined);
    setFilterLoading(true);
    setTimeout(() => {
      setFilteredProducts(
        products.filter((item) => subs.includes(item?.subCategoryObj?._id))
      );
      setFilterLoading(false);
    }, 500);
  };

  const clickAddToCart = (product: IProductResponseView) => {
    if (product) {
      dispatch({
        type: `${addToCartAction}`,
        payload: {
          product: product,
          count: 1,
        },
      });
    }
  };

  return (
    <>
      {(categoryLoading || productLoading || filterLoading) && <SpinnerUI />}
      <MainNavBar />
      <Container fluid>
        <Row>
          <Col xs={1}>
            <ProductSideBar
              subCategories={subCategories}
              setSubCategories={setSubCategories}
              filteredTheProducts={filterTheProducts}
            />
          </Col>
          <Col className="product-layout">
            <LayoutHeading heading={"Household Catalogue"} />
          </Col>
        </Row>
      </Container>

      {filteredProducts && filteredProducts.length > 0 && (
        <Container>
          <Row>
            {filteredProducts.map((product) => {
              return (
                <Col xs={3} key={product._id} className="mb-3 text-center ">
                  <Card>
                    <Card.Header className="household-products">
                      <Link
                        to={`/products/view/${category.name}/${product._id}`}
                      >
                        <img
                          src={product.imageUrl}
                          alt=""
                          width={180}
                          className="text-center m-auto d-block"
                          height={200}
                        />
                      </Link>
                    </Card.Header>
                    <Card.Body>
                      <small className="fw-bold text-success">
                        {product.title}
                      </small>
                      <br />
                      <small className="fw-bold text-danger">
                        &#8377; {Number(product.price).toFixed(2)}
                      </small>
                      <br />
                      <Button variant={"warning"} size={"sm"} onClick={() => clickAddToCart(product)}>
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}
      {filteredProducts.length === 0 && <small>No product</small>}
    </>
  );
};

export default HouseholdCatalogue;
