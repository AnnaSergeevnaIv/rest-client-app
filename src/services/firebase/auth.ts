import type { NextOrObserver, Unsubscribe, User, UserCredential } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { FirebaseAuthError, getErrorMessage, initFirebaseApp } from './utils.ts';

type EmailAndPassword = {
  email: string;
  password: string;
};

export type FirebaseAuthSubscribeHandler = NextOrObserver<User>;

class FirebaseAuth {
  private static instance: FirebaseAuth | undefined;
  private _currentUser: User | null = null;
  private subscribers = new Map<FirebaseAuthSubscribeHandler, Unsubscribe>();
  private auth;

  private constructor() {
    const { auth } = initFirebaseApp();
    this.auth = auth;
    onAuthStateChanged(auth, user => (this._currentUser = user));
  }

  public get currentUser(): User | null {
    return this._currentUser;
  }

  public static getInstance(): FirebaseAuth {
    if (!FirebaseAuth.instance) {
      FirebaseAuth.instance = new FirebaseAuth();
    }
    return FirebaseAuth.instance;
  }

  public subscribe(handler: FirebaseAuthSubscribeHandler): void {
    const unsubscribe = onAuthStateChanged(this.auth, handler);
    this.subscribers.set(handler, unsubscribe);
  }

  public unsubscribe(handler: FirebaseAuthSubscribeHandler): void {
    if (this.subscribers.has(handler)) {
      this.subscribers.get(handler)?.();
      this.subscribers.delete(handler);
    }
  }

  public unsubscribeAll(): void {
    this.subscribers.entries().forEach(([_, unsubscribe]) => {
      unsubscribe();
    });
    this.subscribers.clear();
  }

  public async signup({ email, password }: EmailAndPassword): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw new FirebaseAuthError(getErrorMessage(error));
    }
  }

  public async signin({ email, password }: EmailAndPassword): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw new FirebaseAuthError(getErrorMessage(error));
    }
  }

  public async signout(): Promise<void> {
    await signOut(this.auth);
  }
}

export const authClient = FirebaseAuth.getInstance();
