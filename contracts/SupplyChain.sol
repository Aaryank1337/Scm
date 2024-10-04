// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyChain {
    // Structure to hold product details
    struct Product {
        string productId;
        string name;
        uint quantity;
        string[] statusHistory; // Array to store status updates
        bool exists; // Flag to check if the product exists
    }

    // Mapping to store products by their IDs (using string)
    mapping(string => Product) private products;

    // Count of total products
    uint private productCount; // New state variable to count products

    // Array to store all product IDs
    string[] private productIds; // New array to store product IDs

    // Event emitted when a product is added
    event ProductAdded(string productId, string name, uint quantity);

    // Event emitted when a product's status is updated
    event ProductStatusUpdated(string productId, string status);

    // Function for farmers to add a new batch of produce
    function addProduct(string memory _productId, string memory _name, uint _quantity) public {
        require(!products[_productId].exists, "Product already exists.");

        // Initialize the product
        products[_productId] = Product({
            productId: _productId,
            name: _name,
            quantity: _quantity,
            statusHistory: new string[](0) , // Initialize empty status history
            exists: true
        });

        // Increment the product count
        productCount++;

        // Store the product ID
        productIds.push(_productId); // Store product ID in the array

        emit ProductAdded(_productId, _name, _quantity);
    }

    // Function to get the total product count
    function getProductCount() public view returns (uint) {
        return productCount;
    }

    // Function to get product ID at a specific index
    function getProductIdAtIndex(uint _index) public view returns (string memory) {
        require(_index < productIds.length, "Index out of bounds.");
        return productIds[_index];
    }

    // Function for distributors/retailers to update product status
    function updateProductStatus(string memory _productId, string memory _status) public {
        require(products[_productId].exists, "Product does not exist.");

        // Add the status to the product's history
        products[_productId].statusHistory.push(_status);

        emit ProductStatusUpdated(_productId, _status);
    }

    // Function for consumers to query product details
    function getProductDetails(string memory _productId) public view returns (Product memory) {
        require(products[_productId].exists, "Product does not exist.");
        return products[_productId];
    }

    // Function to get product status history
    function getStatusHistory(string memory _productId) public view returns (string[] memory) {
        require(products[_productId].exists, "Product does not exist.");
        return products[_productId].statusHistory;
    }
}
