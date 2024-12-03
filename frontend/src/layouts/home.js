// import HeroSection from '../components/heroSection/heroSection';
import HeroSection from '../components/carousel/carousel';
import Lebanon from '../components/leaflet/leafletMap'
import Navbar from '../components/header/header'
import Cards from '../components/card/scroll'
import Footer from '../components/footer/footer'
import AboutUsHome from '../components/about us/aboutusHome'
import Testimonial from '../components/testimonials/testimonials'
// import AboutUs from '../components/about us/aboutus'
import SearchResults from '../components/header/SearchResults';
import { useState, useRef, useEffect } from 'react';
import Seperator from '../components/seperator';
import { FloatButton } from 'antd';

function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const searchResultsRef = useRef(null);

  const handleSearchResultsChange = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    // Scroll to the SearchResults section when results are available
    if (searchResults.length > 0 && searchResultsRef.current) {
      searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [searchResults]);

  return (
    <div className="Home">
        <Navbar onSearchResultsChange={handleSearchResultsChange} />
        <HeroSection/>
        <Seperator />
        {searchResults.length > 0 && (
          <div ref={searchResultsRef}>
            <SearchResults results={searchResults} />
          </div>
        )}
        <Seperator />
        <Lebanon />
        <Cards />
        <AboutUsHome />
        <Testimonial />
        <Footer />

        <FloatButton.BackTop style={ { marginRight: '2%'} }/>
    </div>
  );
}

export default Home;