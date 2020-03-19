import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FullApp';
  openSidenav = false;

  constructor(private authService: AuthService) {

  }
  ngOnInit() {
  this.authService.initAuthListner();
  }
  toggleSideNav() {
    if (this.openSidenav) {
      this.openSidenav = false
    } else {
      this.openSidenav = true;
    }

  }
}
