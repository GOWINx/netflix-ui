import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";

const links = [
  { name: "Home", path: "/" },
  { name: "TV Shows", path: "/tv-shows" },
  { name: "Movies", path: "/movies" },
  { name: "My List", path: "/my-list" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-black/90 shadow-2xl shadow-black/40 backdrop-blur-xl"
          : "bg-gradient-to-b from-black/90 via-black/50 to-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-2xl font-black tracking-tighter text-red-600 sm:text-3xl"
          >
            NETFLIX
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative text-sm font-medium transition ${
                    isActive
                      ? "text-white"
                      : "text-neutral-300 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}

                    {isActive && (
                      <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-red-600" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <div
            className={`hidden overflow-hidden rounded-full border transition-all duration-300 sm:flex ${
              searchOpen
                ? "w-56 border-white/30 bg-black/80"
                : "w-10 border-transparent bg-transparent"
            }`}
          >
            <button
              onClick={() => setSearchOpen((previous) => !previous)}
              className="flex h-10 min-w-10 items-center justify-center"
              aria-label="Open search"
            >
              <Search size={19} />
            </button>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Titles, people, genres"
              className="w-full bg-transparent pr-4 text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </div>

          <button
            className="relative hidden transition hover:text-red-500 sm:block"
            aria-label="Notifications"
          >
            <Bell size={20} />

            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-600 ring-2 ring-black" />
          </button>

          <button className="hidden items-center gap-2 sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-red-600 to-red-900 shadow-lg shadow-red-950/40">
              <UserRound size={19} />
            </span>

            <ChevronDown size={15} />
          </button>

          <button
            onClick={() => setMobileMenuOpen((previous) => !previous)}
            className="rounded-lg border border-white/10 bg-white/5 p-2 transition hover:bg-white/10 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-5 py-5 backdrop-blur-xl lg:hidden">
          <div className="mb-5 flex items-center rounded-xl border border-white/10 bg-white/5 px-3">
            <Search size={18} className="text-neutral-400" />

            <input
              type="text"
              placeholder="Search movies and shows"
              className="w-full bg-transparent px-3 py-3 text-sm outline-none"
            />
          </div>

          <div className="space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-red-600 text-white"
                      : "text-neutral-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;