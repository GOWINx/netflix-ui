import { useEffect, useRef, useState } from "react";
import {
  Check,
  Info,
  LoaderCircle,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Link } from "react-router-dom";

const Hero = ({ movie, isInList, onToggleList }) => {
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.muted = true;
    video.load();

    const startVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.log("Video autoplay was blocked:", error);
        setIsPlaying(false);
      }
    };

    startVideo();

    return () => {
      video.pause();
    };
  }, [movie.video]);

  const handlePlayPause = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Unable to control video:", error);
    }
  };

  const handleSoundToggle = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
        setIsPlaying(true);
      }

      video.muted = !video.muted;
      setIsMuted(video.muted);
    } catch (error) {
      console.error("Unable to control video sound:", error);
    }
  };

  const handleRestart = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      video.currentTime = 0;
      await video.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Unable to restart video:", error);
    }
  };

  return (
    <section className="relative min-h-[680px] overflow-hidden bg-black sm:min-h-[740px] lg:min-h-[820px]">
      {/* Black loading screen instead of poster image */}
      {!videoReady && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-3 text-neutral-400">
            <LoaderCircle className="animate-spin" size={30} />

            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              Loading cinematic preview
            </p>
          </div>
        </div>
      )}

      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={() => {
          const video = videoRef.current;

          if (video) {
            video.currentTime = 0.01;
          }
        }}
        onCanPlay={() => setVideoReady(true)}
        onCanPlayThrough={() => setVideoReady(true)}
        onPlaying={() => {
          setVideoReady(true);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setVideoReady(false)}
        onError={(event) => {
          console.error("Video loading error:", event);
          setVideoReady(false);
        }}
        className={`absolute left-1/2 top-1/2 h-[100vw] w-[100vh] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-90 object-cover object-center transition-opacity duration-500 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        style={{
          filter: "brightness(0.92) contrast(1.08) saturate(1.08)",
        }}
      >
        <source
          src={movie.video || "/videos/avatar.mp4"}
          type="video/mp4"
        />

        Your browser does not support video playback.
      </video>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 z-[2] bg-black/5" />

      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/95 via-black/55 to-transparent" />

      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#070707] via-transparent to-black/20" />

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/20 via-transparent to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1600px] items-center px-5 pb-28 pt-28 sm:min-h-[740px] sm:px-8 sm:pb-32 lg:min-h-[820px] lg:px-12 lg:pb-36">
        <div className="max-w-2xl">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-md bg-red-600 px-3 py-1 text-xs font-black tracking-[0.2em] text-white">
              N FILM
            </span>

            <span className="text-sm font-semibold text-neutral-200">
              {movie.ranking || "#1 in Movies Today"}
            </span>
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[0.88] tracking-tight text-white drop-shadow-2xl sm:text-7xl lg:text-[82px]">
            {movie.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
            <span className="text-emerald-400">
              {movie.match}% Match
            </span>

            <span>{movie.year}</span>

            <span className="rounded border border-white/40 px-2 py-0.5 text-xs">
              {movie.maturity}
            </span>

            <span>{movie.duration}</span>

            <span className="rounded border border-white/30 px-2 py-0.5 text-xs">
              {movie.quality || "HD"}
            </span>
          </div>

          {movie.genres?.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {movie.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-neutral-300 backdrop-blur-md"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}

          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-200 drop-shadow-md sm:text-lg">
            {movie.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handlePlayPause}
              disabled={!videoReady}
              className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-black shadow-lg transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 sm:px-8"
            >
              {isPlaying ? (
                <>
                  <Pause size={21} fill="currentColor" />
                  Pause
                </>
              ) : (
                <>
                  <Play size={21} fill="currentColor" />
                  Play
                </>
              )}
            </button>

            <Link
              to={`/movie/${movie.id}`}
              className="flex items-center gap-2 rounded-lg bg-neutral-500/65 px-6 py-3 font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-neutral-500/90 sm:px-8"
            >
              <Info size={21} />
              More Info
            </Link>

            <button
              type="button"
              onClick={() => onToggleList(movie)}
              className={`flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition ${
                isInList
                  ? "border-red-500 bg-red-600 text-white"
                  : "border-white/40 bg-black/40 text-white hover:border-white hover:bg-white/15"
              }`}
              aria-label={
                isInList
                  ? "Remove from My List"
                  : "Add to My List"
              }
            >
              {isInList ? <Check size={22} /> : <Plus size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Video controls */}
      <div className="absolute bottom-24 right-5 z-20 flex items-center gap-3 sm:right-10">
        <button
          type="button"
          onClick={handleRestart}
          disabled={!videoReady}
          className="hidden items-center gap-2 rounded-full border border-white/30 bg-black/50 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md transition hover:border-white hover:bg-white/15 disabled:opacity-40 sm:flex"
        >
          <RotateCcw size={15} />
          Restart
        </button>

        <button
          type="button"
          onClick={handleSoundToggle}
          disabled={!videoReady}
          className={`flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition ${
            isMuted
              ? "border-white/40 bg-black/50 text-white hover:bg-white/15"
              : "border-red-500 bg-red-600 text-white shadow-lg shadow-red-600/30"
          } disabled:cursor-not-allowed disabled:opacity-40`}
          aria-label={isMuted ? "Turn sound on" : "Mute video"}
        >
          {isMuted ? (
            <VolumeX size={21} />
          ) : (
            <Volume2 size={21} />
          )}
        </button>
      </div>
    </section>
  );
};

export default Hero;