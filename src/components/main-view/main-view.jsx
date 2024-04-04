import React, { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
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

    const [selectedMovie, setSelectedMovie] = useState(null);

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
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    if (!user) {
        return (
            <>
                <LoginView
                    onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                    }}
                />
                or
                <SignupView />
            </>
        )
    }


    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
            <button onClick={() => { setUser(null); setToken(null); localStorage.removeItem("user"); localStorage.removeItem("token"); }}>Logout</button>
        </div>
    );
};