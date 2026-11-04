class TimeDisplay {
    constructor(elementId) {
        this.displayElement = document.getElementById(elementId);
        this.options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
    }

    // เมธอดสำหรับจัดรูปแบบวันที่เป็นภาษาไทย
    getThaiDate() {
        const now = new Date();
        return now.toLocaleDateString('th-TH', this.options);
    }

    // เมธอดสำหรับอัปเดตหน้าจอ
    update() {
        if (this.displayElement) {
            this.displayElement.innerText = this.getThaiDate();
        }
    }

    // เริ่มต้นทำงาน (Real-time)
    start() {
        this.update(); // รันครั้งแรกทันที
        setInterval(() => this.update(), 1000); // อัปเดตทุก 1 วินาที (1000ms)
    }
}

// การนำไปใช้งาน (Instantiation)
const myDateDisplay = new TimeDisplay('current-date');
myDateDisplay.start();