const SupplyChain = artifacts.require("SupplyChain");

contract("SupplyChain", (accounts) => {
    let supplyChain;

    beforeEach(async() => {
        supplyChain = await SupplyChain.new();
    });

    it("should add a product successfully", async() => {
        await supplyChain.addProduct("1", "Tomatoes", 100);
        const product = await supplyChain.getProductDetails("1");
        assert.equal(product.name, "Tomatoes", "Product name should match");
        assert.equal(product.quantity.toString(), "100", "Quantity should match");
    });

    it("should update product status successfully", async() => {
        await supplyChain.addProduct("2", "Potatoes", 150);
        await supplyChain.updateProductStatus("2", "In Transit");
        const history = await supplyChain.getStatusHistory("2");
        assert.equal(history[0], "In Transit", "Status should match");
    });

    // Add more tests as needed...
});