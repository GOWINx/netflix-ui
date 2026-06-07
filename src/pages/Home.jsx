import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Hero from "../components/Hero";
import MovieRow from "../components/MovieRow";
import { movies } from "../data/movies";

const Home = () => {
  const [myList, setMyList] = useState(() => {
    try {
      const savedMovies = localStorage.getItem(
        "my-streaming-list",
      );

      return savedMovies ? JSON.parse(savedMovies) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "my-streaming-list",
      JSON.stringify(myList),
    );
  }, [myList]);

  const featuredMovie = movies[0];

  const trendingMovies = useMemo(
    () =>
      movies.filter(
        (movie) => movie.category === "Trending",
      ),
    [],
  );

  const popularMovies = useMemo(
    () =>
      [...movies].sort(
        (firstMovie, secondMovie) =>
          secondMovie.match - firstMovie.match,
      ),
    [],
  );

  const marvelMovies = useMemo(
    () => movies.filter((movie) => movie.type === "movie"),
    [],
  );

  const marvelSeries = useMemo(
    () => movies.filter((movie) => movie.type === "tv"),
    [],
  );

  const actionMovies = useMemo(
    () =>
      movies.filter((movie) =>
        movie.genres.includes("Action"),
      ),
    [],
  );

  const handleToggleList = useCallback((selectedMovie) => {
    setMyList((currentList) => {
      const exists = currentList.some(
        (movie) => movie.id === selectedMovie.id,
      );

      if (exists) {
        return currentList.filter(
          (movie) => movie.id !== selectedMovie.id,
        );
      }

      return [...currentList, selectedMovie];
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <Hero
        movie={featuredMovie}
        isInList={myList.some(
          (movie) => movie.id === featuredMovie.id,
        )}
        onToggleList={handleToggleList}
      />

      <div className="relative z-20 -mt-10 pb-12 sm:-mt-14 lg:-mt-16">
        <MovieRow
          title="Trending Now"
          subtitle="Marvel titles everyone is watching"
          movies={trendingMovies}
          myList={myList}
          onToggleList={handleToggleList}
        />

        <MovieRow
          title="Popular on Netflix"
          subtitle="Top-rated movies and series"
          movies={popularMovies}
          myList={myList}
          onToggleList={handleToggleList}
        />

        <MovieRow
          title="Marvel Movies"
          subtitle="Heroes, villains and unforgettable battles"
          movies={marvelMovies}
          myList={myList}
          onToggleList={handleToggleList}
        />

        <MovieRow
          title="Marvel Series"
          subtitle="Binge-watch popular Marvel stories"
          movies={marvelSeries}
          myList={myList}
          onToggleList={handleToggleList}
        />

        <MovieRow
          title="Action and Adventure"
          subtitle="High-energy entertainment"
          movies={actionMovies}
          myList={myList}
          onToggleList={handleToggleList}
        />
      </div>
    </div>
  );
};

export default Home;