import React, { useEffect, useState } from "react";
import * as userActions from "../../../../redux/users/user.action";
import * as userReducer from "../../../../redux/users/user.reducer";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from "../../../../redux/store";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { IAddressView } from "../../../addresses/models/IAddressView";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import { useSelector } from "react-redux";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";

const EditShippingAddress: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [address, setAddress] = useState<IAddressView>({
    mobile: "",
    flat: "",
    landmark: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  });

  const updateInput = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };
  //get user data from store
  const userReduxState: userReducer.InitialState = useSelector(
    (state: RootState) => {
      return state[userReducer.userFeatureKey];
    }
  );

  const { address: reduxAddress, loading } = userReduxState;

  const { addressId } = useParams();

  useEffect(() => {
    dispatch(userActions.getMyAddressAction());
  }, [addressId]);

  useEffect(() => {
    if (reduxAddress && Object.keys(reduxAddress).length > 0) {
      setAddress({
        mobile: reduxAddress.mobile,
        flat: reduxAddress.flat,
        landmark: reduxAddress.landmark,
        street: reduxAddress.street,
        city: reduxAddress.city,
        state: reduxAddress.state,
        country: reduxAddress.country,
        pinCode: reduxAddress.pinCode,
      });
    }
  }, [reduxAddress]);

  // Form Validation(if not enter name or email or password then it will show error)(copy from React Bootstrap)
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent | any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(
        userActions.updateAddressAction({
          address: address,
          addressId: addressId,
        })
      ).then((response: any) => {
        if (response && !response.error) {
          navigateBackToPreviousPage();
        }
      });
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const navigateBackToPreviousPage = () => {
    const page = searchParams.get('router');
    if (page === "checkout") {
      navigate("/carts/checkout");
    }
    if (page === "profile") {
      navigate("/users/profile");
    }
  };


  return (
    <>
      {loading && <SpinnerUI />}
      <MainNavBar />
      <LayoutHeading heading={"Edit Shipping Address"} />
      <Container>
        <Row>
          <Col xs={4}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  value={address.mobile}
                  name={"mobile"}
                  onChange={(e) => updateInput(e)}
                  type={"number"}
                  placeholder={"Mobile"}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  value={address.flat}
                  name={"flat"}
                  onChange={(e) => updateInput(e)}
                  type={"text"}
                  placeholder={"Flat"}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  value={address.landmark}
                  name={"landmark"}
                  onChange={(e) => updateInput(e)}
                  type={"text"}
                  placeholder={"Landmark"}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  value={address.street}
                  name={"street"}
                  onChange={(e) => updateInput(e)}
                  type={"text"}
                  placeholder={"Street"}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  value={address.city}
                  name={"city"}
                  onChange={(e) => updateInput(e)}
                  type={"text"}
                  placeholder={"City"}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  value={address.state}
                  name={"state"}
                  onChange={(e) => updateInput(e)}
                  type={"text"}
                  placeholder={"State"}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  value={address.country}
                  name={"country"}
                  onChange={(e) => updateInput(e)}
                  type={"text"}
                  placeholder={"Country"}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  value={address.pinCode}
                  name={"pinCode"}
                  onChange={(e) => updateInput(e)}
                  type={"number"}
                  placeholder={"PinCode"}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="mb-2">
                <Button type={'submit'} variant={'success'}>Update</Button>
                <Button onClick={navigateBackToPreviousPage} variant={'dark'}
                  className="ms-2">Cancel</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditShippingAddress;
