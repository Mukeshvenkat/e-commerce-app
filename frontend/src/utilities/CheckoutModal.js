import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CHECKOUT_SCHEMA } from './ValidationSchemas';

const CheckoutModal = ({ cart, products, onClose, onCheckoutSuccess }) => {
  const orderItems = Object.entries(cart).map(([id, qty]) => {
    const product = products.find(p => String(p.id) === String(id));
    return {
      productId: id,
      name: product?.name,
      price: product?.price,
      quantity: qty,
      image: product?.image
    };
  });

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + (item.price || 0) * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>

        <div className="mb-4 border-b pb-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <ul className="divide-y">
            {orderItems.map(item => (
              <li
                key={item.productId}
                className="py-2 flex justify-between items-center"
              >
                <div className="flex items-center">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded mr-2"
                    />
                  )}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} × ${item.price}
                    </p>
                  </div>
                </div>
                <div className="font-semibold">
                  ${(item.quantity * item.price)}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-3 font-bold text-lg">
            <span>Total:</span>
            <span>${totalAmount}</span>
          </div>
        </div>

        <Formik
          initialValues={{
            name: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            paymentMethod: 'online',
          }}
          validationSchema={CHECKOUT_SCHEMA}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const orderDetails = {
                customer: values,
                items: orderItems,
                paymentMethod: values.paymentMethod,
              };

              // await updateContentfulStock(orderItems);

              setSubmitting(false);
              onCheckoutSuccess();
            } catch (error) {
              console.error(error);
              alert('Checkout failed!');
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">
              <div>
                <Field
                  name="name"
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  as="textarea"
                  name="address"
                  placeholder="Address"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="city"
                  placeholder="City"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="state"
                  placeholder="State"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  name="zip"
                  placeholder="Zip Code"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="zip"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <Field
                  as="select"
                  name="paymentMethod"
                  className="w-full p-2 border rounded"
                >
                  <option value="online">Online Payment</option>
                  <option value="cash">Cash on Delivery</option>
                </Field>
                <ErrorMessage
                  name="paymentMethod"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="py-2 px-4 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-600 text-white py-2 px-6 rounded"
                >
                  {isSubmitting ? 'Processing...' : 'Complete Order'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CheckoutModal;
