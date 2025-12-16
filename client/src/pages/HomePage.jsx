import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const data = await productService.getFeaturedProducts();
      setFeaturedProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const categories = [
    { name: 'Groceries & Staples', icon: '🌾', path: '/products?category=Groceries & Staples' },
    { name: 'Fruits & Vegetables', icon: '🥬', path: '/products?category=Fruits & Vegetables' },
    { name: 'Dairy Products', icon: '🥛', path: '/products?category=Dairy Products' },
    { name: 'Beverages', icon: '☕', path: '/products?category=Beverages' },
    { name: 'Snacks & Sweets', icon: '🍪', path: '/products?category=Snacks & Sweets' },
    { name: 'Personal Care', icon: '🧴', path: '/products?category=Personal Care' },
    { name: 'Household Items', icon: '🧹', path: '/products?category=Household Items' },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to Meerut Kirana Store
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Fresh Groceries Delivered to Your Doorstep
            </p>
            <Link to="/products" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg inline-block transition-colors">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={category.path}
                  className="card hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary hover:text-primary-600 font-semibold">
              View All →
            </Link>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  className="card group cursor-pointer"
                >
                  <Link to={`/product/${product._id}`}>
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {product.discountPrice ? (
                        <>
                          <span className="text-lg font-bold text-primary">
                            ₹{product.discountPrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold text-primary">
                          ₹{product.price}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">/{product.unit}</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full btn-primary text-sm py-2"
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Special Offers Banner */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Special Offers This Week!</h2>
            <p className="text-xl mb-6">Get up to 20% off on selected items</p>
            <Link to="/products" className="bg-white text-secondary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg inline-block transition-colors">
              Browse Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', text: 'Best quality products and fast delivery!', rating: 5 },
              { name: 'Priya Sharma', text: 'Fresh vegetables and great prices. Highly recommended!', rating: 5 },
              { name: 'Amit Singh', text: 'Excellent service and wide variety of products.', rating: 5 },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="card text-center"
              >
                <div className="text-4xl mb-3">👤</div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="text-yellow-400 mb-2">
                  {'⭐'.repeat(testimonial.rating)}
                </div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-300 mb-8">Get updates on special offers and new products!</p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field flex-1 text-gray-900"
            />
            <button type="submit" className="btn-primary whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
