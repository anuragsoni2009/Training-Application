import { Component, OnInit, EventEmitter,Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    throw new Error("Method not implemented.");
  }
  @Output() sideNavToggle = new EventEmitter<void>();
  isAuth:boolean=false;
  authSubscription: Subscription;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authSubscription=this.authService.authChange.subscribe(
      (authStatus)=>{
       this.isAuth=authStatus;
      }
    );
  }
  onTougleSidenav(){
  this.sideNavToggle.emit();
  }
  onLogout(){
  this.authService.logout();
  }
}
