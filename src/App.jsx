import { useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import MoviesListBox from "./Components/MoviesListBox";
import ListBox from "./Components/ListBox";
import MovieSummary from "./Components/MovieSummary";
import WatchedListBox from "./Components/WatchedListBox";
import { useEffect } from "react";
import Loader from "./Components/Loader";
import ErrorMsg from "./Components/ErrorMsg";
import SelectedMovie from "./Components/SelectedMovie";
import { useMovies } from "./Components/useMovies";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, isLoading, errormsg] = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });
  const [selectedID, setSelectedID] = useState(null);
  function handleSelectMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />
      <Hero>
        <ListBox>
          {errormsg && <ErrorMsg error={errormsg} />}
          {!isLoading && !errormsg && (
            <MoviesListBox movies={movies} onMovieSelect={handleSelectMovie} />
          )}
          {isLoading && <Loader />}
        </ListBox>
        <ListBox>
          {selectedID ? (
            <SelectedMovie
              selectedID={selectedID}
              onCloseMovie={handleCloseMovie}
              handleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <MovieSummary watched={watched} />
              <WatchedListBox
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </Hero>
    </>
  );
}
