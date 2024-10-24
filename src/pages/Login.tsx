import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { LoginForm } from "../components/form/LoginForm";

export function Login() {
  return (
    <>
      <Container
        fluid
        style={{
          background: "linear-gradient(to bottom, #d5eeff, 50%, white 60%)",
          padding: "20px",
          borderRadius: "0.5rem",
          position: "absolute",
          transform: "translateY(15%)",
          margin: "auto"
        }}
      >
        <h1 className="text-center my-4">LOG IN</h1>
        <LoginForm />
        <Row
          className="my-5 mx-auto align-items-center"
          style={{ maxWidth: "36rem" }}
        >
          <Col className="text-end pe-0">
            <hr />
          </Col>
          <Col xs="auto" className="text-center my-auto">
            <span className="content">or</span>
          </Col>
          <Col className="text-start ps-0">
            <hr />
          </Col>
        </Row>
        <h6 className="text-center mb-5">
          Don't have an account? <a href="/register">Sign up</a>
        </h6>
      </Container>
    </>
  );
}
