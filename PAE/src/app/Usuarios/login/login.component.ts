import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm){
    console.log(form.value.email, form.value.password);
    this.authService.login(form.value.email, form.value.password)
        .subscribe((data)=>console.log(data), (err)=>console.log(err));
  }



}
