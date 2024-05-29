import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router:Router)
  {
    
  }

  User={
    email:"",
    password:""
  }
  submit(){

    //this.router.navigate(['/dashboard']);
  }
}
