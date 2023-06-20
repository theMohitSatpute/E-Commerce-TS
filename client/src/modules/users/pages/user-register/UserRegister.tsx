import React, { useState } from "react";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IUserView } from "../../models/IUserView";
import { useAppDispatch } from "../../../../redux/store";
import * as userActions from "../../../../redux/users/user.action";

const UserRegister: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Form Validation(if not enter name or email or password then it will show error)(copy from React Bootstrap)
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: React.FormEvent | any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      dispatch(userActions.registerUserAction({ user: user })).then(
        (response: any) => {
          if (response && !response.error) {
            navigate("/users/login");
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

  const [user, setUser] = useState<IUserView>({
    username: "",
    email: "",
    password: "",
  });

  const updateInput = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <LayoutHeading heading={"Register here"} />
      <Container>
        <Row>
          <Col xs={4}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  // username patern
                  pattern={"[a-zA-Z0-9]{4,10}"}
                  name={"username"}
                  value={user.username}
                  onChange={(e) => updateInput(e)}
                  type={"text"}
                  placeholder={"Username"}
                ></Form.Control>
                {/* error msg if not fill username */}
                <Form.Control.Feedback type="invalid">
                  Please choose a valid username.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control
                  required
                  name={"email"}
                  value={user.email}
                  onChange={(e) => updateInput(e)}
                  type={"email"}
                  placeholder={"Email"}
                ></Form.Control>
                {/* error msg if not fill email */}
                <Form.Control.Feedback type="invalid">
                  Please choose a valid Email.
                </Form.Control.Feedback>
              </Form.Group>
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
                <Button type={"submit"} variant={"success"}>
                  Register
                </Button>
                <Link to={"/"} className="btn btn-dark ms-2">
                  Cancle
                </Link>
              </Form.Group>
            </Form>
            <small>
              Already have an account ?
              <Link
                to={"/users/login"}
                className="text-decoration-none fw-bold ms-1 text-success"
              >
                Login here
              </Link>
            </small>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserRegister;
