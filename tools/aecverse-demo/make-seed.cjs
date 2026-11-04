// Writes sample work orders and notifications for the demo (made up, not copied from the live system).
const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'seed');
const day = (d) => new Date(Date.now() - d * 864e5).toISOString();
const due = (d) => new Date(Date.now() + d * 864e5).toISOString().slice(0, 10);
const year = new Date().getFullYear();

const people = {
  admin: { id: 'demo-admin', name: 'Demo Admin', role: 'admin' },
  eng: { id: 'demo-engineer', name: 'Demo Engineer', role: 'engineer' },
};
const wo = (n, title, equipment, type, priority, status, who, created, dueIn, note) => ({
  id: `WO-${year}-${String(n).padStart(5, '0')}`, title, equipment, type, priority, status,
  assigneeId: who ? who.id : '', assigneeName: who ? who.name : '', assigneeRole: who ? who.role : '',
  dueDate: due(dueIn), note, createdBy: people.admin.id, createdByName: people.admin.name,
  createdAt: day(created), updatedAt: day(Math.max(0, created - 1)),
});
const workOrders = [
  wo(6, 'ตรวจวัดก๊าซ H2S ก่อนเข้าพื้นที่บ่อหมัก', 'บ่อหมักและโดมเก็บก๊าซ (Digester Tank)', 'inspection', 'high', 'pending', people.eng, 0, 1, 'ใช้เครื่องวัดก๊าซแบบพกพา บันทึกค่าลงใบงาน'),
  wo(5, 'ทำ LOTO ก่อนซ่อมมอเตอร์ปั๊มป้อน', 'จุดทำ LOTO — ตู้ควบคุมไฟฟ้าหลัก (MCC)', 'maintenance', 'critical', 'in_progress', people.eng, 1, 0, 'ล็อกเบรกเกอร์และติดป้ายแขวนทุกจุด'),
  wo(4, 'เปลี่ยนซีลฝาแมนโฮล', 'ปากบ่อแมนโฮล (Manhole) — หลังคาถังหมัก', 'repair', 'medium', 'pending', people.eng, 2, 5, 'ต้องมีผู้เฝ้าระวังด้านนอก (Standby man)'),
  wo(3, 'ตรวจระดับน้ำและอุณหภูมิบ่อลดอุณหภูมิ', 'บ่อลดอุณหภูมิ (Cooling Pond)', 'inspection', 'low', 'completed', people.eng, 6, -3, 'ค่าปกติ'),
  wo(2, 'ตรวจรอยรั่วถุงเก็บก๊าซ', 'บ่อผลิตและเก็บก๊าซชีวภาพ (MCL & Gasholder)', 'inspection', 'high', 'completed', people.admin, 9, -6, 'ไม่พบรอยรั่ว'),
  wo(1, 'ซ้อมแผนอพยพกรณีก๊าซรั่ว', 'บ่อหมักและโดมเก็บก๊าซ (Digester Tank)', 'emergency', 'medium', 'cancelled', '', 14, -10, 'เลื่อนไปไตรมาสหน้า'),
];
const n = (id, userId, kind, title, body, link, created, read) => ({ id, userId, kind, title, body, link, createdAt: day(created), readAt: read ? day(created) : null, ...(userId === '*' ? { readBy: [] } : {}) });
const notifications = [
  n('demo-n1', 'demo-engineer', 'work_order', `ได้รับมอบหมายงานใหม่ — WO-${year}-00006`, 'ตรวจวัดก๊าซ H2S ก่อนเข้าพื้นที่บ่อหมัก', 'WorkOrder.html', 0, false),
  n('demo-n2', 'demo-engineer', 'work_order', `ได้รับมอบหมายงานใหม่ — WO-${year}-00005`, 'ทำ LOTO ก่อนซ่อมมอเตอร์ปั๊มป้อน', 'WorkOrder.html', 1, true),
  n('demo-n3', '*', 'info', 'ยินดีต้อนรับสู่ AEC VERSE (เดโม)', 'ลองเดินชมโรงงานใน Digital Twin ทำแบบทดสอบความปลอดภัย และสร้างใบสั่งงาน', 'Dashboard.html', 2, false),
];
fs.writeFileSync(path.join(dir, 'work_orders_v1.json'), JSON.stringify(workOrders, null, 1));
fs.writeFileSync(path.join(dir, 'notifications_v1.json'), JSON.stringify(notifications, null, 1));
console.log('seed written');
