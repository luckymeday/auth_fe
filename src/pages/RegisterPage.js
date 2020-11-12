import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";

const RegisterPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); // avoid other changes except handleSubmit
    const { name, email, password, password2 } = formData;
    if (password !== password2) {
      setErrors({ ...errors, password2: "Passwords do not match" });
      return;
    }

    const url = `http://localhost:5000/users`;
    const data = { name, email, password };
    console.log("register data:", data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      json: true,
    });
    console.log(response);

    if (response.ok === true) {
      console.log(" register response.ok: ", response.ok);
      setIsAuthenticated(true);
    }
  };
  if (isAuthenticated === true) return <Redirect to="/" />;

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="text-center mb-3">
              <h1>Sign Up</h1>
              <p> Create Your Account</p>
            </div>

            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  required
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <small className="form-text text-danger">{errors.name}</small>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="email"
                  required
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <small className="form-text text-danger">
                    {errors.email}
                  </small>
                )}
              </Form.Group>

              <Form.Group>
                <Form.Control
                  type="password"
                  required
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <small className="form-text text-danger">
                    {errors.password}
                  </small>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                className="btn-block"
                type="submit"
                variant="primary"
                style={{ backgroundColor: "#f57f5b", border: "none" }}
              >
                Register
              </Button>

              <p>
                Already have an account? <Link to="/login">Sign In</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
