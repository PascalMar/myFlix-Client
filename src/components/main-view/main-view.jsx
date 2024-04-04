import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/movies")
            .then((response) => response.json())
            .then((movies) => {
                const moviesFromApi = movies.map((movie) => {
                    return {
                        id: movie._id.toString(),
                        title: movie.Title,
                        genre: movie.Genre.Name,
                        description: movie.Description,
                        director: movie.Director.Name,
                    };
                });
                setMovies(moviesFromApi);
            });
    }, []);



    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://pascals-movie-flix-4a5e7f2df223.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
                const moviesFromApi = movies.map((movie) => {
                    return {
                        id: movie._id.toString(),
                        title: movie.Title,
                        genre: movie.Genre.Name,
                        description: movie.Description,
                        director: movie.Director.Name,
                        image: movie.ImagePath
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);   

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }} />
                    or
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col md={8}>
                    <MovieView
                        style={{ border: "1px solid green" }}
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty!</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />                                                       
                        </Col>                        
                    ))}
                     <button onClick={() => { setUser(null); setToken(null); localStorage.removeItem("user"); localStorage.removeItem("token"); }}>Logout</button>
                </>
            )}             
        </Row>
    );
};