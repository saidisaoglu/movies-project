import { useEffect, useState } from "react";
import moviesmain from "./moviesmain.module.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditModal from "../addeditmodal/editModal";

export function MoviesMainLeftPart({ movies, loading, fetchMovies }) {
  const [movieId, setMovieId] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3000/movies/${movieId}`, {
        method: "DELETE",
      });

      fetchMovies();
    } catch (error) {
      console.log(error);
    } finally {
      setShowDelete(false);
    }
  };
  const handleDeleteId = (id) => {
    setShowDelete(true);
    setMovieId(id);
  };
  const handleEditId = (id) => {
    setShowEdit(true);
    setMovieId(id);
  };

  if (loading) {
    return (
      <p>
        loading <img src="/list2.jpg" alt="" />
      </p>
    );
  } else {
    return (
      <>
        <div id="moviesListDiv" className={moviesmain.moviesLeftPart}>
          {movies.map((movie) => (
            <div key={movie.id} className={moviesmain.movieCard}>
              <img
                src={movie.imageUrl}
                alt="Movie Image"
                className={moviesmain.movieImage}
              />
              <div className={moviesmain.movieInfo}>
                <h3 className={moviesmain.movieTitle}>{movie.title}</h3>
                <p className={moviesmain.movieYear}>{movie.year}</p>
                <p className={moviesmain.movieDescription}>
                  {movie.description}
                </p>
              </div>

              <div className={moviesmain.movieButtons}>
                <button
                  className={moviesmain.movieButton}
                  onClick={() => handleEditId(movie.id)}
                >
                  Edit
                </button>
                <button
                  className={moviesmain.movieButton}
                  onClick={() => handleDeleteId(movie.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <Modal show={showDelete} onHide={() => setShowDelete(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Movie Delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure delete?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDelete(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Yes,delete
            </Button>
          </Modal.Footer>
        </Modal>
        <EditModal
          show={showEdit}
          setShowEdit={setShowEdit}
          movieId={movieId}
          onHide={() => setShowEdit(false)}
          fetchMovies={fetchMovies}
        />
      </>
    );
  }
}
