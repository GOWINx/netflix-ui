import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Play,
  Plus,
  Share2,
  Star,
} from "lucide-react";
import { movies } from "../data/movies";

const MovieDetails = () => {
  const { id } = useParams();

  const movie = useMemo(() => {
    return movies.find((item) => item.id === Number(id));
  }, [id]);

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Movie not found.</p>
      </div>
    );
  }

  const savedList = JSON.parse(
    localStorage.getItem("my-streaming-list") || "[]",
  );

  const isSaved = savedList.some((item) => item.id === movie.id);

  const toggleMovie = () => {
    const existingList = JSON.parse(
      localStorage.getItem("my-streaming-list") || "[]",
    );

    const movieExists = existingList.some(
      (item) => item.id === movie.id,
    );

    const updatedList = movieExists
      ? existingList.filter((item) => item.id !== movie.id)
      : [...existingList, movie];

    localStorage.setItem(
      "my-streaming-list",
      JSON.stringify(updatedList),
    );

    window.location.reload();
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src={movie.backdrop}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-black/50" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] items-center px-5 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-neutral-300 transition hover:text-white"
          >
            <ArrowLeft size={18} />
            Back to Browse
          </Link>

          <div className="mb-5 flex items-center gap-3">
            <span className="rounded bg-red-600 px-3 py-1 text-xs font-black tracking-widest">
              N FILM
            </span>

            <span className="flex items-center gap-1 text-sm font-semibold">
              <Star size={16} fill="#facc15" className="text-yellow-400" />
              {movie.match / 10}
            </span>
          </div>

          <h1 className="text-5xl font-black leading-none sm:text-7xl">
            {movie.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="text-emerald-400">
              {movie.match}% Match
            </span>

            <span>{movie.year}</span>

            <span className="rounded border border-white/30 px-2 py-0.5">
              {movie.maturity}
            </span>

            <span>{movie.duration}</span>

            <span className="rounded border border-white/30 px-2 py-0.5">
              HD
            </span>
          </div>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-200">
            {movie.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span
                key={genre}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 backdrop-blur-md"
              >
                {genre}
              </span>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-bold text-black transition hover:bg-neutral-300">
              <Play size={21} fill="currentColor" />
              Play
            </button>

            <button
              onClick={toggleMovie}
              className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-bold backdrop-blur-md transition hover:bg-white/20"
            >
              {isSaved ? <Check size={20} /> : <Plus size={20} />}
              {isSaved ? "Added to List" : "My List"}
            </button>

            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition hover:bg-white/20">
              <Share2 size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;