import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (error) {
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <Loader fullScreen />;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  const price = product.discountPrice || product.price;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="text-primary hover:underline mb-4 inline-block">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card"
          >
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="text-sm text-gray-500 mb-2">{product.category}</div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {product.ratings > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-yellow-500">
                    {'⭐'.repeat(Math.round(product.ratings))}
                  </div>
                  <span className="text-gray-600">
                    {product.ratings.toFixed(1)} ({product.numReviews} reviews)
                  </span>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-4xl font-bold text-primary">
                      ₹{product.discountPrice}
                    </span>
                    <span className="text-2xl text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                    <span className="text-secondary font-semibold">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold text-primary">
                    ₹{product.price}
                  </span>
                )}
                <span className="text-gray-500">/ {product.unit}</span>
              </div>

              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="border-t pt-6">
              <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <span className="text-gray-500">Brand:</span>
                  <span className="ml-2 font-semibold">{product.brand || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Stock:</span>
                  <span className="ml-2 font-semibold">
                    {product.stock > 0 ? `${product.stock} ${product.unit} available` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Quantity:</label>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="px-4 py-2 hover:bg-gray-100"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-1">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="w-full btn-primary py-3"
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((review) => (
                <div key={review._id} className="card">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-yellow-500 text-sm">
                        {'⭐'.repeat(review.rating)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
