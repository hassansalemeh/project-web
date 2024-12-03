import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './testimonials.css'
import image1 from './testimonialsImages/image1.jpg'
import image2 from './testimonialsImages/image2.jpg'
import image3 from './testimonialsImages/image3.jpg'

export default class Testimonials extends Component {
    render() {
        return (
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            autoPlay={true}
            interval={6100}
          >
            <div style={{margin: '2%'}}>
              <img src={image1} alt="image 1"/>
              <div className="myCarousel">
                <h3>Shirley Haddad</h3>
                <h4>Designer</h4>
                <p>
                Lithium Power has completely changed how I view energy storage. Storing and sharing energy through their platform is not only environmentally conscious but also a smart financial choice. It’s a community-driven solution that’s truly revolutionizing the way we think about energy!
                </p>
              </div>
            </div>
    
            <div style={{margin: '2%'}}>
              <img src={image2} alt="image 2"/>
              <div className="myCarousel">
                <h3>Daniel Fares</h3>
                <h4>Electrical Engineer</h4>
                <p>
                As a buyer, finding and purchasing stored energy on Lithium Power was effortless. The platform’s transparency and local focus make it my top choice for sustainable energy. Here’s to a cleaner, greener future!
                </p>
              </div>
            </div>
    
            <div style={{margin: '2%'}}>
              <img src={image3} alt="image 3"/>
              <div className="myCarousel">
                <h3>Theo Hajj</h3>
                <h4>CCE</h4>
                <p>
                Joining Lithium Power was a game-changer for our neighborhood. We're not just reducing our energy consumption but building a stronger, more connected community. Proud to be part of the energy storage revolution!
                </p>
              </div>
            </div>
          </Carousel>
        );
      }
    }