import React, { useState } from 'react';

const CheckoutModal = ({ cart, products, onClose, onCheckoutSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'online', // or 'cash'
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const orderDetails = {
      customer: formData,
      items: Object.entries(cart).map(([id, qty]) => {
        const product = products.find(p => p.id === id);
        return { productId: id, quantity: qty, productName: product?.name };
      }),
      paymentMethod: formData.paymentMethod,
    };

    try {
      onCheckoutSuccess();

    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed, please try again.');
    }
  };

  const totalAmount = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find(p => String(p.id) === String(id));
    return sum + (product ? product.price * qty : 0);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>
        {/* <div className="mb-4 border-b pb-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <ul className="divide-y">
            {Object.entries(cart).map(([id, qty]) => {
              const product = products.find(p => String(p.id) === String(id));
              if (!product) return null;
              return (
                <li key={id} className="py-2 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {qty} × ${product.price}
                    </p>
                  </div>
                  <div className="font-semibold">
                    ${(product.price * qty)}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-between items-center mt-3 font-bold text-lg">
            <span>Total:</span>
            <span>${totalAmount}</span>
          </div>
        </div> */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State"
            required
            className="w-full p-2 border rounded"
          />
          <input
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            placeholder="Zip Code"
            required
            className="w-full p-2 border rounded"
          />
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="online">Online Payment</option>
            <option value="cash">Cash on Delivery</option>
          </select>

          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="py-2 px-4 rounded border">Cancel</button>
            <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
              Complete Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
