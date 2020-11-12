import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import FacebookLogin from "react-facebook-login";
import { Link, Redirect } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); // avoid other changes except handleSubmit
    const { email, password } = formData;
    const url = `http://localhost:5000/users/login`;
    const data = { email, password };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      json: true,
    });
    const resData = await response.json();

    if (response.ok === true) {
      console.log("login response.ok: ", response.ok);
      localStorage.setItem("user", JSON.stringify(resData.data.user));
      setIsAuthenticated(true);
    }
  };

  const loginWithFacebook = async (response) => {
    console.log("loginWithFacebook", response);
    const url = `http://localhost:5000/users/login/facebook`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: response.accessToken }),
      json: true,
    });
    const resData = await res.json();

    if (res.ok === true) {
      console.log("login response.ok: ", res.ok);
      localStorage.setItem("user", JSON.stringify(resData.data.user));
      setIsAuthenticated(true);
    }
  };

  if (isAuthenticated === true) return <Redirect to="/" />;

  return (
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Form onSubmit={handleSubmit}>
              <div className="text-center mb-3">
                <h1>Sign In</h1>
                <p>Sign Into Your Account </p>
              </div>
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
                  minLength="3"
                />
                {errors.password && (
                  <small className="form-text text-danger">
                    {errors.password}
                  </small>
                )}
              </Form.Group>

              <Button
                className="btn-block"
                type="submit"
                variant="primary"
                style={{ backgroundColor: "#f57f5b", border: "none" }}
              >
                Login
              </Button>

              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>

              <div className="d-flex flex-column text-center mt-3">
                <FacebookLogin
                  appId="397717951389806"
                  fields="name,email,picture"
                  callback={loginWithFacebook}
                  autoLoad={false}
                  className="facebook-button-class"
                  onFailure={(err) => {
                    console.log("FB LOGIN ERROR:", err);
                  }}
                  containerStyle={{
                    textAlign: "center",
                    backgroundColor: "#3b5998",
                    borderColor: "#3b5998",
                    flex: 1,
                    display: "flex",
                    color: "#fff",
                    cursor: "pointer",
                    marginBottom: "3px",
                  }}
                  buttonStyle={{
                    flex: 1,
                    textTransform: "none",
                    padding: "12px",
                    background: "none",
                    border: "none",
                  }}
                />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
