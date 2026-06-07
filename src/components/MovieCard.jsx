import {
  Check,
  ChevronDown,
  Play,
  Plus,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";

const MovieCard = ({
  movie,
  isInList,
  onToggleList,
  layout = "slider",
}) => {
  const cardSize =
    layout === "grid"
      ? "w-full min-w-0"
      : "w-[150px] min-w-[150px] sm:w-[180px] sm:min-w-[180px] lg:w-[210px] lg:min-w-[210px]";

  const handleListClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    onToggleList(movie);
  };

  return (
    <article className={`group relative ${cardSize}`}>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-2xl">
        <Link to={`/movie/${movie.id}`} className="block">
          <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
            <img
              src={movie.poster}
              alt={movie.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.src =
                  "https://placehold.co/600x900/111111/ffffff?text=Poster";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

            <span className="absolute left-3 top-3 rounded-md bg-red-600 px-2 py-1 text-[10px] font-black uppercase tracking-wider">
              {movie.type === "tv" ? "Series" : "Movie"}
            </span>

            <button
              onClick={handleListClick}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-black/60 text-white backdrop-blur-md transition hover:bg-white hover:text-black"
              aria-label={
                isInList ? "Remove from My List" : "Add to My List"
              }
            >
              {isInList ? <Check size={17} /> : <Plus size={17} />}
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
              <h3 className="line-clamp-1 text-sm font-bold sm:text-base">
                {movie.title}
              </h3>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-[10px] sm:text-xs">
                <span className="font-bold text-emerald-400">
                  {movie.match}% Match
                </span>

                <span className="rounded border border-white/30 px-1.5 py-0.5">
                  {movie.maturity}
                </span>

                <span className="text-neutral-300">{movie.year}</span>
              </div>
            </div>
          </div>
        </Link>

        <div className="hidden border-t border-white/10 bg-[#111] p-3 sm:block">
          <div className="flex items-center gap-2">
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition hover:bg-neutral-300">
              <Play size={15} fill="currentColor" />
            </button>

            <button
              onClick={handleListClick}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition hover:border-white hover:bg-white/10"
            >
              {isInList ? <Check size={15} /> : <Plus size={15} />}
            </button>

            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition hover:border-white hover:bg-white/10">
              <ThumbsUp size={14} />
            </button>

            <Link
              to={`/movie/${movie.id}`}
              className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition hover:border-white hover:bg-white/10"
            >
              <ChevronDown size={16} />
            </Link>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {movie.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="rounded-full bg-white/5 px-2 py-1 text-[10px] text-neutral-400"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;