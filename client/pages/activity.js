import React, { useEffect, useState } from "react";
import ActivityOne from "@/PageComponents/ActivityPage/ActivityOne";
import Footer from "@/PageComponents/Components/Footer";
import Header from "@/PageComponents/Components/Header";


const activity = () => {

    const [properties, setProperties] = useState([]);
    const [totalReviews, setTotalReviews] = useState();


    return (
        <div>
            <Header />
            <ActivityOne />
            <Footer />
        </div>
    );
};

export default activity;