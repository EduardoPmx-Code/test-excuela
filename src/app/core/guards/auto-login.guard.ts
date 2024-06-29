import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}
  canLoad(): Observable<boolean> {
    return this.authService.isLoggedIn().pipe(
      filter((val) => val !== null), 
      take(1),
      map(isLoggedIn => {
        if (isLoggedIn) {
          console.log("AutoLoginGuard")
          console.log(isLoggedIn)
      this.router.navigate(['main','chat','rooms']); 
      return false; 
    } else {
      return true; 
    }
  })
);
}
}
