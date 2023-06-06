import React from "react";
import Loader from "../Components/Loader/Loader";

const ListOne = ({properties, property, buyingProperty, address, isLoading, buyLoading, }) => {
      



    const OnPopup = (id,num) => {
        if(num == 0){
            document.getElementById(id).style.opacity = 1;
            document.getElementById(id).style.visibility = "visible";
        }
        else{
            document.getElementById(id).style.opacity = 0;
            document.getElementById(id).style.visibility = "hidden";
        }
    }

    return(
        <section>
            <div className="content">
                <div className="content-heading">
                    <div className="content-title">
                        <p><span>Home</span> / Properties</p>
                    </div>
                    <div className="content-menu">
                        <div className="content-menu-option on_selected">
                            <button>All</button>
                        </div>
                        <div className="content-menu-option">
                            <button>Expensive</button>
                        </div>
                        <div className="content-menu-option">
                            <button>Cheap</button>
                        </div>
                        <div className="content-menu-option">
                            <button>Medium</button>
                        </div>
                    </div>
                </div>
                <div className="content-content">  
                    {properties
                    .map((property, i) => (
                                   
                        <div>
                            <div className="box" onClick={() => OnPopup(`popup-${i}`,0)}>
                                <div className="box-logo">
                                    {isLoading ? (
                                        <Loader />
                                    ) : (
                                    <img src={property.image} alt="Listed_House" />
                                    )}
                                </div>
                                <div className="box-content">
                                    <div className="box-heading">
                                        <div className="box-name">
                                            <p>{property.title.length >= 25 ? `${property.title.slice(0, 22)}...`: property.title}</p>
                                        </div>
                                        <div className="box-subname">
                                            <p>{property.address}</p>
                                        </div>
                                    </div>
                                    <div className="box-price">
                                        <p>{property.price} MATIC</p>
                                    </div>
                                </div>                        
                            </div> 
                            <div className="popup" id={`popup-${i}`} >
                                <div className="property-pane">
                                    <div className="pane-logo">
                                        <img src={property.image} alt="Property-Preview" />
                                    </div>
                                    <div className="pane-content">
                                        <div className="pane-hide">
                                            <button onClick={() => OnPopup(`popup-${i}`,1)}>
                                                <img src="icons/close.png" alt="" />
                                            </button>
                                        </div>
                                        <div className="pane-heading">
                                            <p>{property.title}</p>
                                        </div>
                                        <div className="pane-contain">
                                            <p>{property.description}</p>
                                        </div>
                                        <hr />

                                        <div className="pane-subname-owner">
                                        <p><bold>Owner: </bold>{property?.owner?.slice(0, 20)}...</p>
                                        </div>
                                        
                                        
                                        <div className="pane-option">
                                            <div className="pane-box">
                                                <div className="pane-name-two">
                                                    <p>Category</p>
                                                </div>
                                                <div className="pane-subname">
                                                    <p>{property.category}</p>
                                                </div>
                                            </div>
                                            <div className="pane-box">
                                                <div className="pane-name-two">
                                                    <p>Reviews</p>
                                                </div>
                                                <div className="pane-subname">
                                                    <p>{property.reviewers.length}</p>
                                                </div>
                                            </div>                                            
                                        </div>

                                        <div className="pane-option">
                                            <div className="pane-box">
                                                <div className="pane-name">
                                                    <p>Price</p>
                                                </div>
                                                <div className="pane-subname">
                                                    <p>{property.price} MATIC</p>
                                                </div>
                                            </div>
                                            <div className="pane-box">
                                                <div className="pane-name">
                                                    <p>Location</p>
                                                </div>
                                                <div className="pane-subname">
                                                    <p>{property.address}</p>
                                                </div>
                                            </div>                                            
                                        </div>
                                        
                                        <div className="pane-button">
                                            <button onClick={() => buyingProperty()}>Buy</button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    
                    ))
                    .slice(0, 5)}                                 
                </div>
            </div>
    </section>
    );
};

export default ListOne;