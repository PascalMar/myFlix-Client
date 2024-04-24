import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Container, Alert } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from "./update-user";

export const ProfileView = ({ movies, token, localUser, setUser }) => {

    const user = localUser;

    const [Username, setUsername] = useState(user?.Username || '');
    const [Email, setEmail] = useState(user?.Email || '');
    const [Password, setPassword] = useState(user?.Password || '');
    const [Birthday, setBirthdate] = useState(user?.Birthday || '');
    const favoriteMovies = user === undefined ? [] : movies.filter(m => user.FavoriteMovies.includes(m.title))

    const formData = {
        Username: Username,
        Email: Email,
        Birthday: Birthday,
        Password: Password
    };

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
        fetch(`https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    setAlertVariant('success');
                    setAlertMessage('Update successful');
                    setShowAlert(true);
                    window.location.reload();
                    return response.json();
                }
                setAlertVariant('danger');
                setAlertMessage('Update failed');
                setShowAlert(true);
            })
            .then((updatedUser) => {
                if (updatedUser) {
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setUser(updatedUser);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleUpdate = (e) => {
        switch (e.target.type) {
            case "text":
                setUsername(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "date":
                setBirthdate(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleDeleteAccount = () => {
        fetch(`https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/users/${storedUser.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                setAlertVariant('success');
                setAlertMessage('Account deleted successfully.');
                setShowAlert(true);
                localStorage.clear();
                window.location.reload();
            } else {
                setAlertVariant('danger');
                setAlertMessage('Something went wrong');
                setShowAlert(true);
            }
        });
    };

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/users/" + Username, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token]);

    return (
        <Container>
            <Row>
                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title>My Profile</Card.Title>
                        <Card.Text>
                            {
                                user && (<UserInfo name={user.Username} email={user.Email} />)
                            }
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="mb-5">
                    <Card.Body>
                        <UpdateUser
                            formData={formData}
                            handleUpdate={handleUpdate}
                            handleSubmit={handleSubmit}
                            handleDeleteAccount={handleDeleteAccount}
                        />
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Col className="mb-5" xs={12} md={12}>

                    {user && <FavoriteMovies user={user} favoriteMovies={favoriteMovies} setUser={setUser} />}

                </Col>
            </Row>
            {showAlert && (
                <Row>
                    <Col>
                        <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)} >
                            {alertMessage}
                        </Alert>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

ProfileView.propTypes = {
    localUser: PropTypes.object.isRequired,
    movies: PropTypes.array.isRequired,
    token: PropTypes.string.isRequired
};
