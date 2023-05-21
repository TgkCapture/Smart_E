import React, {useEffect, useContext, createContext} from "react";

import {useAddress, useContract, useMetamask, useContractWrite, useContractRead, useContractEvents, } from "@thirdweb-dev/react";

import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract("0x7c9Ede0a2951EE48FD2bC590b7DAA44E5C9CDaAF");

    const address = useAddress();
    const connect = useMetamask();

    const realEstate = "Smart E Dapp";

    // 1:list property
    const { mutateAsync: listProperty, isLoading} = useContractWrite(contract, "listProperty");

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
        const data = await listProperty({ args: [address, price, propertyTitle, category, images, propertyAddress, description], });
        console.info("contract call successs", data);
        } catch (err) {
        console.error("contract call failure", err);
        }
    } 

    // 2:update property
    const { mutateAsync: updateProperty, isLoading: updatePropertyLoading } = useContractWrite(contract, "updateProperty");

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

            console.log("Contract call successfully update", data);
        } catch (error) {
            console.log("Error while updating", error);
        }
    };

    // 3:update price
    const { mutateAsync: updatePrice, isLoading: updatePriceLoading } = useContractWrite(contract, "updatePrice");

    const updatePriceFunction = async (form) => {
        const { productId, price } = form;

        try {
            const data = await updatePrice([address, productId, price]);

            console.log("Transaction Success", data);
        } catch (error) {
            console.log("fail transaction", error);
        }
    };

    // 4:buy property
    const { mutateAsync: buyProperty, isLoading: buyPropertyLoading } = useContractWrite(contract, "buyProperty");

    const buyPropertyFunction =async (from) => {
        const { id } = from;
        try {
            const data = await buyProperty({ args: [id, address] });
            console.log("Purchase Successful", data);
        } catch (error) {
            console.log("Purchase failed", error);
        }
    };

    // 5:add review
    // const { mutateAsync: addReview, isLoading: addReviewLoading } = useContractWrite(contract, "addReview");

    // const addReviewFunction = async (from) => {
    //     const {productId, rating, comment } = from;

    //     try {
    //         const data = await addReview({
    //             args: [productId, rating, comment, address],
    //         });

    //         console.log("Review added", data);
    //     } catch (error) {
    //         console.log("failed to add review", error);
    //     }
    // };

    // 6: like review
    // const { mutateAsync: likeReview, isLoading: likeReviewLoading } = useContractWrite(contract, "likeReview");

    // const likeReviewFunction = async (from) => {
    //     const {productId, reviewIndex} = from;

    //     try {
    //         const data = await likeReview({
    //             args: [productId, reviewIndex, address],
    //         });
    //         console.log("Commented Liked", data);
    //     } catch (error) {
    //         console.log("like failed", error);
    //     }
    // };

    // 7:get all property
    const getPropertiesData = async () => {
        try {
            const properties = await contract.call("getAllProperty"); //fix needed

            const parsedProperties = properties.map((property, i) => ({
                owner: property.owner,
                title: property.propertyTitle,
                description: property.description,
                category: property.category,
                price: ethers.utils.formatEther(property.price.toString()),
                productId: property.productID.toNumber(),
                // reviewers: property.reviewers,
                // reviews: property.reviews,
                Image: property.images,
                address: property.propertyAddress,

            }));

            return parsedProperties;
            // console.log(properties);
        } catch (error) {
            console.log("Error while loading data", error);
        }
    };

    // 8: get highest product
    // const {data: getHighestratedProduct, isLoading: getHighestratedProductLoading} = useContractRead(contract, "getHighestratedProduct");

    // 9: getProductReviews
    // const getProductReviewsFunction = (productId) => {
    //     try {
    //         const {data: getProductReviews, isLoading: getProductReviewsLoading} = useContractRead(contract, "getProductReviews");

            //   return getProductReviews, getProductReviewsLoading;  
    //     } catch (error) {
    //         console.log("failed to get property reviews", error);
    //     }
    // };


    // 10: get property
    const getPropertyFunction = (id) => {
        try {
            const { data: getProperty, isLoading: getPropertyLoading } = useContractRead("getProperty", [id]);
            return getProperty, getPropertyLoading;
        } catch (error) {
            console.log("can not retrieve property", error);
        }
    };

    // 11: getUserProperties
    const getUserPropertiesFunction = () => {
        try {
            const { data: getUserProperties, isLoading: getUserPropertiesLoading } = useContractRead("getUserProperties", [address]);

            return getUserProperties, getUserPropertiesLoading;
        } catch (error) {
            console.log("Error while getting user Property", error);
        }
    }

    // 12: get user review
    // const getUserReviewsFunction = () => {
    //     try {
    //         const { data: getUserReviews, isLoading: getUserReviewsLoading } = useContractRead("getUserReviews", [address]);

    //         return getUserReviews, getUserReviewsLoading;
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // };


    // 13: total property
    const totalPropertyFunction = () => {
        try {
            const { data: totalProperty, isLoading: totalPropertyLoading } = useContract(contract, "propertyIndex");

            return totalProperty, totalPropertyLoading;
        } catch (error) {
            console.log(error);
        }
    };

    // 14:total review
    // const totalReviewsFunction = () => {
    //     try {
    //         const { data: totalReviewsCount, isLoading: totalReviewsCountLoading } = useContract(contract, "reviewsCounter");
    //         return totalReviewsCount, totalReviewsCountLoading;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };



    // events
    const {data: event } = useContractEvents(contract, "PropertyListed");
    
    const {data: allEvents } = useContractEvents(contract);

    const {data: eventWithoutListener } = useContractEvents(contract, undefined, { subscribe: false,});



    return (
        <StateContext.Provider value={{
            address, connect, contract, realEstate, 
            createPropertyFunction, 
            getPropertiesData, 
            updatePriceFunction, 
            updatePropertyFunction, 
            // getProductReviewsFunction,
            // likeReviewFunction,
            // addReviewFunction,
            // getHighestratedProduct,
            // getUserReviewsFunction,
            // totalReviewsFunction,
            getPropertyFunction,
            buyPropertyFunction, 
            getUserPropertiesFunction,
            totalPropertyFunction,
            
            }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);