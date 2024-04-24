import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from 'react-bootstrap/Card';
import { Alert } from 'react-bootstrap';

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('');

    useEffect(() => {
        if (showAlert) {
            const timeout = setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
                setAlertVariant('');
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [showAlert]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch("https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response.ok) {
                setAlertVariant('success');
                setAlertMessage('Sign up successful');
                setShowAlert(true);
            } else {
                setAlertVariant('danger');
                setAlertMessage('Signup failed');
                setShowAlert(true);
            }
        });
    };

    return (
        <div className="row justify-content-center">
            <div className="col-xl-8">
                <Card className="m-3">
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="signUpFormUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    minLength="3"
                                />
                            </Form.Group>

                            <Form.Group controlId="signUpFormPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="signUpFormEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="signUpFormBirthday">
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={birthday}
                                    onChange={(e) => setBirthday(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Button className="mt-3" variant="primary" type="submit">
                                Signup
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
            {showAlert && (
                <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)} >
                    {alertMessage}
                </Alert>
            )}
        </div>
    );
}


