import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Film,
  LoaderCircle,
  Pause,
  Play,
  Search,
  Tv,
  Volume2,
  VolumeX,
} from "lucide-react";

import { movies } from "../data/movies";
import MovieCard from "./MovieCard";

const BrowsePage = ({
  title,
  subtitle,
  type,

  collectionName = "Netflix Collection",
  backgroundVideo = "",
  videoHeading = "",
  videoDescription = "",

  rotateVideo = false,
  rotationDirection = "left",

  featuredLabel = "Featured Cinematic Experience",
  matchText = "98% Match",
  releaseText = "2026",
  ageText = "13+",
  qualityText = "4K Ultra HD",
}) => {
  const desktopVideoRef = useRef(null);
  const mobileVideoRef = useRef(null);

  const [search, setSearch] = useState("");
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const [myList, setMyList] = useState(() => {
    try {
      const savedList = localStorage.getItem(
        "my-streaming-list",
      );

      return savedList ? JSON.parse(savedList) : [];
    } catch (error) {
      console.error("Could not load My List:", error);
      return [];
    }
  });

  const getActiveVideo = useCallback(() => {
    if (window.innerWidth >= 1024) {
      return desktopVideoRef.current;
    }

    return mobileVideoRef.current;
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "my-streaming-list",
      JSON.stringify(myList),
    );
  }, [myList]);

  /*
   * Reset and load the new video whenever the user moves
   * between Movies and TV Shows.
   */
  useEffect(() => {
    if (!backgroundVideo) return;

    setVideoLoaded(false);
    setVideoError(false);
    setIsVideoPlaying(false);
    setIsMuted(true);

    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    const prepareVideo = (video) => {
      if (!video) return;

      video.pause();
      video.muted = true;
      video.currentTime = 0;
      video.load();
    };

    prepareVideo(desktopVideo);
    prepareVideo(mobileVideo);

    return () => {
      desktopVideoRef.current?.pause();
      mobileVideoRef.current?.pause();
    };
  }, [backgroundVideo]);

  const filteredMovies = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return movies.filter((movie) => {
      const matchesType = movie.type === type;

      const matchesTitle = movie.title
        .toLowerCase()
        .includes(searchValue);

      const matchesGenre = movie.genres?.some((genre) =>
        genre.toLowerCase().includes(searchValue),
      );

      const matchesSearch =
        searchValue === "" || matchesTitle || matchesGenre;

      return matchesType && matchesSearch;
    });
  }, [search, type]);

  const handleToggleList = useCallback((selectedMovie) => {
    setMyList((currentList) => {
      const movieExists = currentList.some(
        (movie) => movie.id === selectedMovie.id,
      );

      if (movieExists) {
        return currentList.filter(
          (movie) => movie.id !== selectedMovie.id,
        );
      }

      return [...currentList, selectedMovie];
    });
  }, []);

  const startVideo = async (video) => {
    if (!video) return;

    try {
      video.muted = true;
      await video.play();

      setIsMuted(true);
      setIsVideoPlaying(true);
      setVideoLoaded(true);
    } catch (error) {
      console.log("Video autoplay was blocked:", error);
      setIsVideoPlaying(false);
    }
  };

  const handleDesktopCanPlay = async () => {
    if (window.innerWidth < 1024) return;

    await startVideo(desktopVideoRef.current);
  };

  const handleMobileCanPlay = async () => {
    if (window.innerWidth >= 1024) return;

    await startVideo(mobileVideoRef.current);
  };

  const handleVideoPlaying = () => {
    setVideoLoaded(true);
    setVideoError(false);
    setIsVideoPlaying(true);
  };

  const handleVideoWaiting = () => {
    setVideoLoaded(false);
  };

  const handleVideoError = (event) => {
    console.error("Video loading error:", event);

    setVideoError(true);
    setVideoLoaded(false);
    setIsVideoPlaying(false);
  };

  const handlePlayPause = async () => {
    const video = getActiveVideo();

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();

        setIsVideoPlaying(true);
        setVideoLoaded(true);
      } else {
        video.pause();
        setIsVideoPlaying(false);
      }
    } catch (error) {
      console.error("Unable to control video:", error);
    }
  };

  const handleSoundToggle = async () => {
    const video = getActiveVideo();

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();

        setIsVideoPlaying(true);
        setVideoLoaded(true);
      }

      video.muted = !video.muted;
      setIsMuted(video.muted);
    } catch (error) {
      console.error("Unable to control video sound:", error);
    }
  };

  const Icon = type === "tv" ? Tv : Film;

  const rotationClass =
    rotationDirection === "right"
      ? "rotate-90"
      : "-rotate-90";

  const desktopVideoClasses = rotateVideo
    ? `
      absolute left-1/2 top-1/2
      h-[58vw] min-h-[620px] max-h-[900px]
      w-[520px] max-w-none
      -translate-x-1/2 -translate-y-1/2
      ${rotationClass}
      object-cover object-center
    `
    : `
      absolute inset-0
      h-full w-full
      object-cover object-center
    `;

  const mobileVideoClasses = rotateVideo
    ? `
      absolute left-1/2 top-1/2
      h-[115vw] min-h-[480px]
      w-[480px] max-w-none
      -translate-x-1/2 -translate-y-1/2
      ${rotationClass}
      object-cover object-center
    `
    : `
      absolute inset-0
      h-full w-full
      object-cover object-center
    `;

  const blurredBackgroundClasses = rotateVideo
    ? `
      absolute left-1/2 top-1/2
      h-[110vw] w-[110vh]
      max-w-none
      -translate-x-1/2 -translate-y-1/2
      ${rotationClass}
      scale-125 object-cover object-center
      opacity-50 blur-2xl
    `
    : `
      absolute inset-0
      h-full w-full
      scale-110 object-cover object-center
      opacity-50 blur-2xl
    `;

  return (
    <section className="min-h-screen bg-[#070707] px-4 pb-20 pt-28 text-white sm:px-7 lg:px-10">
      <div className="mx-auto max-w-[1500px]">
        {backgroundVideo ? (
          <header className="relative min-h-[440px] overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl shadow-black/60 sm:min-h-[480px] lg:min-h-[520px]">
            {/* Loading screen */}
            {!videoLoaded && !videoError && (
              <div className="absolute inset-0 z-[1] flex items-center justify-center bg-gradient-to-br from-black via-[#120808] to-black">
                <div className="flex flex-col items-center gap-3 text-neutral-400">
                  <LoaderCircle
                    size={30}
                    className="animate-spin text-red-500"
                  />

                  <p className="text-xs font-bold uppercase tracking-[0.25em]">
                    Loading preview
                  </p>
                </div>
              </div>
            )}

            {/* Error message */}
            {videoError && (
              <div className="absolute inset-0 z-[1] flex items-center justify-center bg-black">
                <div className="max-w-md px-6 text-center">
                  <p className="text-lg font-bold">
                    Preview unavailable
                  </p>

                  <p className="mt-2 text-sm text-neutral-500">
                    Check that the video file exists in the public/videos
                    folder.
                  </p>
                </div>
              </div>
            )}

            {/* Blurred moving background */}
            <div className="absolute inset-0 overflow-hidden">
              <video
                key={`background-${backgroundVideo}`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                className={blurredBackgroundClasses}
              >
                <source
                  src={backgroundVideo}
                  type="video/mp4"
                />
              </video>
            </div>

            <div className="absolute inset-0 bg-black/25" />

            {/* Desktop video */}
            <div className="absolute bottom-0 right-0 top-0 hidden w-[58%] overflow-hidden lg:block">
              <video
                key={`desktop-${backgroundVideo}`}
                ref={desktopVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={handleDesktopCanPlay}
                onCanPlay={handleDesktopCanPlay}
                onPlaying={handleVideoPlaying}
                onWaiting={handleVideoWaiting}
                onStalled={handleVideoWaiting}
                onPause={() => setIsVideoPlaying(false)}
                onError={handleVideoError}
                className={`${desktopVideoClasses} transition-opacity duration-500 ${
                  videoLoaded ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  filter:
                    "brightness(0.94) contrast(1.08) saturate(1.12)",
                }}
              >
                <source
                  src={backgroundVideo}
                  type="video/mp4"
                />

                Your browser does not support video playback.
              </video>

              <div className="absolute inset-y-0 left-0 z-10 w-[45%] bg-gradient-to-r from-black via-black/75 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Mobile and tablet video */}
            <div className="absolute inset-0 overflow-hidden lg:hidden">
              <video
                key={`mobile-${backgroundVideo}`}
                ref={mobileVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                onLoadedData={handleMobileCanPlay}
                onCanPlay={handleMobileCanPlay}
                onPlaying={handleVideoPlaying}
                onWaiting={handleVideoWaiting}
                onStalled={handleVideoWaiting}
                onPause={() => setIsVideoPlaying(false)}
                onError={handleVideoError}
                className={`${mobileVideoClasses} transition-opacity duration-500 ${
                  videoLoaded ? "opacity-75" : "opacity-0"
                }`}
                style={{
                  filter:
                    "brightness(0.82) contrast(1.08) saturate(1.1)",
                }}
              >
                <source
                  src={backgroundVideo}
                  type="video/mp4"
                />

                Your browser does not support video playback.
              </video>
            </div>

            {/* Main overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/5" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/15" />

            <div className="absolute -right-20 top-1/2 h-[430px] w-[430px] -translate-y-1/2 rounded-full bg-red-600/10 blur-[130px]" />

            {/* Content */}
            <div className="relative z-20 flex min-h-[440px] flex-col justify-center p-7 sm:min-h-[480px] sm:p-10 lg:min-h-[520px] lg:w-[62%] lg:px-12 lg:py-10 xl:w-[60%] xl:px-14">
              <div className="mb-5 flex items-center gap-3 text-red-500">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-600/15 shadow-lg shadow-red-950/30">
                  <Icon size={23} />
                </span>

                <span className="text-xs font-black uppercase tracking-[0.28em] sm:text-sm">
                  {collectionName}
                </span>
              </div>

              <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">
                {featuredLabel}
              </p>

              <h1 className="max-w-[720px] text-4xl font-black leading-[0.92] tracking-tight sm:text-6xl lg:text-[64px] xl:text-[72px]">
                {videoHeading || title}
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-neutral-300 sm:text-base lg:text-[17px]">
                {videoDescription || subtitle}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  disabled={!videoLoaded || videoError}
                  className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-black shadow-lg transition duration-300 hover:scale-[1.03] hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isVideoPlaying ? (
                    <>
                      <Pause size={19} fill="currentColor" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play size={19} fill="currentColor" />
                      Play
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSoundToggle}
                  disabled={!videoLoaded || videoError}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition duration-300 ${
                    isMuted
                      ? "border-white/40 bg-black/50 hover:border-white hover:bg-white/15"
                      : "border-red-500 bg-red-600 shadow-lg shadow-red-600/30"
                  } disabled:cursor-not-allowed disabled:opacity-50`}
                  aria-label={
                    isMuted
                      ? "Turn video sound on"
                      : "Mute video"
                  }
                >
                  {isMuted ? (
                    <VolumeX size={20} />
                  ) : (
                    <Volume2 size={20} />
                  )}
                </button>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-300">
                <span className="text-emerald-400">
                  {matchText}
                </span>

                <span>{releaseText}</span>

                <span className="rounded border border-white/30 px-2 py-0.5">
                  {ageText}
                </span>

                <span>{qualityText}</span>
              </div>
            </div>
          </header>
        ) : (
          <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-red-950/50 via-[#111] to-black p-6 sm:p-9">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/10 blur-[90px]" />

            <div className="relative">
              <div className="mb-4 flex items-center gap-3 text-red-500">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-600/15">
                  <Icon size={23} />
                </span>

                <span className="text-xs font-bold uppercase tracking-[0.25em]">
                  {collectionName}
                </span>
              </div>

              <h1 className="text-4xl font-black sm:text-6xl">
                {title}
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
                {subtitle}
              </p>
            </div>
          </header>
        )}

        {/* Explore and search */}
        <div className="mb-7 mt-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <h2 className="text-2xl font-black">
              Explore {title}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {filteredMovies.length} titles available
            </p>
          </div>

          <div className="flex w-full max-w-md items-center rounded-xl border border-white/10 bg-[#111] px-4 shadow-lg transition focus-within:border-red-500/50 lg:w-[400px]">
            <Search size={18} className="text-neutral-500" />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder={`Search ${title.toLowerCase()}`}
              className="w-full bg-transparent px-3 py-3.5 text-sm text-white outline-none placeholder:text-neutral-600"
            />
          </div>
        </div>

        {/* Cards */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                layout="grid"
                isInList={myList.some(
                  (savedMovie) =>
                    savedMovie.id === movie.id,
                )}
                onToggleList={handleToggleList}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-5 text-center">
            <Search size={36} className="text-neutral-600" />

            <h3 className="mt-5 text-xl font-bold">
              No titles found
            </h3>

            <p className="mt-2 text-neutral-500">
              Search using another title or genre.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BrowsePage;