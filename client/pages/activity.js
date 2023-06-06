import React, { useEffect, useState } from "react";
import ActivityOne from "@/PageComponents/ActivityPage/ActivityOne";
import Footer from "@/PageComponents/Components/Footer";
import Header from "@/PageComponents/Components/Header";
import { useStateContext } from "@/context";


const activity = () => {

    const [properties, setProperties] = useState([]);
    const [totalReviews, setTotalReviews] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const {address, contract, getPropertiesData, totalReviewsFunction, getHighestRatedProduct, } = useStateContext();

    const fetchProperty = async () => {
        setIsLoading(true);
        const data = await getPropertiesData();
        const reviewsLength = await totalReviewsFunction();
        setTotalReviews(reviewsLength);
        setProperties(data);
        setIsLoading(false);
      };
    
      useEffect(() => {
        if (contract) fetchProperty();
      }, [address, contract]);


    return (
        <div>
            <Header />
            <ActivityOne
            properties={properties}
            totalReviews={totalReviews}
            popular={getHighestRatedProduct?.toNumber()}            
            />
            <Footer />
        </div>
    );
};

export default activity;