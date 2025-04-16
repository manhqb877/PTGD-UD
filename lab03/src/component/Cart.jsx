import { useCart } from "../components/CartContext";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Cart = () => { 
  const { cart, removeFromCart, totalItems, setCart ,getTotalPrice,clearCart } = useCart(); 
 const [isModal,setIsModal]= useState(false);
 const [isModal2,setIsModal2]= useState(false);

 const [formData, setFormData] = useState({
  userName: "",
  userAddress: "",
  userPhone: "",
  paymentMethod: "cod", 
});
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.userName.trim() || !formData.userAddress.trim() || !formData.userPhone.trim()) {
    alert("Vui lòng điền đầy đủ thông tin trước khi đặt hàng!");

    return;
  }

  alert("đặt hàng thành công,Xin hãy chờ bên cửa hàng chúng tôi gọi điện xác nhận trong giây lát.");
  localStorage.removeItem('cart');  // Xóa giỏ hàng khỏi localStorage

  setIsModal2(false);

};

// tạo hóa đơn khi nhấn xacs nhận mua hàng 
const handleOrderWithAccount = async () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!user || !user._id) {
    alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
    return;
  }

  const orderData = {
    userId: user._id,
    items: cart.map((item) => ({
      product: item.id,
      quantity: item.soLuong,
      size: item.size,
    })),
    total: getTotalPrice(),
    paymentMethod: paymentMethod, // "COD" hoặc "bankTransfer"
  };

  console.log("📤 Payload gửi đi:", orderData); // ✅ sửa lại tên biến

  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error("Tạo đơn hàng thất bại.");
    }

    const result = await response.json();
    alert("Đặt hàng thành công! Xin hãy chờ bên cửa hàng gọi xác nhận.");
    setIsModal(false);
    clearCart();
  } catch (error) {
    console.error("Lỗi khi gửi đơn hàng:", error);
    alert("Đã xảy ra lỗi khi tạo đơn hàng.");
  }
};

//
  const increaseQuantity = (id, size) => {
    setCart((prevCart) => {
      return prevCart.map((p) =>
        p.id === id && p.size === size
          ? { ...p, soLuong: (p.soLuong || 1) + 1 } 
          : p
      );
    });
  };
  //
  const decreaseQuantity = (id, size) => {
    setCart((prevCart) =
      prevCart.map((p) =>
        p.id === id && p.size === size && p.soLuong > 1
          ? { ...p, soLuong: p.soLuong - 1 }
          : p
      )
    );
  };
  //
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      const fullName = `${user?.lastName || ""} ${user?.firstName || ""}`.trim();
      setUserName(fullName);
      setUserAdress(user?.address || "");
      setUserPhone(user?.phone || "Chưa có số điện thoại");
    }
  }, []);
  
  
  
    
  const [userName, setUserName] = useState("Khách");
  const [userAddress,setUserAdress] = useState("");
  const [userPhone, setUserPhone] = useState("Chưa có số điện thoại");
  const [paymentMethod, setPaymentMethod] = useState(""); 

  return ( 
    <div className="mx-[40px] p-4"> 
    <h1>{userName}</h1>
      <div className="text-center  p-2 rounded">
        <h2 className="text-lg font-bold">THÔNG TIN GIỎ HÀNG</h2> 
        <span className="text-gray-700">Bạn có {totalItems} mặt hàng trong giỏ hàng</span>
      </div>

      {cart.length === 0 ? ( 
        <h4 className="text-center  mt-4">Giỏ hàng của bạn đang trống</h4> 
      ) : ( 
        <div>
        <div className=" mx-[50px] p-4 rounded-md flex">
          {cart.map((product) => ( 
            <div key={`${product.id}-${product.size}`} className="mt-10 items-center w-[350px] p-3 ml-3 ">
<img 
  src={`/images/${product.images?.[0]}`} 
  alt={product.name} 
  className="w-[320px]"
/>
              <div className="ml-4">
                <h6 className="font-semibold">{product.name}</h6>
                <p className="text-gray-800">{product.newPrice} VND</p>
                <h6 className="font-semibold">{product.size}</h6>

                <div className="border border-gray h-10 text-lg font-medium w-[130px]">
                  <button className="mx-3 mt-1" onClick={() => increaseQuantity(product.id, product.size)}>+</button>
                  <span className="mx-3">{product.soLuong}</span>
                  <button className="mx-3" onClick={() => decreaseQuantity(product.id, product.size)}>-</button>
                </div>

                <button 
                  onClick={() => removeFromCart(product.id, product.size)}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Gỡ
                </button>

              </div>
            </div>
          ))} 
        </div>

         <div className="flex justify-between items-center py-4 border-t border-gray-300 mt-4 mx-[190px]">
        <Link to="/">
        <button className="border border-black px-6 py-2 text-gray-700 bg-white hover:bg-gray-300 transition ">
          TIẾP TỤC MUA HÀNG
        </button>
        </Link>

        <div className="text-center">
        <p className="font-bold text-lg">Tổng đơn đặt hàng : {getTotalPrice()} VND</p>
        <p className="text-gray-500 text-sm">* Đã bao gồm thuế VAT</p>
        </div>

        <div className="flex space-x-4">
          <button onClick={()=>clearCart()} className="border border-black px-6 py-2 text-black hover:bg-gray-200 transition">
            CẬP NHẬT GIỎ HÀNG
          </button>
          <button onClick={()=>{userName==="Khách"?setIsModal2(true):setIsModal(true)}} className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition">
            THANH TOÁN
          </button>
        </div>
      </div>
      </div>
      )} 

     
      {
        isModal &&(
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className=" items-center justify-between p-4 border-b border-gray-200 bg-white items-center ">
                 
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900">XÁC NHẬN HÓA ĐƠN   </h3>
                                <button
                                  type="button"
                                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                  onClick={() => setIsModal(false)}
                                >
                                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                  </svg>
                                </button>
                  </div>
            <div className="h-[400px] overflow-y-auto">
                  <div>
                    <h4>Thông tin khách hàng :</h4>
                    <p>Họ tên:   {userName}</p>
                    <p>Địa Chỉ:   {userAddress}</p>
                    <p>SDT:       {userPhone}</p>
                    <p>Phương Thức Thanh Toán:</p>
                    <label>
                        <input
                          type="radio"
                          name="payment"
                          value="COD"
                          checked={paymentMethod === "COD"}
                          onChange={() => setPaymentMethod("COD")}
                        />
                        Thanh toán khi nhận hàng (COD)
                      </label>

                      <br />
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="bank"
                          checked={paymentMethod === "bank"}
                          onChange={() => setPaymentMethod("bank")}
                        />
                        Chuyển khoản
                      </label>
                      {paymentMethod === "bank" && (
                        <div className="mt-4 p-2 border border-gray-300 rounded">
                          <h5>Thông tin chuyển khoản:</h5>
                          <p>Ngân hàng: Vietcombank</p>
                          <p>Số tài khoản: 123456789</p>
                          <p>Chủ tài khoản: NGUYEN VAN A</p>
                          <p>Nội dung: Thanh toán đơn hàng {userName}</p>
                        
                        </div>
                      )}
                  </div>

                  <div className=" mx-[70px] p-4 rounded-md  ">
                  {cart.map((product) => ( 
                    <div key={`${product.id}-${product.size}`} className="items-center w-full p-4 ml-3 flex">
                <img 
                          src={`/images/${product.images?.[0]}`} 
                          alt={product.name} 
                          className="w-[150px]"
                        />                     
                        <div className="ml-10">
                                    <h6 className="font-semibold">{product.name}</h6>
                        <p className="text-gray-800">{product.newPrice} VND</p>
                        <h6 className="font-semibold">{product.size}</h6>
                        <h6>Số Lượng: {product.soLuong}</h6>
                        <h6>Thành tiền: {product.newPrice* product.soLuong}</h6>
              </div>
            </div>
          ))} 
                  </div>
            </div> 

                        <div className=" justify-between items-center py-4 border-t border-gray-300 mt-4 ">
                        

                        <div className="text-center">
                        <p className="font-bold text-lg">Tổng số sản phẩm   : {totalItems}</p>

                        <p className="font-bold text-lg">Tổng tiền  : {getTotalPrice()} VND</p>
                        <p className="text-gray-500 text-sm">* Đã bao gồm thuế VAT</p>
                        </div>

                        <div className="flex justify-between w-full px-10 ">
                        <button  onClick={() => setIsModal(false)} className="border border-black px-6 py-2 text-black hover:bg-gray-200 transition ">
                          TRỞ LẠI GIỎ HÀNG
                        </button>
                        <button className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
                          onClick={handleOrderWithAccount}>
                          XÁC NHẬN MUA HÀNG
                        </button>

                      </div>


                      </div>
                         
            </div>
          </div>
        )
      }


{
        isModal2 &&(

          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className=" items-center justify-between p-4 border-b border-gray-200 bg-white items-center ">
                 
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900">MUA HÀNG KHÔNG TÀI KHOẢN   </h3>
                                <button
                                  type="button"
                                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
                                  onClick={() => setIsModal2(false)}
                                >
                                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                  </svg>
                                </button>
                  </div>
            <div className="h-[400px] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
      <h4 className="font-semibold">Thông tin khách hàng:</h4>

      <div>
        <label>Họ tên:</label>
        <input type="text" name="userName" value={formData.userName}onChange={handleChange}
           required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Địa chỉ:</label>
        <input
          type="text"
          name="userAddress"
          value={formData.userAddress}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Số điện thoại:</label>
        <input
          type="text"
          name="userPhone"
          value={formData.userPhone}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Phương thức thanh toán:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="cod">Thanh toán khi nhận hàng</option>
          <option value="bank">Chuyển khoản</option>
        </select>
      </div>

      {formData.paymentMethod === "bank" && (
        <div className="border p-2 bg-gray-100 rounded">
          <p><strong>Thông tin chuyển khoản:</strong></p>
          <p>Ngân hàng: Vietcombank</p>
          <p>Số tài khoản: 123456789</p>
          <p>Chủ tài khoản: Công Ty ABC</p>
        </div>
      )}

      
    </form>


                  <div className=" p-4 rounded-md  ">
                  {cart.map((product) => ( 
                    <div key={`${product.id}-${product.size}`} className="items-center w-full p-4 ml-3 flex">
                    <img 
                      src={`/images/${product.images?.[0]}`} 
                      alt={product.name} 
                      className="w-[120px]" 
                    />
                      <div className="ml-10">
                        <h6 className="font-semibold">{product.name}</h6>
                        <p className="text-gray-800">{product.newPrice} VND</p>
                        <h6 className="font-semibold">{product.size}</h6>
                        <h6>Số Lượng: {product.soLuong}</h6>
                        <h6>Thành tiền: {product.newPrice* product.soLuong}</h6>
              </div>
            </div>
          ))} 
                  </div>
            </div> 

                        <div className=" justify-between items-center py-4 border-t border-gray-300 mt-4 ">
                        

                        <div className="text-center">
                        <p className="font-bold text-lg">Tổng số sản phẩm   : {totalItems}</p>

                        <p className="font-bold text-lg">Tổng tiền  : {getTotalPrice()} VND</p>
                        <p className="text-gray-500 text-sm">* Đã bao gồm thuế VAT</p>
                        </div>

                        <div className="flex justify-between w-full px-10 ">
                        <button  onClick={() => setIsModal2(false)} className="border border-black px-6 py-2 text-black hover:bg-gray-200 transition ">
                          TRỞ LẠI GIỎ HÀNG
                        </button>
                        <button 
                        className="bg-black text-white px-6 py-2 hover:bg-gray-800 transition"
                        onClick={handleSubmit}
                      >
                        XÁC NHẬN MUA HÀNG
                      </button>

                      </div>


                      </div>
                         
            </div>
          </div>
        )
      }
    </div> 
  ); 
}; 

export default Cart;
