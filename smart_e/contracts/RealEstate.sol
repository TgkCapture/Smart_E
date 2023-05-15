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

        emit PropertyListed(productId, owner, price);

    }

    function updateProperty() external returns (uint256){}

    function buyProperty() external payable{}

    function getAllProperty() public view returns(Property[] memory){}

    function getProperty() external view returns(){}

    function getUserProperties() external view returns(Property[] memory){}


    function addReview() external{}

    function getProductReviews() external view returns(Review[] memory){}

    function getUserReviews() external view returns (Review[] memory){} 

    function likeReview() external{}

    function getHighestratedProduct() external view returns (uint256){}  
}