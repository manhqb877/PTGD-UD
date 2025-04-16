import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Giỏ hàng
    const [cart, setCart] = useState([]); // Giỏ hàng không khởi tạo từ localStorage nữa
    const [user, setUser] = useState(null); // Lưu thông tin người dùng

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (loggedInUser && loggedInUser._id) { 
            setUser(loggedInUser);
        } else {
            setUser(null);
        }
    }, []);
    
    
    useEffect(() => {
        const fetchCartFromServer = async (userId) => {
            try {
                const res = await fetch(`http://localhost:5000/api/cart/${userId}`);
                const data = await res.json();
                if (res.ok) {
                  const mappedItems = data.items
                  .filter(item => item.product) 
                  .map((item) => ({
                    id: item.product._id,
                    name: item.product.name,
                    newPrice: item.product.newPrice,
                    size: item.size,
                    soLuong: item.quantity,
                    images: item.product.images,
                }));
                
                    setCart(mappedItems);
                } else {
                    console.error("Lỗi khi lấy giỏ hàng từ server");
                }
            } catch (err) {
                console.error("Lỗi kết nối đến server:", err);
            }
        };
        

        if (user && user._id) {
            // Fetch giỏ hàng từ server khi người dùng đã đăng nhập
            fetchCartFromServer(user._id);
        } else {
            // Nếu chưa đăng nhập, lấy giỏ hàng từ localStorage
            const savedCart = localStorage.getItem("cart");
            setCart(savedCart ? JSON.parse(savedCart) : []);
        }
    }, [user]);

    // Danh sách yêu thích
    const [wishlist, setWishlist] = useState(() => {
        const savedWishlist = localStorage.getItem("wishlist");
        return savedWishlist ? JSON.parse(savedWishlist) : [];
    });

    // Lưu giỏ hàng vào localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Lưu danh sách yêu thích vào localStorage
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    
//thêm 
    const addToCart = async (product) => {
        if (!user || !user._id) {
          // Nếu chưa đăng nhập, lưu vào localStorage
          console.log("User chưa đăng nhập, lưu vào localStorage");
      
          // Lấy giỏ hàng hiện tại từ localStorage
          const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      
          // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
          const exists = savedCart.some((p) => p._id === product._id && p.size === product.size);
      
          if (exists) {
            // Nếu sản phẩm đã có trong giỏ, chỉ cập nhật số lượng
            const updatedCart = savedCart.map((p) =>
              p._id === product._id && p.size === product.size
                ? { ...p, soLuong: p.soLuong + product.soLuong }
                : p
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);  
          } else {
            // Nếu sản phẩm chưa có trong giỏ, thêm mới vào giỏ hàng
            const updatedCart = [...savedCart, product];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);  // Cập nhật lại trạng thái giỏ hàng trên client
          }
      
          return;
        }
      
        // Nếu đã đăng nhập, gửi thông tin sản phẩm lên server (MongoDB)
        const userId = user._id;
      
        try {
          const exists = cart.some((p) => p._id === product._id && p.size === product.size);
      
          // Gửi thông tin sản phẩm mới lên server
          const res = await fetch(`http://localhost:5000/api/cart/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              productId: product._id,
              quantity: product.soLuong,
              size: product.size,
            }),
          });
      
          if (res.ok) {
            // Cập nhật lại cart ở client
            if (exists) {
              const updatedCart = cart.map((p) =>
                p._id === product._id && p.size === product.size
                  ? { ...p, soLuong: p.soLuong + product.soLuong }
                  : p
              );
              setCart(updatedCart);
            } else {
              setCart([...cart, product]);
            }
          } else {
            console.error("Lỗi khi thêm sản phẩm vào giỏ hàng trên server");
          }
        } catch (error) {
          console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
        }
      };
      
      
    
      // xóa sản phẩm 
      const removeFromCart = async (productId, size) => {
        if (!user || !user._id) {
          console.error("User ID is undefined.");
          return;
        }
      
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn gỡ sản phẩm này khỏi giỏ hàng?");
        if (!confirmDelete) return;
      
        try {
          const res = await fetch(
            `http://localhost:5000/api/cart/${user._id}/${productId}?size=${size}`,
            { method: 'DELETE' }
          );
      
          if (res.ok) {
            setCart((prevCart) =>
              prevCart.filter((item) => !(item.id === productId && item.size === size))
            );
          } else {
            console.error("Lỗi khi xóa sản phẩm khỏi server");
          }
        } catch (error) {
          console.error("Lỗi kết nối khi xóa sản phẩm:", error);
        }
      };
      
    // Xóa toàn bộ giỏ hàng
    const clearCart = async () => {
      if (!user || !user._id) {
        console.error("User ID is undefined.");
        return;
      }
    
      const confirmClear = window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?");
      if (!confirmClear) return;
    
      try {
        console.log("Calling API with userId:", user?._id);

        const res = await fetch(`http://localhost:5000/api/cart/clear/${user._id}`, {
          method: 'DELETE',
        });
    
        if (res.ok) {
          const data = await res.json();
          console.log(data.message); // Log thông điệp trả về từ server
    
          setCart([]);  // Cập nhật lại giỏ hàng trên frontend
          localStorage.removeItem("cart");  // Xóa giỏ hàng khỏi localStorage
        } else {
          const errorData = await res.json();
          console.error("Lỗi khi xóa toàn bộ giỏ hàng trên server:", errorData.message);
        }
      } catch (error) {
        console.error("Lỗi kết nối khi xóa toàn bộ giỏ hàng:", error);
      }
    };
    


    // Tính tổng số sản phẩm trong giỏ hàng
    const totalItems = cart.reduce((total, product) => total + product.soLuong, 0);

    // Tính tổng giá trị đơn hàng
    const getTotalPrice = () => {
        return cart.reduce((total, product) => total + (Number(product.newPrice) || 0) * (product.soLuong || 1), 0);
    };

    // Thêm sản phẩm vào danh sách yêu thích
    const addToWishlist = (product) => {
        setWishlist((prevWishlist) => {
            const exists = prevWishlist.some((p) => p.id === product.id);
            return exists ? prevWishlist : [...prevWishlist, product];
        });
    };

    // Xóa sản phẩm khỏi danh sách yêu thích
    const removeFromWishlist = (id) => {
        setWishlist((prevWishlist) => prevWishlist.filter((product) => product.id !== id));
    };

    // Xóa toàn bộ danh sách yêu thích
    const clearWishlist = () => {
        setWishlist([]);
        localStorage.removeItem("wishlist");
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                removeFromCart,
                totalItems,
                getTotalPrice,
                clearCart,
                wishlist,
                addToWishlist,
                removeFromWishlist,
                clearWishlist,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
