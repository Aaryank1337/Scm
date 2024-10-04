const SupplyChain = artifacts.require("SupplyChain");

module.exports = function(deployer) {
    deployer.deploy(SupplyChain, { gas: 6000000 }); // Set a high gas limit
};