// Demo stand-in for "firebase/firestore": the calls MissionLife makes, on an in-memory store
// seeded with a sample player and saved in this browser's localStorage. Nothing reaches Firebase.
import { seedData } from './seed';

const KEY = 'missionlife-demo-v1';
let data = load();
const subs = new Set();

function load() {
  try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {}
  return seedData();
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {}
  subs.forEach((fn) => fn());
}
export function resetDemo() { data = seedData(); save(); }

const newId = () => Math.random().toString(36).slice(2, 12);
const col = (name) => (data[name] = data[name] || {});

export const getFirestore = () => ({ demo: true });
export const collection = (db, name) => ({ type: 'collection', name });
export const doc = (a, b, c) => (a && a.type === 'collection' ? { type: 'doc', col: a.name, id: b || newId() } : { type: 'doc', col: b, id: c });
export const where = (field, op, value) => ({ kind: 'where', field, op, value });
export const orderBy = (field, dir = 'asc') => ({ kind: 'orderBy', field, dir });
export const limit = (n) => ({ kind: 'limit', n });
export const query = (c, ...constraints) => ({ type: 'query', name: c.name, constraints });
export const serverTimestamp = () => { const ms = Date.now(); return { seconds: Math.floor(ms / 1000), nanoseconds: (ms % 1000) * 1e6 }; };

const test = (v, op, x) => {
  switch (op) {
    case '==': return v === x;
    case '!=': return v !== x;
    case '<': return v < x;
    case '<=': return v <= x;
    case '>': return v > x;
    case '>=': return v >= x;
    case 'in': return Array.isArray(x) && x.includes(v);
    case 'array-contains': return Array.isArray(v) && v.includes(x);
    default: return true;
  }
};
const snapDoc = (c, id) => {
  const d = col(c)[id];
  return { id, ref: { type: 'doc', col: c, id }, exists: () => d !== undefined, data: () => (d ? JSON.parse(JSON.stringify(d)) : undefined) };
};
function run(q) {
  const name = q.type === 'collection' ? q.name : q.name;
  let ids = Object.keys(col(name));
  for (const c of q.constraints || []) if (c.kind === 'where') ids = ids.filter((id) => test(col(name)[id][c.field], c.op, c.value));
  for (const c of q.constraints || []) if (c.kind === 'orderBy') {
    const k = (id) => { const v = col(name)[id][c.field]; return v && typeof v === 'object' && 'seconds' in v ? v.seconds : v; };
    ids.sort((a, b) => (k(a) > k(b) ? 1 : k(a) < k(b) ? -1 : 0) * (c.dir === 'desc' ? -1 : 1));
  }
  const lim = (q.constraints || []).find((c) => c.kind === 'limit');
  if (lim) ids = ids.slice(0, lim.n);
  const docs = ids.map((id) => snapDoc(name, id));
  return { docs, empty: docs.length === 0, size: docs.length, forEach: (fn) => docs.forEach(fn) };
}
const later = (v) => new Promise((r) => setTimeout(() => r(v), 60));

export const getDocs = (q) => later(run(q));
export const getDoc = (ref) => later(snapDoc(ref.col, ref.id));
export async function addDoc(c, value) { const id = newId(); col(c.name)[id] = value; save(); return later({ id, type: 'doc', col: c.name }); }
export async function setDoc(ref, value, opts) { col(ref.col)[ref.id] = opts && opts.merge ? { ...col(ref.col)[ref.id], ...value } : value; save(); return later(); }
export async function updateDoc(ref, value) {
  if (!col(ref.col)[ref.id]) throw new Error('No document to update');
  col(ref.col)[ref.id] = { ...col(ref.col)[ref.id], ...value }; save(); return later();
}
export async function deleteDoc(ref) { delete col(ref.col)[ref.id]; save(); return later(); }

export function onSnapshot(target, next, onError) {
  const emit = () => { try { next(target.type === 'doc' ? snapDoc(target.col, target.id) : run(target)); } catch (e) { onError && onError(e); } };
  setTimeout(emit, 30);
  subs.add(emit);
  return () => subs.delete(emit);
}
