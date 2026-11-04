const modal = document.getElementById('productModal');

// ฟังก์ชันเปิด Modal เมื่อกดปุ่ม "เพิ่มสินค้า"
document.querySelector('.add-product-btn').onclick = function() {
    modal.style.display = "block";
}

// ฟังก์ชันปิด Modal
function closeModal() {
    modal.style.display = "none";
}

// ปิดเมื่อคลิกข้างนอกกล่อง
window.onclick = function(event) {
    if (event.target == modal) closeModal();
}