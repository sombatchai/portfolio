const { ipcRenderer } = require('electron');

let allProducts = []; // เก็บข้อมูลสินค้าทั้งหมดจากฐานข้อมูลสำหรับทำ Filter
let cart = [];        // ตัวแปรเก็บรายการสินค้าในตะกร้า

// 1. ดึงข้อมูลสินค้าเมื่อเปิดหน้าจอ และตรวจสอบสิทธิ์การเข้าใช้งาน
document.addEventListener('DOMContentLoaded', () => {
    // 1. สั่งโหลดข้อมูลสินค้าทันที
    ipcRenderer.send('load-products');

    // 2. จัดการชื่อพนักงานและสิทธิ์การเข้าถึง
    const name = localStorage.getItem('employeeName');
    const role = localStorage.getItem('employeeRole');
    const nameElement = document.getElementById('display-staff-name');

    if (name) {
        if (nameElement) nameElement.innerText = name;
    } else {
        window.location.href = 'Login.html';
    }

    if (role === 'Staff') {
        const adminMenus = document.querySelectorAll('.admin-only');
        adminMenus.forEach(menu => menu.style.display = 'none');
    }
});

// 2. รับข้อมูลสินค้าจาก Backend และแสดงผล
ipcRenderer.on('render-products', (event, products) => {
    allProducts = products; 
    renderCatalog(products);       // วาดการ์ดสินค้าบนหน้าจอ
    updateCategoryFilter(products); // อัปเดตหมวดหมู่ใน Dropdown
});
// 🟢 ฟังก์ชันวาดรายการการ์ดสินค้า (สำคัญ: ต้องใส่ data-category เพื่อใช้ Filter)
function renderCatalog(products) {
    const productContainer = document.querySelector('.product-display-area'); 
    if (!productContainer) return;
    productContainer.innerHTML = ''; 

    products.forEach(product => {
        const productCard = `
            <div class="product-card" 
                 data-category="${product.pro_category}" 
                 onclick="quickAddToCart('${product.product_id}')" 
                 style="cursor: pointer;">
                <div class="product-image-placeholder">
                    <img src="${product.image || '../assets/no-image.png'}" alt="${product.product_name}">
                </div>
                <div class="product-details">
                    <h4 class="product-name">${product.product_name}</h4>
                    <p class="product-info">สินค้าคงเหลือ ${product.quantity} ชิ้น</p>
                    <p class="product-price">ราคาต่อชิ้น ${product.price} บาท</p>
                </div>
            </div>
        `;
        productContainer.innerHTML += productCard;
    });
}

// 🟢 ฟังก์ชันค้นหาและกรองสินค้าแบบ Real-time (เรียกใช้จาก onkeyup/onchange ใน HTML)
function filterProducts() {
    const searchInput = document.getElementById("catalog-search");
    const categorySelect = document.getElementById("catalog-filter");

    if (!searchInput || !categorySelect) return;

    const searchText = searchInput.value.toLowerCase();
    const selectedCat = categorySelect.value;
    
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {
        const nameElement = card.querySelector(".product-name");
        if (!nameElement) return;

        const productName = nameElement.innerText.toLowerCase();
        const productCat = card.getAttribute("data-category");

        // ตรวจสอบเงื่อนไขว่าตรงกับคำค้นหาและหมวดหมู่หรือไม่
        const isMatchSearch = productName.includes(searchText);
        const isMatchCat = selectedCat === "" || productCat === selectedCat;

        // สลับสถานะการแสดงผล (block = แสดง, none = ซ่อน)
        card.style.display = (isMatchSearch && isMatchCat) ? "block" : "none";
    });
}

// 🟢 ฟังก์ชันสร้างหมวดหมู่ใน Dropdown อัตโนมัติ
function updateCategoryFilter(products) {
    const categorySelect = document.getElementById("catalog-filter");
    if (!categorySelect) return;

    const categories = [...new Set(products.map(p => p.pro_category))];
    
    categorySelect.innerHTML = '<option value="">ประเภทสินค้าทั้งหมด</option>';
    categories.forEach(cat => {
        if (cat) {
            const option = document.createElement("option");
            option.value = cat;
            option.innerText = cat;
            categorySelect.appendChild(option);
        }
    });
}

// --- ส่วนจัดการตะกร้าสินค้า (เหมือนเดิม) ---
function quickAddToCart(id) {
    const product = allProducts.find(p => p.product_id === id);
    if (product) {
        document.getElementById('sales-p-id').value = product.product_id;
        document.getElementById('sales-p-name').value = product.product_name;
        document.getElementById('sales-p-type').value = product.pro_category;
        document.getElementById('sales-p-price').value = product.price;
        document.getElementById('sales-p-qty').value = 1; 
        document.getElementById('sales-p-qty').focus();
    }
}

function confirmAddToCart() {
    const pId = document.getElementById('sales-p-id').value;
    const pName = document.getElementById('sales-p-name').value;
    const pPrice = parseFloat(document.getElementById('sales-p-price').value);
    const pQty = parseInt(document.getElementById('sales-p-qty').value);

    if (!pId || pQty <= 0) {
        alert("🚨 กรุณาเลือกสินค้าและระบุจำนวนให้ถูกต้อง");
        return;
    }

    const existingItem = cart.find(item => item.id === pId);
    if (existingItem) {
        existingItem.qty += pQty;
        existingItem.total = existingItem.qty * existingItem.price;
    } else {
        cart.push({
            id: pId,
            product_id: pId,
            name: pName,
            price: pPrice,
            qty: pQty,
            total: pPrice * pQty
        });
    }
    renderCart(); 
    clearForm();
}

function renderCart() {
    const cartItemsList = document.getElementById('cart-items-list');
    if (!cartItemsList) return;
    cartItemsList.innerHTML = ''; 
    let subtotal = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<div class="empty-cart-message">ยังไม่มีรายการสินค้า</div>';
    } else {
        cart.forEach((item, index) => {
            subtotal += item.total;
            const itemRow = `
                <div class="cart-item-row" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 0.9rem;">
                    <span style="flex: 2;">${item.name}</span>
                    <span style="flex: 1; text-align: center;">x${item.qty}</span>
                    <span style="flex: 1; text-align: right;">${item.total.toLocaleString()}</span>
                    <button onclick="removeItemFromCart(${index})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; margin-left: 10px;">
                        <i class="fas fa-times-circle"></i>
                    </button>
                </div>
            `;
            cartItemsList.innerHTML += itemRow;
        });
    }
    document.getElementById('summary-subtotal').innerText = subtotal.toLocaleString();
    document.getElementById('summary-total').innerText = subtotal.toLocaleString();
}

function handleCheckout() {
    if (cart.length === 0) {
        alert("🚨 ไม่มีสินค้าในตะกร้า");
        return;
    }
    
    const currentUserName = localStorage.getItem('employeeName'); 
    
    // ส่งข้อมูลในรูปแบบที่ main.js TRANSACTION รอรับ
    const checkoutData = {
        cart: cart, // ส่งตัวแปรตะกร้าทั้งหมดตามที่ main.js กำหนดไว้
        soldBy: currentUserName 
    };
    
    ipcRenderer.send('process-checkout', checkoutData);
}
function removeItemFromCart(index) {
    if (confirm("ต้องการยกเลิกรายการสินค้านี้ใช่หรือไม่?")) {
        cart.splice(index, 1);
        renderCart();
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'Login.html'; 
}


function clearForm() {
    document.getElementById('sales-p-id').value = '';
    document.getElementById('sales-p-name').value = '';
    document.getElementById('sales-p-type').value = '';
    document.getElementById('sales-p-price').value = '';
    document.getElementById('sales-p-qty').value = 1;
}

// ฟังก์ชันสำหรับเรียกโหลดสินค้าใหม่ (ใช้ซ้ำได้บ่อยๆ)
function loadProducts() {
    ipcRenderer.send('load-products');
}

ipcRenderer.on('checkout-success', () => {
    alert("✅ ชำระเงินและบันทึกข้อมูลเรียบร้อย");
    cart = [];
    renderCart();
    loadProducts(); //
});

function loadData() {
    // 🟢 1. ล้างตัวดักฟังเก่าออกให้หมดก่อน (เพื่อไม่ให้ทำงานซ้อนกันจนอืด)
    ipcRenderer.removeAllListeners('render-employees');
   

    // 🟢 2. ส่งคำสั่งดึงข้อมูล
    ipcRenderer.send('load-data-request');
}

// เรียกใช้งานเมื่อโหลดหน้า
document.addEventListener('DOMContentLoaded', loadData);

// ฟังก์ชันค้นหาสินค้าจากรหัสขณะพิมพ์
function searchProductById(value) {
    const productId = value.trim();
    if (productId.length > 0) {
        // ส่งรหัสสินค้าไปดึงข้อมูลจาก Database ใน main.js
        ipcRenderer.send('get-product-by-id', productId);
    } else {
        clearForm(); // ล้างช่องข้อมูลถ้าลบจนว่าง
    }
}

// ตัวรับข้อมูลเมื่อ Database หาเจอแล้วส่งกลับมา
ipcRenderer.on('product-data-response', (event, data) => {
    // ตรวจสอบว่ามีข้อมูลส่งมาจริง และไม่ได้กำลังอยู่ในหน้า Management (ใช้เช็คจาก ID ช่องกรอก)
    const idInput = document.getElementById('sales-p-id');
    
    if (data && idInput) {
        // เติมข้อมูลลงในช่องต่างๆ อัตโนมัติ
        document.getElementById('sales-p-name').value = data.product_name || '';
        document.getElementById('sales-p-type').value = data.pro_category || '';
        document.getElementById('sales-p-price').value = data.price || 0;
        document.getElementById('sales-p-qty').value = 1; // ตั้งค่าเริ่มต้น 1 ชิ้น
    }
});