import express from 'express'
import connectDB from './db.js'
import dotenv from 'dotenv'
import Product from './models/Product.js';
import cors from 'cors'
import User from './models/User.js'; 
import bcrypt from 'bcryptjs'; 
import Cart from './models/Cart.js';
import Order from './models/Order.js';
import mongoose from 'mongoose';

dotenv.config()
await connectDB();  

const app = express()
app.use(cors())

const port = process.env.PORT || 5000

app.use(express.json())



app.get('/', (req, res) => {
  res.send('Hello from backend!')
})

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find()
    console.log("Dữ liệu trả về từ MongoDB:", products)
    res.json(products)
    
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error)
    res.status(500).json({ message: 'Lỗi server' })
  }
})




app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    res.json(user)
    if (!user) {
      return res.status(400).json({ message: "Email không tồn tại" });
    }
 // 👉 In ra để kiểm tra
 console.log("🔐 Mật khẩu người dùng nhập:", password);
 console.log("🔒 Mật khẩu trong MongoDB:", user.password);
    const isMatch = await bcrypt.compare(password, user.password); // ✅ So sánh đúng cách

    if (!isMatch) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Lỗi server khi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});



// thêm user 

app.post('/api/register', async (req, res) => {
  try {
    const { password, firstName, lastName, email, phone, address, city, district } = req.body;

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo dữ liệu cho người dùng (userData)
    const users = [{
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      address,
      city,
      district,
    }];

    // Thêm người dùng mới vào MongoDB (insertMany)
    const createdUsers = await User.insertMany(users);

    // Dữ liệu cho giỏ hàng (cartData)
    const cartData = createdUsers.map(user => ({
      user: user._id, // Liên kết giỏ hàng với người dùng
      items: [], // Giỏ hàng ban đầu rỗng
    }));

    // Thêm giỏ hàng vào MongoDB (insertMany)
    const createdCarts = await Cart.insertMany(cartData);

    // Cập nhật trường `cart` của người dùng với _id của giỏ hàng
    const updatePromises = createdUsers.map((user, index) => {
      user.cart = createdCarts[index]._id;
      return user.save(); // Lưu lại user đã được cập nhật cart
    });

    // Đợi tất cả các update hoàn tất
    await Promise.all(updatePromises);

    // Trả về kết quả
    res.status(201).json({
      message: "User and cart created successfully (insertMany style)",
      users: createdUsers,
      carts: createdCarts,
    });
  } catch (error) {
    console.error("Error saving user and cart:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});
// 
app.post('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log('userId received:', userId);  // In ra giá trị của userId

  const { productId, quantity, size } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      console.error('Cart not found for user:', userId); // In ra khi không tìm thấy giỏ hàng
      return res.status(404).json({ message: 'Cart not found' });
    }

    const existingItem = cart.items.find(
      item => item.product.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, size });
    }

    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate("items.product");

    res.status(200).json(populatedCart);
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    res.status(500).json({ message: "Lỗi server khi thêm sản phẩm" });
  }
});

// Đoạn mã định nghĩa route để lấy giỏ hàng của người dùng
app.get('/api/cart/:userId', async (req, res) => {
  const { userId } = req.params;  // Lấy userId từ URL
  console.log('Fetching cart for userId:', userId);  // In ra để kiểm tra userId

  try {
      // Tìm giỏ hàng của người dùng từ database
      let cart = await Cart.findOne({ user: userId }).populate('items.product');
      
      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' }); // Trả về lỗi nếu không tìm thấy giỏ hàng
      }

      res.status(200).json(cart);  // Trả về giỏ hàng dưới dạng JSON
  } catch (error) {
      console.error("Lỗi khi lấy giỏ hàng:", error);  // Xử lý lỗi
      res.status(500).json({ message: 'Lỗi server khi lấy giỏ hàng' });
  }
});

//xóa 
app.delete('/api/cart/clear/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
    }

    if (!Array.isArray(cart.items) || cart.items.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng không có sản phẩm để xóa' });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({ message: 'Toàn bộ giỏ hàng đã được xóa', cart });
  } catch (error) {
    console.error('Lỗi khi xóa toàn bộ giỏ hàng:', error.message, error.stack);
    res.status(500).json({ message: 'Lỗi server khi xóa toàn bộ giỏ hàng', error: error.message });
  }
});
// Xóa sản phẩm khỏi giỏ hàng
app.delete('/api/cart/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  const { size } = req.query;  // Lấy size từ query parameter

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
    }

    // Tìm sản phẩm trong giỏ hàng và xóa
    const index = cart.items.findIndex(item => item.product.toString() === productId && item.size === size);

    if (index !== -1) {
      cart.items.splice(index, 1);  // Xoá sản phẩm khỏi giỏ
      await cart.save();  // Lưu lại giỏ hàng sau khi xoá

      res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng', cart });
    } else {
      res.status(404).json({ message: 'Không tìm thấy sản phẩm trong giỏ hàng' });
    }
  } catch (error) {
    console.error("Lỗi khi xóa sản phẩm:", error);
    res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm' });
  }
});





// tạo đơn hàng mới 
app.post('/api/orders', async (req, res) => {
  const { userId, items, total, paymentMethod } = req.body;

  try {
    const isPaid = paymentMethod === "bank";

    // 👉 Chuyển product thành ObjectId trước khi lưu
    const transformedItems = items.map(item => ({
      product: new mongoose.Types.ObjectId(item.product),
      quantity: item.quantity,
      size: item.size,
    }));

    const newOrder = new Order({
      user: new mongoose.Types.ObjectId(userId),
      items: transformedItems,
      total,
      paymentMethod,
      isPaid,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error.message, error.stack);
    res.status(500).json({ message: "Không thể tạo đơn hàng" });
  }
});
//tìm thoe tên
// Hàm loại bỏ dấu tiếng Việt
// Hàm loại bỏ dấu tiếng Việt



app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`)
})

