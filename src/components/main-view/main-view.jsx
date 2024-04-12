import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate,  } from "react-router-dom";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
  

 

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
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
                setFilteredMovies={setFilteredMovies}
                movies={movies}
            />

            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {
                                            setUser(user);
                                            setToken(token);
                                        }} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <>
                                {user && (
                                    <>
                                        {filteredMovies.length > 0
                                            ?
                                            filteredMovies.map((movie) => (
                                                <Col
                                                    className="mb-4"
                                                    key={movie.id}
                                                    md={3}
                                                >
                                                    <MovieCard movie={movie}
                                                        isFavorite={user.FavoriteMovies && user.FavoriteMovies.includes(movie.title)} />
                                                </Col>
                                            ))
                                            :
                                            movies.map((movie) => (
                                                <Col
                                                    className="mb-4"
                                                    key={movie.id}
                                                    md={3}
                                                >
                                                    <MovieCard
                                                        movie={movie}
                                                        isFavorite={user.FavoriteMovies && user.FavoriteMovies.includes(movie.title)}
                                                        setUser={setUser}
                                                    />
                                                </Col>
                                            ))}
                                    </>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col md={8}>
                                        <ProfileView
                                            localUser={user}
                                            movies={movies}
                                            token={token}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};