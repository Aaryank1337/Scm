import React, { useState, useEffect } from "react";
import Web3 from "web3";
import FarmerForm from "./components/FarmerForm";
import ProductList from "./components/ProductList";


const App = () => {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);

  // State to manage the refreshing of the product list
  const [refreshKey, setRefreshKey] = useState(0); // Unique key to trigger refresh

  useEffect(() => {
    const init = async () => {
      try {
        if (typeof window.ethereum !== "undefined") {
          const web3 = new Web3(window.ethereum);

          // Request account access
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setAccount(accounts[0]); // Set the first account

          const response = await fetch("/SupplyChain.json"); // Ensure this file is in the public directory
          const supplyChainData = await response.json();

          if (!supplyChainData || !supplyChainData.networks) {
            setError("Contract ABI not available");
            return;
          }

          const currentNetworkId = await web3.eth.net.getId();
          const deployedNetwork = supplyChainData.networks[currentNetworkId];
          if (!deployedNetwork) {
            setError("Smart contract not deployed on the current network.");
            return;
          }

          const address = deployedNetwork.address;
          const instance = new web3.eth.Contract(supplyChainData.abi, address);
          setContract(instance);
        } else {
          setError("Please install MetaMask to use this application.");
        }
      } catch (error) {
        setError("Error initializing contract: " + error.message);
      }
    };
    init();
  }, []);

  // Function to refresh the product list
  const refreshProductList = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Increment key to trigger re-fetch
    console.log("Product list refreshed"); // Log refresh call
  };

  if (error) {
    return <div>{error}</div>; // Display any error message
  }

  if (!contract) {
    return <div>Loading...</div>; // Indicate that the contract is being loaded
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-500 min-h-screen">
      <h1 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Supply Chain Management
      </h1>
      {account && (
        <p className="text-lg text-gray-700">
          Connected account: <span className="font-medium">{account}</span>
        </p>
      )}
      <FarmerForm contract={contract} refreshProductList={refreshProductList} />
      <ProductList contract={contract} key={refreshKey} />
    </div>
  );
};

export default App;
