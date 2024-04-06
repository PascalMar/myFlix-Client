import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Card, Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from "./update-user";

export const ProfileView = ({ localUser, movies, token }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [Username, setUsername] = useState(storedUser?.Username || '');
    const [Email, setEmail] = useState(storedUser?.Email || '');
    const [Password, setPassword] = useState(storedUser?.Password || '');
    const [Birthday, setBirthdate] = useState(storedUser?.Birthday || '');
    const [user, setUser] = useState();
    const favoriteMovies = user === undefined ? [] : movies.filter(m => user.favoriteMovies.includes(m.title))

    const formData = {
        Username: Username,
        Email: Email,
        Birthday: Birthday,
        Password: Password
    };

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
                    alert("Update successful");
                    window.location.reload();
                    return response.json();
                }
                alert("Update failed");
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
                alert("Account deleted successfully.");
                localStorage.clear();
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
        });
    };
    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/users", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const usersFromApi = data.map((resultUser) => {
                    return {
                        _id: resultUser._id,
                        Username: resultUser.Username,
                        Password: resultUser.Password,
                        Email: resultUser.Email,
                        Birthday: resultUser.Birthday,
                        favoriteMovies: resultUser.FavoriteMovies
                    };
                });
                const currentUser = usersFromApi.find((u) => u.Username === localUser.Username);
                setUser(currentUser);
                console.log("Profile Saved User: " + JSON.stringify(currentUser));
               
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

                    {user && <FavoriteMovies user={user} favoriteMovies={favoriteMovies} />}

                </Col>
            </Row>
        </Container>
    );
};

// ProfileView.propTypes = {
//     localUser: PropTypes.object.isRequired,
//     movies: PropTypes.array.isRequired,
//     token: PropTypes.string.isRequired
// };
