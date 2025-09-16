import type { NextFn, User, UserCredential } from 'firebase/auth';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { throwFirebaseAuthError } from '../utils/index.ts';
import { getFirebaseClient } from './config.ts';

type EmailAndPassword = {
  email: string;
  password: string;
};

export type FirebaseAuthSubscribeHandler = NextFn<User | null>;

class FirebaseAuthClient {
  private static instance: FirebaseAuthClient | undefined;
  private subscribers = new Set<FirebaseAuthSubscribeHandler>();
  private _currentUser: User | null = null;
  private auth;

  private constructor() {
    const { auth } = getFirebaseClient();
    this.auth = auth;
    onAuthStateChanged(auth, this.reducedObserver);
  }

  private reducedObserver = (user: User | null): void => {
    // if (user?.uid !== this._currentUser?.uid) {
    this._currentUser = user;
    this.subscribers.values().forEach(handler => {
      handler(user);
    });
    // }
  };

  public get currentUser(): User | null {
    return this._currentUser;
  }

  public static getInstance(): FirebaseAuthClient {
    if (!FirebaseAuthClient.instance) {
      FirebaseAuthClient.instance = new FirebaseAuthClient();
    }
    return FirebaseAuthClient.instance;
  }

  public subscribe(handler: FirebaseAuthSubscribeHandler): void {
    this.subscribers.add(handler);
  }

  public unsubscribe(handler: FirebaseAuthSubscribeHandler): void {
    this.subscribers.delete(handler);
  }

  public unsubscribeAll(): void {
    this.subscribers.clear();
  }

  public async signup({ email, password }: EmailAndPassword): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throwFirebaseAuthError(error);
    }
  }

  public async signin({ email, password }: EmailAndPassword): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throwFirebaseAuthError(error);
    }
  }

  public async signout(): Promise<void> {
    await signOut(this.auth);
  }
}

export const AuthClient = FirebaseAuthClient.getInstance();
