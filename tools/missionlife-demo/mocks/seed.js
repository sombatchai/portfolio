// Sample data for the MissionLife demo: one player ("demo") with missions in every state,
// so Home, Quest, Trophy and History all have something to show.
const MONSTERS = [
  'https://cdn-icons-png.flaticon.com/512/1033/1033955.png',
  'https://cdn-icons-png.flaticon.com/512/1033/1033979.png',
  'https://cdn-icons-png.flaticon.com/512/1033/1033991.png',
];

export function seedData() {
  const now = Date.now();
  const ts = (daysAgo) => ({ seconds: Math.floor((now - daysAgo * 864e5) / 1000), nanoseconds: 0 });
  const day = (daysAgo) => new Date(now - daysAgo * 864e5).toISOString().split('T')[0];
  const base = { username: 'demo', characterName: 'Demo Hero', userAvatar: '', goalType: 'count', dailyQuota: 1, isCompleted: false };

  const m = (id, f) => [id, { ...base, ...f }];
  const missions = Object.fromEntries([
    m('m1', { missionName: 'วิ่งออกกำลังกาย', category: 'สุขภาพ', xp: 60, currentDamage: 20, totalCount: 3, currentProgress: 1, unit: 'กิโลเมตร', duration: 21, difficulty: 'ปานกลาง', monsterName: 'Lazy Slime', monsterImage: MONSTERS[0], status: 'in_progress', lastUpdated: day(0), createdAt: ts(4) }),
    m('m2', { missionName: 'อ่านหนังสือ', category: 'การเรียน', xp: 40, currentDamage: 10, totalCount: 20, currentProgress: 5, unit: 'หน้า', duration: 7, difficulty: 'ง่าย', monsterName: 'Sleepy Owl', monsterImage: MONSTERS[1], status: 'in_progress', lastUpdated: day(0), createdAt: ts(2) }),
    m('m3', { missionName: 'ดื่มน้ำให้ครบ', category: 'สุขภาพ', xp: 30, currentDamage: 0, totalCount: 8, currentProgress: 0, unit: 'แก้ว', duration: 7, difficulty: 'ง่าย', monsterName: 'Desert Imp', monsterImage: MONSTERS[2], status: 'active', lastUpdated: day(0), createdAt: ts(1) }),
    m('m4', { missionName: 'ฝึกเขียนโค้ด', category: 'การเรียน', xp: 80, currentDamage: 80, totalCount: 1, currentProgress: 1, unit: 'ชั่วโมง', duration: 21, difficulty: 'ยาก', monsterName: 'Bug King', monsterImage: MONSTERS[1], status: 'completed', isCompleted: true, lastUpdated: day(6), createdAt: ts(25) }),
    m('m5', { missionName: 'นั่งสมาธิ', category: 'จิตใจ', xp: 30, currentDamage: 30, totalCount: 1, currentProgress: 1, unit: 'นาที', duration: 7, difficulty: 'ง่าย', monsterName: 'Noisy Ghost', monsterImage: MONSTERS[0], status: 'completed', isCompleted: true, lastUpdated: day(10), createdAt: ts(17) }),
    m('m6', { missionName: 'ตื่นเช้า', category: 'ไลฟ์สไตล์', xp: 20, currentDamage: 5, totalCount: 1, currentProgress: 0, unit: 'วัน', duration: 7, difficulty: 'ง่าย', monsterName: 'Snooze Bat', monsterImage: MONSTERS[2], status: 'missed', lastUpdated: day(12), createdAt: ts(20) }),
  ]);

  return {
    users: {
      demo_user: {
        username: 'demo', email: 'demo@missionlife.app', password: 'demo1234', age: 21, birthDate: '01/01/2005',
        characterName: 'Demo Hero', avatarSource: '', hasCharacter: true, createdAt: new Date(now - 30 * 864e5).toISOString(),
      },
    },
    missions,
    feedback_db: {
      f1: { username: 'demo', characterName: 'Demo Hero', topic: 'Feature request', message: 'อยากให้มีโหมดปาร์ตี้ทำภารกิจกับเพื่อน', status: 'replied', reply: 'ขอบคุณครับ ทีมกำลังพิจารณาฟีเจอร์นี้', createdAt: ts(3) },
    },
  };
}
