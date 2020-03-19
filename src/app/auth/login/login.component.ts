import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UiService } from 'src/app/shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private uiService: UiService) { }
  isLoadingSub = new Subscription;
  isLoading: boolean = false;
  ngOnInit() {
    this.isLoadingSub= this.uiService.loadingStateChanged.subscribe(
      (isLoading)=>{
      this.isLoading = isLoading;
      }
    )
  }
  signUp(form:NgForm){
    console.log(form);
    this.authService.login({
      email:form.value.emails,
      password:form.value.password
    });
    }
}
