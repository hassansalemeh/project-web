import React from 'react';
import Button from '@mui/material/Button';
import AboutUsImage from '../../images/about-us.png';
import './aboutusHome.css';
import { useNavigate } from 'react-router-dom';
import scrollToTop from '../scrollUtils';

const AboutHome = () => {
    const navigate = useNavigate();

    return (
        <section className='AboutUs'>
            <div className='image-container'>
                <img src={AboutUsImage} alt="About us image" className='image'/>
            </div>
            <div className='text-container'>
                <div>
                    <h2>About Us</h2>
                    <p className='paragraphe-1'>Welcome to Lithium Power, where energy storage meets sustainability! Explore a community-driven platform that allows you to store, share, and access eco-friendly energy solutions. Join the green energy movement, connecting individuals and businesses to create a cleaner, more sustainable future. </p>
                </div>

                <div className='grid-1'>
                    <div className='sign-up'>
                        <Button variant="contained" onClick={() => { navigate('/about-us'); scrollToTop(); }} style={{backgroundColor:'#57c1ff',color:'rgba(12, 12, 12, 0.87)',fontWeight:'900',fontSize:'20px',width:'200px',height:'50px',borderRadius:'80px'}}>Learn More</Button>
                    </div>

                </div>
            </div>

        </section>
    );
}

export default AboutHome;
