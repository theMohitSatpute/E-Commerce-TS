import React, { useEffect, useState } from "react";
import MainNavBar from "../../layout/pages/navbar/MainNavBar";
import LayoutHeading from "../../layout/components/LayoutHeading";
import {
  Col,
  Container,
  Form,
  Row,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Button } from "react-bootstrap";
import { AppDispatch, RootState, useAppDispatch } from "../../../redux/store";
import * as categoryReducer from "../../../redux/categories/category.reducer";
import * as categoryActions from "../../../redux/categories/category.action";
import { useSelector } from "react-redux";
import SpinnerUI from "../../ui/components/spinner/SpinnerUI";
import { ISubCategoryView } from "../models/ISubCategoryView";
import { ICategoryView } from "../models/ICategoriesView";

const AddCategory: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const [validated, setValidated] = useState(false);
  const [subCategories, setSubCategories] = useState<ISubCategoryView[]>(
    [] as ISubCategoryView[]
  );
  const [categoryId, setCategoryId] = useState<string>("");
  const [subCategory, setSubCategory] = useState<ISubCategoryView>({
    name: "",
    description: "",
  });

  const updateInput = (event: React.ChangeEvent<HTMLInputElement | any>) => {
    setSubCategory({
      ...subCategory,
      [event.target.name]: event.target.value,
    });
  };

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

  const onSelectCategory = (e: React.ChangeEvent | any) => {
    setCategoryId(e.target.value);
    const category: ICategoryView | undefined = categories.find(
      (category) => category._id === e.target.value
    );
    if (category && category.subCategories) {
      setSubCategories(category.subCategories);
    }
  };
  //Form validation
  const handleSubmit = (event: React.FormEvent | any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(
        categoryActions.createSubCategoryAction({
          subCategory: subCategory,
          categoryId: categoryId,
        })
      ).then((response: any) => {
        if (response && !response.error) {
          dispatch(categoryActions.getAllCategoriesAction());
          setCategoryId("");
          setSubCategory({
            name: "",
            description: "",
          });
        }
      });
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
      <LayoutHeading heading={"Add Sub Category"} />
      {categories && categories.length > 0 && (
        <Container>
          <Row>
            <Col xs={4}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                  <Form.Control
                    required
                    value={subCategory.name}
                    onChange={(e) => updateInput(e)}
                    name={"name"}
                    type={"text"}
                    placeholder={"Subcategory Name"}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    required
                    value={subCategory.description}
                    onChange={(e) => updateInput(e)}
                    name={"description"}
                    as="textarea"
                    rows={3}
                    placeholder={"Description"}
                  ></Form.Control>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Button variant={"success"} type={"submit"}>
                    Create
                  </Button>
                </Form.Group>
              </Form>
            </Col>
            <Col xs={4}>
              <Card>
                <Card.Header>
                  <p className="h6">Available Sub-Categories</p>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    {subCategories.map((subCategory) => {
                      return (
                        <ListGroupItem key={subCategory._id}>
                          {subCategory.name}
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
export default AddCategory;
