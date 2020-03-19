import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    throw new Error("Method not implemented.");
  }

  constructor(private authService: AuthService) { }
  @Output() onClosing = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription: Subscription;
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }
  onClose() {
    this.onClosing.emit();
    this.onLogout();
  }
  onLogout() {
    this.authService.logout();
  }
}
