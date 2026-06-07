import { useCallback, useState } from "react";
import { Bookmark, Trash2 } from "lucide-react";
import MovieCard from "../components/MovieCard";

const MyList = () => {
  const [myList, setMyList] = useState(() => {
    const savedMovies = localStorage.getItem("my-streaming-list");

    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const handleToggleList = useCallback((selectedMovie) => {
    setMyList((currentList) => {
      const updatedList = currentList.filter(
        (movie) => movie.id !== selectedMovie.id,
      );

      localStorage.setItem(
        "my-streaming-list",
        JSON.stringify(updatedList),
      );

      return updatedList;
    });
  }, []);

  const clearList = () => {
    setMyList([]);
    localStorage.removeItem("my-streaming-list");
  };

  return (
    <section className="min-h-screen px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b border-white/10 pb-7">
          <div>
            <div className="mb-3 flex items-center gap-2 text-red-500">
              <Bookmark size={20} />
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                Your Collection
              </span>
            </div>

            <h1 className="text-4xl font-black sm:text-5xl">
              My List
            </h1>

            <p className="mt-3 text-neutral-400">
              {myList.length} saved{" "}
              {myList.length === 1 ? "title" : "titles"}
            </p>
          </div>

          {myList.length > 0 && (
            <button
              onClick={clearList}
              className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-600 hover:text-white"
            >
              <Trash2 size={17} />
              Clear List
            </button>
          )}
        </div>

        {myList.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-5 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
              <Bookmark size={34} className="text-neutral-500" />
            </span>

            <h2 className="mt-6 text-2xl font-bold">
              Your list is currently empty
            </h2>

            <p className="mt-3 max-w-md text-neutral-500">
              Add movies and shows to your list, and they will appear
              here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {myList.map((movie) => (
            <MovieCard
  key={movie.id}
  movie={movie}
  layout="grid"
  isInList
  onToggleList={handleToggleList}
/>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyList;