// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract RealEstate {

    struct Property{
        uint256 productID;
        address owner;
        uint256 price;
        string propertyTitle;
        string category;
        string images;
        string propertyAddress;
        string description;
        address[] reviewers;
        string[] reviews;
    }


    mapping(uint256 => Property) private properties;
    uint256 public propertyIndex;

    event PropertyListed(uint256 indexed id, address indexed owner, uint256 price);
    event PropertySold(uint256 indexed id, address indexed oldOwner, address indexed newOwner, uint256 price);
    event PropertyResold(uint256 indexed id, address indexed oldOwner, address indexed newOwner, uint256 price)


    struct Review {
        address reviewer;
        uint256 productID;
        uint256 rating;
        string comment;
        uint256 likes;
    }

    struct product {
        uint256 productID;
        uint256 totalRating;
        uint256 numReviews;
    }


    mapping(uint256 => Review[]) private reviews;
    mapping(uint256 => uint256[]) private userReviews;
    mapping(uint256 => Product) private products;

    uint256 public reviewsCounter;


    event ReviewAdded(uint256 indexed productID, address indexed reviewer, uint256 rating, string comment);
    event ReviewLiked(uint256 indexed productID, uint256 indexed reviewIndex, address indexed liker, uint256 likes);


    function listProperty(address owner, uint256 price, string memory _propertyTitle, string memory _description) external returns (uint256){
        require(price > 0, "Price Must be greater than 0.");

        uint256 productID = propertyIndex++;
        Property storage property = properties(productID);

        property.productID = productID;
        property.owner = owner;
        property.price = price;
        property.propertyTitle = _propertyTitle;
        property.category = _category;
        property.images = _images;
        property.propertyAddress = _propertyAddress;
        property.description = _description;

        emit PropertyListed(productID, owner, price);

        return productID;

    }

    function updateProperty(address owner, uint256 productID, string memory _propertyTitle, string memory _category, string memory _images, string memory _propertyAddress, string memory _description) external returns (uint256){

        Property storage property = properties(productID);

        require(property.owner == owner, "You are not the owner");

        property.propertyTitle = _propertyTitle;
        property.category = _category;
        property.images = _images;
        property.propertyAddress = _propertyAddress;
        property.description = _description;

        return productID;
    }

    function updatePrice(address owner, uint256 productID, uint256 price) external returns(string memory){
        Property storage property = properties(productID);

        require(property.owner == owner, "You are not the owner");

        property.price = price;

        return "Your Property price is Updated";
    }

    function buyProperty(uint256 id, address buyer) external payable{

        uint256 amount = msg.value;

        require(amount >= properties[id].price, "insufficient funds");

        Property storage property = properties[id];

        (bool sent,) = payable(property.owner).call{value: amount}("");

        if(sent){
            property.owner = buyer;
            emit PropertySold(id, property.owner, buyer, amount);
        }
    }

    function getAllProperty() public view returns(Property[] memory){
        uint256 itemCount = propertyIndex;
        uint256 currentIndex = 0;

        Property[] memory items = new Property[](itemCount);
        for(uint256 i = 0; i < itemCount; i++){
            uint256 currentID = i + 1;

            Property storage currentItem = properties(currentID);
            items[currentIndex] = currentItem;
            currentIndex += 1;

        }

        return items;
    }

    function getProperty(uint256 id) external view returns(uint256, address, uint256, string memory, string memory, string memory, string memory, string memory){

        Property memory property = properties[id];
        return(
            property.productID,
            property.owner,
            property.price,
            property.propertyTitle,
            property.category,
            property.images,
            property.propertyAddress,
            property.description
        );
    }

    function getUserProperties(address user) external view returns(Property[] memory){
        uint256 totalItemCount = propertyIndex;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++){
            if(properties[i + 1].owner == user){
                itemCount += 1;
            }
        }

        Property[] memory items = new Property[](itemCount);
        for(uint256 i = 0; i < totalItemCount; i++){
            if(properties[i + 1].owner == user){
                uint256 currentID = i + 1;
                Property storage currentItem = properties[currentID];
                                                                                                         
                items[currentIndex] = currentItem;

                currentIndex += 1;
            }
        }

        return items;
    }


    function addReview(uint256 productID, uint256 rating, string calldata comment, address user) external{
        require(rating >= 1 && rating <= 5, "rating must be between 1 and 5");

        Property storage property = properties[productID];

        property.reviewers.push(user);
        property.reviews.push(comment);


        reviews[productID].push(Review(user, productID, rating, comment, 0));
        userReviews[user].push(productID);
        products[productID].totalRating += rating;
        products[productID].numReviews++;

        emit ReviewAdded(productID, user, rating, comment);

        reviewsCounter++;
    }

    function getProductReviews(uint256 productID) external view returns(Review[] memory){
        return reviews[productID];
    }

    function getUserReviews(address user) external view returns (Review[] memory){

        uint256 totalReviews = userReviews[user].length;

        Review[] memory userProductReviews = new Review[](totalReviews);

        for(uint256 i = 0; i < userReviews[user].length; i++){
            uint256 productID = userReviews[user][i];
            Review[] memory productReviews = reviews[productID];

            for (uint256 j = 0; j < productReviews.length; j++){
                if(productReviews[j].reviewer == user){
                    userProductReviews[i] = productReviews[j];
                }
            }
        }

        return userProductReviews;
    } 

    function likeReview(uint256 productID, uint256 reviewIndex, address user) external{
        Review storage review = reviews[productID][reviewIndex];

        review.likes++;
        emit ReviewLiked(productID, reviewIndex, user, review.likes)
    }

    function getHighestratedProduct() external view returns (uint256){
        uint256 highestRating = 0;
        uint256 highestRatedProduct = 0;

        for(uint256 i = 0; i < reviewsCounter; i++){
            uint256 productID = i + 1;

            if(products[productID].numReviews > 0){
                uint256 avgRating = products[productID].totalRating / products[productID].numReviews;

                if(avgRating > highestRating){
                    highestRating = avgRating;
                    highestRatedProductID = productID;
                }
            }
        }

        return highestRatedProductID;
    }  
}