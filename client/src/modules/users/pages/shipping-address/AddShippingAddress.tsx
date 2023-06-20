import React, { useState } from "react";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import * as userActions from "../../../../redux/users/user.action";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IAddressView } from "../../../addresses/models/IAddressView";
import { AppDispatch, useAppDispatch } from "../../../../redux/store";

const AddShippingAddress: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  // Form Validation(if not enter name or email or password then it will show error)(copy from React Bootstrap)
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent | any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(
        userActions.createAddressAction({
          address: address,
        })
      ).then((response: any) => {
        if (response && !response.error) {
          navigate("/users/profile");
        }
      });
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

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

  return (
    <>
      <MainNavBar />
      <LayoutHeading heading={"Add Shipping Address"} />
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
                <Button type={"submit"} variant={"success"}>
                  Create
                </Button>
                <Link to={"/users/profile"} className="btn btn-dark ms-2">
                  Cancle
                </Link>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddShippingAddress;
