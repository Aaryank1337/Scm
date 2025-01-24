import React, { useState } from 'react';

const ProductList = ({ contract }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showProducts, setShowProducts] = useState(false); // State to control product list visibility
    const [buttonVisible, setButtonVisible] = useState(true); // State to control button visibility

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const count = await contract.methods.getProductCount().call();
            const productArray = [];

            for (let i = 0; i < count; i++) {
                const productId = await contract.methods.getProductIdAtIndex(i).call();
                const product = await contract.methods.getProductDetails(productId).call();

                const productDetails = {
                    productId: product.productId,
                    name: product.name,
                    quantity: product.quantity.toString(),
                    statusHistory: product.statusHistory,
                    exists: product.exists,
                };

                productArray.push(productDetails);
            }

            setProducts(productArray);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowProducts = () => {
        setButtonVisible(false); // Hide the button after click
        setShowProducts(true); // Set showProducts to true to display the product list
        fetchProducts(); // Fetch products when the box is clicked

        // Reset the button visibility after 5 seconds
        setTimeout(() => {
            setButtonVisible(true);
            setShowProducts(false); // Hide the product list when resetting
        }, 15000);
    };

    return (
        <section className="body-font relative text-gray-600">
            <div className="flex min-h-screen items-center justify-center">
                <div className="overflow-x-auto">
                    <div className="bg-gray-300 p-10 rounded-lg shadow-md">
                        <h2 className="title-font text-center text-lg font-semibold tracking-widest text-gray-900 mb-4">PRODUCT LIST</h2>
                        
                        {buttonVisible && (
                            <div 
                                className="cursor-pointer bg-indigo-500 text-white p-4 rounded-lg text-center hover:bg-blue-600 transition duration-300" 
                                onClick={handleShowProducts}
                            >
                                Load Products
                            </div>
                        )}

                        {showProducts && (
                            <table className="min-w-full bg-white shadow-md rounded-xl mt-4">
                                <thead>
                                    <tr className="bg-blue-gray-100 text-gray-700">
                                        <th className="py-3 px-4 text-left">ID</th>
                                        <th className="py-3 px-4 text-left">Product Name</th>
                                        <th className="py-3 px-4 text-left">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody className="text-blue-gray-900">
                                    {loading ? (
                                        <tr>
                                            <td colSpan="3" className="py-2 px-4 text-center">Loading products...</td>
                                        </tr>
                                    ) : products.length > 0 ? (
                                        products.map((product) => (
                                            <tr key={product.productId} className="border-b border-blue-gray-200 hover:bg-gray-100">
                                                <td className="py-3 px-4">{product.productId}</td>
                                                <td className="py-3 px-4">{product.name}</td>
                                                <td className="py-3 px-4">{product.quantity}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="py-2 px-4 text-center">No products available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductList;
