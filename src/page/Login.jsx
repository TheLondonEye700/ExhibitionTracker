import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import authService from "../service/authenticate.js";
import { addToken } from "../redux/user.js";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [psw, setPsw] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onUserNameInput = ({ target: { value } }) => {
    setUserName(value);
  };
  const onPswInput = ({ target: { value } }) => {
    setPsw(value);
  };

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userName || !psw) {
      setError("Enter all fields.");
    } else {
      let userToken = await authService.login({ userName, psw });
      //   console.log(userToken);
      if (userToken) {
        dispatch(addToken(userToken));
        window.localStorage.setItem("loginToken", JSON.stringify(userToken));
        navigate("/home");
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <>
      <h3>Login</h3>
      {error ? (
        <Alert variant="danger">
          <Alert.Heading>{error}</Alert.Heading>
        </Alert>
      ) : null}
      tenant@aalto.exhibition
      <Form onSubmit={handleLogin}>
        <Form.Control
          className="mb-3"
          type="text"
          placeholder="Username"
          onChange={onUserNameInput}
        />
        UHw*i8ZmC766B#
        <Form.Control
          className="mb-3"
          type="password"
          placeholder="Password"
          onChange={onPswInput}
        />
        <Button type="submit">Login</Button>
      </Form>
    </>
  );
};

export default Login;
