import { Html } from "next/document";
import React from "react";

const Hero = () => {

    return (
        <content>
            <section id="Hero">
                <div className="hero-section">
                    <div className="pane">
                        <div className="contain">
                            <div className="heading">
                                <p>Real Estate Agency</p>
                            </div>
                            <div className="heading-head">
                                <p>Find Your Dream House By Us</p>
                            </div>
                            <div className="heaing-content">
                            <p>Welcome to our blockchain-based real estate website, where we bring together the power of technology and the world of property. Our platform is designed to simplify and streamline the entire real estate process. With our secure, transparent, and efficient blockchain system, we are revolutionizing the way people buy and sell real estate. Join us today and experience the future of real estate.</p>
                            </div>
                            <div className="heading-button">
                                <button className="enq-btn">Make An Enquiry</button>
                            </div>
                        </div>
                    </div>
                    <div className="image">
                        <img src="../images/hero-banner.png" alt="hero-banner" className="w-100"></img>
                    </div>
                </div>
            </section>

            {/* About section */}
            <section id="about">
                <div className="about-section">
                    <div className="image">
                        <img src="../images/hero-banner.png" alt="hero-banner" className="w-100"></img>
                    </div>
                    <div className="pane">                   
                        <div className="contain">
                            <div className="about-subtitle">
                                <p className="about-text">About Us</p>
                            </div>
                            <div className="heading-head">
                                <p>The Leading Real Estate Marketplace</p>
                            </div>
                            <div className="heading-content">
                                <p>Welcome to our blockchain-based real estate platform, where we leverage the power of cutting-edge technology to revolutionize the way people buy and sell property. Our team of experts is passionate about real estate and committed to providing a secure, transparent, and efficient experience for our clients. With blockchain, we offer a decentralized system that eliminates intermediaries and reduces transaction costs, enabling faster and more secure real estate transactions. </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Section */}

            <section id="services"> 
                <div className="service-section">

                    <div className="subtitle">
                        <p className="service-subtitle">Our Services</p>
                    </div>

                    <div className="title">
                        <h2 className="h2 service-title">Our Main Focus</h2>
                    </div>

                    <div className="panes">

                        <div className="service-card">

                            <div className="card-icon">
                                <img src="../images/service-1.png"></img>
                            </div>

                            <h3 className="h3 card-title">
                                <a href="propertyView">Buy a home</a> 
                            </h3>

                            <p className="card-text">
                            Buying a house is a great investment that can provide you with a sense of security and stability.
                            </p>

                            <a href="propertyView" className="card-link">
                                <span>Buy A Home</span>
                            </a>                            
                        </div>

                        <div className="service-card">

                            <div className="card-icon">
                                <img src="../images/service-2.png"></img>
                            </div>

                            <h3 className="h3 card-title">
                                <a href="#">Rent a home</a> 
                            </h3>

                            <p className="card-text">
                            Renting a home can provide you with flexibility and convenience, without the responsibility of homeownership.
                            </p>

                            <a href="#" className="card-link">
                                <span>Rent A Home</span>
                            </a>
                            
                        </div>

                        <div className="service-card">

                            <div className="card-icon">
                                <img src="../images/service-3.png"></img>
                            </div>

                            <h3 className="h3 card-title">
                                <a href="create">Sell a home</a> 
                            </h3>

                            <p className="card-text">
                            Our website has a large audience of potential buyers, so you're sure to get top dollar for your home.
                            </p>

                            <a href="create" className="card-link">
                                <span>Sell</span>
                            </a>
                        </div>
                    
                    </div>
                </div>
            </section>

            {/* Contact section */}
            <section id="contact">
                <div className="hero-section">
                    <div className="pane">
                        <div className="contain">
                            <div className="contact-heading">
                                <p>Contact Us</p>
                            </div>
                            <div className="heading-head">
                                <p>Find Your Dream House By Us</p>
                            </div>
                            <div className="heading-content">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae omnis quos illo aliquam sequi porro nihil dolorum delectus? Recusandae optio beatae porro quidem veritatis dignissimos consequatur reprehenderit tempora ex quasi.</p>
                            </div>
                            <div className="Contact-button">
                                <button className="con-btn" >Contact Us</button>
                            </div>
                        </div>
                    </div>
                    <div className="image">
                        <div className="image-box"></div>
                    </div>
                </div>            
            </section>  

        </content>
    );
};

export default Hero;