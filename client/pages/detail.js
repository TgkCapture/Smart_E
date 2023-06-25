import React, { useEffect, useState} from "react";
import { useRouter } from "next/router";
import { useStateContext } from "@/context";

const detail = () => {

    const [property, setProperty] = useState();
    const [parsedReviews, setParsedReviews] = useState();
    const [properties, setProperties] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [updatePriceLoading, setUpdatePriceLoading] = useState(false);
    const [commentLoading,setCommentLoading] = useState(false);
    const [buyLoading, setBuyLoading] = useState(false);

    const {
        address,  
        contract,           
        getPropertiesData, 
        buyPropertyFunction,
        // addReviewFunction,
        // getProductReviewsFunction,
        // likeReviewFunction,
        getPropertyFunction,
        updatePriceFunction,      
    } = useStateContext();

    const router = useRouter();
    const {query} = router;

    const fetchProperty = async () => {
        const data = await getPropertyFunction(query.property);
        const dataReviews = await getProductReviewsFunction(query.property);
        const dataProperties = await getPropertiesData();
        setProperties(dataProperties);
        setProperty(data);
        setParsedReviews(dataReviews);
        setIsLoading(false);
    };

    useEffect(() => {
        if (contract) fetchProperty();
    }, [address, contract]);

    // add review
    // const [review, setReview] = useState({
    //     productID: "",
    //     rating: 4,
    //     Comment: "",
    // });

    // const handleFromFieldChange = (fieldName, e) => {
    //     setReview({...review, [fieldName]: e.target.value });
    // };

    // const createReview = async () => {
    //     setCommentLoading(true);
    //     const data = await addReviewFunction({...review, productID: property.productID,});
    //     setCommentLoading(false);
    // };

    // // like review
    // const [likeReviews, setLikeReviews] = useState({
    //     productID: "",
    //     reviewIndex: "",
    // });

    // const likeReviewCall = async () => {
    //     const data = await likeReviewFunction({
    //         ...likeReviews,
    //         productID: property.productID,
    //     });
    //     window.location.reload();
    // };

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

    // update price
    const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
        productID: property?.productID,
        price: "",
    });

    const updatepropertyPrice = async() => {
        setUpdatePriceLoading(true);
        await updatePriceFunction({...updatePropertyPrice, productID: property?.productID,});
        setUpdatePriceLoading(false);
        window.location.reload();
    };

    return<></>;
};

export default detail;