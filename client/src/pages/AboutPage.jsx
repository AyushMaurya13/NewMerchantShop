import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">About Meerut Kirana Store</h1>
          <p className="text-xl text-gray-600">Your Trusted Neighborhood Store Since 1990</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Meerut Kirana Store was established in 1990 with a simple mission: to provide fresh, 
              quality groceries and daily essentials to our local community. What started as a small 
              neighborhood store has grown into a trusted name across Meerut.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, we continue our commitment to quality and service while embracing modern technology 
              to make shopping more convenient for our customers through our online platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="card"
          >
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To provide our customers with the highest quality products at competitive prices, 
              delivered with exceptional service and care.
            </p>
            <h2 className="text-2xl font-bold mb-4 mt-6">Our Values</h2>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Quality products from trusted brands</li>
              <li>✓ Competitive pricing and great deals</li>
              <li>✓ Fast and reliable delivery</li>
              <li>✓ Customer satisfaction guaranteed</li>
            </ul>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { number: '30+', label: 'Years in Business' },
            { number: '5000+', label: 'Products' },
            { number: '50000+', label: 'Happy Customers' },
            { number: '100%', label: 'Quality Assured' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-5xl mb-3">🌾</div>
              <h3 className="font-semibold mb-2">Fresh Products</h3>
              <p className="text-sm text-gray-600">
                Daily fresh fruits, vegetables, and dairy products
              </p>
            </div>
            <div>
              <div className="text-5xl mb-3">🚚</div>
              <h3 className="font-semibold mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-600">
                Same-day delivery available on all orders
              </p>
            </div>
            <div>
              <div className="text-5xl mb-3">💯</div>
              <h3 className="font-semibold mb-2">Quality Assured</h3>
              <p className="text-sm text-gray-600">
                100% satisfaction guarantee on all products
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
