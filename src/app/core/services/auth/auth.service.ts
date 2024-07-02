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
  private auth: Auth = inject(Auth); // Inyección del servicio de autenticación.
  private firestore: Firestore = inject(Firestore); // Inyección del servicio de Firestore.
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null); // BehaviorSubject para manejar el estado del usuario.
  user$: Observable<User | null> = this.userSubject.asObservable(); // Observable para el estado del usuario.
  user: User | null = null; // Usuario actual.
  username: string | null = null; // Nombre de usuario del usuario autenticado.

  constructor(private router: Router) {
    // Escuchar cambios en el estado de autenticación.
    this.auth.onAuthStateChanged(async user => {
      this.userSubject.next(user); // Actualizar el estado del usuario.
      if (user) {
        const userDocRef = doc(this.firestore, `users/${user.uid}`);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data() as UserDocument;
          this.username = userData.username || null; // Establecer el nombre de usuario.
        }
      }
    });
  }

  // Método para iniciar sesión con correo electrónico y contraseña.
  async login(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.userSubject.next(userCredential.user); // Actualizar el estado del usuario.
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Método para registrar un nuevo usuario.
  async register(email: string, password: string, username: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const userId = userCredential.user.uid;
      const userUuid = uuidv4();

      // Guardar los datos del usuario en Firestore.
      await setDoc(doc(this.firestore, 'users', userId), {
        username: username,
        uuid: userUuid,
        email: email
      });

      this.userSubject.next(userCredential.user); // Actualizar el estado del usuario.
      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  // Método para cerrar sesión.
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.userSubject.next(null); // Actualizar el estado del usuario.
      this.router.navigate(['main', 'chat']); // Redirigir al usuario a la página de chat.
    } catch (error) {
      throw error;
    }
  }

  // Obtener el estado actual del usuario como un Observable.
  getUser(): Observable<User | null> {
    return this.user$;
  }

  // Verificar si el usuario está autenticado.
  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user) // Retorna true si el usuario está autenticado, false en caso contrario.
    );
  }

  // Obtener los datos del usuario desde Firestore.
  async getUserData(uid: string) {
    const userDoc = await getDoc(doc(this.firestore, 'users', uid));
    return userDoc.exists() ? userDoc.data() : null;
  }

}
