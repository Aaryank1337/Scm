// TransactionList.js
import React from 'react';

const TransactionList = ({ transactions }) => {
    return (
        <div className="mt-6">
            <h2 className="title-font mb-1 text-2xl font-medium text-gray-900">Transaction History</h2>
            {transactions.length > 0 ? (
                <ul className="list-disc pl-5">
                    {transactions.map((transaction, index) => (
                        <li key={index} className="text-gray-700 text-lg">
                            Transaction Id :{transaction}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-700">No transactions available.</p>
            )}
        </div>
    );
};

export default TransactionList;
