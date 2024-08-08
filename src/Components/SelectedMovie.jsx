import Loader from "./Loader";
import StarRating from "./StarRating";
import { useState } from "react";
import { useEffect } from "react";
const SelectedMovie = ({
  selectedID,
  onCloseMovie,
  handleAddWatched,
  watched,
}) => {
  const [displayMovie, setDisplayMovie] = useState({});
  const [movieUserRating, setMovieUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const key = "822584fc";
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedID);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Genre: genre,
    Released: released,
    Actors: actors,
    Director: director,
  } = displayMovie;
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      movieUserRating,
    };
    handleAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  console.log(selectedID);
  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);

      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedID}`
      );
      const data = await res.json();
      console.log(data);
      setDisplayMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  }, [selectedID]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [title]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie(e);
      }
    }

    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, []);

  return (
    <div className="text-white">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <header>
            <button onClick={onCloseMovie} className="m-8 text-3xl">
              ❌
            </button>
            <img
              src={poster}
              alt={title}
              className="rounded h-[16rem] mx-auto my-4"
            />
            <div className="text-center space-y-2">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>🎀</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section className="text-center space-y-2">
            {!isWatched ? (
              <>
                {" "}
                <div className="rating w-[400px] mx-auto">
                  {" "}
                  <StarRating onSetRating={setMovieUserRating} />
                </div>
                {movieUserRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    Add to list
                  </button>
                )}{" "}
              </>
            ) : (
              <p className="font-bold">You already have rated this movie.</p>
            )}
            <p className="text-sm mx-4">
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default SelectedMovie;
