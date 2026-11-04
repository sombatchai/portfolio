// js/auth.js

(function() {
    const role = localStorage.getItem('employeeRole');
    const currentPage = window.location.pathname.toLowerCase(); // ปรับให้เป็นตัวเล็กเพื่อตรวจสอบง่ายขึ้น

    // 1. ตรวจสอบสถานะการล็อกอิน (แก้ไขตัวสะกดเป็น Login.html)
    if (!role) {
        window.location.href = 'Login.html';
        return;
    }

    // 2. ป้องกันสิทธิ์ Staff แอบเข้าหน้า Admin
    if (role === 'Staff') {
        // รายการหน้าต้องห้าม (ใส่เป็นตัวเล็กเพื่อเปรียบเทียบ)
        const forbiddenPages = ['index.html', 'employee.html', 'addempdata.html'];
        const isForbidden = forbiddenPages.some(page => currentPage.includes(page));

        if (isForbidden) {
            // วาร์ปไปหน้าขายสินค้าทันที (แก้ไขเป็น ProductSales.html)
            window.location.href = 'ProductSales.html';
            return;
        }
    }
})();

// 3. จัดการ Sidebar และชื่อพนักงานเมื่อโหลดหน้าเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    const role = localStorage.getItem('employeeRole');
    const name = localStorage.getItem('employeeName');

    // แสดงชื่อพนักงานในทุกหน้าเพื่อให้ระบบดูต่อเนื่อง
    const nameElement = document.getElementById('display-staff-name');
    if (name && nameElement) {
        nameElement.innerText = name;
    }

    // ซ่อนเมนูสำหรับ Staff
    if (role === 'Staff') {
        const adminMenus = document.querySelectorAll('.admin-only');
        adminMenus.forEach(menu => {
            menu.style.display = 'none';
        });
    }
});



function logout() {
    localStorage.clear();

    setTimeout(() => {
        window.location.href = 'Login.html'; // มั่นใจว่า L ตัวใหญ่
    }, 100);
}