import React from 'react';
import './aboutus.css'
import { TeamData, usjData } from "./data";
import TeamCard from "./team-card";
import Aboutimage from '../../images/about-us.png'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  

const AboutUs = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="about-us-container">
      <div className='head'>
        <img src={Aboutimage} alt="About us image" />
        <div>
          <h2>About US</h2>
          <p>
          Welcome to Lithium Power, where energy storage meets sustainability!
At Lithium Power, we harness the power of lithium batteries to create efficient, eco-friendly energy solutions. Our platform helps individuals and businesses store and share energy, reducing reliance on traditional grids and supporting a greener future.
          </p>
        </div>
      </div> 
      
      <div className='accordion'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ backgroundColor: '#57c1ff', color: 'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#FFFF' }}/>}
          aria-controls="panel1bh-content"
          id="panel1"
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold' }}>
            Our Vision
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          At Lithium Power, we envision a world where everyone contributes to a cleaner, more sustainable future. By connecting individuals and businesses with efficient energy storage solutions, we aim to create a community-driven platform that reduces our collective carbon footprint and promotes shared responsibility for the environment.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ backgroundColor: '#57c1ff', color: 'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#FFFF' }} />}
          aria-controls="panel2bh-content"
          id="panel2"
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold' }}>How It Works</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="seller-container">
            <h4>For Sellers</h4>
            <p>
            If you have excess stored energy in your lithium batteries, Lithium Power gives you the opportunity to turn that surplus into a valuable resource. Simply create a profile, list the amount of available energy, and set your sharing preferences. Your community members can then discover and utilize your stored energy, helping to create a more sustainable and interconnected neighborhood.
            </p>
          </div>

          <div className="buyer-container">
            <h4>For Buyers</h4>
            <p>
            Looking for a reliable and eco-friendly energy source? Lithium Power makes it easy for you to find local energy providers in your area. Browse available listings, compare options, and connect with sellers who can offer the stored energy you need. Take a step toward reducing your environmental impact and supporting the shift to sustainable energy solutions.
            </p>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{ backgroundColor: '#57c1ff', color: 'white'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: '#FFFF' }} />}
          aria-controls="panel3bh-content"
          id="panel3"
        >
          <Typography sx={{ width: '100%', flexShrink: 0, fontWeight: 'bold' }}>
            Why Choose Lithium Power
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              <li>
                <b>Localized Sustainability:</b> We focus on fostering community connections, enabling you to support local energy providers and minimize transmission losses, making energy storage and distribution more efficient and sustainable.
              </li>
              <li>
                <b>Transparent Transactions:</b>  Our platform ensures transparent, secure, and reliable transactions between buyers and sellers, simplifying the process of sharing and purchasing stored energy.
              </li>
              <li>
                <b>Environmental Impact:</b> By choosing Lithium Power, you play a part in creating a greener future by supporting energy storage solutions that reduce reliance on traditional grids and promote the use of sustainable energy.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>

      <p style={{ textAlign: 'center' }}>
      Join Lithium Power today and be part of the energy storage revolution. Together, we can build a future powered by efficient, sustainable energy solutions that benefit both individuals and communities.
      </p>

      <div>
        <div className="separator"></div>
        <div className="team-intro-container">
            <h1 className="team-title">Our Team</h1>
            <div className="team-members">
                {TeamData.map((member) => (
                    <TeamCard key={member.id} member={member} />
                ))}
            </div>
            
            <div className="usj-container">
            <img src={usjData.photo} alt="USJ Logo" />
            <p className="dr-description">This project was done by Saint Joseph University Engineering Students as a final Web project under the supervision of
                <span className="highlight"> Dr. Anthony Tannoury </span>.
            </p>
            </div>
        </div>
        </div>
    </div>
  );
};

export default AboutUs;
