import React, { useState, useEffect } from 'react';
import client from '../../utilities/ContentFull';
import CheckoutModal from '../../utilities/CheckoutModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckoutSuccess = () => {
    setCart({}); // clear cart
    setShowCheckout(false);
    alert('Order placed successfully!');
  };

  const incrementQuantity = (product) => {
  setCart(prev => {
    const productId = String(product.id); // ✅ ensure string
    const currentQty = prev[productId] || 0;

    if (currentQty < product.stock) {
      return { ...prev, [productId]: currentQty + 1 };
    }

    return prev; // no change if stock limit reached
  });
};

const decrementQuantity = (productId) => {
  setCart(prev => {
    const id = String(productId); // ✅ ensure string
    const currentQty = prev[id] || 0;

    if (currentQty > 1) {
      return { ...prev, [id]: currentQty - 1 };
    } else {
      const newCart = { ...prev };
      delete newCart[id]; // remove item from cart if 0
      return newCart;
    }
  });
};

  useEffect(() => {
    client
      .getEntries({ content_type: 'productsCatlog' }) // Replace 'product' with your content type ID
      .then(response => {
        const productData = response.items.map(item => ({
          id: item?.fields?.productId,
          name: item.fields.title?.content[0]?.content[0]?.value,
          description: item.fields?.description?.content[0]?.content[0]?.value,
          price: item.fields.price?.content[0]?.content[0]?.value,
          stock: item.fields.size,
          image: item.fields.product?.fields?.file?.url ? `https:${item.fields.product?.fields?.file?.url}` : '',
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
    <>
    <div className="p-[2%] mb-[4%]">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => {
          const qty = cart[product.id] || 0;
          return (
            <div key={product.id} className="border rounded-lg shadow hover:shadow-lg p-4 flex flex-col">
              {product.image && (
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
              )}
              <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
              <div className="text-sm text-gray-600 my-2">
                {product.description}
              </div>
              <p className="text-lg font-bold">${product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.stock}</p>

              <div className="flex items-center gap-2 mt-auto pt-4">
                <button
                  onClick={() => decrementQuantity(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 flex items-center justify-center rounded disabled:opacity-50"
                  disabled={qty === 0}
                >
                  -
                </button>
                <span className="px-3">{qty}</span>
                <button
                  onClick={() => incrementQuantity(product)}
                  className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 flex items-center justify-center rounded disabled:opacity-50"
                  disabled={qty >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Summary */}
      {Object.keys(cart).length > 0 && (
        <div className="mt-8 p-4 rounded border bg-gray-50">
          <h2 className="text-xl font-bold">Cart Summary</h2>
          <ul className="list-disc list-inside">
            {Object.entries(cart).map(([id, qty]) => {
              const item = products.find(p => p.id === Number(id));
              return (
                <li key={id}>
                  {item?.name} - {qty} × ${item?.price} = ${item ? item.price * qty : 0}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {Object.keys(cart).length > 0 && 
      <div>
        <button
          onClick={() => setShowCheckout(true)}
          className="bg-green-500 hover:bg-green-600 text-white p-[3%] h-[10%] m-[4%] flex items-center justify-center rounded"
        >
          Check Out
        </button>
      </div>
    }
    </div>

    {showCheckout && (
      <CheckoutModal
        cart={cart}
        products={products}
        onClose={() => setShowCheckout(false)}
        onCheckoutSuccess={handleCheckoutSuccess}
      />
    )}
    </>
  );
};

export default ProductList;