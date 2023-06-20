import React, { useState } from "react";
import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import * as userActions from "../../../../redux/users/user.action";

import LayoutHeading from "../../../layout/components/LayoutHeading";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../redux/store";
import { ToastUtil } from "../../../../util/ToastUtil";

interface IState {
  password: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Form Validation(if not enter name or email or password then it will show error)(copy from React Bootstrap)
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent | any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      if (user.password === user.confirmPassword) {
        dispatch(
          userActions.changePasswordAction({ password: user.password })
        ).then((response: any) => {
          if (response && !response.error) {
            navigate("/");
          }
        });
      } else {
        ToastUtil.displayErrorMessage("Both Password not match");
      }
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // Change Password
  const [user, setUser] = useState<IState>({
    password: "",
    confirmPassword: "",
  });

  const updateInput = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <MainNavBar />
      <LayoutHeading heading={"Change Password"} />
      <Container className="mt-3">
        <Row>
          <Col xs={4}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  pattern={
                    "(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\\[\\]|\\\\:;\"'<>,.?/_₹]).{6,15}"
                  }
                  name={"password"}
                  value={user.password}
                  onChange={(e) => updateInput(e)}
                  type={"password"}
                  placeholder={"Password"}
                ></Form.Control>
                {/* error msg if not fill email */}
                <Form.Control.Feedback type="invalid">
                  Please choose a valid Password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  pattern={
                    "(?!.*\\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\\[\\]|\\\\:;\"'<>,.?/_₹]).{6,15}"
                  }
                  name={"confirmPassword"}
                  value={user.confirmPassword}
                  onChange={(e) => updateInput(e)}
                  type={"password"}
                  placeholder={"Confirm Password"}
                ></Form.Control>
                {/* error msg if not fill email */}
                <Form.Control.Feedback type="invalid">
                  Please choose a valid Password.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Button type={"submit"} variant={"success"}>
                  Update Password
                </Button>
                <Link to={"/"} className="btn btn-dark ms-2">
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

export default ChangePassword;
