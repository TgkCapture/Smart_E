import React, {useState, useEffect} from "react";

// TODO: import author components

import Header from "@/PageComponents/Components/Header";
import Footer from "@/PageComponents/Components/Footer";
import { useStateContext } from "@/context";
import AuthorOne from "@/PageComponents/AuthorPage/AuthorOne";

const author = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState([]);
    const [author, setAuthor] = useState([]);

    const { address, contract, getUserPropertiesFunction, getPropertiesData } = useStateContext;

    const fetchProperty = async () => {
        setIsLoading(true);
        const data = await getPropertiesData();
        const authorData = await getUserPropertiesFunction();

        setAuthor(authorData);
        setProperties(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (contract) fetchProperty();
    }, [address, contract]);

    return (
        <div>
            <Header />
            <AuthorOne 
            address={address}
            author={author}
            properties={properties}
            
            />
            {/* 
            <AuthorTwo address={address} author={author}/>
            <AuthorThree properties={properties} author={author} />
            <AuthorFour />
            <AuthorFive />
            <Footer /> */}


            <Footer />
        </div>
    );
}; 

export default author;