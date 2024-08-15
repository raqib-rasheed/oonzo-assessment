import Link from 'next/link';
import { useState, ChangeEvent } from 'react';

export default function Home() {
  const [productId, setProductId] = useState<number>(1);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setProductId(Number(e.target.value));
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Choose a Product
          </h1>
          <div className="mb-6">
            <label
              htmlFor="product-select"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select a Product ID:
            </label>
            <select
              id="product-select"
              value={productId}
              onChange={handleSelectChange}
              className="w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(
                (id) => (
                  <option key={id} value={id}>
                    Product {id}
                  </option>
                )
              )}
            </select>
          </div>
          <Link href={`/product/${productId}`}>
            <button className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
              View Product
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
