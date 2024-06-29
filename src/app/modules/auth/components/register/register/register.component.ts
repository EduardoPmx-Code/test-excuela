import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  username: string = '';

  constructor(private authService: AuthService,
              private router:Router
  ) {}
  ngOnInit(): void {
    
  }

  register() {
    this.authService.register(this.email, this.password, this.username)
      .then(res => {
        console.log('Registration successful!', res);
        this.router.navigate(['main','chat','login'])
      })
      .catch(err => {
        console.error('Registration error', err);
      });
  }

}
