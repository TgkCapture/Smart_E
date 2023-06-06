import Footer from "@/PageComponents/Components/Footer";
import Header from "@/PageComponents/Components/Header";
import React from "react";
import ListOne from "@/PageComponents/ListPage/ListOne";

import { useStateContext } from "@/context";
import { useState, useEffect } from "react";
import { getTopCreators } from "../utils";

const propertyView = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState([]);
    const [property, setProperty] = useState();
    const [buyLoading, setBuyLoading] = useState(false);
  
    const { address, contract, getPropertiesData, buyPropertyFunction, } = useStateContext();

    const fetchProperty = async () => {
        setIsLoading(true);
        const data = await getPropertiesData();
        setProperties(data);
        setIsLoading(false);
      };

      useEffect(() => {
        if (contract) fetchProperty();
      }, [address, contract]);
    
      //CATEGORIES
      const housing = [];
      const rental = [];
      const farmhouse = [];
      const office = [];
      const commercial = [];
      const country = [];
    
      if (!isLoading) {
        properties.map((el) => {
          if (el.category === "country") {
            country.push(el);
          } else if (el.category === "Commercial") {
            commercial.push(el);
          } else if (el.category === "Office") {
            office.push(el);
          } else if (el.category === "Farmhouse") {
            farmhouse.push(el);
          } else if (el.category === "Rental") {
            rental.push(el);
          } else if (el.category === "Housing") {
            housing.push(el);
          }
        });
      }

      // Buy Property
    const buying = {
        productID: property?.productID,
        amount: property?.price,
    };

    const buyingProperty = async () => {
        setBuyLoading(true);
        const data = await buyPropertyFunction(buying);
        setBuyLoading(false);
    };
    
      const creators = getTopCreators(properties);
      console.log(creators);
    
      console.log(housing?.length);
  

    return (
        <div>
            <Header />
            <ListOne 
            properties={properties} 
            property={property} 
            buyingProperty={buyingProperty}
            address={address}
            isLoading={isLoading}
            buyLoading={buyLoading}            
            />

            <Footer />
        </div>
    );

};

export default propertyView;