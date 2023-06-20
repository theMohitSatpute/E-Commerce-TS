import React from "react";
import { Row, Container, Col } from "react-bootstrap";

interface IProps {
  heading: string;
  icon?: string;
}

const LayoutHeading: React.FC<IProps> = (props) => {
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col>
            <p className="h3 text-success">
              <i className={`bi ${props.icon}`}></i>
              {props.heading}
            </p>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo,
              nam? Assumenda illo nostrum pariatur rerum, voluptatum, officiis
              odio est nisi sapiente minima ipsum praesentium voluptatibus
              dolorum fugiat, exercitationem vitae consequatur?
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LayoutHeading;
