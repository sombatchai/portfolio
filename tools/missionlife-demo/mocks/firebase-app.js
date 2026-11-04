// Demo stand-in for "firebase/app": no Firebase app is created, so the demo never contacts Firebase.
const app = { name: '[demo]', options: {} };
export const initializeApp = () => app;
export const getApps = () => [app];
export const getApp = () => app;
