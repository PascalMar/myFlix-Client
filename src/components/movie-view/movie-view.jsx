import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    return (
        <div className="movie-container">
            <div>
                <img
                    className="movie-image"
                    src={movie.image}
                    alt="movie image"
                />
            </div>
            <div className="movie-details">
                <div className="movie-info">
                    <span className="info-label">Title: </span>
                    <span className="info-text">{movie.title || "No Title"}</span>
                </div>
                <div className="movie-info">
                    <span className="info-label">Description: </span>
                    <span className="info-text">
                        {movie.description || "No Description"}
                    </span>
                </div>
                <div className="movie-info">
                    <span className="info-label">Genre: </span>
                    <span className="info-text">{movie.genre || "No Genre"}</span>
                </div>
                <div className="movie-info">
                    <span className="info-label">Director: </span>
                    <span className="info-text">{movie.director || "No Director"}</span>
                </div>
            </div>
            <div className="button-container">
                <Link to={`/`}>
                    <button className="back-button">Back</button>
                </Link>
            </div>
        </div>
    );
}