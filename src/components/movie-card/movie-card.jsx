import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import heart from "../../assets/img/heart.png"
import heartFilled from "../../assets/img/heart_filled.png"
import "./movie-card.scss"


export const MovieCard = ({ movie, isFavorite, setUser }) => {

    const storedToken = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    // const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);



    const handleAddToFavorites = (movie) => {
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

    const handleRemoveFromFavorites = (movie) => {
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

    return (
        <>
            <Card className="h-100" >
                <Link to={`/movies/${encodeURIComponent(movie.id)}`} className="movie-view">
                    <Card.Img
                        variant="top"
                        src={movie.image}
                    />
                </Link>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>{movie.gemre}</Card.Text>
                        <div>
                            {isFavorite ? (
                                <img src={heartFilled} className="heart-img" onClick={() => handleRemoveFromFavorites(movie)} />
                            ) : (
                                <img src={heart} className="heart-img" onClick={() => handleAddToFavorites(movie)} />
                            )}
                        </div>
                    </div>
                </Card.Body>
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