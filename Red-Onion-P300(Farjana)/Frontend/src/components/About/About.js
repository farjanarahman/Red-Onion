import React from 'react';
import './About.css';
import img1 from '../../Image/adult-blur-blurred-background-687824.png';
import img2 from '../../Image/chef-cook-food-33614.png';
import img3 from '../../Image/architecture-building-city-2047397.png';
import icon1 from '../../ICON/Group 204.png';
import icon2 from '../../ICON/Group 1133.png';
import icon3 from '../../ICON/Group 245.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';


const About = () => {
    return (
        <div className="container">
            <div className="about">
                <div className="about-top">
                    <h2>Why you choose us ?</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, obcaecati odit.</p>
                </div>
                <div className="about-bottom">
                    <div className="quarter-width">
                        <div>
                            <img src={img1} alt=""/>
                        </div>
                        <div>
                            <div className="feature-top">
                                <img src={icon1} alt=""/>
                                <h4>Fast Delivery</h4>
                            </div>
                            <div className="feature-bottom">
                                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illum ducimus totam minus.</p>
                                 <a href="#">See more <FontAwesomeIcon className="arrow" icon={faArrowAltCircleRight} /> </a>
                            </div>
                        </div>
                    </div>
                    <div className="special-width">
                        <div>
                            <img src={img2} alt=""/>
                        </div>
                        <div>
                            <div className="feature-top">
                                <img src={icon2} alt=""/>
                                <h4>A Good Auto Responder </h4>
                            </div>
                            <div className="feature-bottom">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illum ducimus totam minus.</p>
                                <a href="#">See more <FontAwesomeIcon className="arrow" icon={faArrowAltCircleRight} /> </a> 
                            </div>
                        </div>
                    </div>
                    <div className="quarter-width">
                        <div>
                            <img src={img3} alt=""/>
                        </div>
                        <div>
                            <div className="feature-top">
                                <img src={icon3} alt=""/>
                                <h4>Home Delivery</h4>
                            </div>
                            <div className="feature-bottom">
                                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus illum ducimus totam minus.</p>
                                 <a href="#">See more <FontAwesomeIcon className="arrow" icon={faArrowAltCircleRight} /> </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;