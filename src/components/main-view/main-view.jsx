import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Interstellar",
            description: "A captivating sci-fi film where astronauts venture through a wormhole in search of a new home for humanity as Earth faces environmental disaster",
            image: "https://m.media-amazon.com/images/I/51YBVXb-iDL._SX300_SY300_QL70_ML2_.jpg",
            director: "Christopher Nolan"
        },
        {
            "id": 2,
            "title": "Inception",
            "description": "A mind-bending heist film where skilled thieves enter people's dreams to steal their secrets or implant ideas.",
            "image": "https://m.media-amazon.com/images/I/51a7hc58lDL._SX300_SY300_QL70_ML2_.jpg",
            "director": "Christopher Nolan"
        },
        {
            "id": 3,
            "title": "The Matrix",
            "description": "A groundbreaking sci-fi action film where a computer hacker discovers the shocking truth about reality and joins a rebellion against sentient machines.",
            "image": "https://m.media-amazon.com/images/I/613ypTLZHsL._SY445_.jpg",
            "director": "The Wachowskis"
        }
    ]);

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