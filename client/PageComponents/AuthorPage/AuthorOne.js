 import React from "react";
 import Loader from "../Components/Loader/Loader";

 const AuthorOne = ({properties, address}) => {

    return (
        <section>
            <div className="author-content">
                <div className="author-content-heading">
                    <div className="author-content-title">
                        <p>Account</p>
                    </div>
                </div>
                <div className="author-content-content">
                    <div className="author-content-contents">
                        <div className="author-accounts">
                            <div className="author-accounts-logo">
                                <img src="icons/image_0.jpg" alt="" />
                            </div>
                            <div className="author-accounts-username">
                                <p>Username</p>
                            </div>
                            <div className="author-accounts-pane">
                                <div className="author-accounts-box">
                                    <div className="author-accounts-name">
                                        <p>Likes</p>
                                    </div>
                                    <div className="author-accounts-subname">
                                        <p>234</p>
                                    </div>
                                </div>
                                <div className="author-accounts-box">
                                    <div className="author-accounts-name">
                                        <p>Followers</p>
                                    </div>
                                    <div className="author-accounts-subname">
                                        <p>234</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="author-contents-title">
                        <p>Owned Property</p>
                    </div>
                    <div className="author-content-contain">


                        {properties?.map((props, i) => (
                        <div>       
                        <div className="author-box" > 
                            <div className="author-box-logo">
                                <img src="icons/image_0.jpg" alt="" />
                            </div>
                            <div className="author-box-content">
                                <div className="author-box-heading">
                                    <div className="author-box-name">
                                        <p>House Heading</p>
                                    </div>
                                    <div className="author-box-subname">
                                        <p>Location</p>
                                    </div>
                                </div>
                                <div className="author-box-price">
                                    <p>K10,000,000.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="author-popup" id="">
                            <div className="author-pane">
                                <div className="author-pane-logo">
                                    <img src="icons/image_0.jpg" alt="" />
                                </div>
                                <div className="author-pane-content">
                                    <div className="author-pane-hide">
                                        <button >
                                            <img src="icons/close.png" alt="" />
                                        </button>
                                    </div>
                                    <div className="author-pane-heading">
                                        <p>Housing Heading </p>
                                    </div>
                                    <div className="author-pane-contain">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur obcaecati repudiandae magnam! Aut nemo fugit nam perspiciatis dolore doloremque laborum, totam reiciendis eius nesciunt enim quae id deleniti aliquam soluta!</p>
                                    </div>
                                    <div className="author-pane-option">
                                        <div className="author-pane-box">
                                            <div className="author-pane-name">
                                                <p>Price</p>
                                            </div>
                                            <div className="author-pane-subname">
                                                <p>K10,000,000.00</p>
                                            </div>
                                        </div>
                                        <div className="author-pane-box">
                                            <div className="author-pane-name">
                                                <p>Location</p>
                                            </div>
                                            <div className="author-pane-subname">
                                                <p>Lilongwe</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="author-pane-button">
                                        <button>Buy</button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        </div>
                         ))}                                              
                    </div>
                </div>
            </div>
        </section>        
    )
 };

 export default AuthorOne;