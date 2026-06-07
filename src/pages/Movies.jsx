import BrowsePage from "../components/BrowsePage";

const Movies = () => {
  return (
    <BrowsePage
      title="Movies"
      subtitle="Explore Avengers, Spider-Man, Venom, Black Panther, Doctor Strange and more."
      type="movie"
      collectionName="Marvel Collection"
      backgroundVideo="/videos/dragon.mp4"
      videoHeading="Enter the Dragon World"
      videoDescription="Discover powerful creatures, legendary battles and breathtaking cinematic adventures."
      featuredLabel="Featured Cinematic Experience"
      matchText="98% Match"
      releaseText="2026"
      ageText="13+"
      qualityText="4K Ultra HD"
      rotateVideo={true}
      rotationDirection="left"
    />
  );
};

export default Movies;