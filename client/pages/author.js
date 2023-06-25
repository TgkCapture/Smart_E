import React, {useState, useEffect} from "react";
import Header from "@/PageComponents/Components/Header";
import Footer from "@/PageComponents/Components/Footer";
import { useStateContext } from "@/context";
import AuthorOne from "@/PageComponents/AuthorPage/AuthorOne";

const author = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState([]);
    const [author, setAuthor] = useState([]);
    const [property, setProperty] = useState();

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
            property={property}
            />
            <Footer />
        </div>
    );
}; 

export default author;