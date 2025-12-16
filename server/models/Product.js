import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price'],
    min: 0
  },
  discountPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: [
      'Groceries & Staples',
      'Fruits & Vegetables',
      'Dairy Products',
      'Beverages',
      'Snacks & Sweets',
      'Personal Care',
      'Household Items'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  images: {
    type: [String],
    default: ['https://via.placeholder.com/400x400?text=Product+Image']
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  unit: {
    type: String,
    required: true,
    enum: ['kg', 'g', 'l', 'ml', 'piece', 'packet', 'bundle'],
    default: 'piece'
  },
  brand: {
    type: String,
    trim: true
  },
  ratings: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  reviews: [reviewSchema],
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update ratings when reviews change
productSchema.methods.updateRatings = function() {
  if (this.reviews.length === 0) {
    this.ratings = 0;
    this.numReviews = 0;
  } else {
    const totalRating = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.ratings = totalRating / this.reviews.length;
    this.numReviews = this.reviews.length;
  }
};

export default mongoose.model('Product', productSchema);
