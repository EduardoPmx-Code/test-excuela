import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentrials!: FormGroup
  //email: string = '';
  //password: string = '';
  //username: string = '';

  constructor(private authService: AuthService,
              private router:Router,
              private fb:FormBuilder
  ) {
    this.credentrials = fb.group({
      username:['', [Validators.required]],
      email:['', [Validators.required,Validators.email]],
      password:['', [Validators.required]],
    })
  }
  ngOnInit(): void {
    
  }

  register() {
    if(this.credentrials.status === "VALID"){
      let email = this.credentrials.value.email;
      let password = this.credentrials.value.password
      let username = this.credentrials.value.username
      this.authService.register(email, password, username)
      .then(res => {
        console.log('Registration successful!', res);
        this.router.navigate(['main','chat','login'])
      })
      .catch(err => {
        console.error('Registration error', err);
      });
    }else{
      alert("invalid ")
    }
   
  }

}
