import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransactionList from './TransactionList'; // Import the new component

const FarmerForm = ({ contract, refreshProductList }) => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [transactions, setTransactions] = useState([]); // State for transactions

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productId || !productName || !quantity) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const transaction = await contract.methods
                .addProduct(productId, productName, quantity)
                .send({ from: window.ethereum.selectedAddress });

            // Update the transactions state with the new transaction ID
            setTransactions((prevTransactions) => [
                transaction.transactionHash,
                ...prevTransactions,
            ]);

            // Show success toast with transaction ID
            toast.success(`Product added successfully! Transaction ID: ${transaction.transactionHash}`);

            // Refresh the product list after adding a product
            refreshProductList();

            // Clear the form after submission
            setProductId('');
            setProductName('');
            setQuantity('');
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error('Error adding product: ' + error.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded shadow-md w-full max-w-md transition-transform duration-300 transform hover:scale-105 hover:shadow-xl" // Added hover effect and animation
            >
                <h2 className="title-font mb-2 text-2xl font-medium text-gray-900">Add a Product</h2> {/* Increased font size */}
                <hr />
                <div className="relative mb-4">
                    <label className="text-sm leading-7 text-gray-600">Product ID</label>
                    <input
                        type="text"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                </div>
                <div className="relative mb-4">
                    <label className="text-sm leading-7 text-gray-600">Product Name</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        required
                        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                </div>
                <div className="relative mb-4">
                    <label className="text-sm leading-7 text-gray-600">Quantity</label>
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        min="1"
                        className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                    />
                </div>
                <button className="rounded border-0 bg-indigo-500 px-6 py-2 text-lg text-white hover:bg-indigo-600 focus:outline-none transition-colors duration-300 ease-in-out transform hover:scale-105"> {/* Added hover effect */}
                    Add Product
                </button>
            </form>
            <br />
            <hr />
            <TransactionList transactions={transactions} /> {/* Include the transaction list below the form */}
            <ToastContainer />
        </div>
    );
};

export default FarmerForm;
