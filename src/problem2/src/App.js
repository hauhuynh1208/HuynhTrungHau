import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { useFormik } from "formik";
import { signUpFormValidation } from "./validation";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      phone: "",
      terms: false,
    },
    validationSchema: signUpFormValidation,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmit,
  });
  function onSubmit(values) {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  }
  console.log(touched);
  return (
    <div className="d-flex justify-content-center align-items-center page">
      <Card className="sign-up-container">
        <Card.Header>
          <h3>Welcome, Challenger</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="gy-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md={12}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  isValid={touched.password && !errors.password}
                />
                <Form.Text>
                  Your password must be 6-20 characters long, contain at least
                  one capital letters and one special characters.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={12}>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  isValid={touched.name && !errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md={12}>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isInvalid={!!errors.phone}
                  isValid={touched.phone && !errors.phone}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.phone}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md={12}>
                <Form.Check
                  required
                  name="terms"
                  label="Agree to terms and conditions"
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                  feedbackType="invalid"
                />
              </Form.Group>
              <Button
                type="submit"
                className="submit-button"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? <Loading /> : "Register"}
              </Button>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

const Loading = () => (
  <>
    <Spinner size="sm" animation="grow" variant="dark" />
    <Spinner size="sm" animation="grow" variant="dark" />
    <Spinner size="sm" animation="grow" variant="dark" />
  </>
);

export default App;
