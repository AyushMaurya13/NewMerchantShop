import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productService } from '../services/productService';
import { useCart } from '../hooks/useCart';
import toast from 'react-hot-toast';
import Loader from '../components/common/Loader';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { addToCart } = useCart();

  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [category, search, sort, page]);

  const loadCategories = async () => {
    try {
      const data = await productService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to load categories');
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const params = { page };
      if (category) params.category = category;
      if (search) params.search = search;
      if (sort) params.sort = sort;

      const data = await productService.getProducts(params);
      setProducts(data.products);
      setTotalPages(data.pages);
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

  const handleCategoryChange = (cat) => {
    setSearchParams((prev) => {
      if (cat) {
        prev.set('category', cat);
      } else {
        prev.delete('category');
      }
      return prev;
    });
    setPage(1);
  };

  const handleSortChange = (sortValue) => {
    setSearchParams((prev) => {
      if (sortValue) {
        prev.set('sort', sortValue);
      } else {
        prev.delete('sort');
      }
      return prev;
    });
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="card sticky top-20">
              <h2 className="text-lg font-bold mb-4">Filters</h2>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryChange('')}
                    className={`block w-full text-left px-3 py-2 rounded ${
                      !category ? 'bg-primary text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`block w-full text-left px-3 py-2 rounded text-sm ${
                        category === cat ? 'bg-primary text-white' : 'hover:bg-gray-100'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-semibold mb-3">Sort By</h3>
                <select
                  value={sort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="input-field text-sm"
                >
                  <option value="">Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="rating">Rating: High to Low</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Main Content - Products Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                {category || 'All Products'}
              </h1>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${products.length} products found`}
              </p>
            </div>

            {loading ? (
              <Loader />
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                      className="card group cursor-pointer"
                    >
                      <Link to={`/product/${product._id}`}>
                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                          {product.discountPrice && (
                            <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
                              {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                            </div>
                          )}
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          {product.ratings > 0 && (
                            <div className="flex items-center text-xs text-yellow-500">
                              ⭐ {product.ratings.toFixed(1)}
                              <span className="text-gray-400 ml-1">({product.numReviews})</span>
                            </div>
                          )}
                        </div>
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
