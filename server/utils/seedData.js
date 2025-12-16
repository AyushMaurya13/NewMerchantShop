import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import User from '../models/User.js';
import connectDB from '../config/db.js';

dotenv.config();

const products = [
  // Groceries & Staples
  {
    name: 'Basmati Rice Premium',
    description: 'Premium quality aged basmati rice with long grains and aromatic flavor. Perfect for biryani and pulao.',
    price: 180,
    discountPrice: 165,
    category: 'Groceries & Staples',
    subcategory: 'Rice',
    stock: 50,
    unit: 'kg',
    brand: 'India Gate',
    featured: true,
    images: ['https://via.placeholder.com/400x400?text=Basmati+Rice']
  },
  {
    name: 'Whole Wheat Atta',
    description: 'Fresh chakki atta made from whole wheat grains. Healthy and nutritious for daily chapatis.',
    price: 50,
    discountPrice: 45,
    category: 'Groceries & Staples',
    subcategory: 'Flour',
    stock: 100,
    unit: 'kg',
    brand: 'Aashirvaad',
    featured: true,
    images: ['https://via.placeholder.com/400x400?text=Wheat+Atta']
  },
  {
    name: 'Toor Dal (Arhar)',
    description: 'High quality toor dal, rich in protein and essential nutrients. Perfect for making dal tadka.',
    price: 140,
    category: 'Groceries & Staples',
    subcategory: 'Pulses',
    stock: 80,
    unit: 'kg',
    brand: 'Tata Sampann',
    images: ['https://via.placeholder.com/400x400?text=Toor+Dal']
  },
  {
    name: 'Sunflower Oil',
    description: 'Refined sunflower oil for healthy cooking. Light and cholesterol-free.',
    price: 200,
    discountPrice: 185,
    category: 'Groceries & Staples',
    subcategory: 'Oil',
    stock: 40,
    unit: 'l',
    brand: 'Fortune',
    images: ['https://via.placeholder.com/400x400?text=Sunflower+Oil']
  },
  {
    name: 'Sugar',
    description: 'Pure white crystal sugar for sweetening and cooking purposes.',
    price: 45,
    category: 'Groceries & Staples',
    subcategory: 'Sugar & Salt',
    stock: 150,
    unit: 'kg',
    brand: 'Madhur',
    images: ['https://via.placeholder.com/400x400?text=Sugar']
  },
  
  // Fruits & Vegetables
  {
    name: 'Fresh Apples (Shimla)',
    description: 'Crisp and juicy red apples from Shimla. Rich in vitamins and minerals.',
    price: 180,
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    stock: 30,
    unit: 'kg',
    featured: true,
    images: ['https://via.placeholder.com/400x400?text=Apples']
  },
  {
    name: 'Bananas (Robusta)',
    description: 'Fresh yellow bananas, naturally ripened. Great source of potassium.',
    price: 50,
    category: 'Fruits & Vegetables',
    subcategory: 'Fruits',
    stock: 60,
    unit: 'kg',
    images: ['https://via.placeholder.com/400x400?text=Bananas']
  },
  {
    name: 'Tomatoes',
    description: 'Fresh red tomatoes, perfect for cooking and salads.',
    price: 40,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    stock: 50,
    unit: 'kg',
    images: ['https://via.placeholder.com/400x400?text=Tomatoes']
  },
  {
    name: 'Potatoes',
    description: 'Fresh potatoes for versatile cooking. Essential kitchen staple.',
    price: 30,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    stock: 100,
    unit: 'kg',
    images: ['https://via.placeholder.com/400x400?text=Potatoes']
  },
  {
    name: 'Onions',
    description: 'Fresh red onions, essential for Indian cooking.',
    price: 35,
    category: 'Fruits & Vegetables',
    subcategory: 'Vegetables',
    stock: 80,
    unit: 'kg',
    images: ['https://via.placeholder.com/400x400?text=Onions']
  },

  // Dairy Products
  {
    name: 'Full Cream Milk',
    description: 'Fresh full cream milk, homogenized and pasteurized. Rich and creamy.',
    price: 60,
    category: 'Dairy Products',
    subcategory: 'Milk',
    stock: 50,
    unit: 'l',
    brand: 'Amul',
    featured: true,
    images: ['https://via.placeholder.com/400x400?text=Milk']
  },
  {
    name: 'Curd (Dahi)',
    description: 'Fresh and creamy curd made from pure milk. Probiotic rich.',
    price: 50,
    category: 'Dairy Products',
    subcategory: 'Curd',
    stock: 40,
    unit: 'kg',
    brand: 'Mother Dairy',
    images: ['https://via.placeholder.com/400x400?text=Curd']
  },
  {
    name: 'Paneer',
    description: 'Fresh cottage cheese made from pure milk. High protein content.',
    price: 350,
    category: 'Dairy Products',
    subcategory: 'Paneer',
    stock: 25,
    unit: 'kg',
    brand: 'Amul',
    images: ['https://via.placeholder.com/400x400?text=Paneer']
  },

  // Beverages
  {
    name: 'Tea Leaves (CTC)',
    description: 'Premium CTC tea leaves for strong and refreshing tea.',
    price: 400,
    discountPrice: 380,
    category: 'Beverages',
    subcategory: 'Tea',
    stock: 60,
    unit: 'kg',
    brand: 'Tata Tea',
    featured: true,
    images: ['https://via.placeholder.com/400x400?text=Tea']
  },
  {
    name: 'Coffee Powder',
    description: 'Rich and aromatic coffee powder for perfect morning coffee.',
    price: 350,
    category: 'Beverages',
    subcategory: 'Coffee',
    stock: 35,
    unit: 'kg',
    brand: 'Nescafe',
    images: ['https://via.placeholder.com/400x400?text=Coffee']
  },
  {
    name: 'Mango Juice',
    description: 'Fresh and pulpy mango juice. No added preservatives.',
    price: 120,
    category: 'Beverages',
    subcategory: 'Juice',
    stock: 50,
    unit: 'l',
    brand: 'Real',
    images: ['https://via.placeholder.com/400x400?text=Mango+Juice']
  },

  // Snacks & Sweets
  {
    name: 'Potato Chips',
    description: 'Crispy and crunchy potato chips. Perfect snack for any time.',
    price: 10,
    category: 'Snacks & Sweets',
    subcategory: 'Chips',
    stock: 100,
    unit: 'packet',
    brand: 'Lays',
    images: ['https://via.placeholder.com/400x400?text=Chips']
  },
  {
    name: 'Namkeen Mix',
    description: 'Spicy and savory namkeen mix. Traditional Indian snack.',
    price: 200,
    category: 'Snacks & Sweets',
    subcategory: 'Namkeen',
    stock: 70,
    unit: 'kg',
    brand: 'Haldiram',
    images: ['https://via.placeholder.com/400x400?text=Namkeen']
  },

  // Personal Care
  {
    name: 'Bathing Soap',
    description: 'Moisturizing bathing soap with natural ingredients.',
    price: 40,
    category: 'Personal Care',
    subcategory: 'Soap',
    stock: 100,
    unit: 'piece',
    brand: 'Dove',
    images: ['https://via.placeholder.com/400x400?text=Soap']
  },
  {
    name: 'Shampoo',
    description: 'Nourishing shampoo for healthy and shiny hair.',
    price: 150,
    category: 'Personal Care',
    subcategory: 'Hair Care',
    stock: 60,
    unit: 'ml',
    brand: 'Pantene',
    images: ['https://via.placeholder.com/400x400?text=Shampoo']
  },

  // Household Items
  {
    name: 'Detergent Powder',
    description: 'Powerful detergent powder for bright and clean clothes.',
    price: 250,
    category: 'Household Items',
    subcategory: 'Cleaning',
    stock: 80,
    unit: 'kg',
    brand: 'Surf Excel',
    images: ['https://via.placeholder.com/400x400?text=Detergent']
  },
  {
    name: 'Dish Wash Liquid',
    description: 'Effective dish wash liquid with lemon fragrance.',
    price: 100,
    category: 'Household Items',
    subcategory: 'Cleaning',
    stock: 70,
    unit: 'l',
    brand: 'Vim',
    images: ['https://via.placeholder.com/400x400?text=Dish+Wash']
  }
];

const seedData = async () => {
  try {
    await connectDB();
    
    console.log('Clearing existing data...');
    await Product.deleteMany();
    await User.deleteMany();
    
    console.log('Creating sample products...');
    await Product.insertMany(products);
    
    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
