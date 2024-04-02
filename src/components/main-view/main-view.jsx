import React, { useEffect } from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

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
        </div>
    );
};