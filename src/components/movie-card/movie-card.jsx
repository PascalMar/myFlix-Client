import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie, isFavorite }) => {

    console.log('isFavorite:', isFavorite);

    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [addTitle, setAddTitle] = useState("");
    const [delTitle, setDelTitle] = useState("");



    useEffect(() => {
        const addToFavorites = () => {

            console.log("Title is:", movie.title)
            fetch(
                `https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.title)}`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to add movie to favorites.");
                    }
                    alert("Movie added to favorites successfully!");
                    window.location.reload();
                    return response.json();
                })
                .then((user) => {
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user);

                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        const removeFromFavorites = () => {
            fetch(
                `https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.title)}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to remove movie from favorites.");
                    }
                    // alert("Movie removed from favorites successfully!");
                    window.location.reload();
                    return response.json();
                })
                .then((user) => {
                    if (user) {
                        localStorage.setItem("user", JSON.stringify(user));
                        setUser(user);

                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        if (addTitle) {
            addToFavorites();
        }
        if (delTitle) {
            removeFromFavorites();
        }
    }, [addTitle, delTitle, token]);

    const handleAddToFavorites = () => {
        setAddTitle(movie.title);

    };
    const handleRemoveFromFavorites = () => {
        setDelTitle(movie.title);

    };

    return (
        <>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movie-view">
                <Card className="h-100" >
                    <Card.Img variant="top" src={movie.image} className="object-fit-cover" />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>{movie.genre}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
            <Card>
                {isFavorite ? (
                    <Button variant="primary" onClick={handleRemoveFromFavorites}>Remove from favorites</Button>
                ) : (
                    <Button variant="primary" onClick={handleAddToFavorites}>Add to favorites</Button>
                )}
            </Card>
        </>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        director: PropTypes.string,
        genre: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};