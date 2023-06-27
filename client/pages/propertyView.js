import Footer from "@/PageComponents/Components/Footer";
import Header from "@/PageComponents/Components/Header";
import React from "react";
import ListOne from "@/PageComponents/ListPage/ListOne";

import { useStateContext } from "@/context";
import { useState, useEffect } from "react";
import { getTopCreators } from "../utils";

import { useRouter } from "next/router";

const propertyView = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState();
  const [buyLoading, setBuyLoading] = useState(false);

  const { address, contract, getPropertiesData, buyPropertyFunction, getPropertyFunction, } = useStateContext();

  const router = useRouter();
  const { query } = router;

  const fetchProperty = async () => {
    const data = await getPropertyFunction(query.property);
    const dataProperties = await getPropertiesData();
    setProperties(dataProperties);
    setProperty(data);
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

  const buyingProperty = async (num, price) => {
    setBuyLoading(true);
    const data = await buyPropertyFunction(num, price);
    setBuyLoading(false);
    setProperty(data);
  };
  
  const creators = getTopCreators(properties);

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