import React, { useEffect, useRef, useState } from 'react';
import MainNavBar from '../../../layout/pages/navbar/MainNavBar';
import LayoutHeading from '../../../layout/components/LayoutHeading';
import * as productActions from "../../../../redux/products/product.action"
import * as productReducer from "../../../../redux/products/product.reducer"
import * as categoryReducer from "../../../../redux/categories/category.reducer";
import * as categoryActions from "../../../../redux/categories/category.action";
import { AppDispatch, RootState, useAppDispatch } from '../../../../redux/store';
import { useNavigate, useParams } from 'react-router-dom';
import SpinnerUI from '../../../ui/components/spinner/SpinnerUI';
import { useSelector } from 'react-redux';
import { IProductRequestView } from '../../models/IProductRequestView';
import { ICategoryView } from '../../../categories/models/ICategoriesView';
import { ISubCategoryView } from '../../../categories/models/ISubCategoryView';
import { ToastUtil } from '../../../../util/ToastUtil';
import { UploadImageWidget } from '../../../../util/UploadImageWidget';
import { Button, Col, Container, Form, Row } from "react-bootstrap";


const EditProduct: React.FC = () => {
    const dispatch: AppDispatch = useAppDispatch()
    const { productId } = useParams()
    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>();
    const navigate = useNavigate();

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

    //get product state from redux
    const productReduxState: productReducer.InitialState = useSelector((state: RootState) => {
        return state[productReducer.productFeatureKey]
    })

    // get all categories from redux
    const categoryReduxState: categoryReducer.InitialState = useSelector(
        (state: RootState) => {
            return state[categoryReducer.categoryFeatureKey];
        }
    );

    const { loading: categoryLoading, categories } = categoryReduxState;

    const { loading: productLoading, product: productRedux } = productReduxState

    useEffect(() => {
        dispatch(categoryActions.getAllCategoriesAction());
    }, []);

    useEffect(() => {
        if (productId) {


            dispatch(productActions.getProductAction({ productId: productId }))
        }
    }, [productId])

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

    useEffect(() => {
        if (productRedux && Object.keys(productRedux).length > 0) {
            setProduct({
                title: productRedux.title,
                imageUrl: productRedux.imageUrl,
                categoryId: productRedux.categoryObj?._id,
                subCategoryId: productRedux.subCategoryObj?._id,
                brand: productRedux.brand,
                price: productRedux.price,
                quantity: productRedux.quantity,
                description: productRedux.description,
            })
        }
    }, [productRedux])

    const onSelectCategory = (theCategoryId: string) => {
        setProduct({ ...product, categoryId: theCategoryId, subCategoryId: "" });
        const category: ICategoryView | undefined = categories.find(
            (category) => category._id === theCategoryId
        );
        if (category && category.subCategories) {
            setSubCategories(category.subCategories);
            setCategoryName(category.name);
        } else {
            setSubCategories([] as ISubCategoryView[]);
            setCategoryName("");
        }
    };

    useEffect(() => {
        if (product.categoryId) {
            onSelectCategory(product.categoryId)
        }
    }, [product.categoryId])

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
            if (productId && product && Object.keys(product).length > 0) {
                dispatch(productActions.updateProductAction({ product: product, productId: productId })).then(
                    (response: any) => {
                        if (response && !response.error) {
                            navigate(`/products/admin`);
                        }
                    }
                );
            }
        }
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };


    return (
        <>
            {(categoryLoading || productLoading) && <SpinnerUI />}
            <MainNavBar />
            <LayoutHeading heading={"Edit Product"} />
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
                                    <Form.Select name={'categoryId'} value={product.categoryId} onChange={(e) => onSelectCategory(e.target.value)}>
                                        <option value="">Select a Category</option>
                                        {categories.map((category) => {
                                            return (
                                                <option key={category._id} value={category._id}>{category.name}</option>
                                            );
                                        })}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Select value={product.subCategoryId} onChange={(e) => onSelectSubCategory(e)}>
                                        <option value="">Select a Sub Category</option>
                                        {subCategories.map((subCategory) => {
                                            return (
                                                <option key={subCategory._id} value={subCategory._id}>
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
    )
};
export default EditProduct;