import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

export const UpdateForm = props => {
  const [movie, setMovie] = useState(initialMovie);

  useEffect(() => {
    const id = props.match.params.id;
    const movieToUpdate = props.movie.find(movie => `${movie.id}` === id);
    if (movieToUpdate) setMovie(movieToUpdate);
  }, [props.movie, props.match.params.id]);

  const handleChange = ev => {
    ev.persist();
    setMovie({ ...movie, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        setMovie(initialMovie);
        props.setMovies([...props.movie, res.data]);
        props.history.push(`/movies`);
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="update-form">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="title"
            value={movie.title}
          />
        </label>
        <label>
          Director:
          <input
            type="text"
            name="director"
            onChange={handleChange}
            placeholder="director"
            value={movie.director}
          />
        </label>
        <label>
          Metascore:
          <input
            type="text"
            name="metascore"
            onChange={handleChange}
            placeholder="metascore"
            value={movie.metascore}
          />
        </label>
        <label>
          Actors:
          <input
            type="text"
            name="actors"
            onChange={handleChange}
            placeholder="actors"
            value={movie.stars}
          />
        </label>
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};
