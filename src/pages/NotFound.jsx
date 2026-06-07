import { ArrowLeft, Film } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex min-h-screen items-center justify-center px-5 text-center">
      <div>
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-600/10 text-red-500">
          <Film size={36} />
        </span>

        <h1 className="mt-7 text-8xl font-black text-red-600">
          404
        </h1>

        <h2 className="mt-3 text-3xl font-bold">
          Lost in the streaming universe
        </h2>

        <p className="mx-auto mt-4 max-w-md text-neutral-500">
          The page you are searching for is unavailable or has been
          removed.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-black transition hover:bg-neutral-300"
        >
          <ArrowLeft size={19} />
          Return Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;