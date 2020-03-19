import { Subject, Subscription } from 'rxjs';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { UiService } from '../shared/ui.service';
@Injectable()
export class AuthService {
    private user: User;
    authChange = new Subject<boolean>();
    isAuthenticated: boolean = false;

    constructor(private router: Router, private afauth: AngularFireAuth, private uiSerivice : UiService) {
    }
    isLoggedIn = new Subscription;
    initAuthListner() {
        this.afauth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }
    registerUser(authData: AuthData) {
        this.uiSerivice.loadingStateChanged.next(true);
        let email = authData.email
        this.afauth.auth.createUserWithEmailAndPassword(email, authData.password).
            then((result) => {
                this.uiSerivice.loadingStateChanged.next(false);
                console.log(result);
          
            }).
            catch((error) => {
                this.uiSerivice.loadingStateChanged.next(false);
                this.uiSerivice.showSnackBar(error.message,null,5000);
                //  this.snackBar.open(error.message,null,{
                //     duration:5000
                // });
            })

        // this.user = {
        //     email: authData.email,
        //     userId: (Math.round(Math.random() * 10000)).toString()
        // };

    }
    login(authData: AuthData) {
        this.uiSerivice.loadingStateChanged.next(true);
        this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password).
            then((result) => {
                this.uiSerivice.loadingStateChanged.next(false);
                console.log(result);
                console.log('login is success');
               
            }).
            catch((error) => {
                this.uiSerivice.showSnackBar(error.message,null,5000);
                // this.snackBar.open(error.message,null,{
                //     duration:5000
                // });
                this.uiSerivice.loadingStateChanged.next(false);
            })
        // this.user = {
        //     email: authData.email,
        //     userId: (Math.round(Math.random() * 10000)).toString()
        // };

    }
    logout() {
        this.afauth.auth.signOut();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }
    getUser() {
        return { ...this.user };
    }
    isAuth() {
        return this.isAuthenticated;
    }

  
}
