import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const onDelete = e =>{
    e.preventDefault()

    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res =>{
      push('/')
      setMovie(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div  onClick={saveMovie}>
        <button>Save Movie</button>
      </div>
      <button onClick={() => push(`/update-movie/${params.id}`)}>Update Movie</button>
      <button onClick={onDelete} >Delete Movie</button>
    </div>
  );
}

export default Movie;
