import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
@Injectable()
export class UiService {
    constructor(private snackbar: MatSnackBar) {

    }
    loadingStateChanged = new Subject<boolean>();

    showSnackBar(message, action, duration) {
        this.snackbar.open(message, action, {
            duration: duration
        });
    }


}