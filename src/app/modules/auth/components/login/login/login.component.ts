import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //email: string = '';
  //password: string = '';
  credentials!:FormGroup
  constructor(private authService: AuthService,
              private router: Router,
              private fb:FormBuilder
  ) {
    this.credentials = this.fb.group({
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required]],
    })
  }

  login() {
    /*this.authService.login(this.email, this.password)
      .then(res => {
        console.log('Login successful!', res);
        this.router.navigate(['main','chat','rooms'])
      })
      .catch(err => {
        console.error('Login error', err);
      });*/
      let email = this.credentials.value.email
      let password = this.credentials.value.password
      console.log( email, password)
      if(this.credentials.status === "VALID"){
        this.authService.login(email, password)
        .then(res => {
          console.log('Login successful!', res);
          this.router.navigate(['main','chat','rooms'])
        })
        .catch(err => {
          console.error('Login error', err);
        });
      }else{
        alert("invalid ")
      }
     //
  }

  ngOnInit(): void {
  }

}
