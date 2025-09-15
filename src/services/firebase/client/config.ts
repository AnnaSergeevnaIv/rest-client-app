import type { FirebaseApp } from 'firebase/app';
import { getApps, initializeApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAfpZs5dU18WIcnKOX1-z4A0gIt834VvuQ',
  authDomain: 'rest-client-app-fa2f4.firebaseapp.com',
  projectId: 'rest-client-app-fa2f4',
  storageBucket: 'rest-client-app-fa2f4.firebasestorage.app',
  messagingSenderId: '379629067345',
  appId: '1:379629067345:web:be4cbf1e5fdf37d6ac6c70',
  measurementId: 'G-4B31QXJM93',
} as const;

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const getFirebaseClient = (): Readonly<{
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}> => {
  return {
    app,
    auth: getAuth(app),
    firestore: getFirestore(app),
  };
};
