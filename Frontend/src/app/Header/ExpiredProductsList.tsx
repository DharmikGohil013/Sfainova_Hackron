import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  expiryDate: string;
}

const sampleExpiredProducts: Product[] = [
  { id: 1, name: 'Milk', description: 'Dairy product', expiryDate: '2023-10-15' },
  { id: 2, name: 'Bread', description: 'Whole wheat bread', expiryDate: '2023-10-10' },
  { id: 3, name: 'Yogurt', description: 'Greek yogurt', expiryDate: '2023-10-05' },
];

const ExpiredProductsList = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Expired Products</h2>
      <ul className="space-y-4">
        {sampleExpiredProducts.map((product) => (
          <li key={product.id} className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-sm text-red-600">Expiry Date: {product.expiryDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpiredProductsList;