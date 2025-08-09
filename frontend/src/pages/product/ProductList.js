import React, { useState, useEffect } from 'react';
import client from '../../utilities/ContentFull';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = () => {};
  const handlePurchase = () => {};

  useEffect(() => {
    client
      .getEntries({ content_type: 'productsCatlog' }) // Replace 'product' with your content type ID
      .then(response => {
        const productData = response.items.map(item => ({
          id: item.sys.id,
          name: item.fields.title,
          description: item.fields.description,
          price: item.fields.price,
          stock: item.fields.stock,
          image: item.fields.image?.fields?.file?.url || '',
        }));
        setProducts(productData);
        setLoading(false);
      })
      .catch(err => {
        console.log('Error fetching products:', err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product.id} style={{ margin: '10px', width: '200px' }}>
            <img src={product.image} alt={product.name} width="100%" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            <button onClick={() => handlePurchase(product.id, 1)}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;