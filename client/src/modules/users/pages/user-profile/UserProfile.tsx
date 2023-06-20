import React, { useEffect, useRef } from "react";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import * as userReducer from "../../../../redux/users/user.reducer";
import * as userActions from "../../../../redux/users/user.action";

import MainNavBar from "../../../layout/pages/navbar/MainNavBar";
import SpinnerUI from "../../../ui/components/spinner/SpinnerUI";
import {
  AppDispatch,
  RootState,
  useAppDispatch,
} from "../../../../redux/store";
import { useSelector } from "react-redux";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UploadImageWidget } from "../../../../util/UploadImageWidget";
import { ToastUtil } from "../../../../util/ToastUtil";

const UserProfile: React.FC = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();

  useEffect(() => {
    UploadImageWidget.upload(cloudinaryRef, widgetRef)
      .then((imageUrl) => {
        dispatch(
          userActions.updateProfilePictureAction({ imageUrl: imageUrl })
        );
      })
      .catch((error) => {
        ToastUtil.displayErrorMessage(error);
      });
  }, []);

  const clickEditImage = () => {
    widgetRef.current.open();
  };

  //get address
  useEffect(() => {
    dispatch(userActions.getMyAddressAction());
  }, []);

  //get user data from store
  const userReduxState: userReducer.InitialState = useSelector(
    (state: RootState) => {
      return state[userReducer.userFeatureKey];
    }
  );

  const { user, loading, address } = userReduxState;

  //Delete Address
  const clickDeleteAddress = (addressId: string | undefined) => {
    if (addressId) {
      dispatch(userActions.deleteAddressAction({ addressId: addressId })).then(
        (response: any) => {
          if (response && !response.error) {
            dispatch(userActions.deleteAddressAction());
          }
        }
      );
    }
  };

  return (
    <>
      {loading && <SpinnerUI />}
      <MainNavBar />
      <LayoutHeading heading={"Your Profile"} />
      <Container>
        <Row>
          <Col xs={2}>
            {user && Object.keys(user).length > 0 && (
              <Card>
                <Card.Header className="text-center bg-warning">
                  <p className="h4">Profile</p>
                </Card.Header>
                <Card.Body>
                  <img src={user.imageUrl} alt="" className="img-fluid" />
                  <div className="d-grid gap-2 mt-3">
                    <Button
                      type="button"
                      variant={"warning"}
                      onClick={clickEditImage}
                    >
                      <i className="bi bi-pencil-square"></i>
                      Edit
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col xs={5}>
            <Card>
              <Card.Header className="bg-dark text-center">
                <p className="h4 text-white ">Your Information</p>
              </Card.Header>
              <Card.Body>
                <ListGroup>
                  <ListGroupItem>
                    Name : <span className="fw-bold">{user.username}</span>
                  </ListGroupItem>
                  <ListGroupItem>
                    Email : <span className="fw-bold">{user.email}</span>
                  </ListGroupItem>
                  <ListGroupItem>
                    Admin :{" "}
                    <span className="fw-bold">
                      {user.isAdmin ? "YES" : "NO"}
                    </span>
                  </ListGroupItem>
                  <ListGroupItem>
                    Super Admin :{" "}
                    <span className="fw-bold">
                      {user.isSuperAdmin ? "YES" : "NO"}
                    </span>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={5}>
            <Card>
              <Card.Header className="bg-secondary">
                <div className="d-flex justify-content-between">
                  <p className="h4 text-white">Shipping Address</p>
                  <div>
                    {address && Object.keys(address).length > 0 ? (
                      <>
                        <Link
                          to={`/users/edit-shipping-address/${address._id}?router=profile`}
                        >
                          {" "}
                          <Button variant={"primary"} className="me-2">
                            <i className="bi bi-pencil-fill text-white"></i>
                          </Button>
                        </Link>
                        <Button
                          variant={"danger"}
                          className="me-2"
                          onClick={() => clickDeleteAddress(address._id)}
                        >
                          <i className="bi bi-trash-fill text-white"></i>
                        </Button>
                      </>
                    ) : (
                      <Link to={`/users/add-shipping-address/`}>
                        <Button variant={"warning"} className="me-2">
                          <i className="bi bi-plus-circle-fill text-white"></i>
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                {address && Object.keys(address).length > 0 ? (
                  <>
                    <ListGroup>
                      <ListGroupItem>
                        Mobile :{" "}
                        <span className="fe-bold">{address.mobile}</span>
                      </ListGroupItem>
                      <ListGroupItem>
                        Flat : <span className="fe-bold">{address.flat}</span>
                      </ListGroupItem>
                      <ListGroupItem>
                        Street :{" "}
                        <span className="fe-bold">{address.street}</span>
                      </ListGroupItem>
                      <ListGroupItem>
                        Landmark :{" "}
                        <span className="fe-bold">{address.landmark}</span>
                      </ListGroupItem>
                      <ListGroupItem>
                        City : <span className="fe-bold">{address.city}</span>
                      </ListGroupItem>
                      <ListGroupItem>
                        State : <span className="fe-bold">{address.state}</span>
                      </ListGroupItem>
                      <ListGroupItem>
                        Country :{" "}
                        <span className="fe-bold">{address.country}</span>
                      </ListGroupItem>
                      <ListGroupItem>
                        PinCode :{" "}
                        <span className="fe-bold">{address.pinCode}</span>
                      </ListGroupItem>
                    </ListGroup>
                  </>
                ) : (
                  <small className="text-danger">No Address Found</small>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserProfile;
