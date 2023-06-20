import React, { useEffect, useRef, useState } from "react";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import * as categoryReducer from "../../../../redux/categories/category.reducer";
import * as categoryActions from "../../../../redux/categories/category.action";
import * as productActions from "../../../../redux/products/product.action";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from "../../../../redux/store";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import { useSelector } from "react-redux";
import { ICategoryView } from "../../../categories/models/ICategoriesView";
import { ISubCategoryView } from "../../../categories/models/ISubCategoryView";
import { IProductRequestView } from "../../models/IProductRequestView";
import { UploadImageWidget } from "../../../../util/UploadImageWidget";
import { ToastUtil } from "../../../../util/ToastUtil";
import { useNavigate } from "react-router-dom";

const UploadProduct: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  const [validated, setValidated] = useState(false);
  const [product, setProduct] = useState<IProductRequestView>({
    title: "",
    imageUrl: "",
    categoryId: "",
    subCategoryId: "",
    brand: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [subCategories, setSubCategories] = useState<ISubCategoryView[]>(
    [] as ISubCategoryView[]
  );
  const [categoryName, setCategoryName] = useState<string>("");

  // get all categories from redux
  const categoryReduxState: categoryReducer.InitialState = useSelector(
    (state: RootState) => {
      return state[categoryReducer.categoryFeatureKey];
    }
  );

  const { loading, categories } = categoryReduxState;

  useEffect(() => {
    dispatch(categoryActions.getAllCategoriesAction());
  }, []);

  useEffect(() => {
    UploadImageWidget.upload(cloudinaryRef, widgetRef)
      .then((imageUrl) => {
        if (imageUrl) {
          setProduct({ ...product, imageUrl: imageUrl.toString() });
        }
      })
      .catch((error) => {
        ToastUtil.displayErrorMessage(error);
      });
  }, []);

  const onSelectCategory = (e: React.ChangeEvent | any) => {
    setProduct({ ...product, categoryId: e.target.value, subCategoryId: "" });
    const category: ICategoryView | undefined = categories.find(
      (category) => category._id === e.target.value
    );
    if (category && category.subCategories) {
      setSubCategories(category.subCategories);
      setCategoryName(category.name);
    } else {
      setSubCategories([] as ISubCategoryView[]);
      setCategoryName("");
    }
  };

  const onSelectSubCategory = (e: React.ChangeEvent | any) => {
    setProduct({ ...product, subCategoryId: e.target.value });
  };

  const updateInput = (e: React.ChangeEvent | any) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const clickUploadImage = () => {
    widgetRef.current.open();
  };

  const handleSubmit = (event: React.FormEvent | any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(productActions.createProductAction({ product: product })).then(
        (response: any) => {
          if (response && !response.error) {
            navigate(`/products/${categoryName.toLowerCase()}`);
          }
        }
      );
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <>
      {loading && <SpinnerUI />}
      <MainNavBar />
      <LayoutHeading heading={"Upload Product"} />
      {categories && categories.length > 0 && (
        <Container>
          <Row>
            <Col xs={4}>
              <Form
                className="mt-3"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-2">
                  <Button variant={"warning"} onClick={clickUploadImage}>
                    Upload image
                  </Button>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Select onChange={(e) => onSelectCategory(e)}>
                    <option value="">Select a Category</option>
                    {categories.map((category) => {
                      return (
                        <option value={category._id}>{category.name}</option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Select onChange={(e) => onSelectSubCategory(e)}>
                    <option value="">Select a Sub Category</option>
                    {subCategories.map((subCategory) => {
                      return (
                        <option value={subCategory._id}>
                          {subCategory.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    required
                    value={product.title}
                    name={"title"}
                    onChange={(e) => updateInput(e)}
                    type={"text"}
                    placeholder={"Title"}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Control
                    required
                    value={product.brand}
                    name={"brand"}
                    onChange={(e) => updateInput(e)}
                    type={"text"}
                    placeholder={"Brand"}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    required
                    value={product.price}
                    name={"price"}
                    onChange={(e) => updateInput(e)}
                    type={"number"}
                    placeholder={"Price"}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    required
                    value={product.quantity}
                    name={"quantity"}
                    onChange={(e) => updateInput(e)}
                    type={"number"}
                    placeholder={"Quantity"}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    required
                    value={product.description}
                    name={"description"}
                    onChange={(e) => updateInput(e)}
                    as="textarea"
                    rows={3}
                    placeholder={"description"}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Button variant={"success"} type={"submit"}>
                    Upload Product
                  </Button>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={3}>
              <img
                src={product.imageUrl}
                alt=""
                className="img-fluid shadow-lg rounded-3"
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default UploadProduct;
