import { Injectable, inject } from '@angular/core';
import { Auth,signInWithEmailAndPassword,
   createUserWithEmailAndPassword, 
   signOut, UserCredential, User } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
interface UserDocument {
  username: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();
  user: User | null = null;
  username: string | null = null;

  constructor(private router:Router){
    this.auth.onAuthStateChanged( async user => {
      this.userSubject.next(user);
      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as UserDocument;
          this.username = userData.username || null;
        }
      }
    });
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.userSubject.next(userCredential.user);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string, username: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;
      const userUuid = uuidv4();

      await setDoc(doc(this.firestore, 'users', userId), {
        username: username,
        uuid: userUuid,
        email: email
      });

      this.userSubject.next(userCredential.user);
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.userSubject.next(null);
      this.router.navigate(['main','chat']);
    } catch (error) {
      throw error;
    }
  }

  
  getUser(): Observable<User | null> {
    return this.user$;
  }
  
  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }

  async getUserData(uid: string) {
    const userDoc = await getDoc(doc(this.firestore, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  }

  /*get displayName(): string | null {
    return this.user?.displayName || null;
  }*/
 
}
