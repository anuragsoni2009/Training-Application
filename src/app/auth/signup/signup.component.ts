import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  today:Date;
  maxDate:Date;
  isLoading=false;
  constructor(private authService:AuthService , private uiService: UiService) { }
  loadingSubs = new Subscription;
  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(
      (isLoading)=>{
        this.isLoading= isLoading;
      }
    );
    this.today=new Date();
    this.today.setFullYear(new Date().getFullYear()-100);

    this.maxDate=new Date();
    let year= new Date().getFullYear()-18;
    
     this.maxDate.setFullYear(year);
  }
  signUp(form:NgForm){
  console.log(form);
  console.log(form.value.email);
  this.authService.registerUser({
    email:form.value.emails,
    password:form.value.password
  });
  }
}
