import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { checkIfImage } from "@/utils";
import { getTopCreators } from "@/utils";

import { useStateContext } from "@/context";
import Footer from "@/PageComponents/Components/Footer";
import Header from "@/PageComponents/Components/Header";

import Hero from "@/PageComponents/HeroSection/Hero";



const index = () => {
    const { address, connect, contract, realEstate, createPropertyFunction, getPropertiesData } = useStateContext();

    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState([]);

    const [form, setForm] = useState({
        propertyTitle: "",
        description: "",
        category: "",
        price: "",
        images: "",
        propertyAddress: "",
    });

    const handleFromFieldChange = (fieldName, e) => {
        setForm({ ...form, [fieldName]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        checkIfImage(form.images, async (exists) => {
            if (exists) {
                setIsLoading(true);
                await createPropertyFunction({
                    ...form,
                    price: ethers.utils.parseUnits(form.price, 18),
                });
                setIsLoading(false);
            } else {
                alert("Please provide valid image URL");
                setForm({ ...form, images: ""});
            }
        });
    };

    const fetchProperty = async () => {
        setIsLoading(true);
        const data = await getPropertiesData();
        setProperties(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (contract) fetchProperty();
    }, [address, contract]);

    // console.log(properties);

    // Categories
    const housing = [];
    const country = [];
    const farmhouse = [];
    const office = [];
    const commercial = [];
    const rental = [];

    if(!isLoading) {
        properties.map((el, i) => {
            if (el.country === "Country") {
                country.push(el);
            } else if (el.category === "Commercial") {
                commercial.push(el);
            } else if (el.category === "Office") {
                office.push(el);
            } else if (el.category === "FarmHouse") {
                farmhouse.push(el);
            } else if (el.category === "Housing") {
                housing.push(el);
            } else if (el.category === "Rental") {
                rental.push(el);
            }
        });
    }
    // creators
    const creators = getTopCreators(properties);
    // console.log(creator);
    // return (
    //     <div>
    //         <h1>{realEstate}</h1>
    //         <button onClick={() => connect()}>Connect</button>
    //         {/* <p>{address}</p> */}
    //         <h1>Create</h1>
    //         <form onSubmit={handleSubmit}>
    //             <div>
    //                 <input type="text" placeholder="propertyTitle" onChange={(e) => handleFromFieldChange("propertyTitle", e)} />
    //             </div>

    //             <div>
    //                 <input type="text" placeholder="description" onChange={(e) => handleFromFieldChange("description", e)} />
    //             </div>

    //             <div>
    //                 <input type="text" placeholder="category" onChange={(e) => handleFromFieldChange("category", e)} />
    //             </div>

    //             <div>
    //                 <input type="number" placeholder="price" onChange={(e) => handleFromFieldChange("price", e)} />
    //             </div>

    //             <div>
    //                 <input type="url" placeholder="images" onChange={(e) => handleFromFieldChange("images", e)} />
    //             </div>

    //             <div>
    //                 <input type="text" placeholder="propertyAddress" onChange={(e) => handleFromFieldChange("propertyAddress", e)} />
    //             </div>

    //             <button type="submit">Submit</button>                

    //         </form>
    //     </div>
    // );

    return <div>
        <Header />
        <Hero />
        {/* <Banner />
        <Live properties={properties}/>
        <Service />        
        <Product properties={properties}/>
        <TopSeller creators={creators}/>
        <Collection housing={housing?.length} rental={rental?.length} farmhouse={farmhouse?.length} office={office?.length} />
        <Copyright /> */}
        <Footer />
        
    </div>;

    // return <h1>Index</h1>;

};

export default index;