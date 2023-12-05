document.querySelector('.product-content-right-product-button-gio button').addEventListener('click', function () {
    const productImg = document.querySelector(".product-content-left-img img").src;
    const productName = document.querySelector('.product-content-right-product-name h1').textContent;
    const productPrice = document.querySelector('.product-content-right-product-price p').textContent;
    const productQuantity = document.querySelector('.quantity input').value;
    

    // Tạo đối tượng sản phẩm
    const product = {
        img: productImg,
        name: productName,
        price: productPrice,
        quantity: productQuantity,
    };
    
    // Lấy danh sách sản phẩm trong giỏ hàng từ Local Storage
    let cart = localStorage.getItem('cart');
    cart = cart ? JSON.parse(cart) : [];

    // Thêm sản phẩm vào giỏ hàng
    cart.push(product);

    // Lưu danh sách sản phẩm vào Local Storage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Chuyển người dùng đến trang "cart.html"
    window.location.href = 'cart.html';
});

// Hàm được gọi khi ấn vào nút "MUA HÀNG"
function addToCart() {
    const quantity = parseInt(document.getElementById("quantityInput").value);

    // Lấy giá trị giá tiền từ phần tử có class là "product-content-right-product-price"
    const priceElement = document.querySelector(".product-content-right-product-price");
    const priceText = priceElement.querySelector("p").innerText;
    const price = parseFloat(priceText.replace('.', '')); // Chuyển đổi chuỗi giá tiền thành số

    // Tính tổng giá tiền
    const totalAmount = quantity * price;

    // Lưu dữ liệu vào Local Storage
    localStorage.setItem("totalProducts", quantity);
    localStorage.setItem("totalAmount", totalAmount);

    // Chuyển hướng đến trang address.html
    window.location.href = "address.html";
}
