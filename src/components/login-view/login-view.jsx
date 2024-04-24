import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import { Alert } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('');

  // useEffect(() => {
  //   if (showAlert) {
  //     const timeout = setTimeout(() => {
  //       setShowAlert(false);
  //       setAlertMessage('');
  //       setAlertVariant('');
  //     }, 3000);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [showAlert]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          setTimeout(() => {
            onLoggedIn(data.user, data.token);
          }, 3000);
          setAlertVariant('success');
          setAlertMessage('Logging in');
          setShowAlert(true);
        } else {
          setAlertVariant('danger');
          setAlertMessage('No such user');
          setShowAlert(true);
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-xl-8">
        <Card className="m-3 p-3">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength="3"
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button className="mt-3" variant="primary" type="submit">
                Login
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
      <Alert show={showAlert} variant={alertVariant} dismissible onClose={() => setShowAlert(false)} >
        {alertMessage}
      </Alert>
    </div>
  );
}