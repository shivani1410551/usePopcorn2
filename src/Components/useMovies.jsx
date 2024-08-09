import { useEffect, useState } from "react";
export const useMovies = (query, callback) => {
  const key = "822584fc";
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errormsg, setErrormsg] = useState("");
  useEffect(() => {
    callback?.();
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setErrormsg("");
        const res = await fetch(
          `http://www.omdba pi.com/?apikey=${key}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();
        if (data.Response === "false") {
          throw new Error("Movies not found");
        }
        setMovies(data.Search);
        setIsLoading(false);
        setErrormsg("");
      } catch (e) {
        console.log(e.message);
        if (e.name !== "AbortError") {
          setErrormsg(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length > 3) {
      setErrormsg("");
      setMovies([]);
      return;
    }
    handleCloseMovie();
    fetchMovie();

    return function () {
      controller.abort();
    };
  }, [query]);
  return [movies, isLoading, errormsg];
};
