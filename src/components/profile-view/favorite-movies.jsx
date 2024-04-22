import React from 'react'
import PropTypes from "prop-types";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

export const FavoriteMovies = ({ user, favoriteMovies, setUser }) => {
  
  return (
    <Row>
      <Col md={12} >
        <h3>My Movies</h3>
      </Col>
      <Row>
        {favoriteMovies.map((movie) => {
          return (
            <Col className="mb-5" key={movie.title} md={4}>
              <Link to={`/movies/${movie.title}`} />
              <MovieCard
                movie={movie}
                isFavorite={user.FavoriteMovies && user.FavoriteMovies.includes(movie.title)}
                setUser={setUser}
              />
            </Col>
          );
        })}
      </Row>
    </Row>
  )
}
FavoriteMovies.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
};