import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const tax = subtotal * 0.05; // 5% tax
  const shipping = subtotal > 500 ? 0 : 40;
  const total = subtotal + tax + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="card flex gap-4"
              >
                <Link to={`/product/${item._id}`} className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </Link>
                
                <div className="flex-1">
                  <Link to={`/product/${item._id}`}>
                    <h3 className="font-semibold mb-1 hover:text-primary">{item.name}</h3>
                  </Link>
                  <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      ₹{item.discountPrice || item.price}
                    </span>
                    <span className="text-sm text-gray-500">/ {item.unit}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                  
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <div className="font-semibold">
                    ₹{((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (5%):</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-sm text-gray-600 mb-4">
                  Add ₹{(500 - subtotal).toFixed(2)} more for free shipping!
                </p>
              )}

              <Link to="/checkout" className="block w-full btn-primary text-center py-3 mb-3">
                Proceed to Checkout
              </Link>
              <Link to="/products" className="block w-full btn-outline text-center py-3">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
