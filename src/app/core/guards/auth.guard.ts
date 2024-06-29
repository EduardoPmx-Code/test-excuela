import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      filter((val) => val !== null), 
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) {
          console.log("AuthGuard")
          console.log(isLoggedIn)
          return true;
        
        } else {
      this.router.navigate(['main','chat']);
      return false;
    }
  })
);
}
  
}
