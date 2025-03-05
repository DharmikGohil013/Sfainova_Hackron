
import React from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  damageType: string;
}

const sampleDamageProducts: Product[] = [
  { id: 1, name: 'Broken Chair', description: 'Wooden chair with broken leg', damageType: 'Physical' },
  { id: 2, name: 'Cracked Plate', description: 'Ceramic plate with cracks', damageType: 'Structural' },
  { id: 3, name: 'Torn Jacket', description: 'Leather jacket with torn sleeve', damageType: 'Material' },
];

const DamageProducts = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Damage Products</h2>
      <ul className="space-y-4">
        {sampleDamageProducts.map((product) => (
          <li key={product.id} className="p-4 bg-white shadow-md rounded-lg">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-sm text-emerald-600">Damage Type: {product.damageType}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DamageProducts;