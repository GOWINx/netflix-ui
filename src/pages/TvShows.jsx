import BrowsePage from "../components/BrowsePage";

const TvShows = () => {
  return (
    <BrowsePage
      title="TV Shows"
      subtitle="Discover live sports, entertainment, documentaries and popular television series."
      type="tv"
      collectionName="TV Live"
      backgroundVideo="/videos/namayar.mp4"
      videoHeading="World Cup Coming Soon..."
      videoDescription="Get ready for live matches, unforgettable goals, expert coverage and the biggest football celebration, coming soon on Namayar TV."
      featuredLabel="Live Sports Experience"
      matchText="Live Coverage"
      releaseText="Coming Soon"
      ageText="All Ages"
      qualityText="Full HD"
      rotateVideo={false}
    />
  );
};

export default TvShows;