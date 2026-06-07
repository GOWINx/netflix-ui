import { useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

const MovieRow = ({
  title,
  subtitle,
  movies,
  myList,
  onToggleList,
}) => {
  const rowReference = useRef(null);

  const scrollRow = useCallback((direction) => {
    if (!rowReference.current) return;

    const amount = rowReference.current.clientWidth * 0.8;

    rowReference.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }, []);

  if (!movies.length) return null;

  return (
    <section className="relative py-7">
      <div className="mb-4 flex items-end justify-between px-5 sm:px-8 lg:px-12">
        <div>
          <h2 className="text-xl font-black sm:text-2xl">{title}</h2>

          {subtitle && (
            <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>

        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollRow("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/15"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            onClick={() => scrollRow("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/15"
          >
            <ChevronRight size={19} />
          </button>
        </div>
      </div>

      <div
        ref={rowReference}
        className="no-scrollbar flex gap-3 overflow-x-auto px-5 pb-6 pt-2 sm:gap-4 sm:px-8 lg:px-12"
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            layout="slider"
            isInList={myList.some(
              (savedMovie) => savedMovie.id === movie.id,
            )}
            onToggleList={onToggleList}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieRow;