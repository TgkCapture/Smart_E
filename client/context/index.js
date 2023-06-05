import React, {useState, useEffect, useContext, createContext} from "react";

import {useAddress, useContract, useMetamask, useContractWrite, useContractRead, useContractEvents, useDisconnect, useSigner, useConnectionStatus, } from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => { 
    const { contract } = useContract("0xB3987c547Db342380e23cAaa9074fd15b99F97f6");

    const address = useAddress();
    const connect = useMetamask();

    // front-end
    const disconnect = useDisconnect();
    const ConnectionStatus = useConnectionStatus();
    const signer = useSigner();

    const [userBalance, setUserBalance] = useState();
     

    

    // 1:list property
    // const { mutateAsync: listProperty} = useContractWrite(contract, "listProperty");

    const createPropertyFunction = async (form) => {
        const {
            propertyTitle,
            description,
            category,
            price,
            images,
            propertyAddress,
        } = form;

        try {
            const listingPrice = await contract.call("listingPrice");
            const data = await contract.call("listProperty", [
              address,
              price,
              propertyTitle,
              category,
              images,
              propertyAddress,
              description,
            ]);
      
            console.info("contract call successs", data);
            window.location.reload();
          } catch (err) {
            console.error("contract call failure", err);
        }
    }; 

    // 2:update property
    const { mutateAsync: updateProperty} = useContractWrite(contract, "updateProperty");

    const updatePropertyFunction = async(from) => {
        const {productId, propertyTitle, description, category, images, propertyAddress} = from;

        try {
            const data = await updateProperty({
              args: [
                address,
                productId,
                propertyTitle,
                category,
                images,
                propertyAddress,
                description,
              ],
            });
            console.info("contract call successs", data);
            window.location.reload();
          } catch (err) {
            console.error("contract call failure", err);
          }
    };

    // 3:update price
    const { mutateAsync: updatePrice } = useContractWrite(contract, "updatePrice");

    const updatePriceFunction = async (form) => {
        const { productID, price } = form;
        try {
          const data = await updatePrice({
            args: [address, productID, ethers.utils.parseEther(price)],
          });
          console.info("contract call successs", data);
        } catch (err) {
          console.error("contract call failure", err);
        }
    };

    // 4:buy property
    // const { mutateAsync: buyProperty } = useContractWrite(contract, "buyProperty");

    const buyPropertyFunction = async (buying) => {
        const { productID, amount } = buying;
        const money = ethers.utils.parseEther(amount);
    
        try {
          const data = await contract.call("buyProperty", [productID, address], {
            value: money.toString(),
          });
          console.info("contract call successs", data);
          window.location.reload();
        } catch (err) {
          console.error("contract call failure", err);
        }
    };

    // 5:add review
    const { mutateAsync: addReview } = useContractWrite(contract, "addReview");

    const addReviewFunction = async (from) => {
        const {productID, rating, comment } = from;

        try {
            const data = await addReview({
              args: [productID, rating, comment, address],
            });
            console.info("contract call successs", data);
            window.location.reload();
          } catch (err) {
            console.error("contract call failure", err);
          }
    };

    // 6: like review
    const { mutateAsync: likeReview} = useContractWrite(contract, "likeReview");

    const likeReviewFunction = async (from) => {
        const {productID, reviewIndex} = from;

        try {
            const data = await likeReview({
              args: [productID, reviewIndex, address],
            });
            console.info("contract call successs", data);
            window.location.reload();
          } catch (err) {
            console.error("contract call failure", err);
          }
    };

    // 7:get all property
    const getPropertiesData = async () => {
        
        const properties = await contract.call("getAllProperty");
    
        
        const listingPrice = await contract.call("listingPrice");
        const chargePrice = ethers.utils.formatEther(listingPrice.toString());
    
        
        const balance = await signer?.getBalance();
        const userBalance = address
          ? ethers.utils.formatEther(balance?.toString())
          : "";
        setUserBalance(userBalance);
        const parsedProperties = properties.map((property, i) => ({
          owner: property.owner,
          title: property.propertyTitle,
          description: property.description,
          category: property.category,
          price: ethers.utils.formatEther(property.price.toString()),
          productID: property.productID.toNumber(),
          reviewers: property.reviewers,
          reviews: property.reviews,
          image: property.images,
          address: property.propertyAddress,
        }));
        return parsedProperties;
      };

    // 8: get highest product
    const {data: getHighestRatedProduct} = useContractRead(contract, "getHighestratedProduct");

    // 9: getProductReviews
    const getProductReviewsFunction = async (productId) => {
        try {
            const getProductReviews = await contract.call("getProductReviews", [
             productId,]);

             const parsedReviews = getProductReviews?.map((review, i) => ({
                reviewer: review.reviewer,
                likes: review.likes.toNumber(),
                comment: review.comment,
                rating: review.rating,
                productID: review.productId.toNumber(),
                reviewIndex: review.reviewIndex.toNumber(),
              }));    
            return parsedReviews;
        } catch (error) {
            console.log(error);
        }
    };


    // 10: get property
    const getPropertyFunction = async (id) => {
        const productID = id * 1;

        try {
            const propertyItem = await contract.call("getProperty", [productID]);

            const property = {
                productID: propertyItem?.[0].toNumber(),
                owner: propertyItem?.[1],
                title: propertyItem?.[3],
                category: propertyItem?.[4],
                description: propertyItem?.[7],
                price: ethers.utils.formatEther(propertyItem?.[2].toString()),
                address: propertyItem?.[6],
                images: propertyItem?.[5],
            };

            return property;
           
        } catch (error) {
            console.log(error);
        }
    };

    // 11: getUserProperties
    const getUserPropertiesFunction = async () => {
        try {
            const properties = await contract.call("getUserProperties", [address]);

            const parsedProperties = properties.map((property, i) => ({
                owner: property.owner,
                title: property.propertyTitle,
                description: property.description,
                category: property.category,
                price: ethers.utils.formatEther(property.price.toString()),
                productID: property.productID.toNumber(),
                reviewers: property.reviewers,
                reviews: property.reviews,
                image: property.images,
                address: property.propertyAddress,
            }));
            
            return getUserProperties;
        } catch (error) {
            console.log("Error while getting user Property", error);
        }
    }

    // 12: get user review
    const getUserReviewsFunction = () => {
        try {
            const { data: getUserReviews} = useContractRead("getUserReviews", [address]);

            return getUserReviews;
        } catch (error) {
            console.log("error", error);
        }
    };


    // 13: total property
    const totalPropertyFunction = async () => {
        try {
            const totalProperty = await contract.call("propertyIndex")            
            return totalProperty.toNumber();
        } catch (error) {
            console.log(error);
        }
    };

    // 14:total review
    const totalReviewsFunction = async () => {
        try {
            const totalreviews = await contract.call("reviewsCounter");
            return totalreviews.toNumber();
        } catch (error) {
            console.log(error);
        }
    };



    // events
    const {data: event } = useContractEvents(contract, "PropertyListed");
    
    const {data: allEvents } = useContractEvents(contract);

    const {data: eventWithoutListener } = useContractEvents(contract, undefined, { subscribe: false,});



    return (
        <StateContext.Provider value={{
            //CONTRACT
        address,
        contract,
        connect,
        disconnect,
        //PROPERTY
        createPropertyFunction,
        updatePropertyFunction,
        updatePriceFunction,
        buyPropertyFunction,
        getPropertyFunction,
        getUserPropertiesFunction,
        totalPropertyFunction,
        getPropertiesData,
        //REVIEW
        addReviewFunction,
        likeReviewFunction,
        getProductReviewsFunction,
        getUserReviewsFunction,
        totalReviewsFunction,
        getHighestRatedProduct,
        //STATE VARIABLE
        userBalance,
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);