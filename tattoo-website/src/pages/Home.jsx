import React from 'react';
import Hero from '../components/Hero';
import FeaturedTattoos from '../components/FeaturedTattoos';
import FeaturedArtists from '../components/FeaturedArtists';
import Testimonials from '../components/Testimonials';

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedTattoos />
      <FeaturedArtists />
      <Testimonials />
    </div>
  );
}

export default Home;

