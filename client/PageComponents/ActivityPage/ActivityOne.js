import React from "react";
import { getTopCreators } from "@/utils";
import activity from "@/pages/activity";
import Link from "next/link";

const ActivityOne = ({ properties, totalReviews, popular }) => {
    const creators = getTopCreators(properties);

    return (
        <section>
            <div className="content">
                <div className="Activity-content-heading">
                    <div className="Activity-content-title">
                        <p>All Following Activity</p>
                    </div>
                </div>
                <div className="Activity-content-content">
                    <div className="Activity-content-contents">
                        <div className="Activity-pane">
                            {properties?.map((activity, i) => (
                            <div className="Activity-box">
                                <div className="Activity-box-logo">
                                    <img src={activity.image} alt="" />
                                </div>
                                <div className="Activity-box-content">
                                    <div className="Activity-box-title">
                                        <p>{activity.title.slice(0, 25)}</p>
                                    </div>
                                    <div className="Activity-box-name">
                                        <p>Price Tag</p>
                                    </div>
                                    <div className="Activity-box-subname">
                                        <p>Today, 2:00 AM</p>
                                    </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        <div className="Activity-on-pane">
                            <div className="Activity-on-section">
                                <div className="Activity-on-pane-heading">
                                    <p>Analytics Stat</p>
                                </div>
                                <div className="Activity-on-pane-content">
                                    <div className="Activity-on-pane-box">
                                        <p>Total Property: {properties.length} </p>
                                    </div>
                                    <div className="Activity-on-pane-box">
                                        <p>Users: {creators.length}</p>
                                    </div>
                                    <div className="Activity-on-pane-box">
                                        <p>Reviews: {totalReviews}</p>
                                    </div>
                                    <div className="Activity-on-pane-box">
                                        <p>new data is here</p>
                                    </div>
                                </div>

                                <div className="Activity-on-pane-content">
                                    <div className="Activity-on-pane-box">
                                        <p>Statistics</p>
                                    </div>
                                    <div className="Activity-on-pane-box">
                                        <p>Stats</p>
                                    </div>
                                </div>
                            </div>
                            <div className="Activity-on-section">
                                <div className="Activity-on-pane-heading">
                                    <p>Categories</p>
                                </div>
                                <div className="Activity-on-pane-content">
                                    <div className="Activity-on-pane-box">
                                        <p>Country</p>
                                    </div>
                                </div>
                                <div className="Activity-on-pane-content">
                                    <div className="Activity-on-pane-box">
                                        <p>Office</p>
                                    </div>
                                    <div className="Activity-on-pane-box">
                                        <p>Rental</p>
                                    </div>
                                    <div className="Activity-on-pane-box">
                                        <p>Farmhouse</p>
                                    </div>
                                </div>
                                <div className="Activity-on-pane-content">
                                    <div className="Activity-on-pane-box">
                                        <p>Commercial</p>
                                    </div>
                                    <div className="Activity-on-pane-box">
                                        <p>Housing</p>
                                    </div>
                                    <div className="Activity-on-pane-box">
                                        <p>Others</p>
                                    </div>
                                    <div className="Activity-on-pane-box">
                                        <p>New Categories</p>
                                    </div>
                                </div>
                            </div>
                            <div className="Activity-on-section">
                                <div className="Activity-on-pane-heading">
                                    <p>Popular Property</p>
                                </div>
                                <div className="Activity-on-pane-content">
                                    
                                    <div className="Activity-on-pane-box">
                                        {/* <Link href={{ pathname: `/category/${activity.category}`,}} >
                                            {activity.category}
                                        </Link> */}
                                        <Link
                                        href={{
                                            pathname: `/propertyView`,
                                            query: { property: `${popular}` },
                                        }}
                                        
                                        >
                                        Check Now
                                        </Link>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ActivityOne;